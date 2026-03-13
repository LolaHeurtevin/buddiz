"use client";


import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import CustomButton from "@/components/CustomButton";


export default function C() {
    const { t } = useTranslation();
    const pathname = usePathname();
    // Détermine la vue active selon la route
    const currentView = pathname === "/activities" ? "list" : "map";

    return (
        <div className="bg-grey-0 rounded-xl p-2">
            <div className="bg-red-100 flex items-center p-1 rounded-xl w-fit" data-node-id="951:15681">
                {/* List toggle */}
                <CustomButton
                    variant={currentView === "list" ? "icon-toggle-active" : "icon-toggle"}
                    size="icon_small"
                    aria-label={t("activities.list")}
                    href="/activities"
                    data-node-id="list-toggle"
                    className={currentView === "list" ? "bg-red-500 rounded-xl" : "bg-red-100 rounded-xl"}
                >
                    <i
                        className={`bi bi-view-list text-2xl leading-none flex items-center justify-center ${currentView === "list" ? "text-red-100" : "text-red-500"}`}
                        aria-label={t("activities.list")}
                    ></i>
                </CustomButton>
                {/* Map toggle */}

                <CustomButton
                    variant={currentView === "map" ? "icon-toggle-active" : "icon-toggle"}
                    size="icon_small"
                    aria-label={t("activities.map")}
                    href="/"
                    data-node-id="map-toggle"
                    className={currentView === "map" ? "bg-red-500 rounded-xl" : "bg-red-100 rounded-xl"}
                >
                    <i
                        className={`bi bi-map-fill text-2xl leading-none flex items-center justify-center ${currentView === "map" ? "text-red-100" : "text-red-500"}`}
                        aria-label={t("activities.map")}
                    ></i>
                </CustomButton>
            </div>
        </div>
    );
}
