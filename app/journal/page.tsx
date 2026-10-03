import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Header from "@/components/Header";
import JournalIndex from "@/components/JournalIndex";
import Footer from "@/components/Footer";
import { stories } from "@/data/journal";

export const metadata: Metadata = {
  title: "Journal — FORME",
  description: "가구가 놓이는 공간과 생활에 대한 FORME의 기록.",
};

export default function JournalPage() {
  // A story whose photograph isn't in public/images/journal/ yet renders a
  // labelled placeholder frame instead of a broken image; dropping the file
  // in under the same name is all it takes to show it.
  const items = stories.map((story) => ({
    ...story,
    hasImage: existsSync(path.join(process.cwd(), "public", story.image)),
  }));

  return (
    <>
      <Header />
      <JournalIndex stories={items} />
      <Footer />
    </>
  );
}
