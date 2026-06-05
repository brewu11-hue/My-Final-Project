"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  CalendarIcon,
  Loader2,
  MapPin,
  Send,
  Clock,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser, useFirestore, addDocumentNonBlocking } from "@/firebase";
import { collection, serverTimestamp } from "firebase/firestore";
import { emailServiceRequest } from "@/app/actions/email-actions";

const formSchema = z.object({
  location: z.string().min(5, {
    message: "Please enter a valid site address or location.",
  }),
  description: z.string().min(20, {
    message: "Please provide a detailed description of at least 20 characters.",
  }),
  removalDate: z.date({
    required_error: "A date for removal is required.",
  }),
  removalTime: z.string({
    required_error: "A time for removal is required.",
  }),
});

export function MiningIndustrialForm() {
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const service = searchParams.get("service");

  const title = service 
    ? `Request a Quote for: ${service}` 
    : "Mining & Logistics Waste Removal Quote";
  const description = service
    ? `Please fill in the details for your request for "${service}". Our team will review and contact you to finalize the service.`
    : "Fill in the details below for a customized quote. Our team will review and contact you to finalize the service.";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user || !firestore) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please sign in to request a quote.",
      });
      return;
    }

    setLoading(true);
    
    const requestData = {
      userId: user.uid,
      userName: user.displayName,
      userEmail: user.email,
      service: service || 'General Mining/Industrial Inquiry',
      location: values.location,
      description: values.description,
      removalDate: values.removalDate.toISOString(),
      removalTime: values.removalTime,
      status: 'pending_quote',
      createdAt: serverTimestamp(),
    };

    try {
      // 1. Save to a global industrial requests collection or user subcollection
      // For industrial, we'll save under the user for their tracking
      const requestsCol = collection(firestore, 'users', user.uid, 'serviceRequests');
      addDocumentNonBlocking(requestsCol, {
        ...requestData,
        wasteType: `Industrial: ${requestData.service}`,
      });

      // 2. Email the company
      await emailServiceRequest({
        ...requestData,
        type: 'INDUSTRIAL_QUOTE_REQUEST',
      });

      toast({
        title: "Quote Request Submitted & Emailed!",
        description: "Our industrial team has received your request via email and will be in touch shortly.",
      });
      
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not process quote request. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  const timeSlots = [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
  ];

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Location</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="e.g., 123 Industrial Rd, Rustenburg"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description of Waste</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the type of material, estimated volume/tonnage, any special handling requirements (e.g., hazardous materials, sludge, scrap metal)."
                      className="resize-y"
                      {...field}
                      rows={6}
                    />
                  </FormControl>
                  <FormDescription>
                    The more detail you provide, the more accurate our quote
                    will be.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="removalDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Preferred Removal Date</FormLabel>
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
                          disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
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
                name="removalTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Removal Time Slot</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <div className="pl-5">
                            <SelectValue placeholder="Select a time slot" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map(slot => (
                            <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Request a Quote
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
