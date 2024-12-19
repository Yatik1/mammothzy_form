import React from 'react'
import { Button } from '../ui/button'
import useTagContext from '@/hooks/useTagContext'

function LocationForm() {
  const {setSelectedTag} = useTagContext()
  
  return (
    <div>LocationForm

<Button  onClick={() => setSelectedTag("Activity Details")}>Previous</Button>
<Button>Submit</Button>
    </div>
  )
}
    
export default LocationForm