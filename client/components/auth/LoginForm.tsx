"use client";
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AxiosInstance from '@/utils/axiosInstance';
import { useRouter } from 'next/navigation';

const loginFormSchema = z.object({
    email: z.string().email({message: "Please enter a valid email"}),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters"
    })
});

const LoginForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    async function onSubmit(values: z.infer<typeof loginFormSchema>) {
        
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormControl>
                                <Input {...field} id="email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormControl>
                                <Input {...field} id="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" 
                    className='w-full rounded-full'
                    variant='secondary'
                >
                    Log in
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm