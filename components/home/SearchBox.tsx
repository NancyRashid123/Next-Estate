"use client";
import Button from "../button/Button";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default  function SearchBox() {
  const t =  useTranslations("SearchBox");
  const router = useRouter();
   const [searchQuery, setSearchQuery] = useState("");

   const handleSearch = () => {
    if (!searchQuery.trim()) return;
       router.push(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
      
    };

  return (
    <div className="mt-10 rounded-[30px] border border-white/10 p-4 shadow-2xl backdrop-blur-2xl">
        <div className="flex flex-col gap-4 lg:flex-row items-center">
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder={t("placeholder")} className="px-5 py-4 h-14 w-full flex-1 rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/50 outline-none transition focus:border-primary/40"/>
            <Button onClick={handleSearch}>{t("button")}</Button>
        </div>
    </div>
  )
}
