"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function useLeafletMap() {
  const mapRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    import("leaflet").then(L => {
      if (!mounted) return;

      if (typeof window !== "undefined" && window._leaflet_map) {
        try { window._leaflet_map.remove(); } catch (e) {}
        window._leaflet_map = null;
      }

      if (mapRef.current) return;

      const initializeMap = (lat, lon) => {
        const map = L.map("map").setView([lat, lon], 13);
        mapRef.current = map;

        if (typeof window !== "undefined") window._leaflet_map = map;

        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: "abcd",
            maxZoom: 20,
          }
        ).addTo(map);

        setIsMapReady(true);
      };

      // géolocalisation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          pos => initializeMap(pos.coords.latitude, pos.coords.longitude),
          () => initializeMap(48.8566, 2.3522) // fallback Paris
        );
      } else {
        initializeMap(48.8566, 2.3522);
      }
    });

    return () => {
      mounted = false;

      if (mapRef.current) {
        try { mapRef.current.remove(); } catch (e) {}
        mapRef.current = null;
      }

      if (typeof window !== "undefined" && window._leaflet_map) {
        try { window._leaflet_map.remove(); } catch (e) {}
        window._leaflet_map = null;
      }
    };
  }, []);

  return { mapRef, isMapReady };
}

// https://leaflet-extras.github.io/leaflet-providers/preview/
/* CARTE LEAFLET DE BASE CartoDB.VoyagerLabelsUnder
  var CartoDB_VoyagerLabelsUnder = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});
*/

/* CARTE LEAFLET DARK MODE CartoDB.DarkMatter
  var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});
*/
