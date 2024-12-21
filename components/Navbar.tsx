"use client";

import Image from 'next/image'
import React from 'react'
import logo from "../public/logo.png"
import { User } from 'lucide-react'
import { useRouter } from 'next/navigation';

function Navbar() {

    const router = useRouter()

  return (
    <div className="w-full px-[5rem] py-4 flex justify-between items-center border-gray-200 border-b ">
        <div className="flex items-center justify-center cursor-pointer" onClick={() => router.push("/")}>
            <Image
                src={logo}
                alt='Logo'
                className='w-[12rem]'
            />
        </div>

        <div className="flex justify-center items-center gap-2 cursor-pointer">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-300 p-1 border border-black">
                <User />
            </div>
            <p>Profile</p>
        </div>

    </div>
  )
}

export default Navbar