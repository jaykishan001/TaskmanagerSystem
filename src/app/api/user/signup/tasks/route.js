import clientPromise from "./../../../../../lib/mongodb";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Received task data:", body);
    const client = await clientPromise;
    const db = client.db("tms");
    const collection = db.collection("animationTask");
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

export async function GET(request){
  try {
    const client = await clientPromise;
    const db = client.db("tms");
    const collection = db.collection("animationTask");
    const result = await collection.find({}).toArray();
    return NextResponse.json({
      message: "All animationTask recived successfully",
      result
    })
  } catch (error) {
    console.error("Error saving task:", error);
    return NextResponse.json(
      { error: "Failed to retrive task" },
      { status: 500 }
    );
  }
}


export async function DELETE(request){
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if(!id){
      return NextResponse.json(
        {error: "User ID is required"},
        {status: 400})
    };

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('tms');
    const collection = db.collection("animationTask")
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "task not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "task deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}