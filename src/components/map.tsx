"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { TruckIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

type Truck = {
  id: string;
  position: { lat: number; lng: number };
};

type Municipality = {
  name: string;
  center: { lat: number; lng: number };
}

const municipalities: { [key: string]: Municipality } = {
  ekurhuleni: { name: 'Ekurhuleni', center: { lat: -26.2041, lng: 28.2403 } },
  emfuleni: { name: 'Emfuleni', center: { lat: -26.673, lng: 27.826 } },
};


const generateInitialTrucks = (center: {lat: number, lng: number}): Truck[] => {
  return [
    { id: 'truck-1', position: { lat: center.lat + 0.05, lng: center.lng - 0.05 } },
    { id: 'truck-2', position: { lat: center.lat - 0.05, lng: center.lng + 0.05 } },
    { id: 'truck-3', position: { lat: center.lat, lng: center.lng } },
  ]
};

// Simple simulation of truck movement
const moveTruck = (truck: Truck): Truck => {
  return {
    ...truck,
    position: {
      lat: truck.position.lat + (Math.random() - 0.5) * 0.01,
      lng: truck.position.lng + (Math.random() - 0.5) * 0.01,
    },
  };
};

export function TrackingMap({ center }: { center: {lat: number, lng: number} }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [trucks, setTrucks] = useState<Truck[]>(generateInitialTrucks(center));

  useEffect(() => {
    setTrucks(generateInitialTrucks(center));
  }, [center]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrucks(currentTrucks => currentTrucks.map(moveTruck));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center h-full bg-muted rounded-lg border-2 border-dashed">
        <div className="text-center text-muted-foreground">
          <p className="font-semibold">Map not available</p>
          <p className="text-sm">Google Maps API Key is missing.</p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        key={center.lat + '-' + center.lng} // Force re-render on center change
        defaultCenter={center}
        defaultZoom={11}
        mapId="tt_cleancities_map"
        className="w-full h-full rounded-lg"
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {trucks.map(truck => (
          <AdvancedMarker key={truck.id} position={truck.position}>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-primary-foreground shadow-md">
                <TruckIcon className="w-4 h-4 text-primary-foreground" />
            </div>
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
}