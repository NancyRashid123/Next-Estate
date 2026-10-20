"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { useCreatePropertyModalStore } from "@/store/useCreatePropertyModelStore";
import Modal from "./Modal";
import Button from "../button/Button";
import { propertyTypes } from "@/constants/propertyTypes";
import PropertyTypeCard from "../properties/PropertyTypeCard";
import Input from "../input/Input";
import Counter from "../properties/Counter";
import ImageUpload from "../properties/ImageUpload";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "@/i18n/routing";

enum STEPS {
  TYPE = 0,
  LOCATION = 1,
  DETAILS = 2,
  FUTURES = 3,
  IMAGE = 4,
  PRICING = 5,
}

export default function CreatPropertyModal() {
  const { isOpen, closePropertyModal } = useCreatePropertyModalStore();
  const t = useTranslations("CreatePropertyModal");
  const tTypes = useTranslations("PropertyTypes");
  const locale = useLocale();
  const router = useRouter();

  const formatNumber = (number: number) =>
    new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US").format(number);

  const [step, setStep] = useState(STEPS.TYPE);
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState("");
  const [Location, setLocation] = useState("");
  const [Address, setAddress] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [parkingSpaces, setParkingSpaces] = useState(0);
  const [area, setArea] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [listingType, setListingType] = useState<"sale" | "rent">("sale");
  const [price, setPrice] = useState("");

  const stepTitle = () => {
    switch (step) {
      case STEPS.TYPE:
        return t("type");
      case STEPS.LOCATION:
        return t("location");
      case STEPS.DETAILS:
        return t("details");
      case STEPS.FUTURES:
        return t("features");
      case STEPS.IMAGE:
        return t("image");
      case STEPS.PRICING:
        return t("pricing");
      default:
        return "";
    }
  };

  const creaeListing = async () => {
   if (!image) {
    toast.error("Please upload an image");
    return;
   }
   setLoading(true);
   try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("address", Address);
    formData.append("bedrooms", bedrooms.toString());
    formData.append("bathrooms", bathrooms.toString());
    formData.append("parkingSpaces", parkingSpaces.toString());
    formData.append("area", area.toString());
    formData.append("propertyType", propertyType);
    formData.append("listingType", listingType);
    formData.append("price", price.toString());
    formData.append("image", image);
    formData.append("location", Location);

    await axios.post("/api/properties", formData , {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Property created successfully!"); 
    router.replace("/properties");
    handleClose();
   } catch (error) {
    if(axios.isAxiosError(error)) {
      toast.error(error.response?.data?.error || "Something went wrong");
    }
   }
   finally {
    setLoading(false);
   }
  };

  const handelChangeImage = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleClose = () => {
    setStep(STEPS.TYPE);
    setPropertyType("");
    setLocation("");
    setAddress("");
    setBedrooms(1);
    setBathrooms(1);
    setParkingSpaces(0);
    setArea("");
    setTitle("");
    setDescription("");
    setImage(null);
    setPreview(null);
    setListingType("sale");
    setPrice("");
    closePropertyModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closePropertyModal} title={t("title")}>
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

        {/* Step 3: Details */}
        {step === STEPS.DETAILS && (
          <div className="space-y-4">
            <Counter
              title={t("bedrooms")}
              subtitle={t("bedroomsSubtitle")}
              value={bedrooms}
              onChange={setBedrooms}
            />

            <Counter
              title={t("bathrooms")}
              subtitle={t("bathroomsSubtitle")}
              value={bathrooms}
              onChange={setBathrooms}
            />

            <Counter
              title={t("parking")}
              subtitle={t("parkingSubtitle")}
              value={parkingSpaces}
              onChange={setParkingSpaces}
              min={0}
            />

            <Input
              name="area"
              id="area"
              label={t("area")}
              type="number"
              value={area}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setArea(e.target.value)
              }
            />
          </div>
        )}

        {/* Step 4: Title & Description */}
        {step === STEPS.FUTURES && (
          <div className="space-y-6">
            
            <Input
              name="title"
              id="title"
              label={t("titleLabel")}
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />

            <div>
              <label
                htmlFor="property-description"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                {t("descriptionLabel")}
              </label>

              <textarea
                id="property-description"
                name="description"
                rows={4}
                className="w-full resize-none rounded-xl border border-gray-300 p-3 text-sm focus:border-black focus:outline-none"
                placeholder={t("descriptionPlaceholder")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 5: Image */}
        {step === STEPS.IMAGE && (
          <ImageUpload preview={preview} onChange={handelChangeImage} />
        )}

        {/* Step 6: Pricing */}
        {step === STEPS.PRICING && (
          <div className="space-y-4">
            <select
              value={listingType}
              className="h-13 w-full rounded-xl border border-gray-300 px-4 text-sm focus:border-black focus:outline-none"
              onChange={(e) =>
                setListingType(e.target.value as "sale" | "rent")
              }
            >
              <option value="sale">{t("sale")}</option>
              <option value="rent">{t("rent")}</option>
            </select>

            <Input
              name="price"
              id="price"
              type="number"
              label={listingType === "sale" ? t("salePrice") : t("rentPrice")}
              value={price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrice(e.target.value)
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
            step < STEPS.PRICING ? setStep((prev) => prev + 1) : creaeListing()
          }
          loading={loading}
        >
          {step === STEPS.PRICING ? t("create") : t("next")}
        </Button>
      </div>
    </Modal>
  );
}
