"use client";

import { useCart } from "./CartContext";
import { Icon } from "./icons";
import styles from "./Header.module.css";

// 장바구니 in the header utilities: bag icon over its label, with the item
// count in a small mark on the bag. Opens the cart drawer.
export default function CartIndicator() {
  const { count, openCart } = useCart();

  return (
    <button
      type="button"
      className={styles.utility}
      onClick={openCart}
      aria-haspopup="dialog"
      aria-label={`장바구니, ${count}개`}
    >
      <span className={styles.utilityIconWrap}>
        <Icon name="bag" className={styles.utilityIcon} />
        <span className={styles.cartCount} aria-hidden="true">
          {count}
        </span>
      </span>
      <span className={styles.utilityLabel}>장바구니</span>
    </button>
  );
}
