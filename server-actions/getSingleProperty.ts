import { prisma } from "@/database/db";

export async function getSingleProperty(id: string) {
    try {
        const property = await prisma.property.findUnique({
            where: {
                id: id,
            },
            include: {
                owner:{
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    }
                }
            },
        });

        if (!property) {
            return null;
        }
        return property;
    } catch (error) {
        console.error("Failed to get single property:", error);
        throw error;
    }
}