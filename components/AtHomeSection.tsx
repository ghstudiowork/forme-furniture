"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AtHomeSection.module.css";

// One full-bleed lifestyle photograph after the shop: the move from buying
// objects to seeing them lived with. The image carries the section; the
// caption sits below it, never on top.
export default function AtHomeSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: rootRef.current, start: "top 75%", once: true },
      });
      tl.fromTo(q(`.${styles.frame}`), { opacity: 0 }, { opacity: 1, duration: 1.1 }, 0)
        .fromTo(q(`.${styles.image}`), { scale: 1.025 }, { scale: 1, duration: 1.2 }, 0)
        .fromTo(
          q(`.${styles.caption} > *`),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
          0.45
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="at-home" ref={rootRef} aria-labelledby="at-home-title">
      <div className={styles.frame}>
        <Image
          src="/images/hero-interior.jpg"
          alt="A sunlit living room with a bouclé lounge chair, a dark oak low table and a white sofa"
          fill
          sizes="100vw"
          className={styles.image}
        />
      </div>

      <div className={styles.caption}>
        <p className={styles.eyebrow}>Forme at Home</p>
        <h2 className={styles.statement} id="at-home-title">
          일상 속에서 자연스럽게 완성되는
          <br />
          FORME의 오브제를 만나보세요.
        </h2>
        <a href="#journal" className={styles.link}>
          공간 이야기 보기
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
