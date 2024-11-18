"use client";

import { UserProvider } from "@/context/UserContext";
import React, {ReactNode} from "react";

interface LayoutProps {
    children: ReactNode;
}

const AuthenticatedLayout = ({children}: LayoutProps) => {
    return (
        <UserProvider>
            <main className='flex-1 flex flex-col'>
                {children}
            </main>
        </UserProvider>
    )
}

export default AuthenticatedLayout