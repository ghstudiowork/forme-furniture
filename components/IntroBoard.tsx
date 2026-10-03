"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/data/products";
import styles from "./IntroBoard.module.css";

const feature = products[0];

// FORME's three design principles; each fills one board cell.
const PRINCIPLES = {
  form: {
    label: "Form",
    title: "절제된 형태",
    body: ["공간을 압도하기보다", "자연스럽게 어우러지는 형태를 고민합니다."],
  },
  material: {
    label: "Material",
    title: "정직한 소재",
    body: ["시간이 지날수록 자연스럽게 깊어지는", "소재의 질감과 특성을 존중합니다."],
  },
  function: {
    label: "Function",
    title: "일상을 위한 기능",
    body: ["보여주기 위한 디자인보다", "매일 사용하는 경험을 먼저 생각합니다."],
  },
} as const;

type Principle = (typeof PRINCIPLES)[keyof typeof PRINCIPLES];

export default function IntroBoard() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const ease = "power3.out";

      const tl = gsap.timeline({
        defaults: { ease },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // 1. grid lines draw in
      tl.fromTo(
        q("[data-line='h']"),
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: "power2.inOut", stagger: 0.12 },
        0
      ).fromTo(
        q("[data-line='v']"),
        { scaleY: 0 },
        { scaleY: 1, duration: 1.4, ease: "power2.inOut", stagger: 0.12 },
        0.1
      );

      // 2. small labels
      tl.fromTo(
        q("[data-reveal='label']"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.06 },
        0.25
      );

      // 3. main typography, line by line
      tl.fromTo(
        q("[data-reveal='title'] > span"),
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.12 },
        0.35
      );

      // 4. principles — form, material, function
      tl.fromTo(
        q("[data-reveal='principle']"),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.12 },
        0.55
      );

      // 5. featured product image
      tl.fromTo(
        q("[data-reveal='image']"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.4 },
        0.8
      );

      // 6. metadata + closing statement
      tl.fromTo(
        q("[data-reveal='late']"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.1 },
        1.0
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.board} ref={rootRef} aria-label="FORME design approach">
      <div className={styles.lines} aria-hidden="true">
        <span data-line="h" className={`${styles.lineH} ${styles.lineTop}`} />
        <span data-line="h" className={`${styles.lineH} ${styles.lineMid}`} />
        <span data-line="h" className={`${styles.lineH} ${styles.lineBottom}`} />
        <span data-line="v" className={`${styles.lineV} ${styles.lineCol1}`} />
        <span data-line="v" className={`${styles.lineV} ${styles.lineCol2}`} />
      </div>

      {/* Left, top — eyebrow + lead title */}
      <div className={`${styles.cell} ${styles.lead}`}>
        <p className={styles.eyebrow} data-reveal="label">
          <span>Our Approach</span>
        </p>
        <h2 className={styles.title} data-reveal="title">
          <span>Objects</span>
          <span>for Living.</span>
        </h2>
      </div>

      {/* Centre, top */}
      <PrincipleCell principle={PRINCIPLES.form} />

      {/* Right, top */}
      <PrincipleCell principle={PRINCIPLES.function} />

      {/* Left, bottom — featured object */}
      <div className={`${styles.cell} ${styles.featureCell}`}>
        <div className={styles.imageArea}>
          <div className={styles.imageFrame} data-reveal="image">
            <Image
              src={feature.image}
              alt={feature.alt}
              fill
              className={styles.image}
              sizes="22vw"
            />
          </div>
        </div>
        <p className={styles.meta} data-reveal="late">
          <span>
            {feature.index} / {feature.name}
          </span>
          <span>Oak / Fabric / {feature.year}</span>
        </p>
      </div>

      {/* Centre, bottom */}
      <PrincipleCell principle={PRINCIPLES.material} />

      {/* Right, bottom — closing brand statement */}
      <div className={`${styles.cell} ${styles.statement}`}>
        <div className={styles.statementBody}>
          <p className={styles.statementText} data-reveal="late">
            <span>Designed</span>
            <span>to Belong.</span>
          </p>
          <p className={styles.note} data-reveal="late">
            가구가 공간의 주인공이 되기보다
            <br />
            그 안의 일상에 오래 머무는 것을 지향합니다.
          </p>
        </div>
      </div>
    </section>
  );
}

function PrincipleCell({ principle }: { principle: Principle }) {
  return (
    <div className={`${styles.cell} ${styles.principleCell}`}>
      <span className={styles.label} data-reveal="label">
        {principle.label}
      </span>
      <div className={styles.principle} data-reveal="principle">
        <h3 className={styles.principleTitle}>{principle.title}</h3>
        <p className={styles.principleBody}>
          {principle.body[0]}
          <br />
          {principle.body[1]}
        </p>
      </div>
    </div>
  );
}
