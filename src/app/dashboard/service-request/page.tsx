"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { ImagePlus, Loader2, MapPin, Send } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { useUser, useFirestore, addDocumentNonBlocking } from "@/firebase";
import { collection, serverTimestamp } from "firebase/firestore";
import { emailServiceRequest } from "@/app/actions/email-actions";

const formSchema = z.object({
  location: z.string().min(5, {
    message: "Please enter a valid address or location.",
  }),
  description: z.string().optional(),
  image: z.any().optional(),
});

function ServiceRequestForm() {
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const defaultImage = PlaceHolderImages.find(p => p.id === "waste-pile-1");
  const searchParams = useSearchParams();
  const requestType = searchParams.get('type');

  const isReport = requestType === 'report';
  const title = isReport ? "Report Illegal Dumping" : "New Waste Removal Request";
  const description = isReport
    ? "Help keep our community clean. Fill in the details below to report an illegal dumping site."
    : "Fill in the details below to schedule a pickup. Provide a clear photo if possible.";


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
        description: "Please sign in to submit a request.",
      });
      return;
    }

    setLoading(true);
    
    const requestData = {
      userId: user.uid,
      userName: user.displayName,
      userEmail: user.email,
      location: values.location,
      wasteType: isReport ? 'Illegal Dumping Report' : 'Standard Pickup',
      description: values.description || '',
      status: 'pending',
      requestDate: new Date().toISOString(),
      createdAt: serverTimestamp(),
      quantity: 1, // Default placeholder
    };

    try {
      // 1. Save to Firestore
      const requestsCol = collection(firestore, 'users', user.uid, 'serviceRequests');
      addDocumentNonBlocking(requestsCol, requestData);

      // 2. "Email" the company
      await emailServiceRequest({
        ...requestData,
        type: isReport ? 'REPORT' : 'PICKUP_REQUEST',
      });

      toast({
        title: "Request Submitted & Emailed!",
        description: isReport 
          ? "Your report has been emailed to our team. Thank you for helping our community." 
          : "Your waste removal request has been emailed to our team for immediate attention.",
      });
      
      form.reset();
      setPreview(null);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process your request. Please try again or contact us directly.",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isReport ? "Location of Dumping Site" : "Pickup Location"}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="e.g., 123 Main St, Anytown" {...field} className="pl-10" />
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
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={isReport ? "e.g., Near the old bridge, multiple bags of construction debris." : "e.g., Old furniture, garden refuse, etc."}
                        className="resize-none"
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                     <FormDescription>
                      Provide any additional details about the waste.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                        onChange={(e) => {
                          field.onChange(e.target.files);
                          handleImageChange(e);
                        }}
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
                Submit {isReport ? "Report" : "Request"}
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image-upload">Image Preview</Label>
              <label
                htmlFor="image-upload"
                className={cn(
                  "relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-lg cursor-pointer",
                  "hover:bg-accent/50 transition-colors"
                )}
              >
                {preview ? (
                  <Image
                    src={preview}
                    alt="Image preview"
                    fill
                    className="object-contain rounded-lg"
                  />
                ) : defaultImage ? (
                  <>
                  <Image
                    src={defaultImage.imageUrl}
                    alt={defaultImage.description}
                    data-ai-hint={defaultImage.imageHint}
                    fill
                    className="object-cover rounded-lg opacity-20"
                  />
                  <div className="absolute flex flex-col items-center justify-center text-center text-muted-foreground p-4">
                      <ImagePlus className="h-10 w-10 mb-2" />
                      <span className="font-semibold">Click to upload an image</span>
                      <span className="text-xs">A clear photo helps us assess the situation better.</span>
                  </div>
                  </>
                ) : (
                   <div className="absolute flex flex-col items-center justify-center text-center text-muted-foreground p-4">
                      <ImagePlus className="h-10 w-10 mb-2" />
                      <span className="font-semibold">Click to upload an image</span>
                      <span className="text-xs">PNG, JPG, GIF up to 10MB</span>
                  </div>
                )}
              </label>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default function ServiceRequestPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <ServiceRequestForm />
      </Suspense>
    </div>
  );
}
