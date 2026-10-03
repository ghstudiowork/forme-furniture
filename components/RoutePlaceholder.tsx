import Header from "./Header";
import styles from "./RoutePlaceholder.module.css";

// Temporary page body for routes whose design comes in a later step:
// the shared header plus the page name, nothing more.
export default function RoutePlaceholder({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
      </main>
    </>
  );
}
