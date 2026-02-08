'use client'

import Link from 'next/link';
import CustomButton from './CustomButton';

export default function TopButtons() {
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