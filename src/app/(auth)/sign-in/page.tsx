// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import Link from "next/link";

// import { useToast } from "@/components/ui/use-toast";
// import { useRouter } from "next/navigation";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// import { signInSchema } from "@/schemas/signInSchemas";
// import { signIn } from "next-auth/react";


// const Page = () => {
 


  
//   const { toast } = useToast();
//   const router = useRouter();

//   // zodd implementation

//   const form = useForm<z.infer<typeof signInSchema>>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
      
//       identifier: "",
//       password: "",
//     },
//   });

 
     


//   const onSubmit=async (data:z.infer< typeof signInSchema>) =>{
//     console.log("data inside the login page ",data);
//   const result=   await signIn('credentials',{
//       redirect:false,
//       identifier:data.identifier,
//       password:data.password
//      }

//      )

//      console.log("result in sign in page is coming from neaxt auth",result);


//    if(result?.error)
// {
//   toast({
//     title:"login failed",
//     description:"Incorrect username or password",
//     variant:"destructive"
//   })
// }




//     if(result?.url)
//     {
//        router.replace('/dashboard')
//     } 
//   }


//   return <div className=" flex justify-center items-center min-h-screen bg-gray-100">
//     <div className=" w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
// <div className=" text-center">
// <h1 className=" text-4xl font-extrabold tracking-tight  lg:text-5xl mb-6  ">
// JOIN MY MSTERY MESSAGE
// </h1>
// <p className=" mb-4 "> Sign in to start your anonymous adventure</p>
// </div>

//     <Form {...form}>


//       <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        
    

// <FormField
//   name="identifier"
//   control={form.control}
//   render={({ field }) => (
//     <FormItem>
//       <FormLabel>Email OR Username</FormLabel>
//       <FormControl>
//         <Input placeholder="Email or Username" {...field} 
        
//         />
//       </FormControl>
     
//       <FormMessage />
//     </FormItem>
//   )}
// />

// <FormField
//   name="password"
//   control={form.control}
//   render={({ field }) => (
//     <FormItem>
//       <FormLabel>Password</FormLabel>
//       <FormControl>
//         <Input type="password" placeholder="Enter your password" {...field} 
       
//         />
//       </FormControl>
      
//       <FormMessage />
//     </FormItem>
//   )}
// />

// <Button type="submit" >Sign in
// </Button>
//         </form>   


//     </Form>
// <div  className=" text-center mt-4">
// <p>
// New member?
  
//   <Link href="/sign-up" className=" text-blue-600 hover:text-blue-800 ">SIGN UP</Link>
// </p>
// </div>
//     </div>
//   </div>;
// };

// export default Page;


"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { signInSchema } from "@/schemas/signInSchemas";
import { signIn } from "next-auth/react";

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    console.log("data inside the login page ", data);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    console.log("result in sign in page is coming from next auth", result);

    if (result?.error) {
      toast({
        title: "Login failed",
        description: "Incorrect username or password",
        variant: "destructive",
      });
    }

    if (result?.url) {
      router.replace("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            JOIN MY MYSTERY MESSAGE
          </h1>
          <p className="mb-4">Sign in to start your anonymous adventure</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email OR Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Email or Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Sign in</Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
            New member?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              SIGN UP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
