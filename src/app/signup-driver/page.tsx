
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
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
import { Loader2, UserPlus, Mail, Lock, User } from 'lucide-react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { errorEmitter, FirestorePermissionError } from '@/firebase';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  displayName: z.string().min(2, { message: 'Name is too short.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions.',
  }),
  driverAgreement: z.boolean().refine((val) => val === true, {
    message: 'You must accept the Partner Driver Agreement.',
  }),
});

export default function SignupDriverPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      terms: false,
      driverAgreement: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const auth = getAuth();
    const db = getFirestore();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: values.displayName,
      });

      // Create a document in the 'drivers' collection
      const driverDocRef = doc(db, 'drivers', user.uid);
      const driverData = {
        id: user.uid,
        firstName: values.displayName.split(' ')[0],
        lastName: values.displayName.split(' ').slice(1).join(' '),
        email: values.email,
        role: 'driver', // Assign the driver role
      };

      await setDoc(driverDocRef, driverData).catch((err) => {
        if (err.code === 'permission-denied') {
          throw new FirestorePermissionError({
            path: driverDocRef.path,
            operation: 'create',
            requestResourceData: driverData,
          });
        }
        throw err;
      });
      
      toast({
          title: 'Driver Account Created',
          description: "Welcome! Let's get your application started.",
      });
      router.push('/dashboard/driver-application');

    } catch (error: any) {
      console.error("Auth or Firestore Error:", error);
      
      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (error instanceof FirestorePermissionError) {
        errorEmitter.emit('permission-error', error);
        errorMessage = 'You do not have permission to create this driver account.';
      }

      toast({
          variant: 'destructive',
          title: 'Sign Up Failed',
          description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
           <div className="mx-auto mb-2">
            <Icons.Logo className="w-12 h-12 text-primary" />
          </div>
          <CardTitle>Become a Partner Driver</CardTitle>
          <CardDescription>
            Join our network and start earning.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="e.g. John Driver"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                       <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                           className="pl-10"
                        />
                       </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                       <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                           className="pl-10"
                        />
                       </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                         I agree to the{' '}
                        <Link href="/terms" className="text-primary hover:underline" target="_blank">
                           Terms and Conditions
                        </Link>
                      </FormLabel>
                       <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="driverAgreement"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                         I agree to the{' '}
                        <Link href="/driver-agreement" className="text-primary hover:underline" target="_blank">
                           Partner Driver Agreement
                        </Link>
                      </FormLabel>
                       <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <UserPlus className="mr-2 h-4 w-4" />
                )}
                Sign Up as Driver
              </Button>
            </form>
          </Form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Looking to request a service?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Sign up as a user
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
