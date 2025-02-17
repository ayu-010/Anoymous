import type { Metadata } from "next";
import { Inter } from "next/font/google";

import './globals.css'
import Navbar from "@/components/Navbar";
import AuthProvider from "@/context/AuthProvider";
// import ToastProvider from "@/components/ToastProvider";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mystery Messages",
  description: "Recieve True FeedBack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    
     <AuthProvider>

      <body className={inter.className}>
        {/* <ToastProvider/>
         */}
         <Toaster/>

<Navbar></Navbar>

        {children}

      </body>

     </AuthProvider>
    </html>
  );
}
