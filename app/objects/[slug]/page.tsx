import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RoutePlaceholder from "@/components/RoutePlaceholder";
import { products } from "@/data/products";

// Only the six real objects have pages; any other slug is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

const bySlug = (slug: string) => products.find((p) => p.slug === slug);

export async function generateMetadata(
  props: PageProps<"/objects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = bySlug(slug);
  return { title: product ? `${product.name} — FORME` : "FORME" };
}

// Placeholder until the product detail page is designed
export default async function ObjectPage(props: PageProps<"/objects/[slug]">) {
  const { slug } = await props.params;
  const product = bySlug(slug);
  if (!product) notFound();

  return <RoutePlaceholder eyebrow="Objects" title={product.name} />;
}
