"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Footer.module.css";

const EMAIL = "hello@forme.kr";
const INQUIRY_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent("제품 및 브랜드 문의")}`;

// Same labels as the header navigation. `href` is left out where the site
// has no destination yet (the header points those at "#"), so nothing here
// pretends to link somewhere it doesn't.
const NAV_LINKS: { label: string; href?: string }[] = [
  { label: "컬렉션", href: "/collection" },
  { label: "오브제", href: "/#shop" },
  { label: "저널", href: "/journal" },
  { label: "브랜드 소개", href: "/about" },
];

// Functional two-column footer: brand and contact on the left (the email
// address is the strongest type here), brand message, Instagram and the
// navigation panel on the right, then a single base row.
export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context((self) => {
      const q = self.selector!;
      gsap
        .timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
        })
        .fromTo(
          q(`.${styles.main} > *`),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
          0
        )
        .fromTo(
          q(`.${styles.base}`),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.3
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const backToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <footer className={styles.footer} ref={rootRef}>
      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              FORME
            </Link>
            <p className={styles.tagline}>
              <span>Objects for</span>
              <span>Everyday Living.</span>
            </p>
          </div>

          <div className={styles.contact}>
            <a href={`mailto:${EMAIL}`} className={styles.email}>
              {EMAIL}
            </a>
            <a href={INQUIRY_HREF} className={styles.inquiry}>
              제품 및 브랜드 문의
              <span className={styles.inquiryArrow} aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.intro}>
            <p className={styles.message}>
              가구가 공간의 주인공이 되기보다
              <br />
              그 안의 일상에 오래 머무는 것을 지향합니다.
            </p>
            {/* Instagram URL not set yet — no href until the account exists */}
            <a className={styles.social}>
              Instagram
              <span className={styles.socialArrow} aria-hidden="true">
                ↗
              </span>
            </a>
          </div>

          <nav className={styles.panel} aria-label="Footer">
            <p className={styles.label}>Explore</p>
            <ul className={styles.nav}>
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  {href ? (
                    <Link href={href} className={styles.navLink}>
                      {label}
                    </Link>
                  ) : (
                    <a className={styles.navLink}>{label}</a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className={styles.base}>
        <p className={styles.small}>© 2026 FORME</p>
        <button type="button" className={`${styles.small} ${styles.top}`} onClick={backToTop}>
          Back to top
          <span className={styles.topArrow} aria-hidden="true">
            ↑
          </span>
        </button>
      </div>
    </footer>
  );
}
