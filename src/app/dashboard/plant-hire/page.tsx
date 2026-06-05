'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Truck, Construction } from 'lucide-react';

const equipment = [
  {
    name: 'Garbage Trucks',
    description: 'Reliable and efficient garbage trucks for large-scale waste collection.',
    imageId: 'garbage-truck',
  },
  {
    name: 'Dump Trucks',
    description: 'Heavy-duty dump trucks for construction debris and bulk material transport.',
    imageId: 'dump-truck',
  },
  {
    name: 'TLB Excavators',
    description: 'Versatile Tractor-Loader-Backhoe (TLB) for excavation and loading tasks.',
    imageId: 'tlb-excavator',
  },
];

export default function PlantHirePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Plant Hire Services</h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
          Rent high-quality, maintained equipment for your waste management and construction needs.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {equipment.map((item) => {
          const placeholder = PlaceHolderImages.find(p => p.id === item.imageId);
          return (
            <Card key={item.name} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  {item.imageId.includes('truck') ? <Truck className="w-8 h-8 text-primary" /> : <Construction className="w-8 h-8 text-primary" />}
                  <CardTitle>{item.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                {placeholder && (
                  <div className="relative h-56 w-full rounded-lg overflow-hidden">
                    <Image
                      src={placeholder.imageUrl}
                      alt={item.name}
                      data-ai-hint={placeholder.imageHint}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/dashboard/plant-hire/request?service=${encodeURIComponent(item.name)}`}>Request a Quote</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
