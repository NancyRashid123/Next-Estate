
import axios from "axios";
export interface GetPropertiesParams {
  search?: string;
  propertyType?: string;
  location?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
}
export async function getProperties( params?: GetPropertiesParams) {
    try { 
        const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; 
        const response = await axios.get(`${baseURL}/api/properties`, { params });
        return response.data;
      } catch (error) {
        console.error("getProperties error:", error); 
        throw new Error("Failed to fetch properties");
      }
}