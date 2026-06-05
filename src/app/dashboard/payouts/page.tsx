
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Banknote, Landmark, Loader2 } from 'lucide-react';

export default function PayoutsPage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast({ title: 'Success', description: 'Your banking details have been updated.'})
        }, 1500)
    }
  return (
     <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Payout Details</CardTitle>
                <CardDescription>Manage your banking information to receive payments.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
            <CardContent className='space-y-4'>
                 <div className="space-y-2">
                    <Label htmlFor="bank-name">Bank Name</Label>
                    <Input id="bank-name" placeholder="e.g. FNB" />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="acc-holder">Account Holder Name</Label>
                    <Input id="acc-holder" placeholder="e.g. John Driver" />
                 </div>
                  <div className="space-y-2">
                    <Label htmlFor="acc-number">Account Number</Label>
                    <Input id="acc-number" placeholder="e.g. 123456789" />
                 </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch-code">Branch Code</Label>
                    <Input id="branch-code" placeholder="e.g. 250655" />
                 </div>
            </CardContent>
            <CardFooter>
                <Button disabled={loading}>
                    {loading ? <Loader2 className='mr-2 animate-spin' /> : <Landmark className='mr-2' />}
                    Save Banking Details
                </Button>
            </CardFooter>
            </form>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'><Banknote /> Earnings Summary</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
                 <div>
                    <p className='text-sm text-muted-foreground'>Available for Payout</p>
                    <p className='text-3xl font-bold'>R 1,250.75</p>
                </div>
                 <div>
                    <p className='text-sm text-muted-foreground'>Last Payout (2024-07-15)</p>
                    <p className='text-xl font-semibold'>R 4,820.00</p>
                </div>
                 <Button variant='secondary' className='w-full'>View Full Payout History</Button>
            </CardContent>
        </Card>
    </div>
  )
}
