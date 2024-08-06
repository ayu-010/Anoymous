import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();

    console.log(username, code);

    const user = await UserModel.findOne({ username });

    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        {
          status: 404, // Not found status code
        }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return new Response(
        JSON.stringify({
          success: true,
          message: "Account verified successfully",
        }),
        {
          status: 200,
        }
      );
    } else if (!isCodeNotExpired) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Verification code has expired. Please sign up again to get a new code.",
        }),
        {
          status: 400, // Bad request status code
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid verification code. Please check it and try again.",
        }),
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error("Error verifying user", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred while verifying the user",
      }),
      {
        status: 500, // Internal server error status code
      }
    );
  }
}
