"use client";
import { useTranslation } from "react-i18next";

export default function ActivityForm( { onChange, formData = {} } ) {
    const { t } = useTranslation();

    return (
        <div>
            <label className="block text-sm font-medium mb-1" htmlFor="category">{t("Category")}</label>
            <select 
                id="category" 
                className="border p-2 rounded w-full" 
                value={formData.category || ''}
                onChange={onChange}
            >
                <option value="">{t("Select a category")}</option>
                <option value="outdoor_activity">{t("Outdoor activity")}</option>
                <option value="indoor_activity">{t("Indoor activity")}</option>
            </select>

            <label className="block text-sm font-medium mb-1" htmlFor="title">{t("title")}</label>
            <input 
                id="title" 
                className="border p-2 rounded w-full" 
                value={formData.title || ''}
                onChange={onChange}
            />

            <label className="block text-sm font-medium mb-1" htmlFor="description">{t("description")}</label>
            <textarea 
                id="description" 
                className="border p-2 rounded w-full" 
                value={formData.description || ''}
                onChange={onChange}
            />
                
            <label className="block text-sm font-medium mb-1" htmlFor="start_date">{t("Start date")}</label>
            <input 
                type="date" 
                id="start_date" 
                className="border p-2 rounded w-full" 
                value={formData.start_date || ''}
                onChange={onChange}
            />

            <label className="block text-sm font-medium mb-1" htmlFor="start_time">{t("Start time")}</label>
            <input 
                type="time" 
                id="start_time" 
                className="border p-2 rounded w-full" 
                value={formData.start_time || ''}
                onChange={onChange}
            />

            <label className="block text-sm font-medium mb-1" htmlFor="estimated_duration">{t("estimated_duration")}</label>
            <input 
                type="number" 
                id="estimated_duration" 
                className="border p-2 rounded w-full" 
                value={formData.estimated_duration ?? ''}
                onChange={onChange}
            />

            <label className="block text-sm font-medium mb-1" htmlFor="max_participants">{t("Maximum number of participants")}</label>
            <input 
                type="number" 
                id="max_participants" 
                min="3"
                max="20"
                className="border p-2 rounded w-full" 
                value={formData.max_participants ?? ''}
                onChange={onChange}
            />

            <label className="block text-sm font-medium mb-1" htmlFor="address">{t("Address")}</label>
            <input 
                type="text" id="address" 
                className="border p-2 rounded w-full" 
                value={formData.address || ''}
                onChange={onChange}
            />

            <label className="block text-sm font-medium mb-1" htmlFor="zip_code">{t("zip_code")}</label>
            <input 
                type="text" id="zip_code" 
                className="border p-2 rounded w-full" 
                value={formData.zip_code || ''}
                onChange={onChange}
            />

            <label className="block text-sm font-medium mb-1" htmlFor="city">{t("city")}</label>
            <input 
                type="text" id="city" 
                className="border p-2 rounded w-full" 
                value={formData.city || ''}
                onChange={onChange}
            />

            <label className="block text-sm font-medium mb-1" htmlFor="country">{t("country")}</label>
            <input 
                type="text" id="country" 
                className="border p-2 rounded w-full" 
                value={formData.country || ''}
                onChange={onChange}
            />

            <label className="block text-sm font-medium mb-1 flex items-center" htmlFor="girl_power">
                <input 
                    type="checkbox" 
                    id="girl_power" 
                    className="w-5 h-5 rounded mr-2" 
                    checked={formData.girl_power || false}
                    onChange={onChange}
                />
                {t("Girl Power")}
            </label>

            <label className="block text-sm font-medium mb-1 flex items-center" htmlFor="queer_power">
                <input 
                    type="checkbox" 
                    id="queer_power" 
                    className="w-5 h-5 rounded mr-2" 
                    checked={formData.queer_power || false}
                    onChange={onChange}
                />
                {t("Queer Power")}
            </label>
        </div>
    );
}