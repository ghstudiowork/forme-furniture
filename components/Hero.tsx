import Image from "next/image";
import styles from "./Hero.module.css";

const PREVIEW_IMAGES = [
  { src: "/images/collection/arc-lounge-chair.jpg", alt: "Arc Lounge Chair" },
  { src: "/images/collection/mono-side-table.jpg", alt: "Mono Side Table" },
  { src: "/images/collection/frame-dining-chair.jpg", alt: "Frame Dining Chair" },
  { src: "/images/collection/object-02.jpg", alt: "Object 02" },
  { src: "/images/collection/column-lamp.jpg", alt: "Column Lamp" },
  { src: "/images/collection/low-table-01.jpg", alt: "Low Table 01" },
] as const;

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.imageWrap}>
        <Image
          src="/images/hero-forme-interior.png"
          alt="Sculptural boucle lounge chair and pouf beside a travertine coffee table in a sunlit minimal interior"
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />
        <div className={styles.scrim} />
      </div>

      <div className={styles.content}>
        <h1 className={styles.headline}>
          <span>FORM FOLLOWS</span>
          <span>LIVING.</span>
        </h1>

        <div className={styles.deco}>
          <span className={styles.decoRule} aria-hidden="true" />
          <span className={styles.decoMark} aria-hidden="true">
            <span />
          </span>
          <ol className={styles.decoList}>
            <li>
              <span>01</span>절제된 형태
            </li>
            <li>
              <span>02</span>정직한 소재
            </li>
            <li>
              <span>03</span>일상을 위한 디자인
            </li>
          </ol>
        </div>

        <div className={styles.bottomLeft}>
          <span className={styles.leftRule} aria-hidden="true" />
          <p className={styles.description}>
            형태와 기능의 균형을 담은
            <br />
            컨템포러리 가구 컬렉션
          </p>
          <a className={styles.cta} href="#collection">
            컬렉션 보기
          </a>
        </div>

        <div className={styles.previewGroup}>
          <p className={styles.previewLabel}>
            Selected Objects · 01 — 06
          </p>
          <div className={styles.previewViewport}>
            {/* The list is rendered twice so the track can loop seamlessly:
                it travels exactly one copy's width, then restarts. */}
            <div className={styles.previewTrack}>
              {[0, 1].map((copy) =>
                PREVIEW_IMAGES.map((image) => (
                  <div
                    key={`${copy}-${image.src}`}
                    className={styles.previewItem}
                    aria-hidden={copy === 1 || undefined}
                  >
                    <Image
                      src={image.src}
                      alt={copy === 0 ? image.alt : ""}
                      fill
                      className={styles.previewImage}
                      sizes="(max-width: 860px) 45vw, 17vw"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
