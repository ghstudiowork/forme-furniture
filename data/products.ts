export type ProductCategory = "seating" | "table" | "lighting" | "object";

export interface Product {
  index: string;
  /** URL segment for /objects/[slug]. */
  slug: string;
  category: ProductCategory;
  name: string;
  material: string[];
  year: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  /** Short editorial copy for the detail layer — mood, not specifications. */
  description: string;
}

export const products: Product[] = [
  {
    index: "01",
    slug: "arc-lounge-chair",
    category: "seating",
    name: "Arc Lounge Chair",
    material: ["오크", "패브릭"],
    year: "2026",
    image: "/images/collection/arc-lounge-chair.jpg",
    width: 1800,
    height: 2700,
    alt: "Arc Lounge Chair, a sculptural boucle lounge chair lit by warm afternoon light",
    description:
      "몸을 감싸는 둥근 곡선의 라운지 체어. 오크와 패브릭의 조합으로, 하루의 끝에 오래 머무는 자리를 만듭니다.",
  },
  {
    index: "02",
    slug: "mono-side-table",
    category: "table",
    name: "Mono Side Table",
    material: ["브러시드 스테인리스 스틸"],
    year: "2026",
    image: "/images/collection/mono-side-table.jpg",
    width: 1800,
    height: 2250,
    alt: "Mono Side Table, a sculptural brushed steel side table with dramatic shadow",
    description:
      "브러시드 스테인리스 스틸로 완성한 사이드 테이블. 단순한 구조가 빛과 그림자를 담아 공간에 조용한 긴장감을 더합니다.",
  },
  {
    index: "03",
    slug: "frame-dining-chair",
    category: "seating",
    name: "Frame Dining Chair",
    material: ["월넛", "우븐 패브릭"],
    year: "2026",
    image: "/images/collection/frame-dining-chair.jpg",
    width: 1800,
    height: 2700,
    alt: "Frame Dining Chair, walnut dining chairs in a sunlit dining room",
    description:
      "월넛과 우븐 패브릭으로 구성한 다이닝 체어. 식탁 곁에서 보내는 일상의 시간을 위해 간결한 비례로 디자인했습니다.",
  },
  {
    index: "04",
    slug: "column-lamp",
    category: "lighting",
    name: "Column Lamp",
    material: ["알루미늄", "오팔 글라스"],
    year: "2026",
    image: "/images/collection/column-lamp.jpg",
    width: 1800,
    height: 2700,
    alt: "Column Lamp, a minimal black floor lamp casting shadow on a white wall",
    description:
      "알루미늄과 오팔 글라스로 구성한 조명. 공간 전체를 비추기보다 머무는 자리를 부드럽게 밝힙니다.",
  },
  {
    index: "05",
    slug: "low-table-01",
    category: "table",
    name: "Low Table 01",
    material: ["솔리드 오크"],
    year: "2026",
    image: "/images/collection/low-table-01.jpg",
    width: 1800,
    height: 2700,
    alt: "Low Table 01, a round solid oak table lit by diagonal sunlight",
    description:
      "솔리드 오크로 만든 원형 테이블. 나뭇결과 가장자리의 곡선이 빛 아래에서 자연스럽게 드러납니다.",
  },
  {
    index: "06",
    slug: "object-02",
    category: "object",
    name: "Object 02",
    material: ["스톤"],
    year: "2026",
    image: "/images/collection/object-02.jpg",
    width: 1800,
    height: 2700,
    alt: "Object 02, a dark sculptural stone vessel on a concrete plinth",
    description:
      "스톤으로 빚은 조형 오브제. 기능보다 존재감으로, 공간의 여백에 조용히 놓이는 작은 사물입니다.",
  },
];
