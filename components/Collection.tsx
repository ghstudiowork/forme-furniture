"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/data/products";
import styles from "./Collection.module.css";

export default function Collection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(`.${styles.item}`);

      items.forEach((item) => {
        if (reduceMotion) {
          gsap.set(item, { opacity: 1, y: 0 });
          return;
        }

        gsap.fromTo(
          item,
          { opacity: 0, y: 56 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.collection} ref={sectionRef}>
      <div className={styles.intro}>
        <span className={styles.introMeta}>Collection 01</span>
        <h2 className={styles.introHeading}>
          <span>New</span>
          <span>Collection.</span>
        </h2>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <article
            key={product.index}
            className={`${styles.item} ${styles["item" + product.index]}`}
          >
            <div className={styles.imageFrame}>
              <Image
                src={product.image}
                alt={product.alt}
                width={product.width}
                height={product.height}
                className={styles.image}
                sizes="(max-width: 860px) 92vw, 45vw"
              />
            </div>
            <div className={styles.caption}>
              <span className={styles.captionIndex}>
                {product.index} / {product.name}
              </span>
              <span className={styles.captionMaterial}>
                {[...product.material, product.year].join(" / ")}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
