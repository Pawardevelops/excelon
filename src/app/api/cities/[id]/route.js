import { NextResponse } from "next/server";
import { City } from "@/models/cityModels";
import connectDB from "@/config/dbConnect";


export async function PUT(req, { params }) {
  try {

    await connectDB();
    const { id } = params;
    const body = await req.json();
    const { name, population, country, latitude, longitude } = body;

    if (!id || !name || !population || !country || !latitude || !longitude) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const updatedCity = await City.findByIdAndUpdate(
      id,
      { name, population, country, latitude, longitude },
      { new: true, runValidators: true }
    );

    if (!updatedCity) {
      return NextResponse.json(
        { error: "City not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "City updated successfully",
        city: updatedCity,
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

export async function DELETE(req, { params }) {
  try {

    await connectDB()
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "City ID is required" },
        { status: 400 }
      );
    }

    const existingCity = await City.findById(id);
    if (!existingCity) {
      return NextResponse.json(
        { error: "City not found" },
        { status: 404 }
      );
    }

    await City.findByIdAndDelete(id);

    return NextResponse.json(
      {
        message: "City deleted successfully",
        deletedCity: {
          id: existingCity._id,
          name: existingCity.name,
          population: existingCity.population,
          country: existingCity.country,
          latitude: existingCity.latitude,
          longitude: existingCity.longitude,
        },
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
