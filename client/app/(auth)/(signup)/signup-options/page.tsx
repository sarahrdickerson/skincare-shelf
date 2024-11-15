"use client";
import SignupForm from '@/components/auth/SignupForm'
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GoogleLogo, Star } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const SignupOptionsPage = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 min-h-screen'>
        <div className="flex flex-col items-center p-4 space-y-4 lg:px-8 pt-12 px-16">
            {/* Content for the first column */}
            <div className='flex flex-col space-y-2 text-center'>
                <h2 className="text-2xl font-bold px-4">Ready to Transform Your Skincare Routine?</h2>
                <p>Sign up and discover what truly works for your skin</p>
            </div>
            <div className='flex flex-col space-y-6 pt-4 flex-grow w-full lg:max-w-lg'>
                <Button variant='outline'
                    className='flex flex-row items-center justify-center rounded-full'
                >
                    <div className=''>
                        <Image src='/google-icon.svg' alt='Google Logo' width={16} height={16} className='' />
                    </div>
                    <p>Sign up with Google</p>
                </Button>
                <div className='flex items-center justify-center space-x-4'>
                    <Separator className='flex-1' />
                    <p className='text-sm text-gray-500'>or</p>
                    <Separator className='flex-1' />
                </div>
                <SignupForm />
                <div className='flex flex-row items-center justify-center'>
                    <p className='text-sm text-neutral-600'>Already have an account?</p>
                    <Link href="/login">
                        <Button variant='link'
                        >
                            Sign in
                        </Button>
                    </Link>
                </div>
            </div>
        </div>

        {/* Right side: Testimonial or other content */}
        <div className="bg-secondary p-4 md:flex items-center justify-center hidden md:block px-16 lg:px-8">
            <Card className='flex flex-col items-center p-4 space-y-4 max-w-lg w-full'>
                <h2 className="text-2xl font-bold">Why Sign Up?</h2>
                <p>Sign up to receive personalized skincare recommendations and ingredient insights tailored to your skin</p>
                <p>Join our community and connect with others who share your skincare concerns</p>
                <p>Track your skincare journey and see how your skin improves over time</p>
            </Card>
        </div>
    </div>
  )
}

export default SignupOptionsPage;
