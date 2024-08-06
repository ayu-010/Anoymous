import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";  // Make sure this path is correct
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();
  
  const session = await getServerSession(authOptions);
  const user = session?.user as User;
  
  console.log("Session inside GET message handler:", session);
  
  if (!session || !session.user) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "User not authenticated",
      }),
      {
        status: 401,
      }
    );
  }

  try {
    console.log(user)
    const users = await UserModel.findById(user._id)
    console.log("HELLO", users)

    if (!users) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found during pipeline aggregation",
        }),
        {
          status: 404,
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        messages: users.messages.reverse()
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        success: false,
      }),
      {
        status: 500,
      }
    );
  }
}
