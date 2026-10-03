import { products, type Product } from "@/data/products";
import ObjectsSection from "./ObjectsSection";

// The three objects offered on the home page, picked from the shared data
const SHOP_INDEXES = ["01", "02", "03"];
const shopProducts = SHOP_INDEXES.map(
  (index) => products.find((p) => p.index === index) as Product
);

export default function ShopObjects() {
  return (
    <ObjectsSection
      id="shop"
      eyebrow={["Selected Objects", "Available Collection"]}
      heading={["Shop", "The Objects."]}
      lede={
        <>
          일상을 위해 선택한
          <br />
          FORME의 오브제를 만나보세요.
        </>
      }
      products={shopProducts}
      cta={{ href: "/collection", label: "모든 제품 보기" }}
    />
  );
}
