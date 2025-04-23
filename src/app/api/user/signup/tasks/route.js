import clientPromise from "./../../../../../lib/mongodb";
import { ObjectId } from "mongodb";
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

    console.log("Id of the searchparam", id)

    // if(!id){
    //   return NextResponse.json(
    //     {error: "Task ID is required"},
    //     {status: 400})
    // };

    // if (!ObjectId.isValid(id)) {
    //   return NextResponse.json(
    //     { error: "Invalid task ID format" },
    //     { status: 400 }
    //   );
    // }

    const client = await clientPromise;
    const db = client.db('tms');
    const collection = db.collection("animationTask")
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    console.log("Result of task", result);
    
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

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid task ID format" },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log("Update body:", body);

    const client = await clientPromise;
    const db = client.db("tms");
    const collection = db.collection("animationTask");

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Task updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}
