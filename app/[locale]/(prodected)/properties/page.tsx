
import EmptyState from "@/components/emptyState/EmptyState";
import FrontendLayout from "@/components/layouts/FrontendLayout";
import Navbar from "@/components/navbar/Navbar";
import PropertyCard from "@/components/properties/PropertyCard";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import { getUserProperty } from "@/server-actions/getUserProperty";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";


export default async function PropertiesPage() {
  const t = await getTranslations("PropertiesPage");
  return (
    <FrontendLayout>
      <Navbar variant="solid" />
      <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-text md:text-3xl">{t("title")}</h2>
        </div>
        <Suspense fallback={<CardSkeleton/>}>
        <PropertiesContant/>
        </Suspense>
      </div>
    </FrontendLayout>
  );
}

async function PropertiesContant() {
  const property = await getUserProperty();
  if(property.length === 0) return<EmptyState title={"No Properties Found"} subtitle={"You currently have no properties available. Check back later after adding a new property."}/>
  return (
     <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-6">
          {property.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
  );
}