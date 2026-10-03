export interface JournalArticle {
  /** Publication order, shown on the card. */
  index: string;
  slug: string;
  /** Subject the article belongs to, shown above the title on /journal. */
  category: string;
  title: string;
  /** The same title broken into the lines used on /journal. */
  titleLines: string[];
  summary: string;
  /** Longer introduction used on the /journal index. */
  excerpt: string;
  image: string;
  alt: string;
  /** Crop point for the shared 4:3 card frame. */
  position: string;
}

// Newest first. Article pages live at /journal/[slug].
export const journal: JournalArticle[] = [
  {
    index: "01",
    slug: "wood-and-light",
    category: "Space & Light",
    title: "원목 가구와 빛이 만드는 분위기",
    titleLines: ["원목 가구와", "빛이 만드는 분위기"],
    summary: "자연광이 만드는 공간의 온도에 대해.",
    excerpt: "자연광이 공간의 온도와 가구의 표정을 어떻게 바꾸는지 이야기합니다.",
    image: "/images/collection/low-table-01.jpg",
    alt: "A walnut round table under a pendant lamp, crossed by bands of afternoon sunlight",
    position: "50% 58%",
  },
  {
    index: "02",
    slug: "small-objects",
    category: "Objects",
    title: "작은 오브제가 만드는 큰 변화",
    titleLines: ["작은 오브제가", "만드는 큰 변화"],
    summary: "일상 속 디테일이 공간을 바꿉니다.",
    excerpt: "하나의 오브제가 공간의 인상을 어떻게 바꾸는지 살펴봅니다.",
    image: "/images/collection/object-02.jpg",
    alt: "A hand-formed dark ceramic vase resting on a plaster plinth",
    position: "50% 55%",
  },
  {
    index: "03",
    slug: "placing-a-lounge-chair",
    category: "Living",
    title: "라운지 체어를 두는 방법",
    titleLines: ["라운지 체어를", "두는 방법"],
    summary: "더 편안한 휴식을 위한 공간 구성.",
    excerpt: "휴식의 위치에 따라 달라지는 공간의 균형을 이야기합니다.",
    image: "/images/hero-forme-interior.png",
    alt: "A sculptural bouclé lounge chair beside a travertine table in a sunlit room",
    position: "12% 55%",
  },
];

export interface JournalStory {
  slug: string;
  /** Subject shown above the title, e.g. "Living". */
  category: string;
  /** Extra marker shown before the category; only the lead feature has one. */
  label?: string;
  title: string;
  /** The same title broken into the lines used on /journal. */
  titleLines: string[];
  excerpt: string;
  /** Lives in public/images/journal/ — an editorial set separate from the
   *  product photography used on Home, Collection and Objects. */
  image: string;
  alt: string;
  /** Crop point inside the story's frame on /journal. */
  position: string;
}

// The /journal index: spaces and daily life rather than single products.
// Order is the page order — lead feature, the light / material pair, then
// the closing details story. Article pages live at /journal/[slug].
export const stories: JournalStory[] = [
  {
    slug: "a-living-room-for-light",
    category: "Living",
    label: "Feature 01",
    title: "빛이 머무는 거실을 만드는 방법",
    titleLines: ["빛이 머무는", "거실을 만드는 방법"],
    excerpt: "공간의 방향과 가구의 배치가 만드는 편안한 균형에 대하여.",
    image: "/images/journal/journal-living-01.jpg",
    alt: "A living room furnished by FORME, seen as a whole in daylight",
    position: "50% 50%",
  },
  {
    slug: "light-through-the-day",
    category: "Light",
    title: "하루의 빛에 따라 달라지는 공간",
    titleLines: ["하루의 빛에 따라", "달라지는 공간"],
    excerpt: "자연광과 그림자가 가구의 표정을 어떻게 변화시키는지 살펴봅니다.",
    image: "/images/journal/journal-light-02.jpg",
    alt: "Daylight and shadow moving across a room and its furniture",
    position: "50% 50%",
  },
  {
    slug: "materials-that-last",
    category: "Material",
    title: "오래 곁에 두고 싶은 소재에 대하여",
    titleLines: ["오래 곁에 두고 싶은", "소재에 대하여"],
    excerpt: "나무와 패브릭, 금속이 시간이 지나며 만들어내는 질감을 이야기합니다.",
    image: "/images/journal/journal-material-03.jpg",
    alt: "Close view of wood, fabric and metal surfaces side by side",
    position: "50% 50%",
  },
  {
    slug: "the-small-details",
    category: "Details",
    title: "작은 차이가 공간을 완성하는 순간",
    titleLines: ["작은 차이가", "공간을 완성하는 순간"],
    excerpt: "손이 닿는 표면과 작은 오브제까지, 일상을 만드는 디테일을 기록합니다.",
    image: "/images/journal/journal-detail-04.jpg",
    alt: "A detail of a furniture surface and a small object in everyday use",
    position: "50% 50%",
  },
];
