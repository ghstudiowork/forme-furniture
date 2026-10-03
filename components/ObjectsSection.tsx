"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Product, ProductCategory } from "@/data/products";
import { useCart } from "./CartContext";
import ProductDetail from "./ProductDetail";
import styles from "./ObjectsSection.module.css";

const ADDED_MS = 1100;

const CATEGORIES: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "seating", label: "의자" },
  { value: "table", label: "테이블" },
  { value: "lighting", label: "조명" },
  { value: "object", label: "오브제" },
];

type Props = {
  id: string;
  eyebrow: string[];
  heading: string[];
  headingLevel?: "h1" | "h2";
  lede: ReactNode;
  products: Product[];
  cta?: { href: string; label: string };
  /** Show the category filter row between the header and the grid. */
  filterable?: boolean;
};

// Commerce grid shared by SHOP THE OBJECTS (home) and ALL OBJECTS
// (/collection): header, identical product frames, detail layer and cart.
export default function ObjectsSection({
  id,
  eyebrow,
  heading,
  headingLevel: Heading = "h2",
  lede,
  products,
  cta,
  filterable = false,
}: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Product | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const titleId = `${id}-title`;
  const visible =
    category === "all" ? products : products.filter((p) => p.category === category);

  const open = (product: Product, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActive(product);
  };

  const close = useCallback(() => {
    setActive(null);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context((self) => {
      const q = self.selector!;
      gsap.fromTo(
        q(`.${styles.head} > *`),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: q(`.${styles.head}`)[0], start: "top 80%", once: true },
        }
      );
      // Each row fades up as it enters, items within a row staggered
      const items = q(`.${styles.item}`);
      gsap.set(items, { opacity: 0, y: 28 });
      ScrollTrigger.batch(items, {
        start: "top 85%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power2.out",
            stagger: 0.12,
          }),
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Filtering reflows the grid, so items still waiting on their scroll
  // reveal could sit invisible at stale trigger positions — show whatever
  // the filter leaves in place and re-measure the remaining triggers.
  const firstFilter = useRef(true);
  useEffect(() => {
    if (firstFilter.current) {
      firstFilter.current = false;
      return;
    }
    const items = rootRef.current?.querySelectorAll(`.${styles.item}`);
    if (items?.length) {
      gsap.killTweensOf(items);
      gsap.set(items, { opacity: 1, y: 0 });
    }
    ScrollTrigger.refresh();
  }, [category]);

  return (
    <section
      className={styles.section}
      id={id}
      ref={rootRef}
      aria-labelledby={titleId}
    >
      <header className={styles.head}>
        <p className={styles.eyebrow}>
          {eyebrow.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <Heading className={styles.heading} id={titleId}>
          {heading.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </Heading>
        <p className={styles.lede}>{lede}</p>
      </header>

      {filterable && (
        <nav className={styles.filters} aria-label="카테고리">
          <ul className={styles.filterList}>
            {CATEGORIES.map(({ value, label }) => (
              <li key={value}>
                <button
                  type="button"
                  className={styles.filter}
                  aria-pressed={value === category}
                  onClick={() => setCategory(value)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className={styles.grid}>
        {visible.map((product) => (
          <ObjectItem key={product.index} product={product} onView={open} />
        ))}
      </div>

      {cta && (
        <div className={styles.more}>
          <Link href={cta.href} className={styles.moreLink}>
            {cta.label}
            <span className={styles.moreArrow} aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      )}

      <ProductDetail product={active} onClose={close} />
    </section>
  );
}

function ObjectItem({
  product,
  onView,
}: {
  product: Product;
  onView: (product: Product, trigger: HTMLButtonElement) => void;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleAdd = () => {
    add(product.index);
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), ADDED_MS);
  };

  return (
    <article className={styles.item}>
      <span className={styles.index}>{product.index}</span>

      <button
        type="button"
        className={styles.plate}
        aria-haspopup="dialog"
        aria-label={`${product.name} — view object`}
        onClick={(e) => onView(product, e.currentTarget)}
      >
        <span
          className={`${styles.imageFrame} ${styles["frame" + product.index]}`}
        >
          <Image
            src={product.image}
            alt={product.alt}
            fill
            className={styles.image}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 29vw"
          />
        </span>
      </button>

      <div className={styles.caption}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.material}>{product.material.join(" / ")}</p>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.action} ${styles.view}`}
          aria-haspopup="dialog"
          onClick={(e) => onView(product, e.currentTarget)}
        >
          <span>View object</span>
          <span className={styles.arrow} aria-hidden="true">
            ↗
          </span>
        </button>
        <button
          type="button"
          className={`${styles.action} ${added ? styles.added : ""}`}
          onClick={handleAdd}
          aria-label={`Add ${product.name} to cart`}
        >
          <span aria-live="polite">{added ? "Added" : "Add to cart"}</span>
          <span className={styles.symbol} aria-hidden="true">
            {added ? "✓" : "+"}
          </span>
        </button>
      </div>
    </article>
  );
}
