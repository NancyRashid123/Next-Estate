import FrontendLayout from "@/components/layouts/FrontendLayout";
import Marketplace from "@/components/marketplace/MarketPlace";
import MarketplaceButton from "@/components/marketplace/MarketplaceButton";
import Navbar from "@/components/navbar/Navbar";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

 interface MarketplacePageProps {
    searchParams: Promise<{
      search?: string;
      propertyType?: string;
      location?: string;
      minPrice?: string;
      maxPrice?: string;
    }>;
  }
export default async function MarketplacePage({ searchParams, }: MarketplacePageProps) {
   const resolvedSearchParams = await searchParams;
  const t = await getTranslations("MarketplacePage");
  return (
    <FrontendLayout>
      <Navbar variant="solid" />
      <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-text md:text-3xl">
            {t("title")}
          </h2>
          <MarketplaceButton />
        </div>
        <Suspense fallback={<CardSkeleton />}>
          <Marketplace searchParams={resolvedSearchParams} />
        </Suspense>
      </div>
    </FrontendLayout>
  );
}
