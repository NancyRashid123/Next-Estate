"use client";
import { Link, usePathname } from "@/i18n/routing";
import { navLinks } from "../navbar/Navbar";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  return (
    <footer className="border-t border-black/5 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 py-6 px-6 lg:flex-row justify-between text-center">
        {/* logo */}
        <Link  dir="ltr" href="/" className="flex items-center text-2xl font-semibold">
          <span className="text-text">Next</span>
          <span className="bg-primary px-2 py-1 text-white rounded-tr-2xl rounded-bl-2xl">
            Estate
          </span>
        </Link>
        {/* desktop links */}
        <div className=" item-center gap-8 flex">
          {navLinks.map((link) => {
              ;

              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`text-sm font-medium transition duration-500 hover:text-primary ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-text/60"
                  }`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
        </div>
        <p  dir="ltr" className="text-sm font-medium text-text/60">
          &copy; 2026 NextEstate.
        </p>
      </div>
    </footer>
  );
}
