
'use client';

import { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { ImagePlus, Loader2, Send, ClipboardCheck, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  requestId: z.string().min(3, {
    message: "Please enter a valid request ID.",
  }),
  notes: z.string().optional(),
  image: z.any().optional(),
});

export default function ProofOfServicePage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requestId: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    console.log(values);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Proof of Service Submitted!",
        description: `Documentation for request ${values.requestId} has been uploaded.`,
      });
      form.reset();
      setPreview(null);
      setLoading(false);
    }, 1500);
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
    <div className="max-w-4xl mx-auto">
       <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck /> Proof of Service
            </CardTitle>
            <CardDescription>
              Complete this form after finishing a collection to provide proof of service.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="requestId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Request ID</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="e.g., REQ-015" {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Completion Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., All items collected. Client was not home."
                            className="resize-none"
                            {...field}
                            rows={4}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide any relevant details about the collection.
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
                        <FormLabel>Upload Photo Proof</FormLabel>
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
                    Submit Proof
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image-upload">Photo Preview</Label>
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
                    ) : (
                      <div className="absolute flex flex-col items-center justify-center text-center text-muted-foreground p-4">
                          <ImagePlus className="h-10 w-10 mb-2" />
                          <span className="font-semibold">Click to upload a photo</span>
                          <span className="text-xs">Take a picture of the cleared area or collected waste.</span>
                      </div>
                    )}
                  </label>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
    </div>
  );
}
