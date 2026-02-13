import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Loader2 as Loader2Icon } from 'lucide-react'

function QuestionList({formData}) {

  const[loading, setLoading]=useState(true);
  const[questionList, setQuestionList]=useState();

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
                <div className='p-5  border border-gray-300 rounded-xl'>
                  {questionList.map((item, index) => (
                    <div key={index} className='p-5 bg-white border-2 border-gray-200 mb-4 rounded-xl shadow-sm hover:shadow-md transition-shadow'>
                      <h3 className='font-semibold text-gray-900 mb-4 text-lg'>{index + 1}. {item.question}</h3>
                      <div className='inline-flex items-center gap-2 px-4 py-2 bg-orange-100 border border-orange-300 rounded-full'>
                        <span className='text-orange-600 text-sm font-semibold'>
                          ✦ {item.type || 'Unknown Type'}
                        </span>
                      </div>
                    </div>

                
                
                  ))}
                </div>
        }   
    </div>
  )
}

export default QuestionList
