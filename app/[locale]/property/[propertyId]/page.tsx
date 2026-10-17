import FrontendLayout from "@/components/layouts/FrontendLayout";
import Navbar from "@/components/navbar/Navbar";
import EmailForm from "@/components/properties/EmailForm";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import PropertyPageSkeleton from "@/components/skeleton/PropertyPageSkeleton";
import { getSingleProperty } from "@/server-actions/getSingleProperty";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Suspense } from "react";
import { FaMapMarkerAlt, FaRulerCombined } from "react-icons/fa";
import { LuBath, LuBedDouble } from "react-icons/lu";

interface Props {
    params:Promise<{propertyId:string}>
}

export function formatPrice(price: number | string) {
  return Number(price).toLocaleString();
}

export default async function SingleProperty({params}: Props) {
    const {propertyId} = await params
  return (
    <FrontendLayout>
        <Navbar variant="solid" />
     <Suspense fallback={<PropertyPageSkeleton/>}>
     <SinglePropertyContent propertyId={propertyId} />
     </Suspense> 
    </FrontendLayout>
  )
}


async function SinglePropertyContent({propertyId}: {propertyId:string}){
  const property = await getSingleProperty(propertyId);
  const t = await getTranslations("SingleProperty");
 return(
    
    <section className="py-15">
             <div className="max-w-7xl mx-auto px-6 lg:px-12">
                 <div className=" flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                     {/* left */}
                     <div>
                        
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">{property?.listingType === "rent" ? t("forRent") : t("forSale")}</p>
                        <h2 className="mt-3 text-4xl font-bold text-text md:text-5xl">
                            {property?.title}
                        </h2>
                         
                        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 my-6">
                            <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1">
                                <FaMapMarkerAlt size={16} className="text-neutral-400" />
                                <span className="text-neutral-800 font-medium">{property?.location}</span>
                            </div>
                       
                        
                            <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                                <FaRulerCombined size={16} className="text-neutral-400" />
                                <span className="text-neutral-800 font-medium">{property?.area} sqft</span>
                            </div>
                        
                        
                            <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                                <LuBedDouble size={16} className="text-neutral-400" />
                                <span className="text-neutral-800 font-medium">{property?.bedrooms} rooms</span>
                            </div>
                     
                        
                            <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                                <LuBath size={16} className="text-neutral-400" />
                                <span className="text-neutral-800 font-medium">{property?.bathrooms} baths</span>
                            </div>
                      
                        </div>
                    
                     </div>
                      {/* right */}
                     <div className="rounded-[28px] border border-black/5 bg-card p-6 shadow-sm">
                       <p className="text-sm font-semibold text-text/60">Property Price</p>
                       <h2 className="mt-2 text-4xl font-bold text-primary">${formatPrice(property?.price || "")}</h2>
                     </div>
                 
                </div>
                 <div className="w-full h-60 md:h-100 lg:h-120 relative my-6">
                    <Image src={property?.image || ""} alt={property?.title || ""} fill className="rounded-2xl object-cover" />
                  </div>
                  <div className =" mt-6 grid gap-10 lg:grid-cols-3">
                     {/* left */}
                     <div className="lg:col-span-2">
                         <div className="rounded-4xl border border-black/5 bg-card p-8 shadow-sm">
                             <h2 className="text-2xl font-bold text-text md:text-3xl">{t("aboutTitle")}</h2>
                             <p className="mt-6 text-text/70 leading-relaxed">{property?.description}</p>
                         </div>
                     </div>
                     {/* right */}
                     {property?.owner && (
                         <EmailForm name={property?.owner?.name || ""} email={property?.owner?.email || ""} propertyTitle={property?.title || ""} image={property?.owner?.image || "/avatar.png"} propertyPrice={property?.price} />
                     )}
                  </div>
             </div>
        </section>
 );
}