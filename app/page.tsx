"use client"

import ActivityForm from '@/components/forms/ActivityForm'
import LocationForm from '@/components/forms/LocationForm'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useTagContext from '@/hooks/useTagContext'
import { Flag, MapPin } from 'lucide-react'
import React from 'react'

interface MenuProps {
  icon:React.ReactNode
  tag:string
  form:React.ReactNode
}

const options:MenuProps[] = [
  {
    icon:<Flag />,
    tag:"Activity Details",
    form: <ActivityForm />
  },
  {
    icon:<MapPin />,
    tag:"Location Details",
    form: <LocationForm />
  }
]

function page() {

  return (
    <div className='w-full h-screen flex flex-col p-10'>
      <h2 className='font-bold text-2xl tracking-tight'>Create new Activity</h2>
      <div className="flex flex-grow w-full h-full">
        <MenuOptions />
        <Separator orientation={'vertical'} />
        <FormSection />
      </div>
    </div>
  )
}

function MenuOptions() {

  const {setSelectedTag} = useTagContext()

  return(
      
      <div className="w-1/5 h-full">
          <div className="flex items-start flex-col p-2">
          {options.map((option, index) => {
            const {icon, tag} = option
            return(
              (
                <div 
                  className='w-[11.5rem] flex items-center justify-center text-gray-600 cursor-default pl-3 pr-6 py-1 hover:bg-gray-400/20 rounded-lg ' 
                  key={index}
                  onClick={() => setSelectedTag(tag)}
                >
                  <div className="p-2 flex items-center justify-center w-[2.2rem] h-[2.2rem]">{icon}</div>
                  <p className='text-md tracking-tight'>{tag}</p>
                </div>
              )
            )
          })}
          </div>
    </div>

  )
}


function FormSection() {
  const {selectedTag, setSelectedTag} = useTagContext()

  return (
    <div className="w-full h-full">
      {selectedTag === "Activity Details" ? 
          <ActivityForm />
          :
          <LocationForm />
      }
      
    </div>
  )
}

export default page