'use client'
import React ,{ use, useContext, useRef } from 'react'
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { Timer } from 'lucide-react';   
import Image from 'next/image';
import { Mic } from 'lucide-react';
import { Phone } from 'lucide-react';
import Vapi from '@vapi-ai/web';
import AlertConformation from './_components/AlertConformation';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useEffect } from 'react';




function StartInterview() {

    const {interviewInfo,setInterviewInfo}=useContext(InterviewDataContext);
    const vapiRef = useRef(null);
    const callStartedRef = useRef(false);
    const [currentSpeaker,setCurrentSpeaker]=useState(null); // 'agent', 'user', or null

    const startCall=async ()=>{
       if (callStartedRef.current) return;
       if (!vapiRef.current) {
         vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
         vapiRef.current.on('error', (err) => {
           if (String(err?.message || err).includes('Meeting has ended')) return;
           console.error(err);
         });
         vapiRef.current.on('speech-start', () => {
           console.log('Assistant Speech has started');
           setCurrentSpeaker('agent');
         });
         vapiRef.current.on('speech-end', () => {
           console.log('Assistant Speech has ended');
           setCurrentSpeaker(null);
         });
         vapiRef.current.on('call-start', () => {
           console.log('Call has started');
           toast('Call Connected...');
         });
         vapiRef.current.on('call-end', () => {
           console.log('Call has stopped');
           toast('Interview Ended');
           setCurrentSpeaker(null);
         });
       }
       let questionList = '';
       if (Array.isArray(interviewInfo?.interviewData?.questionList)) {
         interviewInfo.interviewData.questionList.forEach ((item,index)=>(
             questionList=item?.question + "," + questionList
         ));
       }
       
       const assistantOptions = {
            name: "AI Recruiter",
            firstMessage: "Hi "+interviewInfo?.userName+", how are you? Ready for your interview on "+interviewInfo?.interviewData?.jobPosition,
            model: {
               provider: "openai",
               model: "gpt-4",
               messages: [
                 {
                   role: "system",
                   content: `
You are an AI Voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your `+interviewInfo?.interviewData?.jobPosition+` interview. Let's get started with a few questions!"
Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions: `+questionList+`
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That's a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"

Key Guidelines:
- Be friendly, engaging, and witty 🎤
- Keep responses short and natural, like a real conversation
- Adapt based on the candidate's confidence level
- Ensure the interview remains focused on React
        `.trim(),
      },
    ],
  },
       };

       try {
         await vapiRef.current.start(assistantOptions);
         callStartedRef.current = true;
       } catch (e) {
         // Ignore errors for already-ended meetings.
       }


  }

  const stopInterview=()=>{
    if (!callStartedRef.current) return;
    try {
      vapiRef.current?.stop();
    } finally {
      callStartedRef.current = false;
    }
  }

  


  return (
    <div className='p-20 lg:px-40 xl:px-55 flex flex-col gap-3  border border rounded-lg bg-gray-100 '>
        <h2 className=' font-bold text-xl flex justify-between'> AI Interview Session 
          <span className='flex items-center gap-2  '> 
            <Timer/>
            00:00:00
          </span>
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
           <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center '>
             <div className='relative'>
                {currentSpeaker === 'agent' && <span className='absolute inset-0 rounded-full bg-orange-500 opacity-75 animate-ping'/>}
                <Image src={'/ai.png'} alt="AI" 
                  width={50} height={50}
                  className="w-[60px] h-[60px] rounded-full object-cover"
                />
             </div>

             <h2>AI Recruiter</h2>

           </div>

           <div>
              <div className='bg-white h-[400px] rounded-lg border flex  items-center justify-center flex-col gap-3'>
                <div className='relative'>
                  {currentSpeaker === 'user' && <span className='absolute inset-0 rounded-full bg-orange-500 opacity-75 animate-ping'/>}
                  <h2 className='text-2xl bg-primary text-white p-3 rounded-full px-6'>{interviewInfo?.userName[0]}</h2>
                </div>  
                <h2 className='ml-2'>{interviewInfo?.userName}</h2>
              </div>
           </div>
     </div>  

        <div className='flex items-center justify-center gap-5 mt-3 '>
          <Mic onClick={startCall} className="w-13 h-13 bg-gray-500 text-white rounded-full p-3 cursor-pointer"/>
         <AlertConformation stopInterview={()=>stopInterview()}>
             <Phone className="w-13 h-13 bg-red-500 text-white rounded-full p-3 cursor-pointer"/>
         </AlertConformation>
        </div>

       <h2 className='text-sm text-gray-500 text-center mt-1'>Interview in Progress...</h2>

    </div>
   


  )
}

export default StartInterview
