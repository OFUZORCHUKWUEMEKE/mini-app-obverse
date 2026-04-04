"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { logo, logoDark, logoText, logoTextDark } from "@/assets/icons";
import { Button } from "./ui/Button";



const MainNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="w-full bg-transparent">
      <nav className="sm:px-10 lg:mx-20 sm:mx-15 mx-5 px-5 flex justify-between py-3  items-center rounded-[64px] bg-[#22201D] border border-[#2d2b29]">
        
        <Link href="/" onClick={closeMenu}>
          <div className="flex sm:gap-4 gap-2">
            <Image src={logoDark} alt="logo" />
            <Image src={logoTextDark} alt="logoText" />
          </div>
        </Link>

        
        <Button className="flex text-[12px] font-medium max-sm:px-5" variant="normal" size="normal">
          Join Waitlist
        </Button>
      </nav>
    </header>
  );
};

export default MainNavbar;
