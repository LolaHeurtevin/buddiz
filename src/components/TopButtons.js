'use client'

import Link from 'next/link';

export default function TopButtons() {
    return (
        <div>
            <Link 
                href="/chat"
                style={{
                    position: 'absolute',
                    top: '5%',
                    left: '2%',
                    zIndex: 1000,
                }} 
                className={`px-4 py-2 rounded-xl bg-white text-black, border border-grey-200`}
            >
                <i className="bi bi-chat-dots-fill text-3xl" aria-label="Chat" />
            </Link>

            <div className={`flex flex-row gap-4`}
                style={{
                    position: 'absolute',
                    top: '5%',
                    right: '2%',
                    zIndex: 1000,
                }} 
            >
                <Link 
                    href="/test"
                    className={`px-4 py-2 rounded-xl bg-white text-black border border-cta-200`}>
                    <i className="bi bi-question-circle-fill text-3xl" aria-label="Personality test" />
                </Link>
                <Link 
                    href="/notifications"
                    className={`px-4 py-2 rounded-xl bg-white text-black border border-cta-200`}>
                    <i className="bi bi-bell-fill text-3xl" aria-label="Notifications" />
                </Link>
            </div>
        </div>
    );
}