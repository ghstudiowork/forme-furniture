import type { Metadata } from "next";
import Header from "@/components/Header";
import ObjectsIndex, { CATEGORIES } from "@/components/ObjectsIndex";
import { products, type ProductCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "Objects — FORME",
  description: "FORME의 모든 오브제를 카테고리별로 둘러보세요.",
};

export default async function ObjectsPage(props: PageProps<"/objects">) {
  const { category: param } = await props.searchParams;
  // Unknown or missing ?category= falls back to ALL
  const category =
    CATEGORIES.find((c) => c.value === param)?.value ?? "all";
  const shown =
    category === "all"
      ? products
      : products.filter((p) => p.category === (category as ProductCategory));

  return (
    <>
      <Header />
      <ObjectsIndex products={shown} category={category} />
    </>
  );
}
