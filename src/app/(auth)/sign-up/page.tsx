"use client";

// import { Toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
// useDebounce call back set kartah usestate ke ander function ko 
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchemas";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";



const Page = () => {
  const [username, setUsername] = useState("");
  // username ka msg unique h ya nahi uske liye
  const [usernameMessage, setUsernameMessage] = useState("");
  // loading state ko manage karne ke liye
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebounceCallback(setUsername, 5000);
  const { toast } = useToast();
  const router = useRouter();

  // zodd implementation

    // is form variable ka naam kuch bhi ho sakta
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${username}`
          );
          console.log("reponse that we are getting here is coming from axios which is kaing a call to check username unique",response);
      console.log("*****************************************************")
          console.log("reponse that we are getting here is coming from axios which is kaing a call to check username unique",response.data.message);
          // let message=response.data.message;
          // setUsername(message)
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };

    checkUsernameUnique();
  }, [username]);
     


  const onSubmit=async (data:z.infer< typeof signUpSchema>) =>
  {
setIsSubmitting(true)
try {
  console.log("data of sign up after submiting sign up form is ",data)
 const response= await axios.post('/api/sign-up',data)
// Toast.success("sign up suceeesful ")
 toast({
  title:'Success',
  description:response.data.message
 })
//  router.replace(`/verify/${username}`)
console.log("Redirecting to:", `/verify/${username}`);

router.replace(`/verify/${username}`);

 setIsSubmitting(false);
} catch (error) {

  console.error("error in signing up user",error)
  const axiosError = error as AxiosError<ApiResponse>;
let errorMesaage=axiosError.response?.data.message
toast({

  title:"signup failed",
  description:errorMesaage,
  variant:"destructive"
})
setIsSubmitting(false)
}
  }
  return( <div className=" flex justify-center items-center min-h-screen bg-gray-100">
    <div className=" w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
<div className=" text-center">
<h1 className=" text-4xl font-extrabold tracking-tight  lg:text-5xl mb-6  ">
JOIN MYSTERY MESSAGE
</h1>
<p className=" mb-4 "> Sign in to start your anonymous adventure</p>
</div>

    <Form {...form}>
{/* ...form name kuch bhi ho sakta h ye uper banaya hua h isliye aishe likhe h */}

      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        
      <FormField
  name="username"
  control={form.control}
  // field is collecting the data at the backend part
  render={({ field }) => (
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input placeholder="username" {...field} 
         onChange={(e)=>
         {
          field.onChange(e)
        debounced(e.target.value)
         }
         }
        />
       
      </FormControl>
      {
            isCheckingUsername && <Loader2 className=" animate-spin "/>
        }<FormDescription>This is your public display name.</FormDescription>
       <p
                      className={`text-sm ${
                        usernameMessage === 'Username is unique'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {usernameMessage}
                    </p>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  name="email"
  control={form.control}
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input placeholder="email" {...field} 
        
        />
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
        <Input type="password" placeholder="Enter Your Password" {...field} 
       
        />
      </FormControl>
      
      <FormMessage />
    </FormItem>
  )}
/>

<Button type="submit" disabled={isSubmitting}>
  {
    isSubmitting?(<>
  <Loader2 className=" mr-2 h-4 w-4 animate-spin"/>PLEASE WAIT
    </>):('Sign Up')
  }
</Button>
        </form>   


    </Form>
<div  className=" text-center mt-4">
<p>
  Already a member?{' '}
  <Link href="/sign-in" className=" text-blue-600 hover:text-blue-800 ">SIGN IN</Link>
</p>
</div>
    </div>
  </div>)
};

export default Page;
