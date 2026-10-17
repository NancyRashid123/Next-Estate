export interface PropertyType {
  id: string;
  title: string;
  description: string;
  propertyType: string;
  listingType: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  area: number | null;
  location: string;
  address: string;
  image: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}
