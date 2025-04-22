import mongoose from "mongoose";

async function dbConnection () {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then( (result)=> {console.log("db connection successfully" )})
        .catch((err) => {
            console.log("error found -> " + err);
            process.exit(1);
        })
    } catch (error) {
        console.log("error while making dbVonnection -> " + error);
    }
}

export default dbConnection();