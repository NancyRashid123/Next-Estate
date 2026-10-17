import { getProperties } from "@/server-actions/getProperties";
import EmptyState from "../emptyState/EmptyState";
import PropertyCard from "../properties/PropertyCard";
import { PropertyType } from "@/types/property";

interface MarketplaceProps {
  searchParams: {
    search?: string;
    propertyType?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export default async function Marketplace({ searchParams }: MarketplaceProps ) {
  const properties : PropertyType[] = await getProperties({
    search: searchParams.search,
    propertyType: searchParams.propertyType,
    location: searchParams.location,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
  });

  if (!properties || properties.length === 0) { return (
    <EmptyState
        title="No matching properties found"
        subtitle="Try adjusting your search criteria or clearing some filters to see more results."
        filter
      />
  ); }

  return ( <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 my-6"> 
       {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
  </div> );
}
