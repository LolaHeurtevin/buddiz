"use client";

import FilterAndCreationButtons from "../components/Activities/FilterAndCreationButtons";
import MarkersInitialization from "@lib/leaflet/markersInitialisation";
import useLeafletMap from "@/lib/leaflet/useLeafletMap";
import { useEffect, useState } from "react";
import ActivityCard from "@/components/Activities/ActivityCard";
import ActivityViewSwitcher from "@components/Activities/ActivityViewSwitcher";

export default function Home() {
  const { mapRef, isMapReady } = useLeafletMap();
  const [selectedActivity, setSelectedActivity] = useState(null);

  return (
    <div
      id="map"
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >

      {isMapReady && <MarkersInitialization map={mapRef.current} onSelectActivity={(activity) => setSelectedActivity(activity)} />}
      {/* Switcher positionné en bas à droite, responsive */}
      <div className="fixed bottom-24 right-4 z-[9999] md:bottom-28 md:right-8">
        <ActivityViewSwitcher />
      </div>
      <FilterAndCreationButtons />

      {selectedActivity && (
        <>
          {/* Overlay pour fermer la card en cliquant hors de la card */}
          <div
            className="fixed inset-0 z-[9998] bg-black/0 cursor-pointer"
            onClick={() => setSelectedActivity(null)}
            aria-label="Fermer la fiche activité"
          />
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-md">
            <ActivityCard activity={selectedActivity} />
          </div>
        </>
      )}

    </div>
  );
}