import LoginForm from '@/components/auth/LoginForm'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 min-h-screen items-center justify-center'>
        <div></div>
        <div className='flex flex-col flex-grow space-y-6 px-16 md:px-0 md:max-w-md'>
            <h1 className='text-2xl font-semibold text-center'>Log into<br/>Skincare Shelf</h1>
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
            <LoginForm />
            <div className='flex flex-row items-center justify-center'>
                <p className='text-sm text-neutral-600'>Don't have an account?</p>
                <Link href="/signup-options">
                    <Button variant='link'
                        className='text-sm'
                    >
                        Sign up
                    </Button>
                </Link>
            </div>
        </div>
        <div></div>
    </div>
  )
}

export default LoginPage