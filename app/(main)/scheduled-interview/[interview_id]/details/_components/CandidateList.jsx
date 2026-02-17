import React from 'react'
import moment from 'moment';
import { Button } from "@/components/ui/button";


function CandidateList({CandidateList}) {
  return (
    <div className=''>
        <h2 className='font-bold text-lg mt-5'>Candidates ({CandidateList?.length || 0})</h2>
        {CandidateList?.map((candidate, index)=>(
            <div key={index} className='p-5 flex gap-3 items-center justify-between bg-white rounded-lg mt-5'>
                <div className='flex items-center gap-5'>
                  <h2 className='bg-primary p-3 px-5 font-bold text-white rounded-full'>{candidate.userName[0]}</h2>
                  <div>
                    <h2 className='font-bold'>{candidate?.userName}</h2>
                    <h2 className='text-sm text-gray-500'>Completed On : {moment(candidate?.created_at).format('MMM DD, yyyy')}</h2>
                  </div>
                </div>

                <div className='flex gap-3 items-center'>
                    <h2 className='text-green-600'>6/10</h2>
                   <Button variant="outline" className="text-primary mt-2 cursor-pointer">View Report</Button>
                </div>
            </div>

        ))}     
    </div>
  )
}

export default CandidateList
