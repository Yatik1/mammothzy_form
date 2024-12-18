import Image from 'next/image'
import React from 'react'
import logo from "../public/logo.png"
import { FacebookIcon, InstagramIcon, LinkedinIcon, Mail } from 'lucide-react'

function Footer() {
  return (
    <div className='flex flex-col items-center justify-center gap-5 border-t border-gray-200 py-6'>
        <div className="flex items-center justify-center">
            <Image 
                src={logo}
                alt='Logo'
                className='w-[15rem]'
            />
        </div>

        <p className="text-center text-gray-500">Marketplace for searching, filtering and instantly booking team activities</p>

        <div className='flex items-center justify-center gap-3'>
            <FacebookIcon />
            <InstagramIcon />
            <LinkedinIcon />
            <Mail />
        </div>

        <div className="flex items-center justify-center w-full pt-5 border-t border-gray-200">
            <p className="text-gray-400 text-sm">
            Copyright © 2024
            </p>
        </div>
    </div>
  )
}

export default Footer