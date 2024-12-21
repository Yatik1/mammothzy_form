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
import { toast } from '@/hooks/use-toast'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

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
    description:z.string().min(5 , {message: "Description must at least 5 characters"}).max(200, {message: "Description must at most 200 characters"}),
    
    activity_type:z.enum(["indoor","outdoor","virtual"] , {
      required_error: "You need to select an activity type."
    }),

    location_type:z.enum(["provided_location","user_location"] , {
      required_error:"You need to select a location type."
    }),

    min_members:z.string().optional(),
    max_members:z.string().optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues : {
      name: "",
      description:"",
      min_members:"",
      max_members:"",
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
      description:"Activity data have been saved successfully"
    })
    console.log("Activity Details : " , values)
    setSelectedTag("Location Details")
  }


  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>

          {/* name field */}
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

          {/* About field */}
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

          {/* activity type field */}
          <FormField 
            control={form.control}
            name='activity_type'
            render={({field}) => (
              <FormItem>
                <FormLabel>Please select the activity type <span className='text-red-500'>*</span> </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                    className="flex flex-col space-y-1"
                  >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="indoor" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Indoor
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="outdoor" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Outdoor
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="virtual" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Virtual
                    </FormLabel>
                  </FormItem>

                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          {/* location type field */}
          <FormField 
            control={form.control}
            name='location_type'
            render={({field}) => (
              <FormItem>
                <FormLabel>Please select the type of location <span className='text-red-500'>*</span> </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                    className="flex flex-col space-y-1"
                  >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="provided_location" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Provided Location
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="user_location" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      User Location
                    </FormLabel>
                  </FormItem>

                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          {/* min and max memebers field */}
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