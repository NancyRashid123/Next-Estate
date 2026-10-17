import { getTranslations } from "next-intl/server";
import PropertyCard from "../properties/PropertyCard";
import { getRecentlyProperty } from "@/server-actions/getRecentlyProperty";
import CardSkeleton from "../skeleton/CardSkeleton";
import { Suspense } from "react";


export default async function RecentProperties() {
    const t = await getTranslations("RecentProperties");
  return (
    <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
            {/* header */}
            <div className="max-w-2xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">{t("badge")}</p>
                <h2 className=" text-3xl font-bold text-text md:text-4xl">{t("title")}</h2>
                <p className="mt-5 text-md leading-relaxed text-text/60">{t("description")}</p>
            </div>
            {/* properties grid */}
            <Suspense fallback={<CardSkeleton/>}>
            <RecentPropertyContent/>
            </Suspense>
        </div>
    </section>
  )
}

async function RecentPropertyContent() {
  const property = await getRecentlyProperty();
  return (
     <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-6">
          {property.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
  );
}