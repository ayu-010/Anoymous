import dbConnect from "@/lib/dbConnect";

import UserModel from "@/model/User";






export async function POST(request:Request) {

   
  
     

    await dbConnect()
    try {
        const{username,code}=await request.json()
        
        // url se koi cheex aa rhi h usko space se hta dega all these
    const decodedUsername=decodeURIComponent(username)


     const user=   await UserModel.findOne({username:decodedUsername})

     if(!user)
     {
        return Response.json({
            succeess:false,
            message:"user not found "
        },{
            status:500
        })
     }


     const isCodeValid= user.verifyCode===code
     
     const isCodeNotExpired=new Date(user.verifyCodeExpiry) >new Date()


     if(isCodeValid  && isCodeNotExpired)
     {
        user.isVerified=true
        await user.save()
        return Response.json({
            succeess:"account verified sucessfully " 
        },{
            status:200
        })

     }

     else if(!isCodeNotExpired)
     {
        return Response.json({
            succeess:false,
            message:"verfifcation vode has expired sign up again to get a code "
        },{
            status:400
        })
     }

     else{
        return Response.json({
            succeess:false,
            message:"code is invalid check it again"
        },{
            status:400
        })
     }
    } catch (error) {
        console.error("error verifying user",error);
        return Response.json({
            succeess:false,
            message:"error veryfying user"
        },{
            status:500
        })
    }
   

}