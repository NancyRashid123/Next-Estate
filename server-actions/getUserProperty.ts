import { prisma } from "@/database/db";
import { getCurrentUser } from "./getCurrentUser";

export async function getUserProperty() {
  try {
    const user = await getCurrentUser();
    if (!user) return [];
    const properties = await prisma.property.findMany({
      where: {
        ownerId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return properties;
  } catch (error) {
    console.error("Failed to get user properties:", error);
    throw error;
  }
}
