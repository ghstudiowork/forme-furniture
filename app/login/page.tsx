import type { Metadata } from "next";
import Header from "@/components/Header";
import LoginView from "@/components/LoginView";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "로그인 — FORME",
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <LoginView />
      <Footer />
    </>
  );
}
