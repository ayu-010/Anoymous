import mongoose from "mongoose";

type ConnectionObject={
    isConnected?:number
}



const connection:ConnectionObject = {}  
// void mtlb, kuch bhi return kare mtlb nahi h hameee
async function dbConnect():Promise<void>{

    if(connection.isConnected)
    {
        console.log("databse is already connected ");
        return;
    }

    try {
       const db = await mongoose.connect(process.env.MONGODB_URI || '')

      


   
        connection.isConnected=db.connections[0].readyState


        console.log("db connected sucessfully");

    } catch (error) {
        console.log("db conncection failed",error);
        process.exit(1)
    }

}

export default dbConnect;