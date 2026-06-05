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
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
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
  CalendarIcon,
  User,
  FileText,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import Link from 'next/link';
import { useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const contractFormSchema = z.object({
  clientName: z.string().min(3, 'Client name is required.'),
  startDate: z.date({ required_error: 'A start date is required.' }),
  endDate: z.date({ required_error: 'An end date is required.' }),
  contractDetails: z.string().min(10, 'Please provide some contract details.'),
}).refine((data) => data.endDate > data.startDate, {
    message: "End date cannot be earlier than start date.",
    path: ["endDate"],
});


export default function NewContractPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const firestore = useFirestore();
  const router = useRouter();

  const form = useForm<z.infer<typeof contractFormSchema>>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
        clientName: '',
        contractDetails: '',
    },
  });

  function onSubmit(values: z.infer<typeof contractFormSchema>) {
    if (!firestore) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not connect to the database.',
        });
        return;
    }
    setLoading(true);

    const contractsCollection = collection(firestore, 'contracts');
    const contractData = {
        ...values,
        status: 'Draft',
        createdAt: serverTimestamp(),
    };

    const resourceDataForError = {
      ...values,
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
      status: 'Draft',
      createdAt: 'SERVER_TIMESTAMP', // Placeholder for error reporting
    };

    addDoc(contractsCollection, contractData)
        .then(() => {
            toast({
                title: 'Contract Created!',
                description: `A new contract for ${values.clientName} has been drafted.`,
            });
            router.push('/dashboard/logistics');
        })
        .catch(async (serverError) => {
            const permissionError = new FirestorePermissionError({
                path: contractsCollection.path,
                operation: 'create',
                requestResourceData: resourceDataForError,
            });
            errorEmitter.emit('permission-error', permissionError);
        })
        .finally(() => {
            setLoading(false);
        });
  }

  return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Create New Logistics Contract</span>
             <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/logistics">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Logistics
                </Link>
            </Button>
          </CardTitle>
          <CardDescription>Fill out the form below to create a new contract for a client.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Client Name</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="e.g., Mining Corp A" {...field} className="pl-10" />
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Contract Start Date</FormLabel>
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
                                    <span>Pick a start date</span>
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
                        name="endDate"
                        render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Contract End Date</FormLabel>
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
                                    <span>Pick an end date</span>
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
                                initialFocus
                                />
                            </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                
                 <FormField
                    control={form.control}
                    name="contractDetails"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Contract Details & Terms</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Specify the services, rates, and any special terms for this contract."
                                {...field}
                                rows={6}
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
                    <FileText className="mr-2 h-4 w-4" />
                    )}
                    Create Contract Draft
                </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
}
