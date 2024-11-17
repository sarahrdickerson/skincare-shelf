"use client";
import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useUser } from '@/context/UserContext'

const UserAvatar = () => {
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
        <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user?.avatar_url} alt={user?.first_name} />
            <AvatarFallback className="rounded-lg">{user?.first_name[0].toLocaleUpperCase()}{user?.last_name[0].toLocaleUpperCase()}</AvatarFallback>
        </Avatar>
    )
}

export default UserAvatar