"use client";

import { verifySchema } from '@/schemas/verifySchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import axios, { AxiosError } from "axios";
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import { useToast } from "@/components/ui/use-toast";

const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
   

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });




  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {

      console.log("data that we are recieving after submitting verify ccode and it is hitting the api which is axios.post /api/verify-code",data)
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });
console.log("reponse that we are getiing after submitting the code is",response);


      toast({
        title: "Success",
        description: response.data.message, 
        
        // Ensure that response.data.message exists
      });

      router.replace('/sign-in'); 
      // Use the proper URL
    } catch (error) {

        console.error("error while validating the code in verify username page",error);
      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title: "Verification failed",
        description: axiosError.response?.data.message || "An unexpected error occurred while validating the code",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>


        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input placeholder="code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  
  );
};

export default VerifyAccount;

// 'use client';

// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { useToast } from '@/components/ui/use-toast';
// import { ApiResponse } from '@/types/ApiResponse';
// import { zodResolver } from '@hookform/resolvers/zod';
// import axios, { AxiosError } from 'axios';
// import { useParams, useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import * as z from 'zod';
// import { verifySchema } from '@/schemas/verifySchemas';

// export default function VerifyAccount() {
//   const router = useRouter();
//   const params = useParams<{ username: string }>();
//   const { toast } = useToast();
//   const form = useForm<z.infer<typeof verifySchema>>({
//     resolver: zodResolver(verifySchema),
//   });

//   const onSubmit = async (data: z.infer<typeof verifySchema>) => {
//     try {
//       const response = await axios.post<ApiResponse>(`/api/verify-code`, {
//         username: params.username,
//         code: data.code,
//       });

//       toast({
//         title: 'Success',
//         description: response.data.message,
//       });

//       router.replace('/sign-in');
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast({
//         title: 'Verification Failed',
//         description:
//           axiosError.response?.data.message ??
//           'An error occurred. Please try again.',
//         variant: 'destructive',
//       });
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             Verify Your Account
//           </h1>
//           <p className="mb-4">Enter the verification code sent to your email</p>
//         </div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               name="code"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Verification Code</FormLabel>
//                   <Input {...field} className='border border-black' />

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit">Verify</Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }
