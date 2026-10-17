import RecentProperties from "@/components/home/RecentProperties";
import SearchBox from "@/components/home/SearchBox";
import FrontendLayout from "@/components/layouts/FrontendLayout";
import Navbar from "@/components/navbar/Navbar";
import { getTranslations } from "next-intl/server";


export default async function HomePage() {
    const t = await getTranslations("HomePage");

  return (
    <FrontendLayout>
      <Navbar/>
     <section className="flex relative items-center min-h-screen overflow-hidden bg-[url('/hero.jpg')] bg-cover bg-center py-2 pt-32 lg:pt-36">
      {/* overlay */}
      <div className="absolute inset-0 bg-black opacity-50"/>
      {/* gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-slate-950/80 via-slate-900/50 to-transparent"/>
      {/* content */}
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
              {/* badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2  backdrop-blur-xl">
            <div className="h-2 w-2 rounded-full bg-primary"/>
            <span className="text-sm font-medium  tracking-wide text-white">
              {t("badge")}
            </span>
          </div>
          {/* header */}
          <h2 className ="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            {t("title")}
          </h2>
          <p className ="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
           {t("description")}
          </p>
          <SearchBox/>
          </div>
        </div>
      </div>
     </section>
     <RecentProperties/> 
    </FrontendLayout>
  );
}