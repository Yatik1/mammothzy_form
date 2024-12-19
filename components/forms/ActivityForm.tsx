import React from 'react'
import { Button } from '../ui/button'
import useTagContext from '@/hooks/useTagContext'

function ActivityForm() {

  const {setSelectedTag} = useTagContext()

  return (
    <div className='flex flex-col flex-grow gap-3 py-4 px-7 mx-7'>
      
      <h2 className="font-semibold text-lg">Activity Details</h2>
      
      
      {/* <Button
        onClick={() => setSelectedTag("Location Details")}
      >Save and continue</Button> */}
    </div>

  )
}

export default ActivityForm