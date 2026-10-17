import { Link } from "@/i18n/routing";
import { PropertyType } from "@/types/property";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

interface PropertyCardProps {
  property: PropertyType;
}

export default async function PropertyCard({ property }: PropertyCardProps) {
  const t = await getTranslations("PropertyCard");
  //  const propertyT = await getTranslations(`Properties.${property.id}`);
  return (
    <>
      <Link
        href={`/property/${property.id}`}
        className="group relative h-125 overflow-hidden rounded-4xl"
      >
        <div className="w-full h-full relative">
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="inset-0 object-cover transition duration-500 group-hover:scale-110"
          />
          {/* dark overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
          {/* top badge */}
          <div className="absolute top-5 left-5 z-20 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold uppercase  text-primary">
            {property.listingType === "rent" ? t("forRent") : t("forSale")}
          </div>
          {/* content card */}
          <div className="absolute bottom-5 left-5 right-5 z-20 p-5 rounded-[28px] border border-white/10 bg-white/10 backdrop-blur-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                {property.listingType === "rent" ? (
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    ${property.price.toLocaleString()}
                    <span className="text-sm text-white/60">{t("month")}</span>
                  </h3>
                ) : (
                  <h3 className="text-2xl font-bold text-white">
                    ${property.price.toLocaleString()}
                  </h3>
                )}
                <p className="mt-1text-sm text-white/60">{property.location}</p>
              </div>
              <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
                {property.propertyType}
              </div>
            </div>
            <h2 className="mt-5 text-2xl font-bold text-white">
              {property.title}
            </h2>
            {/* features */}
            <div className="mt-5 flex flex-wrap gap-3 borter-t border-white/10 pt-5">
              <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                {property.bedrooms} {t("beds")}
              </div>
              <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                {property.bathrooms} {t("bathrooms")}
              </div>
              <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                {property.area} {t("sqft")}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
