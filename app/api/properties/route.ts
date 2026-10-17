import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/database/db";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import {
  CloudinaryUploadResult,
  uploadToCloudinary,
} from "@/services/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const location = formData.get("location") as string;
    const address = formData.get("address") as string;
    const area = formData.get("area") as string;
    const propertyType = formData.get("propertyType") as string;
    const listingType = formData.get("listingType") as string;
    const bedrooms = formData.get("bedrooms") as string;
    const bathrooms = formData.get("bathrooms") as string;
    const parkingSpaces = formData.get("parkingSpaces") as string;
    const image = formData.get("image") as File;

    if (
      !title ||
      !description ||
      !price ||
      !location ||
      !address ||
      !propertyType ||
      !listingType ||
      !bedrooms ||
      !bathrooms ||
      !parkingSpaces ||
      !image ||
      !location
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const imageData: CloudinaryUploadResult = await uploadToCloudinary(image);

    const property = await prisma.property.create({
      data: {
        title,
        description,
        price: Number(price),
        location,
        address,
        area: area ? Number(area) : null,
        propertyType,
        listingType,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        parkingSpaces: Number(parkingSpaces),
        image: imageData.secureURL,
        ownerId: user.id,
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error("POST /api/properties error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const search = searchParams.get("search") as string;
    const propertyType = searchParams.get("propertyType");
    const location = searchParams.get("location");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const where: Prisma.PropertyWhereInput = {};

    if (propertyType) where.propertyType = propertyType;
    if (location) where.location = location;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
      ];
    }
    if (minPrice || maxPrice) {
      where.price = {};

      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

   const properties = await prisma.property.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    console.error("GET /api/properties error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
