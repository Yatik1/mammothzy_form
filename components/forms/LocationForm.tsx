import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import useTagContext from '@/hooks/useTagContext'
import {z} from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from '@/hooks/use-toast'
import { Separator } from '../ui/separator'


function LocationForm() {

  return (
    <div className='flex flex-col flex-grow gap-3 py-4 px-7 mx-7'>
      
    <div className="space-y-[-0.2rem]">
      <h2 className="font-semibold text-lg">Location Details</h2>
      <p className="text-sm text-gray-500 font-thin">Please specify the location where the activity takes place</p>
    </div>

    <FormComponent />
    
  </div>
  )
}
import { useRouter } from 'next/navigation'


function FormComponent() {
  "use client";

  const {setSelectedTag } = useTagContext()
  const router = useRouter()

  const formSchema = z.object({
    address1:z.string().min(7 , {message : "Activity name must at least 2 characters"}),
    address2:z.string().optional(),
    zip_code:z.string().min(4 , {message:"Please provide appropriate zip code"}),
    city:z.string(),
    state:z.string(),
    contactNumber:z.string(),
    contactName:z.string().min(2 , {message:"Contact name must at least 2 characters"})
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues : {
      address1: "",
      address2:"",
      zip_code:"",
      city:"",
      state:"",
      contactNumber:"",
      contactName:"",
    }
  })

  useEffect(() => {
    const savedData = sessionStorage.getItem("locationFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      form.reset(parsedData);
    }
  }, [form]);


  function onSubmit(values : z.infer<typeof formSchema>) {
    sessionStorage.setItem("locationFormData" , JSON.stringify(values))
    toast({
      title:"Data Saved",
      description:"Provided location data have been saved successfully"
    })
    router.push("/submitted")
  }


  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <FormField
            control={form.control}
            name='address1'
            render={({field}) => (
              <FormItem>
                <FormLabel>Address Line 1 <span className='text-red-500'>*</span> </FormLabel>
                <FormControl>
                  <Input placeholder='House number and street name ' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='address2'
            render={({field}) => (
              <FormItem>
                <FormLabel> Address Line 2 <span className='text-red-500'>*</span> </FormLabel>
                <FormControl>
                  <Input placeholder='Other information, e.g., building name, landmark, etc. ' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='zip_code'
            render={({field}) => (
              <FormItem>
                <FormLabel> ZIP Code <span className='text-red-500'>*</span> </FormLabel>
                <FormControl>
                  <Input placeholder='eg: 123 467' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <div className='flex gap-4'>
              <FormField
                control={form.control}
                name='city'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>City <span className='text-red-500'>*</span> </FormLabel>
                    <FormControl>
                      <Input placeholder='Your City' className='w-[15rem]' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='state'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>State <span className='text-red-500'>*</span> </FormLabel>
                    <FormControl>
                      <Input placeholder='Your State' className='w-[15rem]' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>

          <Separator />

          <div className='flex flex-col gap-4'>
            <div className="space-y-[-0.2rem]">
              <h2 className="font-semibold text-lg">Contact Details</h2>
              <p className="text-sm text-gray-500 font-thin">Please provide contact information for this activity.</p>
            </div>

            <div className="flex gap-4">
            <FormField
                control={form.control}
                name='contactNumber'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Contact Number <span className='text-red-500'>*</span> </FormLabel>
                    <FormControl>
                      <Input placeholder='Your contact number' className='w-[15rem]' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='contactName'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Contact Name <span className='text-red-500'>*</span> </FormLabel>
                    <FormControl>
                      <Input placeholder='Your contact name' className='w-[15rem]' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

         <div className="flex gap-4">
         <Button onClick={() => setSelectedTag("Activity Details")} variant={'ghost'} className='rounded-full px-6 border'>Previous</Button>
         <Button type='submit' className='rounded-full px-6 bg-[#001D44]'>Submit</Button>
         </div>
        </form>
    </Form>
  )
}

    
export default LocationForm