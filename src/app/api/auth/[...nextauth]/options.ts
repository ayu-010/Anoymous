import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";


import GitHubProvider from "next-auth/providers/github";
import UserModel from "@/model/User";

export const authOptions:NextAuthOptions={
 
    providers:[
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "abc@gmail.com" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials:any):Promise<any> {
                await dbConnect()
                try {
              const user=await UserModel.findOne({
                        $or:[
                            {email:credentials.identifier},

                             {username:credentials.identifier}
                        ]
                    })


                    if(!user)
                    {
                        throw new Error("no user find with this email ")
                    }

                    if(!user.isVerified)
                    {
                        throw new Error("please verify your accounbt first")
                    }

                    const isPasswordCorrect=await bcrypt.compare(credentials.password, user.password)

                    if(isPasswordCorrect)
                    {
                        return user;
                    }
                    else{
                        throw new Error("incoorect password")
                    }
                } catch (err:any) {
                    throw new Error(err.message|| "Invalid credentials")
                }  
              },
        }), 
    
    ],
    

    callbacks: {
        async jwt({ token, user }) {

  
// ye whai user h jo hmune return kiya h uper aur ye user jwt ke ander h  


            if (user) {
                console.log("ye wo user h jo hmune return kiya h nextauth ke function ke ander",user)
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages; // Corrected property name
                token.username = user.username;
            }
            return token
        },


        // database se baar baar query na karna pade isliye usr ko token aur session me daal rhe h

        async session({ session, token }) {
            if (token) {
                console.log("token inside the sessison callback is ",token)
                console.log("session inside the sessison callback is ",session)
                
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.username = token.username;
                console.log("session inside the sessison callback is ",session)
            }
            return session;
        },
    },
    
    

    pages:{
        signIn:"/sign-in",
         
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET
}