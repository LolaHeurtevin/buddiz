'use client'

import Link from 'next/link'

export default function MapButtons() {
    return (
        <Link 
            href="/activities/create"
            style={{
                position: 'absolute',
                bottom: '100px',
                right: '20px',
                zIndex: 1000,
            }} 
            className={`px-4 py-2 rounded-xl bg-cta-200 text-black`}>
            <i className="bi bi-plus text-3xl" aria-label="Create activity" />
        </Link>
    );
}