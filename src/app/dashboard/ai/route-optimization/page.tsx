"use client";

import { useState } from "react";
import {
  optimizeWasteRemovalRoutes,
  OptimizeWasteRemovalRoutesInput,
  OptimizeWasteRemovalRoutesOutput,
} from "@/ai/flows/optimize-waste-removal-routes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, Loader2, Route as RouteIcon, Timer, Users, XCircle, Bot } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const initialRequests = [
  { location: "123 Main St, Los Angeles", volume: 5, timestamp: new Date().toISOString() },
  { location: "456 Oak Ave, Los Angeles", volume: 8, timestamp: new Date().toISOString() },
  { location: "789 Pine Ln, Los Angeles", volume: 3, timestamp: new Date().toISOString() },
  { location: "101 Maple Dr, Los Angeles", volume: 10, timestamp: new Date().toISOString() },
  { location: "212 Birch Rd, Los Angeles", volume: 4, timestamp: new Date().toISOString() },
];

export default function RouteOptimizationPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OptimizeWasteRemovalRoutesOutput | null>(null);
  const [requests, setRequests] = useState(JSON.stringify(initialRequests, null, 2));
  const [truckCapacity, setTruckCapacity] = useState("20");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const parsedRequests = JSON.parse(requests);
      const input: OptimizeWasteRemovalRoutesInput = {
        requests: parsedRequests,
        truckCapacity: parseInt(truckCapacity, 10),
        historicalData: [], // Provide historical data if available
      };

      const output = await optimizeWasteRemovalRoutes(input);
      setResult(output);
      toast({
        title: "Success",
        description: "Route optimized successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to parse requests or optimize route. Please check your input.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bot /> Route Planner</CardTitle>
          <CardDescription>
            Input service requests and truck capacity to generate an optimal route using AI. Requests should be in JSON format.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="requests">Service Requests (JSON)</Label>
              <Textarea
                id="requests"
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                rows={15}
                className="font-code text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="truckCapacity">Truck Capacity (cubic meters)</Label>
              <Input
                id="truckCapacity"
                type="number"
                value={truckCapacity}
                onChange={(e) => setTruckCapacity(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Optimize Route
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Optimization Results</CardTitle>
          <CardDescription>The generated optimal route and servicing details.</CardDescription>
        </CardHeader>
        <CardContent>
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg h-full">
              <RouteIcon className="w-12 h-12 mb-4" />
              <p>Your optimized route will appear here.</p>
            </div>
          )}
          {loading && (
            <div className="flex items-center justify-center p-8 h-full">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          )}
          {result && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <Timer className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Est. Time</p>
                    <p className="text-lg font-bold">{result.estimatedTravelTime} mins</p>
                  </div>
                </div>
                 <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <Users className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Serviced</p>
                    <p className="text-lg font-bold">{result.optimizedRoute.length} stops</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Optimized Route
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Stop</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.optimizedRoute.map((location, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {result.unservicedRequests.length > 0 && (
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    Unserviced Requests
                  </h3>
                   <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Volume</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {result.unservicedRequests.map((req, index) => (
                        <TableRow key={index}>
                          <TableCell>{req.location}</TableCell>
                          <TableCell className="text-right">{req.volume} m³</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
