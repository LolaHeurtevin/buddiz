'use client'

import Link from 'next/link';

export default function TopButtons() {
    return (
        <div>
            <Link href="/chat">
                <button 
                    style={{
                        position: 'absolute',
                        top: '1%',
                        left: '2%',
                        zIndex: 1000,
                    }} 
                    type="button" 
                    className={`px-4 py-2 rounded bg-white text-black, border border-grey-200`}>
                    <i className="bi bi-chat-dots-fill text-3xl" aria-label="Chat"></i>
                </button>
            </Link>

            <Link href="/test">
                <button 
                    style={{
                        position: 'absolute',
                        top: '1%',
                        right: '12%',
                        zIndex: 1000,
                    }} 
                    type="button" 
                    className={`px-4 py-2 rounded bg-white text-black border border-cta-200`}>
                    <i className="bi bi-question-circle-fill text-3xl" aria-label="Personality test"></i>
                </button>
            </Link>
            <Link href="/notifications">
                <button 
                    style={{
                        position: 'absolute',
                        top: '1%',
                        right: '2%',
                        zIndex: 1000,
                    }} 
                    type="button" 
                    className={`px-4 py-2 rounded bg-white text-black border border-cta-200`}>
                    <i className="bi bi-bell-fill text-3xl" aria-label="Notifications"></i>
                </button>
            </Link>
        </div>
    );
}