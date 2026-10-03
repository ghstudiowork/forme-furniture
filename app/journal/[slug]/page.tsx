import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RoutePlaceholder from "@/components/RoutePlaceholder";
import { journal, stories } from "@/data/journal";

// Only the published articles (the home cards and the /journal index
// stories) have pages; any other slug is a 404
export const dynamicParams = false;

const articles = [...journal, ...stories];

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

const bySlug = (slug: string) => articles.find((a) => a.slug === slug);

export async function generateMetadata(
  props: PageProps<"/journal/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = bySlug(slug);
  return { title: article ? `${article.title} — FORME Journal` : "FORME" };
}

// Placeholder until the article page is designed
export default async function JournalArticlePage(
  props: PageProps<"/journal/[slug]">
) {
  const { slug } = await props.params;
  const article = bySlug(slug);
  if (!article) notFound();

  return <RoutePlaceholder eyebrow="Journal" title={article.title} />;
}
