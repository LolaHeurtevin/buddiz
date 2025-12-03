"use client";
import L from "leaflet";

export function createBlackIcon() {
  const BlackIcon = L.Icon.extend({
    options: {
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38],
    }
  });

  return new BlackIcon({ iconUrl: "/icons/marker.png" });
}

