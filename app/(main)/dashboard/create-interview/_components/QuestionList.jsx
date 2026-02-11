import React from 'react'

function QuestionList({formData}) {

  useEffect(() => {
    if(formData)
    {
      GenerateQuestionList()
    }
  }, [formData]);

  const GenerateQuestionList = () => {
    // Call the API to generate question list based on formData
  }
  return (
    <div>
        QuestionList
      
    </div>
  )
}

export default QuestionList
