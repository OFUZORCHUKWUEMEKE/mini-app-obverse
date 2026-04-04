"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Hide the main site navbar on all app routes
  const appRoutes = ["/", "/transactions", "/links", "/create", "/pay", "/settings"];
  const shouldHide = appRoutes.some(
    (path) => pathname === path || (path !== "/" && pathname.startsWith(path))
  );

  return (
    <>
      {!shouldHide && <Navbar />}
      {children}
    </>
  );
}
