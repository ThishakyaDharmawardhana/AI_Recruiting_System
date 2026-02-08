import React from 'react'
import { Video, Phone } from "lucide-react";

function CreateOptions() {
  return (
    <div className='grid grid-cols-2 gap-5'>
       <div className='bg-white border border-gray-200 rounded-lg p-5'>
          <Video className='p-3 text-primary bg-orange-50 rounded-lg h-11 w-11' />
          <h2 className='font-bold'>Create New Interview</h2>
          <p className='text-gray-500'>Create AI Interview and schedule them with Candidates</p>
       </div>

       <div className='bg-white border border-gray-200 rounded-lg p-5'>
          <Phone className='p-3 text-primary bg-orange-50 rounded-lg h-11 w-11' />
          <h2 className='font-bold'>Create Phone Screening Call</h2>
          <p className='text-gray-500'>Schedule phone screening calls with Candidates</p>
       </div>

    </div>
  )
}

export default CreateOptions
