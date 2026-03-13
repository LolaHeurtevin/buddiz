'use client'

import CustomButton from '@components/CustomButton';

export default function FilterAndCreationButtons() {
    return (
        <div className="absolute top-[100px] right-4 z-[1000] flex flex-row gap-4">
            <CustomButton
                variant="bg_green" 
                size="icon"  
                href="/activities/create" 
            >
                <i className="bi bi-plus text-2xl flex items-center justify-center" aria-label="Create activity" />
            </CustomButton>

            <CustomButton
                variant="bg_white_green_outline" 
                size="icon" 
                href="#" 
            >
                <i className="bi bi-filter text-2xl flex items-center justify-center" aria-label="Filter" />
            </CustomButton>
        </div>
    );
}