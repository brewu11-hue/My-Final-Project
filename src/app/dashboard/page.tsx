"use client";

import {
  Trash2,
  Bell,
  BookOpen,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
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
import { RatingDialog } from "@/components/rating-dialog";

const residentRequests = [
  {
    id: "REQ001",
    date: "2024-07-15",
    status: "Completed",
    type: "Scheduled Pickup",
  },
  { id: "REQ002", date: "2024-07-18", status: "Pending", type: "Bulk Waste" },
  {
    id: "REQ003",
    date: "2024-07-20",
    status: "In Progress",
    type: "Scheduled Pickup",
  },
  { id: "REQ004", date: "2024-07-21", status: "Completed", type: "Report" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="text-primary" /> Request Waste Collection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Schedule a pickup for household or bulk waste.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/service-request">New Request</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="text-destructive" /> Report Illegal
              Dumping
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Help keep our city clean by reporting unauthorized waste.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="destructive" className="w-full" asChild>
              <Link href="/dashboard/service-request?type=report">Make a Report</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="text-accent" /> Educational Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Learn about recycling, composting, and waste reduction.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full" asChild>
              <Link href="/">Learn More</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Track Collection Status</CardTitle>
              <CardDescription>
                View your past and current waste removal requests.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                You have 2 new notifications
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {residentRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">{req.id}</TableCell>
                  <TableCell>{req.date}</TableCell>
                  <TableCell>{req.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        req.status === "Completed"
                          ? "default"
                          : req.status === "Pending"
                          ? "secondary"
                          : req.status === "In Progress"
                          ? "outline"
                          : "destructive"
                      }
                      className={
                        req.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : req.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : req.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : ""
                      }
                    >
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {req.status === "Completed" && (
                      <RatingDialog requestId={req.id} />
                    )}
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
