
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Mountain, HardHat, Truck, Zap, Settings, ShieldCheck, Leaf, BrainCircuit, BarChart, CheckCircle, Award, Clock, Star, Gift, Target, Calendar, Package, Combine, Tags } from 'lucide-react';

const packageDeals = [
    {
        title: "Drill-Blast-Load-Haul Package",
        price: "R 95-140/ton",
        features: ["All-inclusive service", "Drilling, blasting, loading, hauling", "Minimum 50,000 tons/month"],
        icon: Mountain,
    }
]

const productionServices = [
    {
        title: "Production Drilling",
        description: "High-performance blast hole drilling for production blasting.",
        rate: "R 800-1,200/meter",
        details: [
            { label: "Equipment", value: "Sandvik/Atlas Copco drill rigs" },
            { label: "Capacity", value: "150-300mm diameter, 15-25m depth" },
            { label: "Output", value: "150-400 meters/day" },
            { label: "Includes", value: "Operator, fuel, bits, rods" },
            { label: "Booking", value: "7 days notice minimum" },
        ],
        icon: HardHat,
    },
    {
        title: "ADT Haulage Services",
        description: "Efficient material transport in open pit environments.",
        rate: "R 350/hour",
        details: [
            { label: "Equipment", value: "Bell B40E/B50E ADTs" },
            { label: "Capacity", value: "40-50 tons per load" },
            { label: "Speed", value: "25-35km/h loaded" },
            { label: "Includes", value: "Driver, fuel, insurance" },
            { label: "Availability", value: "24/7 with booking (4-hour min)" },
        ],
        icon: Truck,
    },
]

const equipmentRental = [
    { name: 'Excavator + Operator', price: 'R 55,000/month' },
    { name: 'ADT + Driver', price: 'R 45,000/month' },
    { name: 'Drill Rig + Crew', price: 'R 95,000/month' },
];

const fullMineDev = {
    title: "Full Mine Development",
    price: "R 1.2M - 1.8M/month",
    description: "Turnkey development solutions for new mining projects.",
    features: ["All equipment included", "Skilled labor and management", "3-6 month contracts"],
    icon: Settings
}

const emergencyServices = [
    { name: "Emergency Blasting", price: "R 25,000+", details: "4-hour response" },
    { name: "Equipment Breakdown", price: "R 550/hour", details: "24/7 support" },
    { name: "Pit Wall Stabilization", price: "R 35,000+", details: "Urgent intervention" },
    { name: "Flood Emergency", price: "R 45,000+", details: "Immediate deployment" },
]

const valueAddedServices = [
    {
        category: "Mine Optimization",
        icon: BrainCircuit,
        services: ["Haulage optimization", "Equipment utilization analysis", "Fuel efficiency consulting", "Production bottleneck analysis"]
    },
    {
        category: "Digital Mining Services",
        icon: BarChart,
        services: ["Fleet tracking systems", "Production monitoring", "Real-time reporting", "Predictive maintenance"]
    },
    {
        category: "Sustainable Mining",
        icon: Leaf,
        services: ["Water recycling systems", "Energy efficiency audits", "Carbon footprint reduction", "Social license consulting"]
    }
]


const detailedEquipment = {
    "Excavators": [
        { name: "CAT 336F (36 ton)", rate: "R 28,000/month" },
        { name: "CAT 349F (50 ton)", rate: "R 38,000/month" },
        { name: "CAT 390F (90 ton)", rate: "R 52,000/month" },
    ],
    "Dump Trucks": [
        { name: "Bell B40E (40 ton ADT)", rate: "R 32,000/month" },
        { name: "Bell B50E (50 ton ADT)", rate: "R 38,000/month" },
        { name: "CAT 777 (100 ton RDT)", rate: "R 65,000/month" },
    ],
    "Drill Rigs": [
        { name: "Sandvik DP1500 (DTH)", rate: "R 45,000/month" },
        { name: "Atlas Copco ROC L8 (Rotary)", rate: "R 58,000/month" },
    ],
    "Support Equipment": [
        { name: "CAT D8T Dozer", rate: "R 26,000/month" },
        { name: "CAT 16M Grader", rate: "R 22,000/month" },
        { name: "30kL Water Bowser", rate: "R 18,000/month" },
    ]
}

const whyChooseUs = [
    { text: "B-BBEE Level 1 Youth-Owned", icon: Award },
    { text: "Certified Blasting & ADT Operators", icon: HardHat },
    { text: "24/7 Emergency Response", icon: Clock },
    { text: "Modern Fleet (2018+ Equipment)", icon: Truck },
    { text: "Real-time Tracking & Reporting", icon: BarChart },
    { text: "Competitive Rates", icon: Tags },
    { text: "Safety-First Approach", icon: ShieldCheck }
]

const specialOffers = [
    {
        title: "New Mine Special",
        icon: Target,
        items: ["First month 15% discount", "Free blast design consultation", "Free safety audit"]
    },
    {
        title: "Long-Term Contracts",
        icon: Calendar,
        items: ["6+ months: 10% discount", "12+ months: 15% discount", "Includes free maintenance"]
    },
    {
        title: "Bundled Services",
        icon: Combine,
        items: ["Drilling + Blasting: 8% discount", "Equipment + Operator: 12% discount", "Full Package: 15% discount"]
    }
]


export default function DrillingBlastingPage() {
    const rigImage = PlaceHolderImages.find(p => p.id === 'drilling-rig');
    return (
        <div className="space-y-8">
             <div className="relative rounded-xl overflow-hidden h-64 md:h-80 w-full">
                {rigImage && (
                <Image
                    src={rigImage.imageUrl}
                    alt={rigImage.description}
                    data-ai-hint={rigImage.imageHint}
                    fill
                    className="object-cover"
                />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Drilling &amp; Blasting Services</h1>
                    <p className="text-lg text-white/90 mt-2 max-w-3xl">
                        Comprehensive solutions for surface mining, from initial development to production and optimization.
                    </p>
                </div>
            </div>

            {/* Package Deals */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {packageDeals.map(deal => (
                     <Card key={deal.title} className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <deal.icon className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <CardTitle>{deal.title}</CardTitle>
                                    <CardDescription className="text-2xl font-bold text-foreground">{deal.price}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                             <ul className="space-y-2">
                                {deal.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                         <CardFooter>
                            <Button className="w-full" asChild>
                                <Link href={`/dashboard/drilling-blasting/request?service=${encodeURIComponent(deal.title)}`}>Request This Package</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
                <Card className="flex flex-col">
                    <CardHeader>
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <fullMineDev.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <CardTitle>{fullMineDev.title}</CardTitle>
                                <CardDescription className="text-2xl font-bold text-foreground">{fullMineDev.price}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <ul className="space-y-2">
                            {fullMineDev.features.map(feature => (
                                <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                     <CardFooter>
                        <Button className="w-full" asChild>
                            <Link href={`/dashboard/drilling-blasting/request?service=${encodeURIComponent(fullMineDev.title)}`}>Discuss Project</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            
            {/* Production Services */}
             <div className="grid md:grid-cols-2 gap-8">
                {productionServices.map(service => (
                    <Card key={service.title}>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <service.icon className="w-8 h-8 text-primary" />
                                <div>
                                    <CardTitle>{service.title}</CardTitle>
                                    <CardDescription>{service.description}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-2xl font-bold">{service.rate}</div>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                {service.details.map(detail => (
                                    <li key={detail.label}><span className="font-semibold text-foreground">{detail.label}:</span> {detail.value}</li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                             <Button variant="secondary" className="w-full" asChild>
                                <Link href={`/dashboard/drilling-blasting/request?service=${encodeURIComponent(service.title)}`}>Book Service</Link>
                             </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Equipment Rental */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">Equipment Rental Price List</CardTitle>
                    <CardDescription>Monthly rates for our core fleet. Operator, fuel, and maintenance included.</CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(detailedEquipment).map(([category, items]) => (
                        <div key={category} className="space-y-3">
                            <h3 className="font-semibold text-lg">{category}</h3>
                            <div className="flex flex-col gap-2">
                                {items.map(item => (
                                    <div key={item.name} className="flex justify-between items-baseline p-2 bg-muted rounded-md">
                                        <span className="text-sm text-muted-foreground">{item.name}</span>
                                        <span className="font-semibold text-sm">{item.rate}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>


            {/* Value Added & Emergency */}
            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Optimization &amp; Digital Services</CardTitle>
                        <CardDescription>Enhance your operation with our expert consulting and technology solutions.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {valueAddedServices.map(cat => (
                            <div key={cat.category}>
                                <h3 className="font-semibold flex items-center gap-2 mb-2"><cat.icon className="w-5 h-5 text-primary"/> {cat.category}</h3>
                                <ul className="space-y-1 list-disc list-inside text-muted-foreground text-sm">
                                    {cat.services.map(s => <li key={s}>{s}</li>)}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card className="border-destructive bg-destructive/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive">
                           <Zap /> Emergency Services
                        </CardTitle>
                        <CardDescription className="text-destructive/90">Rapid response for critical situations.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableBody>
                                {emergencyServices.map(service => (
                                    <TableRow key={service.name}>
                                        <TableCell>
                                            <p className="font-medium">{service.name}</p>
                                            <p className="text-xs text-muted-foreground">{service.details}</p>
                                        </TableCell>
                                        <TableCell className="text-right font-semibold">{service.price}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                     <CardFooter>
                        <Button variant="destructive" className="w-full" asChild>
                            <a href="tel:0714683849">Call Emergency Line</a>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
             <div className="grid lg:grid-cols-3 gap-8 items-start">
                <Card className="lg:col-span-1 bg-secondary/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Star className="text-primary" /> Why Choose TT Mining Operations?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {whyChooseUs.map(item => (
                                <li key={item.text} className="flex items-start gap-3">
                                    <item.icon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                         <CardTitle className="flex items-center gap-2">
                           <Gift className="text-primary" /> Special Offers &amp; Discounts
                        </CardTitle>
                        <CardDescription>Take advantage of our competitive promotions.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {specialOffers.map(offer => (
                            <div key={offer.title} className="p-4 bg-muted/50 rounded-lg">
                                <h3 className="font-semibold flex items-center gap-2 mb-2">
                                    <offer.icon className="w-5 h-5 text-primary"/> {offer.title}
                                </h3>
                                <ul className="space-y-1 list-disc list-inside text-muted-foreground text-sm">
                                    {offer.items.map(i => <li key={i}>{i}</li>)}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter>
                        <Button asChild>
                            <Link href="/dashboard/drilling-blasting/request">Immediate Action</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

    