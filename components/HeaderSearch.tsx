"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { products, type Product, type ProductCategory } from "@/data/products";
import { Icon } from "./icons";
import styles from "./Header.module.css";

// Words a shopper might type for each category, in Korean and English
const CATEGORY_TERMS: Record<ProductCategory, string> = {
  seating: "seating 체어 의자 라운지",
  table: "table 테이블 탁자",
  lighting: "lighting lamp 조명 램프",
  object: "object 오브제 소품",
};

// Case- and space-insensitive, so "lowtable", "Low Table" and "low table 01"
// all find the same product
const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, "");

const INDEX = products.map((p) => ({
  product: p,
  haystack: normalize(
    [p.name, p.material.join(" "), CATEGORY_TERMS[p.category]].join(" ")
  ),
}));

function search(query: string): Product[] {
  const q = normalize(query);
  if (!q) return [];
  return INDEX.filter((e) => e.haystack.includes(q)).map((e) => e.product);
}

// Product search in the header: a combobox over data/products.ts. Typing
// filters by name, material or category; choosing a result (click, or the
// arrow keys + Enter) opens its /objects/[slug] page.
export default function HeaderSearch() {
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLFormElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const results = useMemo(() => search(query), [query]);
  const showPanel = open && query.trim() !== "";

  // Close when focus or a click lands outside the search
  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, []);

  const go = (product: Product) => {
    setOpen(false);
    setQuery("");
    setActive(-1);
    router.push(`/objects/${product.slug}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" && results.length) {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp" && results.length) {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  };

  // Enter (or the search button) opens the highlighted result, else the
  // first match
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = results[active] ?? results[0];
    if (target) go(target);
    else setOpen(true);
  };

  return (
    <form
      ref={rootRef}
      role="search"
      className={styles.search}
      onSubmit={onSubmit}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <input
        type="search"
        className={styles.searchInput}
        placeholder="FORME의 오브제를 검색해보세요"
        aria-label="오브제 검색"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showPanel}
        aria-controls={listId}
        aria-activedescendant={
          showPanel && active >= 0 ? `${listId}-${active}` : undefined
        }
        autoComplete="off"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
      />
      <button type="submit" className={styles.searchButton} aria-label="검색">
        <Icon name="search" className={styles.searchIcon} />
      </button>

      {showPanel && (
        <div className={styles.results}>
          {results.length ? (
            <ul id={listId} role="listbox" aria-label="검색 결과" className={styles.resultList}>
              {results.map((p, i) => (
                <li
                  key={p.slug}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  className={styles.result}
                  // Keep focus in the input so the list doesn't close first
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(p)}
                >
                  <span className={styles.resultThumb}>
                    <Image src={p.image} alt="" fill sizes="40px" className={styles.resultImage} />
                  </span>
                  <span className={styles.resultText}>
                    <span className={styles.resultName}>{p.name}</span>
                    <span className={styles.resultMeta}>{p.material.join(" / ")}</span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p id={listId} className={styles.noResult} role="status">
              ‘{query.trim()}’에 대한 검색 결과가 없습니다.
            </p>
          )}
        </div>
      )}
    </form>
  );
}
