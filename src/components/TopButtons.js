'use client'

import CustomButton from './CustomButton';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TopButtons() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            router.push('/auth/login');
        } catch (err) {
            console.error('Erreur de déconnexion:', err);
            alert('Erreur lors de la déconnexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <CustomButton
                variant="bg_white_green_outline" 
                size="icon" 
                className="absolute top-10 left-32 z-[1000]"   
                href="/chat" 
            >
                <i className="bi bi-chat-dots-fill text-xl" aria-label="Chat" />
            </CustomButton>
            <CustomButton 
                variant="bg_white_green_outline" 
                size="icon" 
                className="absolute top-10 left-10 z-[1000]"   
                href="/logout" 
                onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                }}
                disabled={loading}
            >
                <i className="bi bi-box-arrow-right text-xl leading-none flex items-center justify-center" aria-label="Logout" />
            </CustomButton>

            <CustomButton 
                variant="bg_white_green_outline" 
                size="icon" 
                className="absolute top-10 right-32 z-[1000]"   
                href="/personality-tests" 
            >
                <i className="bi bi-question-circle-fill text-xl" aria-label="Personality test" />
            </CustomButton>

            <CustomButton 
                variant="bg_white_green_outline" 
                size="icon" 
                className="absolute top-10 right-10 z-[1000]"   
                href="/notifications" 
            >
                <i className="bi bi-bell-fill text-xl" aria-label="Notifications" />
            </CustomButton>
        </div>
    );
}