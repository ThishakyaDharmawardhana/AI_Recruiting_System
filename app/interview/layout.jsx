import React from 'react'
import InterviewHeader from './_components/InterviewHeader'


function InterviewLayout({children}) {
  return (
    <div className='min-h-screen bg-gray-50'>
      <InterviewHeader/>
      {children}
    </div>
  )
}

export default InterviewLayout