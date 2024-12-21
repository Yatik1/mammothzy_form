"use client";

import Image from 'next/image'
import React from 'react'
import success from "@/public/public.png"
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

function Submission() {

    const router = useRouter()

  return (
    <div className='w-full p-20 flex items-center justify-center'>
        <div className="relative flex flex-col gap-5 items-center justify-center w-[30rem] p-10 border border-gray-200 rounded-2xl">
            <div className="flex items-center justify-center p-2 rounded-full bg-[#DCE2FF]">
                <Image 
                    src={success}
                    alt='success_img'
                    className='w-[5rem] h-[5rem]'
                />
            </div>
            Form Submitted
            <div className="absolute h-7 top-0 right-0 flex pr-2 py-1">
                <div className="h-6 bg-[#DCE2FF] p-1 w-6 rounded-full flex items-center justify-center cursor-pointer" onClick={()=> router.push("/")}>
                    <X />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Submission