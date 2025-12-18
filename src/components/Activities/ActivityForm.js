"use client";
import { useTranslation } from "react-i18next";

export default function ActivityForm( { onChange } ) {
    const { t } = useTranslation();

    return (
        <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">{t("title")}</label>
            <input 
                id="title" 
                className="border p-2 rounded w-full" 
                onChange={onChange}
            />

            <label className="block text-sm font-medium mb-1" htmlFor="description">{t("description")}</label>
            <textarea 
                id="description" 
                className="border p-2 rounded w-full" 
                onChange={onChange}
            />
                
            <label className="block text-sm font-medium mb-1" htmlFor="start_date">{t("Start date")}</label>
            <input 
                type="date" 
                id="start_date" 
                className="border p-2 rounded w-full" 
                onChange={onChange}
            />

            <label className="block text-sm font-medium mb-1" htmlFor="start_time">{t("Start time")}</label>
            <input 
                type="time" 
                id="start_time" 
                className="border p-2 rounded w-full" 
                onChange={onChange}
            />

            <label className="block text-sm font-medium mb-1" htmlFor="estimated_duration">{t("estimated_duration")}</label>
            <input 
                type="number" 
                id="estimated_duration" 
                className="border p-2 rounded w-full" 
                onChange={onChange}
            />

            <label className="block text-sm font-medium mb-1" htmlFor="max_participants">{t("Maximum number of participants")}</label>
            <input 
                type="number" 
                id="max_participants" 
                className="border p-2 rounded w-full" 
                onChange={onChange}
            />

            <label className="block text-sm font-medium mb-1" htmlFor="address">{t("Address")}</label>
            <input 
                type="text" id="address" 
                className="border p-2 rounded w-full" 
                onChange={onChange}
            />

            <label className="block text-sm font-medium mb-1" htmlFor="zip_code">{t("zip_code")}</label>
            <input 
                type="text" id="zip_code" 
                className="border p-2 rounded w-full" 
                onChange={onChange}
            />

            <label className="block text-sm font-medium mb-1" htmlFor="city">{t("city")}</label>
            <input 
                type="text" id="city" 
                className="border p-2 rounded w-full" 
                onChange={onChange}
            />

            <label className="block text-sm font-medium mb-1" htmlFor="country">{t("country")}</label>
            <input 
                type="text" id="country" 
                className="border p-2 rounded w-full" 
                onChange={onChange}
            />
        </div>
    );
}