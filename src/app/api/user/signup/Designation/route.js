import clientPromise from "./../../../../../lib/mongodb";

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










