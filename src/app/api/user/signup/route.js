import dbConnection from '@config/dbConnection';
import User from '@models/user';
import clientPromise from 'src/lib/mongodb';

export async function POST(req) {
    console.log("signUp");
    await dbConnection();

    try {
        const { userName, email, password } = await req.json();
        const user = new User({ userName, email, password });
        await user.save();

        return new Response(JSON.stringify({ user }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function GET(req) {
    try {
        const client = await clientPromise
    } catch (error) {
        
    }
}

