
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Users, Building, HardHat, Sparkles, Crown, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const tiers = [
    {
        name: 'Community Member',
        price: 'R275',
        frequency: '/month',
        description: 'Join the movement with reliable, eco-friendly waste collection.',
        features: [
            '6 Bags/Bins Weekly Collection',
            'Real-time App Tracking',
            'Basic Recycling Service',
            'Support Green Jobs'
        ],
        cta: 'Join the Movement',
        icon: Users,
        popular: false,
    },
    {
        name: 'Green Hero Member',
        price: 'R375',
        frequency: '/month',
        description: 'Maximize your impact and enjoy exclusive benefits.',
        features: [
            'Everything in Community +',
            'Priority Scheduling',
            '2 FREE Bulky Item Pickups/Year',
            'Monthly Eco-Impact Report',
            'Earn & Redeem Green Points',
            'TT Green Shop Access',
            'Member-Only Event Invites'
        ],
        cta: 'Become a Green Hero',
        icon: Sparkles,
        popular: true,
    },
     {
        name: 'Eco-Legacy Member',
        price: 'R600',
        frequency: '/month',
        description: 'The ultimate commitment to a sustainable future.',
        features: [
            'Everything in Green Hero +',
            '10 Bags/Bins Weekly',
            '4 FREE Bulky Pickups/Year',
            'Personalized Waste Audit',
            'VIP Plant Tour Experience',
            'Legacy Plaque Recognition'
        ],
        cta: 'Leave a Legacy',
        icon: Crown,
        popular: false,
    },
]

function PricingCard({ tier, popular = false, onSelect }: { tier: any; popular?: boolean; onSelect: (tier: any) => void; }) {
  const Icon = tier.icon;
  return (
    <Card className={`flex flex-col ${popular ? 'border-primary ring-2 ring-primary' : ''}`}>
      <CardHeader className="items-center">
        <div className="bg-primary/10 p-3 rounded-full mb-4">
            <Icon className="w-8 h-8 text-primary" />
        </div>
        <CardTitle>{tier.name}</CardTitle>
        <CardDescription>
          <span className="text-4xl font-bold">{tier.price}</span>
          {tier.frequency && <span className="text-muted-foreground">{tier.frequency}</span>}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow text-center">
        <p className="text-muted-foreground mb-6">{tier.description}</p>
        <ul className="space-y-3 text-left">
          {tier.features.map((feature: string) => (
            <li key={feature} className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-3 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
            className="w-full" 
            size="lg" 
            variant={popular ? 'default' : 'outline'}
            onClick={() => onSelect(tier)}
        >
            {tier.cta}
        </Button>
      </CardFooter>
    </Card>
  );
}


export default function PricingPage() {
    const [selectedTier, setSelectedTier] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleConfirmation = () => {
        if (!selectedTier) return;
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSelectedTier(null);
            toast({
                title: "Subscription Confirmed!",
                description: `You have successfully subscribed to the ${selectedTier.name} plan.`,
            });
        }, 1500);
    }

    return (
        <div className="space-y-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight">Flexible Plans for Every Need</h1>
                <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
                    From single households to large-scale industrial operations, we have a waste solution that fits.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
                {tiers.map(tier => (
                    <PricingCard key={tier.name} tier={tier} popular={tier.popular} onSelect={setSelectedTier} />
                ))}
            </div>

            <Dialog open={!!selectedTier} onOpenChange={(open) => !open && setSelectedTier(null)}>
                <DialogContent className="sm:max-w-md">
                    {selectedTier && (
                        <>
                            <DialogHeader>
                                <DialogTitle>Confirm Your Subscription</DialogTitle>
                                <DialogDescription>
                                    You are about to subscribe to the <strong>{selectedTier.name}</strong> plan for <strong>{selectedTier.price}{selectedTier.frequency}</strong>.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                                <p className="font-semibold text-sm mb-2">This plan includes:</p>
                                <ul className="space-y-2">
                                    {selectedTier.features.map((feature: string) => (
                                        <li key={feature} className="flex items-start text-sm">
                                        <Check className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setSelectedTier(null)} disabled={loading}>Cancel</Button>
                                <Button onClick={handleConfirmation} disabled={loading}>
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Confirm
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
