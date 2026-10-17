"use client";
import { Link, usePathname } from "@/i18n/routing";
import Button from "../button/Button";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useTranslations } from "next-intl";
import { useAuthModal } from "@/store/useAuthModaiStore";
import { useCreatePropertyModalStore } from "@/store/useCreatePropertyModelStore";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface NavbarProps {
  variant?: "trasparent" | "solid";
}

export const navLinks = [
  { key: "home", href: "/" },
  { key: "properties", href: "/properties" },
  { key: "marketplace", href: "/marketplace" },
];
export default function Navbar({ variant = "trasparent" }: NavbarProps) {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isTransparent = variant === "trasparent";
  const pathname = usePathname();
  const { openLogin } = useAuthModal();
  const { openPropertyModal } = useCreatePropertyModalStore();
  const { data: session, isPending } = authClient.useSession();

  const handelLogout = () => {
    authClient.signOut();
    router.refresh();
    router.push("/");
  };

  return (
    <section
      className={`top-0 left-0 z-50 w-full ${isTransparent ? "absolute" : "sticky border-b border-black/5 bg-card"}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <nav
          className={`flex h-18 items-center justify-between ${isTransparent ? "mt-6 border border-white/10 rounded-3xl bg-white/5 px-6 backdrop-blur-xl" : "px-0"}`}
        >
          {/* logo */}
          <Link
            dir="ltr"
            href="/"
            className="flex items-center text-2xl font-semibold"
          >
            <span
              className={`${isTransparent ? "text-gray-300" : "text-text"}`}
            >
              Next
            </span>
            <span className="bg-primary px-2 py-1 text-white rounded-tr-2xl rounded-bl-2xl">
              Estate
            </span>
          </Link>
          {/* desktop links */}
          <div className="hidden item-center gap-8 lg:flex">
            {navLinks.map((link) => {
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`text-sm font-medium transition duration-500 hover:text-primary ${
                    pathname === link.href
                      ? "text-primary"
                      : isTransparent
                        ? "text-white/80"
                        : "text-text/70"
                  }`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </div>
          {/* desktop buttons */}
          <div className="hidden item-center gap-4 lg:flex">
            {session ? (
              <Button onClick={handelLogout} variant="outline">
                {t("logout")}
              </Button>
            ) : (
              <Button onClick={openLogin} variant="outline">
                {t("login")}
              </Button>
            )}
            {!isPending && session && (
              <Button onClick={openPropertyModal} variant="outline">
                {t("addProperty")}
              </Button>
            )}
          </div>
          {/* mobile menu buttons */}
          <button
            className={`flex h-11 w-11 items-center justify-center rounded-2xl transition lg:hidden cursor-pointer ${isTransparent ? "border border-white/10 bg-white/5 text-white" : "border border-black/10 bg-background text-text"}`}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? <IoClose size={24} /> : <HiOutlineMenuAlt3 size={24} />}
          </button>
        </nav>
        {/* mobile menu */}
        {isOpen && (
          <div
            className={`mt-4 rounded-3xl p-6 backdrop-blur-2xl lg:hidden ${isTransparent ? "border border-white/10 bg-secondary/95" : " bg-white"}`}
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`text-sm font-medium transition duration-500 hover:text-primary ${isTransparent ? "text-white/80" : "text-text/70"}`}
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3">
              {session ? (
                <Button onClick={handelLogout} variant="outline">
                  {t("logout")}
                </Button>
              ) : (
                <Button onClick={openLogin} variant="outline">
                  {t("login")}
                </Button>
              )}
              {!isPending && session && (
                <Button onClick={openPropertyModal} variant="outline">
                  {t("addProperty")}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
