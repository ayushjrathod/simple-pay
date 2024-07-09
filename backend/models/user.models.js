import mongoose from "mongoose";
import zod from "zod";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
    minlength: 6,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
},{timestamps: true});

const User = mongoose.model("User", userSchema); 

export default User;


//Zod Schema 
const signupSchema = zod.object({
  username: zod.string().min(3).max(20),
  password: zod.string().min(6),
  fullname: zod.string().min(4),
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});


export { 
  signupSchema,
  signinBody,
  updateBody,
};