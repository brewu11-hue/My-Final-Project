
"use client";

import { useState, useEffect, useMemo } from "react";
import {
  CreditCard,
  Map,
  ClipboardCheck,
  Briefcase,
  Check,
  LogIn,
  LogOut,
  Timer,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { format, formatDistance } from "date-fns";
import { useUser, useFirestore, useDoc, useMemoFirebase, errorEmitter, FirestorePermissionError } from "@/firebase";
import { doc, setDoc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";


const newCollectionRequests = [
  { id: "REQ-015", location: "123 Market St", volume: "2m³" },
  { id: "REQ-016", location: "456 Downtown Ave", volume: "5m³" },
];

type Shift = {
    startTime: Timestamp;
    endTime?: Timestamp;
    status: 'active' | 'completed';
    driverName: string;
    driverId: string;
}

export default function DriverDashboardPage() {
  const { toast } = useToast();
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const [isToggling, setIsToggling] = useState(false);

  const driverDocRef = useMemoFirebase(() => {
      if (!user || !firestore) return null;
      return doc(firestore, 'drivers', user.uid);
  }, [user, firestore]);

  const { data: driverData, isLoading: driverLoading } = useDoc<{
      currentShift?: Shift;
      shiftHistory?: Shift[];
      role?: string;
  }>(driverDocRef);

  const isClockedIn = driverData?.currentShift?.status === 'active';
  const clockInTime = driverData?.currentShift?.startTime?.toDate();

  const handleClockToggle = () => {
    if (!driverDocRef || !user) return;
    setIsToggling(true);

    if (isClockedIn) {
      // Clocking out
      const completedShift = {
        ...driverData?.currentShift,
        endTime: Timestamp.now(),
        status: 'completed',
      };
      const updateData = {
        currentShift: null,
        shiftHistory: arrayUnion(completedShift),
      };
      updateDoc(driverDocRef, updateData)
        .then(() => {
          toast({
            title: 'Clocked Out',
            description: `Your shift has ended. Great work!`,
          });
        })
        .catch(async (serverError) => {
          const permissionError = new FirestorePermissionError({
            path: driverDocRef.path,
            operation: 'update',
            requestResourceData: updateData,
          });
          errorEmitter.emit('permission-error', permissionError);
        })
        .finally(() => {
          setIsToggling(false);
        });
    } else {
      // Clocking in
      const setData = {
        currentShift: {
          startTime: Timestamp.now(),
          status: 'active',
          driverName: user.displayName,
          driverId: user.uid,
        },
        // Ensure the role is set, which is required by security rules on create.
        // This makes the clock-in operation idempotent and robust.
        role: 'driver',
      };
      setDoc(driverDocRef, setData, { merge: true })
        .then(() => {
          toast({
            title: 'Clocked In',
            description: `Your shift has started. Have a safe drive!`,
          });
        })
        .catch(async (serverError) => {
          const permissionError = new FirestorePermissionError({
            path: driverDocRef.path,
            operation: 'update', // Using 'update' for set with merge:true
            requestResourceData: setData,
          });
          errorEmitter.emit('permission-error', permissionError);
        })
        .finally(() => {
          setIsToggling(false);
        });
    }
  };

  const sortedShiftHistory = useMemo(() => {
    if (!driverData?.shiftHistory) return [];
    // Firestore Timestamps can be compared directly
    // @ts-ignore
    return [...driverData.shiftHistory].sort((a, b) => b.startTime.seconds - a.startTime.seconds);
  }, [driverData?.shiftHistory]);

  const isLoading = userLoading || driverLoading;

  if (isLoading && !driverData) {
      return (
          <div className="space-y-6">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-64 w-full" />
              <div className="grid gap-6 md:grid-cols-2">
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-40 w-full" />
              </div>
          </div>
      )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="flex items-center gap-2"><Timer /> Shift Management</CardTitle>
                    <CardDescription>
                        {isClockedIn ? "You are currently on the clock." : "Start your shift to begin receiving requests."}
                    </CardDescription>
                </div>
                {user && (
                    <div className="flex items-center gap-3 text-right">
                         <div>
                            <p className="font-semibold">{user.displayName}</p>
                            <p className="text-sm text-muted-foreground">Partner Driver</p>
                        </div>
                        <UserIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                )}
            </div>
        </CardHeader>
        <CardContent>
           {isClockedIn && clockInTime ? (
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                    <LogIn className="h-6 w-6 text-green-600 dark:text-green-300" />
                </div>
                <div>
                    <p className="font-semibold text-green-700 dark:text-green-300">Currently Clocked In</p>
                    <p className="text-sm text-muted-foreground">
                        Shift started at {format(clockInTime, "PPP p")}
                    </p>
                </div>
            </div>
          ) : (
             <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                 <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                    <LogOut className="h-6 w-6 text-red-600 dark:text-red-300" />
                </div>
                <div>
                    <p className="font-semibold text-red-700 dark:text-red-300">Currently Clocked Out</p>
                    <p className="text-sm text-muted-foreground">
                        Clock in to start your work day.
                    </p>
                </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
            <Button 
                onClick={handleClockToggle} 
                className="w-full sm:w-auto"
                variant={isClockedIn ? "destructive" : "default"}
                disabled={isToggling || isLoading}
            >
              {isClockedIn ? (
                <>
                  <LogOut className="mr-2" /> Clock Out
                </>
              ) : (
                <>
                  <LogIn className="mr-2" /> Clock In
                </>
              )}
            </Button>
        </CardFooter>
      </Card>
      
      {sortedShiftHistory.length > 0 && (
        <Card>
            <CardHeader>
                <CardTitle>Recent Shifts</CardTitle>
                <CardDescription>Your last 5 completed shifts.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Clock In</TableHead>
                            <TableHead>Clock Out</TableHead>
                            <TableHead>Duration</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedShiftHistory.slice(0, 5).map((shift, index) => {
                            const startTime = shift.startTime.toDate();
                            const endTime = shift.endTime?.toDate();
                            const duration = endTime ? formatDistance(endTime, startTime) : 'N/A';
                            return (
                                <TableRow key={index}>
                                    <TableCell>{format(startTime, "PPP")}</TableCell>
                                    <TableCell>{format(startTime, "p")}</TableCell>
                                    <TableCell>{endTime ? format(endTime, "p") : 'Active'}</TableCell>
                                    <TableCell>{duration}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Check /> Accept Collection Requests</CardTitle>
          <CardDescription>
            Review and accept new waste collection jobs in your area.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newCollectionRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">{req.id}</TableCell>
                  <TableCell>{req.location}</TableCell>
                  <TableCell>{req.volume}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" disabled={!isClockedIn}>Accept</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Map/> Optimized Route Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Navigate your daily route efficiently with real-time updates.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/tracking">Start Navigation</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CreditCard/> Earnings Tracking</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="text-3xl font-bold">R5,430.50</div>
            <p className="text-xs text-muted-foreground">
              This week's earnings
            </p>
          </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full" asChild>
                <Link href="/dashboard/payouts">View Detailed Payouts</Link>
              </Button>
          </CardFooter>
        </Card>
          <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ClipboardCheck/> Digital Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Complete and submit digital proof of service forms.
            </p>
          </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/proof-of-service">Complete a Form</Link>
            </Button>
          </CardFooter>
        </Card>
          <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Briefcase/> Compliance Reporting</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Access and submit necessary compliance documents.
            </p>
          </CardContent>
          <CardFooter>
              <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/compliance">View Reports</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

    
