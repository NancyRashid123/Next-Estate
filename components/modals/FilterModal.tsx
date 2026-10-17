"use client";

import { Suspense, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { useFilterModalStore } from "@/store/useFilterModalStore";
import Modal from "./Modal";
import { propertyTypes } from "@/constants/propertyTypes";
import PropertyTypeCard from "../properties/PropertyTypeCard";
import Input from "../input/Input";
import Button from "../button/Button";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

enum STEPS {
  TYPE = 0,
  LOCATION = 1,
  PRICE = 2,
}

 function FilterModalContent() {
  const { closeFilterModal, isOpen } = useFilterModalStore();
  const t = useTranslations("FilterModal");
  const tTypes = useTranslations("PropertyTypes");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const formatNumber = (number: number) =>
    new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US").format(number);

  const [step, setStep] = useState(STEPS.TYPE);
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState(searchParams.get("propertyType") || "");
  const [Location, setLocation] = useState(searchParams.get("location") || "");
  const [Address, setAddress] = useState(searchParams.get("address") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const stepTitle = () => {
    switch (step) {
      case STEPS.TYPE:
        return t("type");
      case STEPS.LOCATION:
        return t("location");
      case STEPS.PRICE:
        return t("price");
      default:
        return "";
    }
  };

  const applyFilters = async () => {
     const params = new URLSearchParams();
      if(propertyType) params.set("propertyType", propertyType);
      if(Location) params.set("location", Location);
      if(Address) params.set("address", Address);
      if(minPrice) params.set("minPrice", minPrice);
      if(maxPrice) params.set("maxPrice", maxPrice);
      await router.push(`/marketplace?${params.toString()}`);
      setStep(STEPS.TYPE);
      closeFilterModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeFilterModal} title={t("title")}>
      <div className="mb-6 flex items-center justify-between text-xs text-gray-500">
        <span>
          {t("step", {
            current: formatNumber(step + 1),
            total: formatNumber(6),
          })}
        </span>
        <span className="font-medium text-gray-700">{stepTitle()}</span>
      </div>

      <div className="min-h-55 rounded-xl border border-dashed border-gray-300 p-6">
        {/* Step 1: Property Type */}
        {step === STEPS.TYPE && (
          <div className="grid max-h-75 w-full grid-cols-2 gap-4 overflow-y-scroll no-scrollbar">
            {propertyTypes.map((type) => (
              <PropertyTypeCard
                key={type.slug}
                label={tTypes(type.key)}
                icon={type.icon}
                selected={type.slug === propertyType}
                onClick={() => setPropertyType(type.slug)}
              />
            ))}
          </div>
        )}

        {/* Step 2: Location & Address */}
        {step === STEPS.LOCATION && (
          <div className="w-full space-y-6">
            <Input
              name="location"
              id="location"
              label={t("locationLabel")}
              value={Location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLocation(e.target.value)
              }
            />

            <Input
              name="address"
              id="address"
              label={t("addressLabel")}
              value={Address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress(e.target.value)
              }
            />
          </div>
        )}

        {/* Step 3: Price */}
        {step === STEPS.PRICE && (
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="min-price"
              id="filter-minprice"
              label={t("minPrice")}
              type="number"
              value={minPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMinPrice(e.target.value)
              }
            />

            <Input
              name="max-price"
              id="filter-maxprice"
              label={t("maxPrice")}
              type="number"
              value={maxPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMaxPrice(e.target.value)
              }
            />
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        {step > STEPS.TYPE && (
          <Button
            variant="outline"
            fullWidth
            onClick={() => setStep((prev) => prev - 1)}
          >
            {t("back")}
          </Button>
        )}

        <Button
          fullWidth
          onClick={() =>
            step < STEPS.PRICE ? setStep((prev) => prev + 1) : applyFilters()
          }
          loading={loading}
        >
          {step === STEPS.PRICE ? t("apply") : t("next")}
        </Button>
      </div>
    </Modal>
  );
}

export default function FilterModal() { 
  return ( 
  <Suspense fallback={null}>
  <FilterModalContent />
  </Suspense>
 ); }
