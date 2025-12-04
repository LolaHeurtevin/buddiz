"use client";

import MapButtons from "../components/MapButtons";
import MarkersInitialization from "@/components/Markers";
import useLeafletMap from "@/lib/leaflet/useLeafletMap";

export default function Home() {
  const { mapRef, isMapReady } = useLeafletMap();

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
      {isMapReady && <MarkersInitialization map={mapRef.current} />}
      <MapButtons />
    </div>
  );
}