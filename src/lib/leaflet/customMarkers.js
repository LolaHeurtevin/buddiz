"use client";

export async function createBlackIcon() {
  const L = await import("leaflet");

  const BlackIcon = L.Icon.extend({
    options: {
      iconSize: [24, 32],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38],
    }
  });

  return new BlackIcon({ iconUrl: "/icons/marker.png" });
}

