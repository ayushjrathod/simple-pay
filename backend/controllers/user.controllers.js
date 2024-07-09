import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import Account from "../models/account.models.js";
import { signupSchema,updateBody,signinBody } from "../models/user.models.js";


const registerUser = async (req, res) => {
    const { username, password, fullname } = req.body;
    const {success} = signupSchema.safeParse(req.body);


    if(!success){
        return res.status(400).json({
            message: "Invalid Input, Zod Schema failed",
        });
    }
    
    const tempUser = User.findOne({username});

    if(tempUser._id){
        return res.status(400).json({
            message: "User already exists",
        });
    }

    const user = await User.create({
        username,
        password,
        fullname,
    });

    const userId = user._id;

    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    const token = jwt.sign({userId:userId.toString()},process.env.JWT_SECRET);
    
    res.status(201).json({
        message: "User Created",
        token,
    });
};

const loginUser = async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
}

const bulkFetchUsers = async (req, res) => {
    //while a users search for another users by a part of their name
    const filter = req.query.filter || {};

    const users = await User.find({
        $or:[
        {
            fullname:{"$regex" : filter}
        }]
    }).exec();

    console.log(users);
    res.status(200).json({
        user: users.map(user => ({
                username: user.username,
                fullname: user.fullname,
                _id: user._id,
            }))
        });
    };

const updateUserDetails = async (req, res) => {
    const {sucess} = updateBody.safeParse(req.body);

    if(!sucess){
        return res.status(411).json({
            message: "Error while updating user details",
        });
    }

    await User.updateOne(req.body,{
        id:req.userId,
    });

    res.status(200).json({
        message: "User details updated",
    });
}



export {
    registerUser,
    loginUser,
    bulkFetchUsers,
    updateUserDetails,
}