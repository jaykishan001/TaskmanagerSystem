import mongoose from "mongoose";

const userSchema = mongoose.Schema({    
    userName: String,
    email: String,
    password: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
