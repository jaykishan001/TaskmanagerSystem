import clientPromise from "./../../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Received task data:", body);
    const client = await clientPromise;
    const db = client.db("tms");
    const collection = db.collection("designation");
    const result = await collection.insertOne(body);
    return NextResponse.json({
      message: "Task saved to MongoDB",
      task: { ...body, _id: result.insertedId },
    });
  } catch (error) {
    console.error("Error saving task:", error);
    return NextResponse.json(
      { error: "Failed to save task" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("tms");
    const collection = db.collection("designation");
    const data = await collection.find({}).toArray();
    return NextResponse.json({
      message: "Data of designation",
      data
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Designatio ID is required" },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "invalid Designation ID format" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("tms");
    const collection = db.collection("designation");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Designation not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Designation deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting designation:", error);
    return NextResponse.json(
      { error: "Failed to delete designation" },
      { status: 500 }
    );
  }
}









