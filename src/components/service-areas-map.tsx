"use client";

import { useEffect, useRef } from "react";

const CITIES = [
  { name: "Edmonton",          lat: 53.5461, lng: -113.4938, isHub: true  },
  { name: "Sherwood Park",     lat: 53.5344, lng: -113.3213, isHub: false },
  { name: "St. Albert",        lat: 53.6306, lng: -113.6253, isHub: false },
  { name: "Spruce Grove",      lat: 53.5450, lng: -113.9003, isHub: false },
  { name: "Leduc",             lat: 53.2585, lng: -113.5500, isHub: false },
  { name: "Beaumont",          lat: 53.3556, lng: -113.4150, isHub: false },
  { name: "Devon",             lat: 53.3636, lng: -113.7378, isHub: false },
  { name: "Morinville",        lat: 53.8006, lng: -113.6450, isHub: false },
  { name: "Fort Saskatchewan", lat: 53.7145, lng: -113.2153, isHub: false },
  { name: "Stony Plain",       lat: 53.5261, lng: -114.0008, isHub: false },
  { name: "Nisku",             lat: 53.3381, lng: -113.5044, isHub: false },
  { name: "Acheson",           lat: 53.5583, lng: -113.8722, isHub: false },
];

export function ServiceAreasMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<ReturnType<typeof import("leaflet")["map"]> | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    import("leaflet").then((L) => {
      if (!containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center:            [53.53, -113.58],
        zoom:              10,
        zoomControl:       true,
        zoomSnap:          0.25,
        scrollWheelZoom:   false,
        attributionControl: true,
      });

      // Frame every service town, with room for the markers and tooltips.
      map.fitBounds(
        L.latLngBounds(CITIES.map((city) => [city.lat, city.lng] as [number, number])),
        { padding: [36, 36] }
      );

      // OpenStreetMap standard tiles: no API key (CARTO's basemaps now need one).
      // Greyed out in CSS (.cliffs-map-tiles) so the red markers stand out.
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        className: "cliffs-map-tiles",
      }).addTo(map);

      CITIES.forEach((city) => {
        const marker = L.circleMarker([city.lat, city.lng], {
          radius:      city.isHub ? 11 : 7,
          fillColor:   "#e81e25",
          color:       "#ffffff",
          weight:      city.isHub ? 3 : 2,
          opacity:     1,
          fillOpacity: city.isHub ? 1 : 0.82,
        }).addTo(map);

        marker.bindTooltip(city.name, {
          permanent:  city.isHub,
          direction:  city.isHub ? "top" : "auto",
          className:  "cliffs-map-tooltip",
          offset:     [0, city.isHub ? -14 : -9],
        });
      });

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden ring-1 ring-black/[0.07] shadow-sm">
      <div ref={containerRef} className="w-full h-[420px] sm:h-[460px]" />
    </div>
  );
}
