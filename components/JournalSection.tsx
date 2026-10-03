"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journal, type JournalArticle } from "@/data/journal";
import styles from "./JournalSection.module.css";

// Latest journal articles: three equal cards, each one link to its article.
export default function JournalSection() {
  const rootRef = useRef<HTMLElement>(null);

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
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: q(`.${styles.head}`)[0], start: "top 80%", once: true },
        }
      );
      const cards = q(`.${styles.card}`);
      gsap.set(cards, { opacity: 0, y: 24 });
      ScrollTrigger.batch(cards, {
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

  return (
    <section className={styles.section} id="journal" ref={rootRef} aria-labelledby="journal-title">
      <header className={styles.head}>
        <p className={styles.eyebrow}>Journal</p>
        <h2 className={styles.heading} id="journal-title">
          공간이 말하는,
          <br />
          다른 이야기.
        </h2>
        <Link href="/journal" className={styles.all}>
          저널 전체 보기
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </Link>
      </header>

      <ol className={styles.grid}>
        {journal.map((article) => (
          <li key={article.slug} className={styles.card}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function ArticleCard({ article }: { article: JournalArticle }) {
  return (
    <Link href={`/journal/${article.slug}`} className={styles.link}>
      <span className={styles.frame}>
        <Image
          src={article.image}
          alt={article.alt}
          fill
          className={styles.image}
          style={{ objectPosition: article.position }}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 29vw"
        />
      </span>
      <span className={styles.index}>{article.index}</span>
      <div className={styles.titleRow}>
        <h3 className={styles.title}>{article.title}</h3>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </div>
      <p className={styles.summary}>{article.summary}</p>
    </Link>
  );
}
