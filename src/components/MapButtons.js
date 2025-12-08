'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function MapButtons() {

    const router = useRouter()

    function createActivity() {
        router.push('/activities/create') 
    }

    return (
        <button 
            style={{
                position: 'absolute',
                bottom: '100px',
                right: '20px',
                zIndex: 1000,
            }} 
            type="button" 
            onClick={createActivity} 
            className={`px-4 py-2 rounded bg-cta-200 text-white`}>
            <i className="bi bi-plus text-3xl" aria-label="Create activity"></i>
        </button>
    );
}