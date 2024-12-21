import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import useTagContext from '@/hooks/useTagContext'
import {z} from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { toast } from '@/hooks/use-toast'

function ActivityForm() {


  return (
    <div className='flex flex-col flex-grow gap-3 py-4 px-7 mx-7'>
      
      <h2 className="font-semibold text-lg">Activity Details</h2>
      <FormComponent />

    </div>

  )
}

function FormComponent() {
  "use client";

  const {setSelectedTag} = useTagContext()

  const formSchema = z.object({
    name:z.string().min(2 , {message : "Activity name must at least 2 characters"}),
    description:z.string()
                 .min(5 , {message: "Description must at least 5 characters"})
                 .max(200, {message: "Description must at most 200 characters"}) ,

    min_members:z.string(),
    // number({invalid_type_error:"Must be number"}).positive("Must be greater than zero"),
    max_members:z.string(),
    // .number({invalid_type_error:"Must be number"}),
    // location_type: z.array(z.string()).nonempty({ message: "Select at least one location type" }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues : {
      name: "",
      description:"",
      min_members:"0",
      max_members:"0",
      // location_type:[],
    }
  })

  useEffect(() => {
    const savedData = sessionStorage.getItem("activityFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      form.reset(parsedData);
    }
  }, [form]);


  function onSubmit(values : z.infer<typeof formSchema>) {
    sessionStorage.setItem("activityFormData" , JSON.stringify(values))
    toast({
      title:"Data Saved",
      description:"Provided activity data have been saved successfully"
    })
    setSelectedTag("Location Details")
  }


  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <FormField
            control={form.control}
            name='name'
            render={({field}) => (
              <FormItem>
                <FormLabel>Activity name <span className='text-red-500'>*</span> </FormLabel>
                <FormControl>
                  <Input placeholder='Eg: Cooking class in Palo Alto' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({field}) => (
              <FormItem>
                <FormLabel>About the Activity <span className='text-red-500'>*</span> </FormLabel>
                <FormControl>
                  <Textarea placeholder='Activity Description' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <div className="flex flex-col gap-3">
          <Label>How many members can take part in the activity?</Label>
          <div className='flex gap-4'>
              <FormField
                control={form.control}
                name='min_members'
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Minimum Members' className='w-[15rem]' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='max_members'
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Maximum Members' className='w-[15rem]' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
          </div>

          
          <Button type='submit' className='rounded-full px-6 bg-[#001D44]'>Save and Continue</Button>
        </form>
    </Form>
  )
}

export default ActivityForm