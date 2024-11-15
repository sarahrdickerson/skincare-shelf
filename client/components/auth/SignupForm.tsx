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

const SignupFormSchema = z.object({
    firstName: z.string().min(2, {message: "First name must be at least 2 characters"}),
    lastName: z.string().min(2, {message: "Last name must be at least 2 characters"}),
    username: z.string().min(2, {message: "Username must be at least 2 characters"}).max(50, {message: "Username must be less than 50 characters"}),
    email: z.string().email({message: "Please enter a valid email"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
    confirmPassword: z.string().min(8),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});

const SignupForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof SignupFormSchema>>({
        resolver: zodResolver(SignupFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    async function onSubmit(data: z.infer<typeof SignupFormSchema>) {
        try {
            console.log("Attempting to register user", data.email);
            const response = await AxiosInstance.post('/api/auth/register', {
                first_name: data.firstName,
                last_name: data.lastName,
                username: data.username,
                email: data.email,
                password: data.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("Register status:", response.statusText, response.status);

            // Redirect to dashboard on successful login
            if (response.status === 201) {
                const token = response.data.access_token;

                // Store the token in localStorage and cookies
                localStorage.setItem('access_token', token);
                document.cookie = `access_token=${token}; path=/; max-age=86400`;

                // Redirect to dashboard
                router.push('/dashboard');
            }
        } catch (error) {
            console.error("Error registering user", error);
        }
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 flex-1'>
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormLabel htmlFor="firstName">First Name</FormLabel>
                            <FormControl>
                                <Input {...field} id="firstName"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormLabel htmlFor="lastName">Last Name</FormLabel>
                            <FormControl>
                                <Input {...field} id="lastName"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <FormControl>
                            <Input {...field} id="username" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
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
            <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                        <FormControl>
                            <Input {...field} id="confirmPassword" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit" className='w-full font-semibold' variant='secondary'>Sign Up</Button>
        </form>
    </Form>
  )
}

export default SignupForm