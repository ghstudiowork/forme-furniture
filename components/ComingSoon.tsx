import styles from "./ComingSoon.module.css";

// Holding screen for routes that aren't built yet: one message, centred in
// the viewport below the shared header.
export default function ComingSoon({ title, note }: { title: string; note: string }) {
  return (
    <main className={styles.page}>
      <div className={styles.stage}>
        <div className={styles.message}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.note}>{note}</p>
        </div>
      </div>
    </main>
  );
}
