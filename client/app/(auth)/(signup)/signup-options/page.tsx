"use client";
import SignupForm from '@/components/auth/SignupForm'
import React from 'react'

const SignupOptionsPage = () => {
  return (
    <div className='grid grid-cols-2 min-h-screen'>
        <div className="flex flex-col items-center p-4">
            {/* Content for the first column */}
            {/* <h2 className="text-xl font-bold">Ready to Transform Your Skincare Routine?</h2> */}
            <p>Content for the first column goes here.</p>
            <SignupForm />
        </div>
        <div className="bg-primary p-4">
            
        </div>
    </div>
  )
}

export default SignupOptionsPage