
'use client';

import { useState } from 'react';
import { useUserRole } from '../layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { FileCheck2, User, Hash, CreditCard, ExternalLink, Sparkles, Users, Crown } from 'lucide-react';

// Mock Data
const proofsOfPayment = [
    { id: 'POP-001', user: 'Jane Doe', date: '2024-07-22', amount: 'R150.00' },
    { id: 'POP-002', user: 'John Smith', date: '2024-07-21', amount: 'R250.00' },
];

const paymentHistory = [
    { id: 'INV-101', date: '2024-06-20', amount: 'R275.00', status: 'Paid' },
    { id: 'INV-102', date: '2024-05-20', amount: 'R275.00', status: 'Paid' },
]

const ResidentView = () => {
    const handleYocoRedirect = (url: string) => {
        window.location.href = url;
    };

  return (
    <div className="grid gap-8 lg:grid-cols-12">
        <Card className="lg:col-span-5">
            <CardHeader>
                <CardTitle>Make a Payment</CardTitle>
                <CardDescription>Select your subscription plan to settle your account via Yoco.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-4">
                    {/* R275 Plan */}
                    <div 
                        className="p-4 border rounded-lg hover:border-primary transition-all cursor-pointer group bg-card"
                        onClick={() => handleYocoRedirect('https://pay.yoco.com/r/4qg00Y')}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-secondary rounded-md">
                                    <Users className="h-4 w-4 text-primary" />
                                </div>
                                <p className="font-semibold">Community Member</p>
                            </div>
                            <p className="text-xl font-bold">R275.00</p>
                        </div>
                        <p className="text-xs text-muted-foreground mb-4">Standard weekly waste collection service.</p>
                        <Button className="w-full" variant="outline">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Pay R275.00
                            <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
                        </Button>
                    </div>

                    {/* R375 Plan */}
                    <div 
                        className="p-4 border rounded-lg hover:border-primary transition-all cursor-pointer group bg-card"
                        onClick={() => handleYocoRedirect('https://pay.yoco.com/r/mdbYlL')}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-primary/20 rounded-md">
                                    <Sparkles className="h-4 w-4 text-primary" />
                                </div>
                                <p className="font-semibold">Green Hero Member</p>
                            </div>
                            <p className="text-xl font-bold">R375.00</p>
                        </div>
                        <p className="text-xs text-muted-foreground mb-4">Priority scheduling & bulky item pickups.</p>
                        <Button className="w-full" variant="outline">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Pay R375.00
                            <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
                        </Button>
                    </div>

                    {/* R600 Plan */}
                    <div 
                        className="p-4 border-2 border-primary/20 rounded-lg hover:border-primary transition-all cursor-pointer group bg-primary/5"
                        onClick={() => handleYocoRedirect('https://pay.yoco.com/r/7135Ee')}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-primary/20 rounded-md">
                                    <Crown className="h-4 w-4 text-primary" />
                                </div>
                                <p className="font-semibold">Eco-Legacy Member</p>
                            </div>
                            <p className="text-xl font-bold">R600.00</p>
                        </div>
                        <p className="text-xs text-muted-foreground mb-4">Ultimate commitment with bulk pickups & audits.</p>
                        <Button className="w-full">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Pay R600.00
                            <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
                        </Button>
                    </div>
                </div>
                
                <div className="p-3 bg-muted rounded text-[10px] text-center text-muted-foreground">
                    Secure checkout powered by Yoco. Payments are processed instantly and your digital receipt will be emailed to you.
                </div>
            </CardContent>
        </Card>
        
        <Card className="lg:col-span-7">
            <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Your recent transactions and service invoices.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Invoice ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {paymentHistory.map((p) => (
                        <TableRow key={p.id}>
                        <TableCell>{p.id}</TableCell>
                        <TableCell>{p.date}</TableCell>
                        <TableCell>{p.amount}</TableCell>
                        <TableCell>
                            <span className="text-green-600 font-semibold">{p.status}</span>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}

const AdminView = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Proof of Payments</CardTitle>
        <CardDescription>View and verify submitted proofs of payment from residents.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Hash className="inline-block h-4 w-4 mr-1" /> ID</TableHead>
              <TableHead><User className="inline-block h-4 w-4 mr-1" /> User</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proofsOfPayment.map((pop) => (
              <TableRow key={pop.id}>
                <TableCell className="font-medium">{pop.id}</TableCell>
                <TableCell>{pop.user}</TableCell>
                <TableCell>{pop.date}</TableCell>
                <TableCell>{pop.amount}</TableCell>
                <TableCell className="text-right">
                    <Button variant='outline' size='sm' className='mr-2'>View</Button>
                    <Button size='sm'><FileCheck2 className='mr-2 h-4 w-4' /> Verify</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}


export default function BillingPage() {
  const { userRole, roleLoading } = useUserRole();

  if (roleLoading) {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <Skeleton className="h-96" />
                <Skeleton className="h-96" />
            </div>
        </div>
    )
  }

  const renderContent = () => {
    switch(userRole) {
        case 'admin':
            return <AdminView />;
        case 'user':
        default:
            return <ResidentView />;
    }
  }

  return renderContent();
}
