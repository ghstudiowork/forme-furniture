"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { products, type Product } from "@/data/products";
import { pad2, useCart } from "./CartContext";
import styles from "./CartDrawer.module.css";

const EXIT_MS = 420;

const byIndex = (index: string) =>
  products.find((p) => p.index === index) as Product;

// Right-hand cart drawer. Same <dialog> + showModal() approach as the
// product detail layer: focus is trapped, the page behind is inert, and
// CLOSE / ESC / backdrop all run the same animated close.
export default function CartDrawer() {
  const { lines, count, isOpen, closeCart, increment, decrement, remove } =
    useCart();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);

  // Open + lock page scroll while the drawer is shown
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;
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
  }, [isOpen]);

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

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      requestClose();
    };
    const onNativeClose = () => {
      setClosing(false);
      closeCart();
    };
    dialog.addEventListener("cancel", onCancel);
    dialog.addEventListener("close", onNativeClose);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
      dialog.removeEventListener("close", onNativeClose);
    };
  }, [requestClose, closeCart]);

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${closing ? styles.closing : ""}`}
      aria-labelledby="cart-title"
    >
      <div className={styles.dim} onClick={requestClose} aria-hidden="true" />

      <div className={styles.panel}>
        <div className={styles.top}>
          <h2 className={styles.title} id="cart-title">
            Cart <span className={styles.titleCount}>{pad2(count)}</span>
          </h2>
          <button
            type="button"
            className={styles.close}
            onClick={requestClose}
            autoFocus
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </div>

        {lines.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Your cart is empty</p>
            <p className={styles.emptyBody}>아직 선택한 오브제가 없습니다.</p>
          </div>
        ) : (
          <ul className={styles.list}>
            {lines.map((line) => {
              const product = byIndex(line.index);
              return (
                <li key={line.index} className={styles.line}>
                  <div className={styles.thumb}>
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      className={styles.thumbImage}
                      sizes="96px"
                    />
                  </div>

                  <div className={styles.lineInfo}>
                    <span className={styles.lineIndex}>{product.index}</span>
                    <p className={styles.lineName}>{product.name}</p>
                    <p className={styles.lineMaterial}>
                      {product.material.join(" / ")}
                    </p>

                    <div className={styles.lineControls}>
                      <div
                        className={styles.qty}
                        role="group"
                        aria-label={`${product.name} quantity`}
                      >
                        <button
                          type="button"
                          onClick={() => decrement(line.index)}
                          disabled={line.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span aria-live="polite">{line.quantity}</span>
                        <button
                          type="button"
                          onClick={() => increment(line.index)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className={styles.remove}
                        onClick={() => remove(line.index)}
                        aria-label={`Remove ${product.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className={styles.footer}>
          <div className={styles.summary}>
            <span>Selected objects</span>
            <span>
              {count} {count === 1 ? "Item" : "Items"}
            </span>
          </div>
          {/* No checkout or inquiry flow exists yet, so this stays disabled
              rather than pretending an order can be placed. */}
          <button type="button" className={styles.inquiry} disabled>
            <span>Order inquiry</span>
            <span aria-hidden="true">→</span>
          </button>
          <p className={styles.note}>주문 문의 기능은 준비 중입니다.</p>
        </div>
      </div>
    </dialog>
  );
}
