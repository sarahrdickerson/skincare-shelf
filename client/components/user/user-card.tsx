"use client";
import { useUser } from '@/context/UserContext';
import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import UserAvatar from './user-avatar';


const UserCard = () => {
    const { user, loading } = useUser();  // Destructure user and loading state

    // If user is loading or doesn't exist yet, show a fallback
    if (loading || !user) {
        return (
            <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback>?</AvatarFallback>
            </Avatar>
        );
    }
  return (
    <div className='flex flex-row space-x-2'>
        <UserAvatar />
        <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user?.first_name.toLocaleLowerCase()} {user?.last_name.toLocaleLowerCase()}</span>
            <span className="truncate text-xs">{user?.email}</span>
        </div>
    </div>
  )
}

export default UserCard