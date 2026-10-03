import Image from "next/image";
import Link from "next/link";
import type { Product, ProductCategory } from "@/data/products";
import styles from "./ObjectsIndex.module.css";

export const CATEGORIES: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "seating", label: "의자" },
  { value: "table", label: "테이블" },
  { value: "lighting", label: "조명" },
  { value: "object", label: "오브제" },
];

// Crop point per object inside the shared 4:5 frame — same subjects the
// shop grid keeps in view.
const OBJECT_POSITION: Record<string, string> = {
  "01": "50% 92%",
  "02": "50% 50%",
  "03": "50% 35%",
  "04": "50% 50%",
  "05": "50% 80%",
  "06": "50% 60%",
};

type Props = {
  products: Product[];
  category: ProductCategory | "all";
};

// /objects — the browsable index of every object: intro, category filter,
// then one even grid of identical frames. Each card opens its detail page.
export default function ObjectsIndex({ products, category }: Props) {
  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <p className={styles.eyebrow}>Objects</p>
        <h1 className={styles.heading}>
          <span>Forme</span>
          <span>Objects</span>
        </h1>
        <p className={styles.lede}>
          일상을 위해 선택한
          <br />
          FORME의 오브제를 만나보세요.
        </p>
      </header>

      <nav className={styles.filters} aria-label="Object categories">
        <ul className={styles.filterList}>
          {CATEGORIES.map(({ value, label }) => (
            <li key={value}>
              <Link
                href={value === "all" ? "/objects" : `/objects?category=${value}`}
                scroll={false}
                className={styles.filter}
                aria-current={value === category ? "page" : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <ul className={styles.grid}>
        {products.map((product) => (
          <li key={product.slug} className={styles.item}>
            <Link href={`/objects/${product.slug}`} className={styles.card}>
              <span className={styles.index}>{product.index}</span>
              <span className={styles.frame}>
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  className={styles.image}
                  style={{ objectPosition: OBJECT_POSITION[product.index] }}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                />
              </span>
              <span className={styles.caption}>
                <span className={styles.text}>
                  <span className={styles.name}>{product.name}</span>
                  <span className={styles.material}>{product.material.join(" / ")}</span>
                </span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
