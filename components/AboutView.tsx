"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutView.module.css";

const MATERIALS = [
  {
    title: "원목",
    body: "시간이 지나며 색과 결이 자연스럽게 깊어지는 소재.",
  },
  {
    title: "패브릭",
    body: "촉감과 사용감을 고려해 일상에서 편안하게 사용할 수 있는 소재.",
  },
  {
    title: "금속과 스톤",
    body: "구조를 안정적으로 지지하고 공간에 절제된 대비를 만드는 소재.",
  },
];

const PRINCIPLES = [
  {
    title: "절제된 형태",
    body: ["필요 이상의 장식을 덜어내고", "쓰임과 비례가 자연스럽게 드러나는 형태를 만듭니다."],
  },
  {
    title: "정직한 소재",
    body: ["소재 자체의 질감과 시간이 만드는 변화를", "숨기지 않는 디자인을 지향합니다."],
  },
  {
    title: "일상을 위한 기능",
    body: ["보여주기 위한 오브제가 아니라", "매일 편안하게 사용할 수 있는 가구를 생각합니다."],
  },
];

// /about — what FORME looks for in furniture and space, not another shop
// view: brand declaration, point of view, materials, a lived-in room, the
// three principles and a closing statement, then the shared footer.
export default function AboutView() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    // Every marked element reveals as it reaches the lower edge of the
    // viewport, so whatever is already on screen at load shows at once
    // instead of waiting on a section-level trigger further down.
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const reveal = (selector: string, y: number) => {
        const els = q(selector);
        gsap.set(els, { opacity: 0, y });
        ScrollTrigger.batch(els, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.08,
            }),
        });
      };
      reveal("[data-reveal='text']", 24);
      reveal("[data-reveal='image']", 28);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className={styles.page} ref={rootRef}>
      {/* Brand declaration — type on cream, no cover image */}
      <section className={styles.hero} aria-labelledby="about-title">
        <p className={styles.eyebrow} data-reveal="text">
          About FORME
        </p>
        <h1 className={styles.heroTitle} id="about-title" data-reveal="text">
          <span>Objects</span>
          <span>for</span>
          <span>Everyday Living.</span>
        </h1>
        <div className={styles.heroLede} data-reveal="text">
          <p>
            가구가 공간의 주인공이 되기보다
            <br />
            그 안의 일상에 오래 머무는 것을 지향합니다.
          </p>
          <p>
            FORME는 형태와 소재,
            <br />
            그리고 사용하는 사람의 생활을 함께 바라봅니다.
          </p>
        </div>
      </section>

      {/* Point of view — copy, then one room set off-centre */}
      <section className={styles.view} aria-labelledby="about-view-title">
        <div className={styles.intro}>
          <p className={styles.eyebrow} data-reveal="text">
            Our Point of View
          </p>
          <h2 className={styles.title} id="about-view-title" data-reveal="text">
            형태보다 먼저,
            <br />
            생활을 생각합니다.
          </h2>
          <div className={styles.body} data-reveal="text">
            <p>
              FORME는 눈에 띄기 위한 가구보다
              <br />
              자연스럽게 생활에 스며드는 오브제를 만듭니다.
            </p>
            <p>
              앉고, 머물고, 물건을 올려두는
              <br />
              일상의 작은 행동에서 디자인을 시작합니다.
            </p>
            <p>
              공간을 채우는 것보다
              <br />
              공간과 함께 살아가는 방식을 생각합니다.
            </p>
          </div>
        </div>

        <div className={styles.viewFrame} data-reveal="image">
          <Image
            src="/images/hero-interior.jpg"
            alt="햇살이 드는 거실, 부클레 라운지 체어와 어두운 오크 로우 테이블, 흰 소파"
            fill
            sizes="(max-width: 640px) 92vw, 70vw"
            className={styles.image}
            style={{ objectPosition: "42% 72%" }}
          />
        </div>
      </section>

      {/* Material & making — statement, three-column ruled index, plates */}
      <section className={styles.material} aria-labelledby="about-material-title">
        <div className={styles.intro}>
          <p className={styles.eyebrow} data-reveal="text">
            Material &amp; Making
          </p>
          <h2 className={styles.title} id="about-material-title" data-reveal="text">
            오래 사용할수록
            <br />
            자연스러워지는 소재.
          </h2>
          <div className={styles.body} data-reveal="text">
            <p>
              FORME는 시간이 지나며 표정이 깊어지는
              <br />
              원목과 패브릭, 금속과 스톤을 중심으로
              <br />
              제품의 형태와 쓰임에 맞는 소재를 선택합니다.
            </p>
            <p>
              보이는 순간의 완성도뿐 아니라
              <br />
              사용하면서 생기는 변화까지
              <br />
              제품의 일부로 생각합니다.
            </p>
          </div>
        </div>

        <ul className={styles.columns}>
          {MATERIALS.map(({ title, body }) => (
            <li key={title} className={styles.column} data-reveal="text">
              <h3 className={styles.columnTitle}>{title}</h3>
              <p className={styles.columnBody}>{body}</p>
            </li>
          ))}
        </ul>

        {/* One large plate, two smaller ones stacked to the same height */}
        <div className={styles.plates}>
          <div className={`${styles.plate} ${styles.plateLarge}`} data-reveal="image">
            <Image
              src="/images/collection/arc-lounge-chair.jpg"
              alt="오크와 부클레 패브릭으로 만든 라운지 체어에 드는 오후의 빛"
              fill
              sizes="(max-width: 640px) 92vw, 53vw"
              className={styles.image}
              style={{ objectPosition: "50% 85%" }}
            />
          </div>
          <div className={`${styles.plate} ${styles.plateTop}`} data-reveal="image">
            <Image
              src="/images/collection/low-table-01.jpg"
              alt="사선으로 드는 햇빛 아래 솔리드 오크 원형 테이블의 나뭇결"
              fill
              sizes="(max-width: 640px) 92vw, 30vw"
              className={styles.image}
              style={{ objectPosition: "50% 78%" }}
            />
          </div>
          <div className={`${styles.plate} ${styles.plateBottom}`} data-reveal="image">
            <Image
              src="/images/collection/object-02.jpg"
              alt="콘크리트 받침 위에 놓인 어두운 스톤 오브제"
              fill
              sizes="(max-width: 640px) 92vw, 30vw"
              className={styles.image}
              style={{ objectPosition: "50% 58%" }}
            />
          </div>
        </div>
      </section>

      {/* Living with FORME — the widest, quietest moment of the page */}
      <section className={styles.living} aria-labelledby="about-living-title">
        <div className={styles.livingFrame} data-reveal="image">
          <Image
            src="/images/hero-forme-interior.png"
            alt="빛이 드는 거실, 패브릭 라운지 체어와 트래버틴 원형 테이블"
            fill
            sizes="92vw"
            className={styles.image}
            style={{ objectPosition: "50% 60%" }}
          />
        </div>
        <div className={styles.livingCaption}>
          <p className={styles.eyebrow} data-reveal="text">
            Living with FORME
          </p>
          <h2 className={styles.livingTitle} id="about-living-title" data-reveal="text">
            가구는 사용되는 순간
            <br />
            비로소 공간의 일부가 됩니다.
          </h2>
          <p className={styles.livingBody} data-reveal="text">
            FORME는 완성된 장면보다
            <br />
            그 안에서 이어질 생활을 생각합니다.
          </p>
        </div>
      </section>

      {/* Principles — three ruled columns, title and body only */}
      <section className={styles.principles} aria-labelledby="about-principles-title">
        <h2 className={styles.principlesTitle} id="about-principles-title" data-reveal="text">
          Our Principles
        </h2>
        <ul className={`${styles.columns} ${styles.principleColumns}`}>
          {PRINCIPLES.map(({ title, body }) => (
            <li key={title} className={styles.column} data-reveal="text">
              <h3 className={styles.principleTitle}>{title}</h3>
              <p className={styles.principleBody}>
                {body[0]}
                <br />
                {body[1]}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Closing statement, handed straight to the footer */}
      <section className={styles.closing} aria-label="FORME">
        <p className={styles.closingTitle} data-reveal="text">
          <span>Designed</span>
          <span>to Belong.</span>
        </p>
        <p className={styles.closingNote} data-reveal="text">
          공간에 놓이는 순간보다
          <br />
          그곳에 오래 남는 모습을 생각합니다.
        </p>
      </section>
    </main>
  );
}
