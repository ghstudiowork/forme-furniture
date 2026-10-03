import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { menuHref, myHref, myMenu } from "@/data/myMenu";
import { Icon, type IconName } from "./icons";
import styles from "./MyDashboard.module.css";

// There is no member backend yet: every count is 0 and every list is empty.
// Real data replaces these constants; the markup already has a place for it.
const SUMMARY: { label: string; slug: string; icon: IconName; count: number }[] = [
  { label: "주문/배송", slug: "orders", icon: "truck", count: 0 },
  { label: "포인트", slug: "points", icon: "coins", count: 0 },
  { label: "상품 후기", slug: "reviews", icon: "review", count: 0 },
  { label: "찜", slug: "wishlist", icon: "heart", count: 0 },
];

const ORDER_STEPS = [
  { label: "입금 확인중", count: 0 },
  { label: "결제 완료", count: 0 },
  { label: "배송 준비중", count: 0 },
  { label: "배송중", count: 0 },
  { label: "배송 완료", count: 0 },
];

const ORDER_EXCEPTIONS = [
  { label: "취소", count: 0 },
  { label: "반품", count: 0 },
  { label: "교환", count: 0 },
];

// /my — the account dashboard: member summary on top, then the MY FORME
// menu beside the dashboard sections. A functional page: hairlines and
// type only, no cards or imagery.
export default function MyDashboard() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-current="page">My FORME</li>
          </ol>
        </nav>

        <section className={`${styles.summary} ${styles.enter}`} aria-label="회원 요약">
          <div className={styles.greeting}>
            <p className={styles.eyebrow}>My FORME</p>
            <h1 className={styles.hello}>
              안녕하세요.
              <br />
              FORME의 공간을 만나보세요.
            </h1>
            <Link href={myHref("profile")} className={styles.more}>
              회원정보 관리 <Arrow />
            </Link>
          </div>

          <ul className={styles.stats}>
            {SUMMARY.map(({ label, slug, icon, count }) => (
              <li key={slug}>
                <Link href={myHref(slug)} className={styles.stat}>
                  <Icon name={icon} className={styles.statIcon} />
                  <span className={styles.statLabel}>{label}</span>
                  <span className={styles.statCount}>{count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.layout}>
          <nav className={`${styles.sidebar} ${styles.enter}`} aria-label="MY FORME">
            <p className={styles.sidebarTitle}>My FORME</p>
            <div className={styles.groups}>
              {myMenu.map((group) => (
                <div key={group.title} className={styles.group}>
                  <p className={styles.groupTitle}>{group.title}</p>
                  <ul className={styles.groupList}>
                    {group.items.map((item) => (
                      <li key={item.slug}>
                        <Link href={menuHref(item)} className={styles.menuLink}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          <div className={`${styles.dashboard} ${styles.enter}`}>
            <MySection title="주문 관리" href={myHref("orders")}>
              <ol className={styles.steps}>
                {ORDER_STEPS.map(({ label, count }, i) => (
                  <Fragment key={label}>
                    {i > 0 && (
                      <li className={styles.stepArrow} aria-hidden="true">
                        →
                      </li>
                    )}
                    <li className={styles.step}>
                      <span className={styles.stepCount}>{count}</span>
                      <span className={styles.stepLabel}>{label}</span>
                    </li>
                  </Fragment>
                ))}
              </ol>
              <ul className={styles.exceptions}>
                {ORDER_EXCEPTIONS.map(({ label, count }) => (
                  <li key={label}>
                    {label} <strong>{count}</strong>
                  </li>
                ))}
              </ul>
            </MySection>

            <MySection title="상품 후기" href={myHref("reviews")}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">상품명</th>
                    <th scope="col">구매/상담일</th>
                    <th scope="col">후기 작성</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={3} className={styles.empty}>
                      작성 가능한 상품 후기가 없습니다.
                    </td>
                  </tr>
                </tbody>
              </table>
            </MySection>

            <MySection
              title="찜한 상품"
              href={myHref("wishlist")}
              empty="찜한 상품이 없습니다."
            />

            <div className={styles.support}>
              <MySection
                title="상품 문의"
                href={myHref("product-qna")}
                empty="등록된 상품 문의가 없습니다."
              />
              <MySection
                title="1:1 문의"
                href={myHref("inquiry")}
                empty="등록된 1:1 문의가 없습니다."
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// One dashboard section: a linked title on a rule, then either its content
// (e.g. a product grid once wishlist data exists) or the empty message.
function MySection({
  title,
  href,
  empty,
  children,
}: {
  title: string;
  href: string;
  empty?: string;
  children?: ReactNode;
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <Link href={href} className={styles.sectionLink}>
          {title} <Arrow />
        </Link>
      </h2>
      {children ?? <p className={styles.emptyBlock}>{empty}</p>}
    </section>
  );
}

function Arrow() {
  return (
    <span className={styles.arrow} aria-hidden="true">
      →
    </span>
  );
}
