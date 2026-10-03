import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RoutePlaceholder from "@/components/RoutePlaceholder";
import { myPages } from "@/data/myMenu";

// Only the MY FORME menu items have pages; any other slug is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return myPages.map(({ slug }) => ({ section: slug }));
}

const bySlug = (slug: string) => myPages.find((p) => p.slug === slug);

export async function generateMetadata(
  props: PageProps<"/my/[section]">
): Promise<Metadata> {
  const { section } = await props.params;
  const page = bySlug(section);
  return { title: page ? `${page.label} — MY FORME` : "FORME" };
}

// Placeholder until each account feature is built
export default async function MySectionPage(props: PageProps<"/my/[section]">) {
  const { section } = await props.params;
  const page = bySlug(section);
  if (!page) notFound();

  return <RoutePlaceholder eyebrow="My FORME" title={page.label} />;
}
