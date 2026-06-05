'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import {
  Loader2,
  Send,
  CalendarIcon,
  Package,
  FileText,
  Weight,
  Scaling,
  Badge,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import Link from 'next/link';
import { useFirestore, useCollection, useMemoFirebase, WithId, useUser, addDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { emailServiceRequest } from '@/app/actions/email-actions';

const quoteFormSchema = z.object({
  origin: z.string().min(3, 'Origin is required.'),
  destination: z.string().min(3, 'Destination is required.'),
  shipmentDate: z.date({ required_error: 'A shipment date is required.' }),
  goodsType: z.string().min(3, 'Type of goods is required.'),
  weight: z.string().min(1, 'Weight is required.'),
  dimensions: z.string().min(3, 'Dimensions are required.'),
  specialInstructions: z.string().optional(),
});

function LogisticsQuoteForm() {
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();
  const [loading, setLoading] = useState(false);
  
  const form = useForm<z.infer<typeof quoteFormSchema>>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      origin: '',
      destination: '',
      goodsType: '',
      weight: '',
      dimensions: '',
      specialInstructions: '',
    },
  });

  async function onSubmit(values: z.infer<typeof quoteFormSchema>) {
    if (!user || !firestore) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please sign in to request a quote.",
      });
      return;
    }

    setLoading(true);
    
    const requestData = {
      userId: user.uid,
      userName: user.displayName,
      userEmail: user.email,
      type: 'Logistics Quote',
      origin: values.origin,
      destination: values.destination,
      shipmentDate: values.shipmentDate.toISOString(),
      goodsType: values.goodsType,
      weight: values.weight,
      dimensions: values.dimensions,
      specialInstructions: values.specialInstructions || '',
      status: 'pending_quote',
      createdAt: serverTimestamp(),
    };

    try {
      // 1. Save to Firestore (as a generic service request for tracking)
      const requestsCol = collection(firestore, 'users', user.uid, 'serviceRequests');
      addDocumentNonBlocking(requestsCol, {
        ...requestData,
        location: `${values.origin} to ${values.destination}`,
        wasteType: `Logistics: ${values.goodsType}`,
      });

      // 2. Email the company
      await emailServiceRequest({
        ...requestData,
        type: 'LOGISTICS_QUOTE_REQUEST',
      });

      toast({
        title: 'Quote Request Emailed!',
        description: 'Our logistics team has been notified via email and will get back to you shortly.',
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send quote request. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
      <Card>
        <CardHeader>
          <CardTitle>Request a Logistics Quote</CardTitle>
          <CardDescription>Fill out the form below to get a customized quote for your shipment.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6 items-end">
                     <FormField
                        control={form.control}
                        name="origin"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Origin</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Johannesburg, SA" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Destination</FormLabel>
                             <FormControl>
                                <Input placeholder="e.g., Cape Town, SA" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="shipmentDate"
                    render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Preferred Shipment Date</FormLabel>
                        <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                            <Button
                                variant={"outline"}
                                className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                                )}
                            >
                                {field.value ? (
                                format(field.value, "PPP")
                                ) : (
                                <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            />
                        </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="goodsType"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Type of Goods</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Palletized Goods, Machinery, Bulk Materials" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total Weight (kg)</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Weight className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input type="number" placeholder="e.g., 5000" {...field} className="pl-10" />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dimensions"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dimensions (L x W x H in meters)</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Scaling className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="e.g., 2.4 x 2.4 x 2.6" {...field} className="pl-10" />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="specialInstructions"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Special Instructions or Requirements</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="e.g., Requires temperature control, fragile items, specific delivery window."
                                {...field}
                                rows={4}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                    <Send className="mr-2 h-4 w-4" />
                    )}
                    Request Quote
                </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
}

type Contract = {
  clientName: string;
  startDate: { toDate: () => Date }; // Firestore Timestamp
  status: 'Draft' | 'Active' | 'Pending' | 'Expired';
  createdAt: { toDate: () => Date };
};

function ManageContracts() {
    const firestore = useFirestore();
    
    const contractsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'contracts'), orderBy('createdAt', 'desc'));
    }, [firestore]);

    const { data: contracts, isLoading } = useCollection<Contract>(contractsQuery);

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Manage Contracts</CardTitle>
                    <CardDescription>View and manage all your logistics contracts.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (!contracts || contracts.length === 0) {
         return (
            <Card>
                <CardHeader>
                    <CardTitle>Manage Contracts</CardTitle>
                    <CardDescription>View and manage all your logistics contracts.</CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground py-12">
                     <p>No contracts found.</p>
                     <p>Create your first contract to get started.</p>
                </CardContent>
                 <CardFooter>
                    <Button asChild>
                      <Link href="/dashboard/logistics/new-contract">
                        <FileText className='mr-2' /> Create New Contract
                      </Link>
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Manage Contracts</CardTitle>
                <CardDescription>View and manage all your logistics contracts.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Contract ID</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contracts.map((contract) => (
                        <TableRow key={contract.id}>
                            <TableCell className="font-medium truncate max-w-24">{contract.id}</TableCell>
                            <TableCell>{contract.clientName}</TableCell>
                            <TableCell>{format(contract.startDate.toDate(), 'PPP')}</TableCell>
                            <TableCell>
                                <Badge variant={
                                    contract.status === 'Active' ? 'default' :
                                    contract.status === 'Pending' ? 'secondary' : 
                                    contract.status === 'Draft' ? 'outline' : 'destructive'
                                } className={
                                     contract.status === 'Active' ? "bg-green-100 text-green-800" : ''
                                }>
                                    {contract.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/dashboard/logistics/contracts/${contract.id}`}>
                                    View Details
                                  </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
             <CardFooter>
                <Button asChild>
                  <Link href="/dashboard/logistics/new-contract">
                    <FileText className='mr-2' /> Create New Contract
                  </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function LogisticsPage() {
  return (
    <Tabs defaultValue="contracts">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="quotations">
          <Package className="mr-2 h-4 w-4" />
          Quotations
        </TabsTrigger>
        <TabsTrigger value="contracts">
          <FileText className="mr-2 h-4 w-4" />
          Manage Contracts
        </TabsTrigger>
      </TabsList>
      <TabsContent value="quotations" className="mt-4">
        <LogisticsQuoteForm />
      </TabsContent>
      <TabsContent value="contracts" className="mt-4">
        <ManageContracts />
      </TabsContent>
    </Tabs>
  );
}
