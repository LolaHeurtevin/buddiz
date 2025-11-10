'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function MapButtons() {

    const router = useRouter()

    function createActivity() {
        router.push('/create-activity') 
    }

    return (
        <button 
            style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                zIndex: 1000,
            }} 
            type="button" 
            onClick={createActivity} 
            className={`px-4 py-2 rounded bg-cta-200 text-white`}>
            <Image src="/public/icons/plus-lg.png" alt="Create Activity" width={24} height={24} />
        </button>
    );
}