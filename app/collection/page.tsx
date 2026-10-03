import type { Metadata } from "next";
import Header from "@/components/Header";
import ObjectsSection from "@/components/ObjectsSection";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Collection — FORME",
  description: "FORME가 제안하는 일상을 위한 오브제 전체 컬렉션.",
};

export default function CollectionPage() {
  return (
    <>
      <Header />
      <main>
        <ObjectsSection
          id="all-objects"
          eyebrow={["FORME Collection"]}
          heading={["All", "Objects."]}
          headingLevel="h1"
          lede={
            <>
              FORME가 제안하는
              <br />
              일상을 위한 오브제를 만나보세요.
            </>
          }
          products={products}
          filterable
        />
      </main>
    </>
  );
}
