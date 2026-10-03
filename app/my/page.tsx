import type { Metadata } from "next";
import Header from "@/components/Header";
import MyDashboard from "@/components/MyDashboard";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MY FORME — FORME",
};

export default function MyPage() {
  return (
    <>
      <Header />
      <MyDashboard />
      <Footer />
    </>
  );
}
