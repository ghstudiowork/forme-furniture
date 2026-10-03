import type { Metadata } from "next";
import Header from "@/components/Header";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "매장찾기 — FORME",
};

export default function StoresPage() {
  return (
    <>
      <Header />
      <ComingSoon
        title="아직 준비 중입니다."
        note="더 나은 공간에서 만나실 수 있도록 준비하고 있습니다."
      />
    </>
  );
}
