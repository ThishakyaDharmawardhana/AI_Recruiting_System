'use client'
import React ,{useContext} from 'react'
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { Timer } from 'lucide-react';   
import Image from 'next/image';
import { Mic } from 'lucide-react';
import { Phone } from 'lucide-react';

function StartInterview() {

    const {interviewInfo,setInterviewInfo}=useContext(InterviewDataContext);


  return (
    <div className='p-20 lg:px-40 xl:px-55 flex flex-col gap-3  border border rounded-lg bg-gray-100 '>
        <h2 className=' font-bold text-xl flex justify-between'> AI Interview Session 
          <span className='flex items-center gap-2  '> 
            <Timer/>
            00:00:00
          </span>
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
           <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
              <Image src={'/ai.png'} alt="AI" 
               width={50} height={50}
               className="w-[60px] h-[60px] rounded-full object-cover"
               />

               <h2>AI Recruiter</h2>

           </div>

           <div>
              <div className='bg-white h-[400px] rounded-lg border flex  items-center justify-center flex-col gap-3'>
              <h2 className='text-2xl bg-primary text-white p-3 rounded-full px-6'>{interviewInfo?.userName[0]}</h2>
              <h2 className='ml-2'>{interviewInfo?.userName}</h2>

           </div>
       </div>
     </div>

    <div className='flex items-center justify-center gap-5 mt-3 '>
         <Mic className="w-13 h-13 bg-gray-500 text-white rounded-full p-3 cursor-pointer"/>
         <Phone className="w-13 h-13 bg-red-500 text-white rounded-full p-3 cursor-pointer"/>
       </div>

       <h2 className='text-sm text-gray-500 text-center mt-1'>Interview in Progress...</h2>
    </div>
   


  )
}

export default StartInterview
