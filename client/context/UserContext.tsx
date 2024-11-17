"use client";
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AxiosInstance from '@/utils/axiosInstance';

// Should match `profiles` table in the database
interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  skin_data: {};
  email: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    // Ensure this runs only in the browser
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('access_token');
    console.log("Token:", token);

    if (!token) {
      console.log("No token found, redirecting to login...");
      router.push('/login');
      return;
    }

    try {
      const response = await AxiosInstance.get('/api/profile/token', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data[0]);
      console.log('User:', response.data[0]);
    } catch (error) {
      console.error('Error fetching user:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Delay fetching until the component is mounted
    fetchUser();
  }, []);
  
  return (
    <UserContext.Provider value={{ user, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
