import { TextLogo } from "@/components/logo";
import { getUserSession } from "@/lib/auth";
import Link from "next/link";
import { Footer } from "@/app/Footer";

export default async function VisitorLayout({ children }) {
  const session = await getUserSession();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
}
