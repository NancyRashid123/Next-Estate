import { prisma } from "@/database/db"


export async function getRecentlyProperty() {
   try {
      const properties = await prisma.property.findMany({
          take: 6,
          orderBy: {
              createdAt: "desc"
          }
      })
      return properties
      
     } catch (error) {
    console.error("Failed to get user properties:", error);
    throw error;
  }
}
