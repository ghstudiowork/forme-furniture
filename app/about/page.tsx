import type { Metadata } from "next";
import Header from "@/components/Header";
import AboutView from "@/components/AboutView";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "브랜드 소개 — FORME",
  description: "FORME가 가구와 공간을 바라보는 기준과 디자인 원칙.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutView />
      <Footer />
    </>
  );
}
