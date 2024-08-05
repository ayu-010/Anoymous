import { getServerSession } from "next-auth";
// ye session hame backend se hi mil jaata h toh isse hum user nikal lenge


import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";



// currently logged  in user flip kar paaye use message accept karna h ya nahi
export async function POST(request:Request) {
    await dbConnect()
    
    const session=await getServerSession(authOptions)
    console.log("session that we are getting in accept messAges",session)
    // user nikal rhe yeha seeion me se uper
    const user:User=session?.user as User
     console.log("user that we are getting in accept messAges",user)



    if(!session || !session.user)
    {
        return Response.json({
            succeess:false,
            message:"user is not logged in that why we are unale to fin it dueing the session"
        },{
            status:401
        })
    }
    

   const userId= user._id;
   const{acceptMessages}=await request.json()

   try {
     
   const updatedUser=  await UserModel.findByIdAndUpdate(userId,{
        isAcceptingMessages:acceptMessages
     },
    {new:true})

    if(!updatedUser)
    {
        return Response.json({
            succeess:false,
            message:"falild to update user status to accept messages"
        },{
            status:401
        })
    }
   
    else{
        return Response.json({
            succeess:true,
            message:"message acceptcance status updated successfully",
            updatedUser
        },{
            status:200
        })
    }

   } catch (error) {
    console.log("falild to update user status to accept messages")
    return Response.json({
        succeess:false,
        message:"falild to update user status to accept messages"
    },{
        status:500
    })
   }
}





export async function GET(request:Request) {
    await dbConnect()
    
    const session=await getServerSession(authOptions)

    const user:User=session?.user as User
    if(!session || !session?.user)
    {
        return Response.json({
            succeess:false,
            message:"user not authenticated"
        },{
            status:401
        })
    }
    

   const userId= user._id;
try {
    

   const foundUser=await UserModel.findById(userId);
   
   if(!foundUser)
    {
        return Response.json({
            succeess:false,
            message:"user not found"
        },{
            status:404
        })
    }

    
    
            return Response.json({
                succeess:true,
                isAcceptinMessages:foundUser.isAcceptingMessages
              
            },{
                status:200
            })
       
} catch (error) {
    console.log("falild to update user status to accept messages")
    return Response.json({
        succeess:false,
        message:"error in geeting message acceptcnace status"
    },{
        status:500
    })
   }
   
}