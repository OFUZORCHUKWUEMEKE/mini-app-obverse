"use client";

import { usePathname } from "next/navigation";
import { Button } from "./Button";
import Link from "next/link";
import Image from "next/image";
import { HomeIcon, linkIcon, transactionIcon } from "@/assets/icons";

export default function DashboardClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbar = ["/create"];
  const shouldHide = hideNavbar.some((path) => pathname.startsWith(path));

  return (
    <>
      {!shouldHide && (
        <main className="bg-[#141414] w-[92%] max-w-[600px] mx-auto min-h-screen relative">
          <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
            <div className="w-[92%] max-w-[600px] text-white flex flex-col items-center gap-4 py-4 px-4">
              <div className="flex items-center justify-center">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-[#313131] bg-primary w-[56px] h-[56px] text-[28px] rounded-full hover:opacity-80 active:scale-95 transition-all"
                >
                  +
                </Button>
              </div>

              <div className="flex w-full items-center justify-around cursor-pointer bg-[#070707] px-4 py-2.5 rounded-2xl border border-[#1a1a1a]">
                <Link
                  href="/"
                  className="flex flex-col gap-1 items-center"
                >
                  <Image
                    src={HomeIcon}
                    alt="Home Icon"
                    className="w-5 h-5 text-gray-400"
                  />
                  <h1 className="text-[#8c8c8c] font-onest font-light text-[11px] hover:text-primary focus:text-primary">
                    Home
                  </h1>
                </Link>
                <Link
                  href="/transactions"
                  className="flex flex-col gap-1 items-center"
                >
                  <Image
                    src={transactionIcon}
                    alt="Transaction Icon"
                    className="w-5 h-5 text-gray-400"
                  />
                  <h1 className="text-[#8c8c8c] font-onest font-light text-[11px] hover:text-primary focus:text-primary">
                    Transactions
                  </h1>
                </Link>
                <Link
                  href="/links"
                  className="flex flex-col gap-1 items-center"
                >
                  <Image
                    src={linkIcon}
                    alt="Link Icon"
                    className="w-5 h-5 text-gray-400"
                  />
                  <h1 className="text-[#8c8c8c] font-onest font-light text-[11px] hover:text-primary focus:text-primary">
                    Links
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        </main>
      )}
      {children}
    </>
  );
}
