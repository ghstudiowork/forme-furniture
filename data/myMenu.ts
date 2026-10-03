export interface MyMenuItem {
  /** URL segment: /my/[slug]. */
  slug: string;
  label: string;
  /** An existing page that already serves this item; it then has no
   *  /my/[slug] page of its own. */
  href?: string;
}

export interface MyMenuGroup {
  title: string;
  items: MyMenuItem[];
}

// The MY FORME sidebar. Every item links to its own /my/[slug] page (a
// placeholder until that feature exists) unless it names an existing page
// in `href`. The dashboard links into the same pages, so this list is the
// single source for both.
export const myMenu: MyMenuGroup[] = [
  {
    title: "주문 관리",
    items: [
      { slug: "orders", label: "주문·배송 내역" },
      { slug: "returns", label: "취소·반품·교환 내역" },
    ],
  },
  {
    title: "상담 관리",
    items: [
      { slug: "product-qna", label: "상품 문의" },
      { slug: "inquiry", label: "1:1 문의" },
    ],
  },
  {
    title: "나의 혜택",
    items: [
      { slug: "coupons", label: "쿠폰" },
      { slug: "points", label: "포인트" },
    ],
  },
  {
    title: "나의 활동",
    items: [
      { slug: "wishlist", label: "찜" },
      { slug: "recent", label: "최근 본 상품" },
      { slug: "reviews", label: "상품 후기" },
    ],
  },
  {
    title: "나의 정보",
    items: [
      { slug: "profile", label: "회원 정보 변경" },
      { slug: "addresses", label: "배송지 관리" },
    ],
  },
  {
    title: "고객센터",
    items: [
      { slug: "faq", label: "FAQ" },
      { slug: "notices", label: "공지사항" },
      { slug: "support", label: "고객센터" },
    ],
  },
  {
    title: "비회원",
    items: [
      // The guest lookup form already lives on /login
      { slug: "guest-orders", label: "비회원 주문·배송 조회", href: "/login" },
      { slug: "guest-returns", label: "비회원 취소·반품·교환 신청" },
      { slug: "guest-return-fee", label: "비회원 반품비 조회" },
      { slug: "guest-stair-fee", label: "비회원 계단운반비 조회" },
      { slug: "guest-shipping-fee", label: "비회원 배송비 조회" },
      { slug: "guest-quote", label: "비회원 MY 견적서" },
    ],
  },
];

/** Items served by a /my/[slug] page. */
export const myPages: MyMenuItem[] = myMenu
  .flatMap((g) => g.items)
  .filter((item) => !item.href);

export const myHref = (slug: string) => `/my/${slug}`;

export const menuHref = (item: MyMenuItem) => item.href ?? myHref(item.slug);
