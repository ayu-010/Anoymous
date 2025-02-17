import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";



export async function POST(request:Request)
{
    await dbConnect()
    
    const{username,content}=await request.json()
    console.log("HELLO", "JELLO", username, content)
    try {
        
        const user=await UserModel.findOne({username})
        if(!user)
        {
            return Response.json({
                success:false,
                message:"user not found "
            },{
                status:404
            })
        }
   

        // is accepting messages
        if(!user.isAcceptingMessages)
        {
            
            return Response.json({
                success:false,
                message:"user not accepting message "
            },{
                status:403
            })
        }
   

         const newMessage={
            content,
            createdAt:new Date()
         }
         console.log(user)

         user.messages.push(newMessage)
         await user.save()
         return Response.json({
            success:true,
            message:"mesaage sent sucessfully"
        },{
            status:201
        })
      
    } catch (error) {
        console.log("error adding messages",error)
        return Response.json({
            success:false,
            message:"internal server error"
        },{
            status:500
        })
    }


}