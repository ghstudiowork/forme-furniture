"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { JournalStory } from "@/data/journal";
import styles from "./JournalIndex.module.css";

type Story = JournalStory & { hasImage: boolean };

type Variant = "feature" | "landscape" | "portrait" | "detail";

// Frame ratio per slot — shown on the placeholder so the replacement
// photograph can be prepared at the right proportion.
const RATIO: Record<Variant, string> = {
  feature: "16 : 7",
  landscape: "3 : 2",
  portrait: "4 : 5",
  detail: "5 : 4",
};

const SIZES: Record<Variant, string> = {
  feature: "(max-width: 640px) 92vw, 92vw",
  landscape: "(max-width: 640px) 92vw, (max-width: 1024px) 60vw, 61vw",
  portrait: "(max-width: 640px) 70vw, (max-width: 1024px) 34vw, 22vw",
  detail: "(max-width: 640px) 92vw, (max-width: 1024px) 60vw, 53vw",
};

// /journal — the editorial index. Same head, margins, hairlines and type as
// /objects; the difference is the structure: one wide lead feature, an
// asymmetric landscape / portrait pair, and a closing details story.
export default function JournalIndex({ stories }: { stories: Story[] }) {
  const rootRef = useRef<HTMLElement>(null);
  const [feature, light, material, detail] = stories;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context((self) => {
      const q = self.selector!;

      gsap.fromTo(
        q(`.${styles.head} [data-reveal]`),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.08, delay: 0.1 }
      );

      // Each story: plate first, then its text, once it enters the viewport
      q(`.${styles.story}`).forEach((story: HTMLElement) => {
        gsap
          .timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: { trigger: story, start: "top 85%", once: true },
          })
          .fromTo(
            story.querySelector(`.${styles.frame}`),
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.9 },
            0
          )
          .fromTo(
            story.querySelectorAll("[data-reveal]"),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 },
            0.15
          );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className={styles.page} ref={rootRef}>
      <header className={styles.head}>
        <p className={styles.eyebrow} data-reveal>
          Journal
        </p>
        <h1 className={styles.heading} data-reveal>
          <span>Spaces for</span>
          <span>Everyday Living.</span>
        </h1>
        <div className={styles.lede} data-reveal>
          <p>
            가구가 놓이는 순간,
            <br />
            공간의 이야기가 시작됩니다.
          </p>
          <p>
            FORME가 바라보는
            <br />
            공간과 생활에 대한 기록.
          </p>
        </div>
      </header>

      <section className={styles.featureSection} aria-label="Feature">
        <StoryLink story={feature} variant="feature" priority />
      </section>

      <section className={styles.pairSection} aria-label="Light and material">
        <ul className={styles.pair}>
          <li className={styles.pairItem}>
            <StoryLink story={light} variant="landscape" />
          </li>
          <li className={styles.pairItem}>
            <StoryLink story={material} variant="portrait" />
          </li>
        </ul>
      </section>

      <section className={styles.detailSection} aria-label="Details">
        <StoryLink story={detail} variant="detail" />
      </section>
    </main>
  );
}

// One link per story: the plate, title and "Read story" all lead to the
// same /journal/[slug] page.
function StoryLink({
  story,
  variant,
  priority = false,
}: {
  story: Story;
  variant: Variant;
  priority?: boolean;
}) {
  const Title = variant === "feature" ? "h2" : "h3";

  return (
    <Link
      href={`/journal/${story.slug}`}
      className={`${styles.story} ${styles[variant]}`}
    >
      <span className={styles.frame}>
        {story.hasImage ? (
          <Image
            src={story.image}
            alt={story.alt}
            fill
            className={styles.image}
            style={{ objectPosition: story.position }}
            sizes={SIZES[variant]}
            priority={priority}
          />
        ) : (
          <span className={styles.placeholder} aria-hidden="true">
            <span>{story.image.split("/").pop()}</span>
            <span>{RATIO[variant]}</span>
          </span>
        )}
      </span>

      <span className={styles.body}>
        <span className={styles.meta} data-reveal>
          {story.label && <span className={styles.label}>{story.label}</span>}
          <span>{story.category}</span>
        </span>
        <Title className={styles.title} data-reveal>
          {story.titleLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </Title>
        <span className={styles.aside}>
          <span className={styles.excerpt} data-reveal>
            {story.excerpt}
          </span>
          <span className={styles.read} data-reveal>
            Read story
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </span>
        </span>
      </span>
    </Link>
  );
}
