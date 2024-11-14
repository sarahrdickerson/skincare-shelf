"use client";
import SignupForm from '@/components/auth/SignupForm'
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { GoogleLogo } from '@phosphor-icons/react';
import React from 'react'

const SignupOptionsPage = () => {
  return (
    <div className='grid grid-cols-2 min-h-screen'>
        <div className="flex flex-col items-center p-4 space-y-4 px-8">
            {/* Content for the first column */}
            <div className='flex flex-col space-y-2 text-center'>
                <h2 className="text-2xl font-bold px-4">Ready to Transform Your Skincare Routine?</h2>
                <p>Sign up and discover what truly works for your skin</p>
            </div>
            <div className='flex flex-col space-y-4 flex-grow w-full lg:max-w-lg'>
                <Button variant='outline'
                    className='flex flex-row'
                >
                    <GoogleLogo/>Continue with Google
                </Button>
                <div className='flex items-center justify-center space-x-4'>
                    <Separator className='flex-1' />
                    <p className='text-sm text-gray-500'>or</p>
                    <Separator className='flex-1' />
                </div>
                <SignupForm />
            </div>
        </div>
        <div className="bg-secondary p-4">
            
        </div>
    </div>
  )
}

export default SignupOptionsPage