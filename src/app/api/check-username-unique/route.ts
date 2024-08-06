import dbConnect from "@/lib/dbConnect";
import {z} from "zod"
import { usernameValidation } from "@/schemas/signUpSchemas";
import UserModel from "@/model/User";




const UsernameQuerySchema=z.object({
    username:usernameValidation
})


export async function GET(request:Request) {

   
  
     

    await dbConnect()





    try {

        //query extract
        // below line give me url
        const{searchParams}=new URL(request.url)

        console.log("url extraxted to get username from it is it is given in useeffect form of sign up ",searchParams);
        console.log("*****************************************************");
        
        
        const queryParam={
            username:searchParams.get('username')
        }
        // validsate with zod safeParse is a method which check it
        const result =  UsernameQuerySchema.safeParse(queryParam)
        console.log("result tha we are getting after parsing username means we are checking username uniqueness using zod validation if we are recievin this it means the name is unique",result);
        console.log("*****************************************************");
        if(!result.success)
        {

            // result.error ke ander pure error aa jayenge
            const usernameErrors=result.error.format().username?._errors||[]

            return Response.json({
                success:false,
                message:usernameErrors?.length>0 ?usernameErrors.join(','):"invalid query parametr",
            },{
                status:400
            })
        }

     
          
         const {username}=result.data


       const  existingVerifiedUser=await  UserModel.findOne({username,isVerified:true})


       if(existingVerifiedUser)
       {
        return Response.json({
            success:false,
            message:"username is already taken "
        },{
            status:400
        })
       }

       return Response.json({
        success:true,
        message:"Username is unique "
    },{
        status:200
    })

 
        // to do remove
    } catch (error) {
        console.error("error checking username",error);
        return Response.json({
            succeess:false,
            message:"error checking username"
        },{
            status:500
        })
    }
}