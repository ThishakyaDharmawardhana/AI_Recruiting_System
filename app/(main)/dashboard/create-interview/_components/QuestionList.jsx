import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Loader2 as Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import QuestionListContainer from './QuestionListContainer'
import { supabase } from '@/services/supabaseClient'
import { useUser } from '@/app/provider'
import { v4 as uuidv4 } from 'uuid';
import { Loader2 } from 'lucide-react'


function QuestionList({formData,onCreateLink}) {

  const[loading, setLoading]=useState(true);
  const[questionList, setQuestionList]=useState();
  const{user}=useUser();
  const[saveLoading, setSaveLoading]=useState(false);

  useEffect(() => {
    if(formData)
    {
      GenerateQuestionList()
    }
  }, [formData]);

  const GenerateQuestionList = async() => 
  {
    // Call the API to generate question list based on formData
    setLoading(true);
    try{
        const result=await axios.post('/api/ai-model',{
           ...formData
        })
        console.log(result.data.content);
        const Content = (result.data.content);
        const FINAL_CONTENT=Content.replace('" ```json','').replace('```','');
        const parsed = JSON.parse(FINAL_CONTENT);
        setQuestionList(parsed?.interviewQuestions || parsed);
        setLoading(false);
    }
    catch(e)
    {
       toast('Server Error, Try Again !') 
       setLoading(false);
        
    }
  }

  const onFinish = async () => {
      setSaveLoading(true);
      try {
        if (!user?.email) {
          toast.error('Not authenticated. Please login first.');
          setSaveLoading(false);
          return;
        }

        const interview_id = uuidv4();
        console.log('Saving interview with user:', user.email);
        
        const { error } = await supabase
          .from('Interviews')
          .insert({
            jobPosition: formData?.jobPosition || '',
            jobDescription: formData?.jobDescription || '',
            duration: formData?.duration || '',
            type: Array.isArray(formData?.type) ? formData.type.join(',') : (formData?.type || ''),
            questionList: JSON.stringify(questionList || []),
            userEmail: user.email,
            interview_id: interview_id,
            created_at: new Date().toISOString()
          });

        if (error) {
          console.error('Database error:', error);
          toast.error('Failed to save: ' + error.message);
          setSaveLoading(false);
          return;
        }

        console.log('Interview saved successfully');
        toast.success('Interview saved!');
        setSaveLoading(false);
        onCreateLink({interview_id, questionList});
      } catch (err) {
        console.error('Error:', err);
        toast.error('Error: ' + (err?.message || 'Unknown error'));
        setSaveLoading(false);
      }
  }

  return (
    <div>
        {loading&&
            <div className='p-5 bg-orange-50 rounded-xl  flex gap-5 items-center border border-primary'>
                <Loader2Icon className="animate-spin" />
                <div>
                   <h2 className='font-medium'>Generating Interview Questions</h2>
                   <p className='text-primary'>Our AI is crafting personalized questions based on your based on your job position</p>
                </div>

            
            </div>            
                         
        }
        {questionList?.length>0 &&

          <div>
            <QuestionListContainer questionList={questionList} />
          </div>
        }  

        <div className='flex justify-end mt-10'>
          <Button className='cursor-pointer' onClick={()=>onFinish()} disabled={saveLoading}>
            {saveLoading && <Loader2 className="animate-spin" />}
            Create Interview Link & Finish</Button>
        </div> 
    </div>
  )
}

export default QuestionList
