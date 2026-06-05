
"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Leaf,
  Recycle,
  Truck,
  CreditCard,
  Download,
  FileWarning,
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
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const chartData = [
  { date: "2024-07-01", completed: 86, pending: 34 },
  { date: "2024-07-02", completed: 92, pending: 28 },
  { date: "2024-07-03", completed: 105, pending: 25 },
  { date: "2024-07-04", completed: 78, pending: 41 },
  { date: "2024-07-05", completed: 110, pending: 20 },
  { date: "2024-07-06", completed: 95, pending: 30 },
  { date: "2024-07-07", completed: 102, pending: 22 },
];

const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--primary))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;


const complaints = [
  {
    id: "CMPT01",
    date: "2024-07-18",
    issue: "Missed Pickup",
    location: "123 Main St",
    status: "New",
  },
  {
    id: "CMPT02",
    date: "2024-07-17",
    issue: "Damaged Bin",
    location: "456 Oak Ave",
    status: "In Review",
  },
  {
    id: "CMPT03",
    date: "2024-07-16",
    issue: "Illegal Dumping",
    location: "Near Pine Park",
    status: "Resolved",
  },
];

export default function PartnerDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requests
            </CardTitle>
            <Recycle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +120 this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Trucks on Route
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              8{" "}
              <span className="text-sm font-normal text-muted-foreground">
                / 10
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              2 trucks in depot
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Environmental Impact
            </CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5 T</div>
            <p className="text-xs text-muted-foreground">
              CO2 emissions saved
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
            <CardDescription>
              Number of completed vs. pending service requests this week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
                >
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        weekday: "short",
                      })
                    }
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Bar
                    dataKey="completed"
                    fill="var(--color-completed)"
                    radius={4}
                  />
                  <Bar
                    dataKey="pending"
                    fill="var(--color-pending)"
                    radius={4}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Automated Reporting
              </CardTitle>
              <CardDescription>
                Generate and download operational reports.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Button className="w-full">
                <Download className="mr-2" /> Download Weekly Summary
              </Button>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">
                View All Reports
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard /> Billing &amp; Invoicing
              </CardTitle>
              <CardDescription>
                Manage customer invoices and payments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/dashboard/billing">Go to Billing Portal</Link>
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileWarning /> Citizen Complaint Management
          </CardTitle>
          <CardDescription>
            Review and address recent citizen complaints.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell className="font-medium">
                    {complaint.id}
                  </TableCell>
                  <TableCell>{complaint.date}</TableCell>
                  <TableCell>{complaint.issue}</TableCell>
                  <TableCell>{complaint.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        complaint.status === "Resolved"
                          ? "default"
                          : complaint.status === "New"
                          ? "destructive"
                          : "secondary"
                      }
                      className={
                        complaint.status === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }
                    >
                      {complaint.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
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
