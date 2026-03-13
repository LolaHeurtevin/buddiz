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
        <div className="absolute top-4 left-0 right-0 z-[1000] flex justify-between px-4 md:px-8">
            {/* Groupe gauche : Logout & Chat */}
            <div className="flex gap-4">
            <CustomButton 
                variant="bg_white_green_outline" 
                size="icon_small"   
                href="/logout" 
                onClick={(e) => {
                e.preventDefault();
                handleLogout();
                }}
                disabled={loading}
            >
                <i className="bi bi-box-arrow-right text-xl flex items-center justify-center" aria-label="Logout" />
            </CustomButton>

            <CustomButton
                variant="bg_white_green_outline" 
                size="icon_small"   
                href="/chat" 
            >
                <i className="bi bi-chat-dots-fill text-xl" aria-label="Chat" />
            </CustomButton>
            </div>

            {/* Groupe droite : Personality & Notifications */}
            <div className="flex gap-4">
                {/*<CustomButton 
                    variant="bg_white_green_outline" 
                    size="icon_small"   
                    href="/missions" 
                >
                    <i className="bi bi-trophy-fill text-xl" aria-label="Missions" />
                </CustomButton>*/}

                 <CustomButton 
                    variant="bg_white_green_outline" 
                    size="icon_small"   
                    href="/personality-tests" 
                >
                    <i className="bi bi-question-circle-fill text-xl" aria-label="Personality test" />
                </CustomButton>

                <CustomButton 
                    variant="bg_white_green_outline" 
                    size="icon_small"  
                    href="/notifications" 
                >
                    <i className="bi bi-bell-fill text-xl" aria-label="Notifications" />
                </CustomButton>
            </div>
        </div>
    );
}