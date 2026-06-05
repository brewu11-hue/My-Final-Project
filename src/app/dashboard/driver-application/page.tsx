
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send, Phone, Truck, FileText } from 'lucide-react';
import { useState } from 'react';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { errorEmitter, FirestorePermissionError } from '@/firebase';

const formSchema = z.object({
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  vehicleMake: z.string().min(2, { message: 'Please enter the vehicle make.' }),
  vehicleModel: z.string().min(1, { message: 'Please enter the vehicle model.' }),
  licensePlate: z.string().min(3, { message: 'Please enter a valid license plate.' }),
});

export default function DriverApplicationPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
      vehicleMake: '',
      vehicleModel: '',
      licensePlate: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be logged in to submit an application.',
      });
      return;
    }
    setLoading(true);
    
    const driverDocRef = doc(firestore, 'drivers', user.uid);
    const applicationData = {
        phone: values.phone,
        vehicle: {
            make: values.vehicleMake,
            model: values.vehicleModel,
            licensePlate: values.licensePlate
        },
        applicationStatus: 'submitted',
    };

    setDoc(driverDocRef, applicationData, { merge: true })
        .then(() => {
             toast({
                title: 'Application Submitted!',
                description: 'We have received your application and will review it shortly.',
            });
            setLoading(false);
            // Optionally, disable the form or redirect
        })
        .catch(async (serverError) => {
            const permissionError = new FirestorePermissionError({
                path: driverDocRef.path,
                operation: 'update',
                requestResourceData: applicationData,
            });
            errorEmitter.emit('permission-error', permissionError);
            setLoading(false);
      });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText />
            Driver Application
          </CardTitle>
          <CardDescription>
            Complete the form below to finalize your driver application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="e.g., 082 123 4567" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                 <h3 className="text-lg font-medium flex items-center gap-2"><Truck /> Vehicle Information</h3>
                 <div className='p-4 border rounded-lg space-y-4'>
                    <FormField
                    control={form.control}
                    name="vehicleMake"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Vehicle Make</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Toyota" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="vehicleModel"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Vehicle Model</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Hilux" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="licensePlate"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>License Plate Number</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., AB 12 CD GP" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                 </div>
              </div>
              

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Submit Application
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
