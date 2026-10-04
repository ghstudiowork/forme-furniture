"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartIndicator from "./CartIndicator";
import HeaderSearch from "./HeaderSearch";
import { Icon, type IconName } from "./icons";
import styles from "./Header.module.css";

// Product pages live under /objects, so they count as the collection
const NAV_LINKS = [
  { label: "컬렉션", href: "/collection", sections: ["/collection", "/objects"] },
  { label: "브랜드 소개", href: "/about", sections: ["/about"] },
];

const UTILITY_LINKS: { label: string; href: string; icon: IconName }[] = [
  { label: "로그인", href: "/login", icon: "login" },
  { label: "매장찾기", href: "/stores", icon: "store" },
];

// The mobile menu lists every account link, 마이 included
const MENU_UTILITIES: { label: string; href: string; icon: IconName; sections: string[] }[] = [
  ...UTILITY_LINKS.map((l) => ({ ...l, sections: [l.href] })),
  { label: "마이", href: "/my", icon: "user", sections: ["/my"] },
];

// A section and everything below it marks its item
const inSection = (pathname: string, sections: string[]) =>
  sections.some((s) => pathname === s || pathname.startsWith(`${s}/`));

// One row, three zones: brand + categories, the product search (the widest
// element), then the four icon-over-label utilities. On mobile the row
// keeps only the brand, the bag and a menu button; categories, search and
// the account links move into a full-screen menu.
export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Any navigation (link or search result) closes the menu
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  const closeMenu = () => {
    setMenuOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  };

  // While open: the page behind doesn't scroll, Escape closes, and the menu
  // shuts itself if the viewport grows past the mobile breakpoint
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus({ preventScroll: true });
      }
    };
    const wide = window.matchMedia("(min-width: 641px)");
    const onWide = () => wide.matches && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      root.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.primary}>
          <Link href="/" className={styles.logo}>
            FORME
          </Link>
          <nav className={styles.nav} aria-label="Primary">
            {NAV_LINKS.map(({ label, href, sections }) => (
              <Link
                key={label}
                href={href}
                className={styles.navLink}
                aria-current={inSection(pathname, sections) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <HeaderSearch />

        <nav className={styles.utilities} aria-label="Account">
          {UTILITY_LINKS.map(({ label, href, icon }) => (
            <Link
              key={label}
              href={href}
              className={`${styles.utility} ${styles.wideOnly}`}
              aria-current={pathname === href ? "page" : undefined}
            >
              <Icon name={icon} className={styles.utilityIcon} />
              <span className={styles.utilityLabel}>{label}</span>
            </Link>
          ))}
          <CartIndicator />
          <Link
            href="/my"
            className={`${styles.utility} ${styles.my} ${styles.wideOnly}`}
            aria-current={inSection(pathname, ["/my"]) ? "page" : undefined}
          >
            <Icon name="user" className={styles.utilityIcon} />
            <span className={styles.utilityLabel}>마이</span>
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="메뉴 열기"
            onClick={() => setMenuOpen(true)}
          >
            <span className={styles.menuBars} aria-hidden="true" />
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className={styles.menu}
          role="dialog"
          aria-modal="true"
          aria-label="메뉴"
        >
          <div className={styles.menuTop}>
            <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
              FORME
            </Link>
            <button
              ref={closeRef}
              type="button"
              className={styles.menuClose}
              aria-label="메뉴 닫기"
              onClick={closeMenu}
            >
              <span className={styles.menuCloseMark} aria-hidden="true" />
            </button>
          </div>

          <div className={styles.menuBody}>
            <HeaderSearch />

            <nav className={styles.menuNav} aria-label="Primary">
              {NAV_LINKS.map(({ label, href, sections }) => (
                <Link
                  key={label}
                  href={href}
                  className={styles.menuLink}
                  aria-current={inSection(pathname, sections) ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                  <span className={styles.menuArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
            </nav>

            <nav className={styles.menuUtilities} aria-label="Account">
              {MENU_UTILITIES.map(({ label, href, icon, sections }) => (
                <Link
                  key={label}
                  href={href}
                  className={styles.menuUtility}
                  aria-current={inSection(pathname, sections) ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon name={icon} className={styles.menuUtilityIcon} />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
