
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Calendar, FileText, User, Info, AlertTriangle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ContractStatus = 'Draft' | 'Active' | 'Pending' | 'Expired' | 'Terminated';

type Contract = {
  id: string;
  clientName: string;
  startDate: { toDate: () => Date }; // Firestore Timestamp
  endDate: { toDate: () => Date };
  contractDetails: string;
  status: ContractStatus;
  createdAt: { toDate: () => Date };
};

export default function ContractDetailsPage() {
  const params = useParams();
  const contractId = params.contractId as string;
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const contractDocRef = useMemoFirebase(() => {
    if (!firestore || !contractId) return null;
    return doc(firestore, 'contracts', contractId);
  }, [firestore, contractId]);

  const { data: contract, isLoading } = useDoc<Contract>(contractDocRef);

  const handleUpdateStatus = async (newStatus: ContractStatus) => {
    if (!contractDocRef) return;
    setIsUpdating(true);

    const updateData = { status: newStatus };

    updateDoc(contractDocRef, updateData)
        .then(() => {
            toast({
                title: `Contract ${newStatus === 'Active' ? 'Activated' : 'Terminated'}`,
                description: `The contract status has been updated to ${newStatus}.`,
            });
        })
        .catch(async (serverError) => {
            const permissionError = new FirestorePermissionError({
                path: contractDocRef.path,
                operation: 'update',
                requestResourceData: updateData,
            });
            errorEmitter.emit('permission-error', permissionError);
        })
        .finally(() => {
            setIsUpdating(false);
        });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!contract) {
    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2"><AlertTriangle className="text-destructive"/> Contract Not Found</CardTitle>
          <CardDescription>The contract you are looking for does not exist or you may not have permission to view it.</CardDescription>
        </CardHeader>
        <CardContent>
           <Button asChild variant="outline">
                <Link href="/dashboard/logistics">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Logistics
                </Link>
            </Button>
        </CardContent>
      </Card>
    )
  }
  
  const canActivate = contract.status === 'Draft' || contract.status === 'Pending';
  const canTerminate = contract.status === 'Active' || contract.status === 'Pending' || contract.status === 'Draft';

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                 <CardTitle>Contract Details</CardTitle>
                 <CardDescription>Viewing contract ID: {contract.id}</CardDescription>
            </div>
            <Button asChild variant="outline">
                <Link href="/dashboard/logistics">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Logistics
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
            <div className="bg-muted p-3 rounded-full"><User className="h-6 w-6 text-muted-foreground" /></div>
            <div>
                <p className="text-sm text-muted-foreground">Client Name</p>
                <p className="font-semibold text-lg">{contract.clientName}</p>
            </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className="flex items-center gap-4">
                <div className="bg-muted p-3 rounded-full"><Calendar className="h-6 w-6 text-muted-foreground" /></div>
                <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-semibold">{format(contract.startDate.toDate(), 'PPP')}</p>
                </div>
            </div>
             <div className="flex items-center gap-4">
                <div className="bg-muted p-3 rounded-full"><Calendar className="h-6 w-6 text-muted-foreground" /></div>
                <div>
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <p className="font-semibold">{format(contract.endDate.toDate(), 'PPP')}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="bg-muted p-3 rounded-full"><Info className="h-6 w-6 text-muted-foreground" /></div>
                <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant={
                        contract.status === 'Active' ? 'default' :
                        contract.status === 'Pending' ? 'secondary' : 
                        contract.status === 'Draft' ? 'outline' : 'destructive'
                    } className={
                            contract.status === 'Active' ? "bg-green-100 text-green-800" : ''
                    }>
                        {contract.status}
                    </Badge>
                </div>
            </div>
        </div>
         <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><FileText className="h-5 w-5" /> Contract Details</h3>
            <div className="p-4 border rounded-lg bg-muted/50 prose prose-sm dark:prose-invert max-w-none">
                <p>{contract.contractDetails}</p>
            </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
            {canTerminate && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={isUpdating}>
                        {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Terminate Contract
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will terminate the contract. This cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleUpdateStatus('Terminated')}>
                            Confirm Termination
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            {canActivate && (
                <Button onClick={() => handleUpdateStatus('Active')} disabled={isUpdating}>
                    {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Activate Contract
                </Button>
            )}
      </CardFooter>
    </Card>
  );
}
