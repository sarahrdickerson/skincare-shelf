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
import axios from "axios";

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

    async function onSubmit(data: z.infer<typeof loginFormSchema>) {
        try{
            const response = await AxiosInstance.post('/api/auth/login', {
                email: data.email,
                password: data.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Login status:", response.statusText, response.status);

            // Redirect to dashboard on successful login
            if (response.status === 200) {
                const token = response.data.access_token;

                // Store the token in localStorage and cookies
                localStorage.setItem('access_token', token);
                document.cookie = `access_token=${token}; path=/; max-age=86400`;

                // Redirect to dashboard
                router.push('/dashboard');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error("Login failed:", error.response.data.detail);
            } else {
                console.error("Login failed:", error); 
            }
        }
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