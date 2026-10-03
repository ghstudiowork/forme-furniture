"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products, type Product } from "@/data/products";
import ProductDetail from "./ProductDetail";
import styles from "./CollectionIntro.module.css";

// Two editorial spreads. Spread 01 reads BIG → SMALL → MEDIUM,
// spread 02 answers with MEDIUM → BIG → SMALL.
const SPREADS = [
  ["01", "02", "03"],
  ["04", "05", "06"],
] as const;

// Rendered width of each plate at desktop, for next/image srcset selection
const IMAGE_SIZES: Record<string, string> = {
  "01": "53vw",
  "02": "22vw",
  "03": "30vw",
  "04": "22vw",
  "05": "53vw",
  "06": "14vw",
};

const byIndex = (index: string) =>
  products.find((p) => p.index === index) as Product;

export default function CollectionIntro() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Product | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const open = (product: Product, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActive(product);
  };

  // Hand focus back to the object that opened the layer
  const close = useCallback(() => {
    setActive(null);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  // Same restrained per-item scroll reveal as the original collection:
  // image fades up first, its caption follows a beat later.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context((self) => {
      const q = self.selector!;
      q(`.${styles.item}`).forEach((item: HTMLElement) => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        });
        tl.fromTo(
          item.querySelector(`.${styles.imageFrame}`),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1.2 }
        ).fromTo(
          item.querySelector(`.${styles.meta}`),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.25
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.collection} id="collection" ref={rootRef}>
      <div className={`${styles.spread} ${styles.spread01}`}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>Collection 01</span>
          <h2 className={styles.heading}>
            <span>New</span>
            <span>Collection.</span>
          </h2>
        </div>
        {SPREADS[0].map((index) => (
          <Item key={index} product={byIndex(index)} onOpen={open} />
        ))}
      </div>

      <div className={`${styles.spread} ${styles.spread02}`}>
        {SPREADS[1].map((index) => (
          <Item key={index} product={byIndex(index)} onOpen={open} />
        ))}
      </div>

      <ProductDetail product={active} onClose={close} />
    </section>
  );
}

function Item({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (product: Product, trigger: HTMLButtonElement) => void;
}) {
  return (
    <article className={`${styles.item} ${styles["item" + product.index]}`}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="dialog"
        aria-label={`${product.name} — view object`}
        onClick={(e) => onOpen(product, e.currentTarget)}
      >
        <span className={styles.imageFrame}>
          <Image
            src={product.image}
            alt={product.alt}
            fill
            className={styles.image}
            sizes={IMAGE_SIZES[product.index]}
          />
        </span>
        <span className={styles.meta}>
          <span>
            {product.index} / {product.name}
          </span>
          <span>{[...product.material, product.year].join(" / ")}</span>
          <span className={styles.view} aria-hidden="true">
            View object →
          </span>
        </span>
      </button>
    </article>
  );
}
