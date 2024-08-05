import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";





export async function GET(request:Request) {
    await dbConnect()
    
    const session=await getServerSession(authOptions)

    const user:User=session?.user as User
     
     console.log("seeion dekh lo get message ke ander",session);
    //  console.log("session dekh lo user ke sath",session.user);




    if(!session || !session.user)
    {
        return Response.json({
            success:false,
            message:"user not authenticated"
        },{
            status:401
        })
    }
    
// aggreation pipeline 
// agar user._id string me hoga wo bhi mongoose ki object id mein convert ho jyega agar hum neeche wali line ka use karenge toh
   const userId= new mongoose.Types.ObjectId(user._id);
   console.log("USER ID wehn we are setting our agrreation pipeline",userId)
// pipeline isliye taaki  jab hum get message kare toh pure mssg na aa jaaye ho sakta hdb mein 10000 msh ho
   try {
    const user = await UserModel.aggregate([
        { $match: { _id: userId } },
        { $unwind: '$messages' },
        { $sort: { 'messages.createdAt': -1 } },
        { $group: { _id: '$_id', messages: { $push: '$messages' } } },
      ]).exec();
  
   console.log("user after pipeline aggreation is  ",user);




    if(!user || user.length === 0)
    {
        return Response.json({
            success:false,
            message:"user not found during pipeline aggreation"
        },{
            status:404
        })
    }
    return Response.json({
        success:true,
        messages:user[0].messages
    },{
        status:200
    })
   } catch (error) {
    console.error('An unexpected error occurred:', error);
    return Response.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }



}