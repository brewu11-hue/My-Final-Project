"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrackingMap } from "@/components/map";
import { Button } from "@/components/ui/button";

type Municipality = {
  name: string;
  center: { lat: number; lng: number };
}

const municipalities: { [key: string]: Municipality } = {
  ekurhuleni: { name: 'City of Ekurhuleni Metropolitan Municipality', center: { lat: -26.2041, lng: 28.2403 } },
  emfuleni: { name: 'Emfuleni Local Municipality', center: { lat: -26.673, lng: 27.826 } },
  johannesburg: { name: 'City of Johannesburg Metropolitan Municipality', center: { lat: -26.2041, lng: 28.0473 } },
  fetakgomo: { name: 'Fetakgomo Tubatse Local Municipality', center: { lat: -24.468, lng: 29.896 } },
};

export default function TrackingPage() {
  const [activeMunicipality, setActiveMunicipality] = useState<Municipality>(municipalities.ekurhuleni);

  return (
    <div className="h-[calc(100vh-10rem)] w-full flex flex-col gap-4">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Real-Time Truck Tracking</CardTitle>
            <CardDescription>
              Live location of active trucks in {activeMunicipality.name}.
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={activeMunicipality.name === municipalities.ekurhuleni.name ? 'default' : 'outline'}
              onClick={() => setActiveMunicipality(municipalities.ekurhuleni)}
              className="whitespace-nowrap"
            >
              City of Ekurhuleni
            </Button>
            <Button 
              variant={activeMunicipality.name === municipalities.emfuleni.name ? 'default' : 'outline'}
              onClick={() => setActiveMunicipality(municipalities.emfuleni)}
              className="whitespace-nowrap"
            >
              Emfuleni
            </Button>
            <Button 
              variant={activeMunicipality.name === municipalities.johannesburg.name ? 'default' : 'outline'}
              onClick={() => setActiveMunicipality(municipalities.johannesburg)}
              className="whitespace-nowrap"
            >
              City of Johannesburg
            </Button>
            <Button 
              variant={activeMunicipality.name === municipalities.fetakgomo.name ? 'default' : 'outline'}
              onClick={() => setActiveMunicipality(municipalities.fetakgomo)}
              className="whitespace-nowrap"
            >
              Fetakgomo Tubatse
            </Button>
          </div>
        </CardHeader>
      </Card>
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 p-0 pb-4 px-4 md:px-6 h-full">
          <TrackingMap center={activeMunicipality.center} />
        </CardContent>
      </Card>
    </div>
  );
}
