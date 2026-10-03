"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Product } from "@/data/products";
import styles from "./ProductDetail.module.css";

const EXIT_MS = 320;

type Props = {
  product: Product | null;
  onClose: () => void;
};

// Editorial detail layer for a collection object. Built on <dialog> +
// showModal() so focus is trapped and the page behind is inert; ESC,
// the dimmed backdrop and CLOSE all run the same animated close.
export default function ProductDetail({ product, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);

  // Open + lock page scroll while a product is shown
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !product) return;
    if (!dialog.open) dialog.showModal();

    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    const prev = { overflow: root.style.overflow, padding: document.body.style.paddingRight };
    root.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    return () => {
      root.style.overflow = prev.overflow;
      document.body.style.paddingRight = prev.padding;
    };
  }, [product]);

  const requestClose = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open || closing) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      dialog.close();
      return;
    }
    setClosing(true);
    window.setTimeout(() => dialog.close(), EXIT_MS);
  }, [closing]);

  // ESC: play the exit animation instead of closing instantly. If the
  // browser closes the dialog anyway, the "close" event still cleans up.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      requestClose();
    };
    const onNativeClose = () => {
      setClosing(false);
      onClose();
    };
    dialog.addEventListener("cancel", onCancel);
    dialog.addEventListener("close", onNativeClose);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
      dialog.removeEventListener("close", onNativeClose);
    };
  }, [requestClose, onClose]);

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${closing ? styles.closing : ""}`}
      aria-labelledby="product-detail-title"
    >
      <div className={styles.dim} onClick={requestClose} aria-hidden="true" />

      {product && (
        <div className={styles.panel}>
          <div className={styles.imageFrame}>
            <Image
              src={product.image}
              alt={product.alt}
              fill
              className={styles.image}
              sizes="27vw"
            />
          </div>

          <div className={styles.info}>
            <div className={styles.top}>
              <span className={styles.index}>{product.index}</span>
              <button
                type="button"
                className={styles.close}
                onClick={requestClose}
                autoFocus
              >
                Close <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className={styles.body}>
              <h2 className={styles.name} id="product-detail-title">
                {product.name}
              </h2>
              <p className={styles.description}>{product.description}</p>
            </div>

            <dl className={styles.specs}>
              <div>
                <dt>Material</dt>
                <dd>{product.material.join(" / ")}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{product.year}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </dialog>
  );
}
