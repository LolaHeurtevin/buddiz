"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import MapButtons from "../components/MapButtons";

export default function Home() {
  const mapRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    // Dynamically import leaflet only on client
    import("leaflet").then(L => {
      if (!mounted) return;

      // If a previous map was stored globally (HMR/dev), remove it first
      if (typeof window !== "undefined" && window._leaflet_map) {
        try {
          window._leaflet_map.remove();
        } catch (e) {
          // ignore
        }
        window._leaflet_map = null;
      }

      // Prevent double initialization in same render
      if (mapRef.current) return;

      const map = L.map("map").setView([48.8566, 2.3522], 13);
      mapRef.current = map;
      // Expose for dev/HMR safety
      if (typeof window !== "undefined") window._leaflet_map = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);
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

  return (
    <div id="map" style={{ height: "100vh", width: "100%", position: "relative", overflow: "hidden" }} >
      <MapButtons />
    </div>
  );
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