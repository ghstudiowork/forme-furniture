"use client";

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

// A section and everything below it marks its item
const inSection = (pathname: string, sections: string[]) =>
  sections.some((s) => pathname === s || pathname.startsWith(`${s}/`));

// One row, three zones: brand + categories, the product search (the widest
// element), then the four icon-over-label utilities.
export default function Header() {
  const pathname = usePathname();

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
              className={styles.utility}
              aria-current={pathname === href ? "page" : undefined}
            >
              <Icon name={icon} className={styles.utilityIcon} />
              <span className={styles.utilityLabel}>{label}</span>
            </Link>
          ))}
          <CartIndicator />
          <Link
            href="/my"
            className={`${styles.utility} ${styles.my}`}
            aria-current={inSection(pathname, ["/my"]) ? "page" : undefined}
          >
            <Icon name="user" className={styles.utilityIcon} />
            <span className={styles.utilityLabel}>마이</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
