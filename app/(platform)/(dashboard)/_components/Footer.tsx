"use client";
import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/lib/utilities/Navlinks";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-muted py-4 w-full border-t">
      <div className="container max-w-7xl flex flex-col md:flex-row items-center justify-between px-4 md:px-6">
        <Link href={"/"}>
          <Image
            src={"/Logos/Edify.png"}
            alt="Logo"
            height={500}
            width={500}
            className="h-8 w-8 lg:h-12 lg:w-12"
          />
        </Link>
        <nav className="flex flex-col items-center gap-2 md:gap-4 text-sm mt-4 md:mt-0 sm:flex-row">
          {NavLinks.map((link, index) => (
            <li key={index} role="tab" className="list-none">
              <Link href={link.href}>
                <button
                  className={cn(
                    "text-sm font-medium transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-b-2 hover:border-b-app-main hover:text-app-main md:text-base"
                  )}
                >
                  {link.title}
                </button>
              </Link>
            </li>
          ))}
        </nav>
        <p className="text-xs text-muted-foreground mt-4 md:mt-0">
          &copy; 2024 Edify All rights reserved.
        </p>
      </div>
    </footer>
  );
}
