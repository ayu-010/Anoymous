"use client"

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { User } from 'next-auth'


// user h jo next auth wala uske ke ander raqhega session aur us session me se nilaenge hum user
const Navbar = () => {
    const { data: session } = useSession()
    
    // Optional: Define user type explicitly if using TypeScript
    const user:User = session?.user as User

    return (
        <nav className=' p-4 md:p-6 shadow-md '>
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
              
                    <a className='text-xl font-bold mb-4 md:mb-0' href='#'>Mystery Message</a>
             
                {session ? (
                    <>
              
                    <span className='mr-4'>
                        Welcome, {user?.username || user?.email}   </span>
                        <Button className='w-full md:w-auto' onClick={() => signOut()}>Log out</Button>
                </>
                 
                ) : (
                    <Link href='/sign-in'>
                        <Button className='w-full md:w-auto'> Login</Button>
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar
