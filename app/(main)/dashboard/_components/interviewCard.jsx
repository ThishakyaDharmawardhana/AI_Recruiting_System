import React from 'react'
import moment from 'moment'
import { Button } from "@/components/ui/button";
import { Copy, Send, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';


function InterviewCard({interview, viewDetail=false}) {
  const url = process.env.NEXT_PUBLIC_HOST_URL+ "/"+ interview?.interview_id;

  const copyLink=()=>{
      navigator.clipboard.writeText(url);
      toast('Link Copied')
    }

    const onSend=()=>{
      window.location.href = "mailto:accounts@thishakya7376.com?subject=AiCruiter Interview Link & body=Interview Link:"+ url;
    }

  return (
    <div className='p-5 bg-white rounded-lg border'>
      <div className='flex items-center justify-between'>
        <div className='h-[20px] w-[20px] bg-primary rounded-full'></div>
        <h2 className='text-sm text-gray-600'>{moment(interview?.created_at).format("MMM Do YY")}</h2>
      </div>

      <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
      <h2 className='mt-2 text-sm text-gray-500 flex justify-between text-gray-500'>{interview?.duration}
        <span className='text-green-600'>{interview['interview-feedback']?.length} Candidates</span>
      </h2>

      {!viewDetail ? <div className='flex gap-3 mt-3'>
        <Button variant="outline" className='flex-1 cursor-pointer' onClick={copyLink}><Copy className='w-4 h-4'/>Copy Link</Button>
        <Button className='flex-1 cursor-pointer' onClick={onSend}><Send className='w-4 h-4 '/>Send</Button>
      </div>
      :
      <Button className="mt-3 w-full" variant='outline' >View Detail <ArrowRight className="w-4 h-4 ml-2"/></Button>
      }
     
    </div>
  )
}

export default InterviewCard
