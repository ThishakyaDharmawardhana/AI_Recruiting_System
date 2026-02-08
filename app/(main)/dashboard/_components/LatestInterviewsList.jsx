"use client"
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { Video } from "lucide-react";


function LatestInterviewsList() {
    const [interviewList, setInterviewList] = useState([])

  return (
    <div className='my-5'>
      <h2 className='font-bold text-2xl'>Previously Created Interviews</h2>

      {interviewList?.length == 0&& 
       <div className="p-5 flex flex-col gap-3 items-center mt-5">
          <Video className = "h-9 w-9 text-primary" />
          <h2>You don't have any interviews created</h2>
          <Button>+ Create New Interview</Button>
       </div>
      }

    
    </div>
  )
}

export default LatestInterviewsList
