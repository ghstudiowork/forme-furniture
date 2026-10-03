import { redirect } from "next/navigation";

// The account page moved to /my
export default function MyPageRedirect() {
  redirect("/my");
}
