import { NextResponse } from "next/server";
import { City } from "@/models/cityModels";
import connectDB from "@/config/dbConnect";
export async function POST(req) {
  try {

    await connectDB()
    const body = await req.json();
    const { name, population, country, latitude, longitude } = body;

    if (!name || !population || !country || !latitude || !longitude) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existingCity = await City.findOne({ name });
    if (existingCity) {
      return NextResponse.json(
        { error: "City with this name already exists" },
        { status: 400 }
      );
    }

    const newCity = await City.create({
      name,
      population,
      country,
      latitude,
      longitude,
    });

    return NextResponse.json(
      {
        message: "City added successfully",
        city: newCity,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {

    await connectDB();
    const url = new URL(req.url);
    
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10;
    const filter = url.searchParams.get("filter");
    const sort = url.searchParams.get("sort") || "name:asc";
    const search = url.searchParams.get("search");
    const fields = url.searchParams.get("fields") || "";

    const filterQuery = filter ? JSON.parse(filter) : {};

    if (search) {
      filterQuery.name = { $regex: search, $options: "i" };
    }

    const [sortField, sortOrder] = sort.split(":");
    const sortQuery = { [sortField]: sortOrder === "desc" ? -1 : 1 };

    const projection = fields.split(",").reduce((acc, field) => {
      if (field) acc[field] = 1;
      return acc;
    }, {});

    const skip = (page - 1) * limit;

    const cities = await City.find(filterQuery)
      .select(projection)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    const total = await City.countDocuments(filterQuery);

    return NextResponse.json(
      {
        total,
        page,
        limit,
        cities,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
