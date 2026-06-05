
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send, Briefcase, MapPin, Clock, User, Mail, Phone, FileUp } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormDescription } from '@/components/ui/form';

const jobOpenings = [
    {
        id: 'driver-01',
        title: 'Waste Collection Driver',
        location: 'Johannesburg, SA',
        type: 'Full-time',
        description: 'Responsible for operating a waste collection vehicle, following designated routes, and ensuring timely pickup of waste materials from residential and commercial clients.'
    },
    {
        id: 'ops-01',
        title: 'Operations Coordinator',
        location: 'Soweto, SA',
        type: 'Full-time',
        description: 'Manage daily logistics, coordinate driver schedules, and ensure smooth operations. Requires strong organizational skills and experience in logistics or waste management.'
    },
    {
        id: 'mechanic-01',
        title: 'Heavy-Duty Truck Mechanic',
        location: 'Ekurhuleni, SA',
        type: 'Contract',
        description: 'Perform maintenance and repairs on our fleet of garbage trucks, dump trucks, and other heavy equipment. Diesel mechanic certification required.'
    }
];

const applicationSchema = z.object({
  fullName: z.string().min(3, 'Full name is required.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  position: z.string({ required_error: 'Please select a position.' }),
  resume: z.any().refine(files => files?.length == 1, 'Resume is required.'),
  coverLetter: z.string().optional(),
});

export default function CareersPage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof applicationSchema>>({
        resolver: zodResolver(applicationSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            coverLetter: '',
        },
    });

    const onSubmit = (values: z.infer<typeof applicationSchema>) => {
        setLoading(true);
        console.log({
            ...values,
            resume: values.resume[0].name
        });
        // Simulate API call for form submission
        setTimeout(() => {
            setLoading(false);
            toast({
                title: 'Application Submitted!',
                description: 'Thank you for your interest. We will review your application and be in touch.',
            });
            form.reset();
        }, 2000);
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight">Join Our Team</h1>
                <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
                    We're looking for passionate individuals to help us build a cleaner future. Explore our open positions below.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Open Positions</CardTitle>
                    <CardDescription>Current opportunities at TT Group.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {jobOpenings.map(job => (
                        <div key={job.id} className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">{job.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {job.type}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">{job.description}</p>
                            </div>
                             <Button asChild>
                                <a href="#apply-form">Apply Now</a>
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card id="apply-form">
                <CardHeader>
                    <CardTitle>Submit Your Application</CardTitle>
                    <CardDescription>Can't find a suitable role? Submit a general application and we'll keep your profile for future openings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                             <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input placeholder="e.g., Jane Doe" {...field} className="pl-10" />
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
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                             <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input type="email" placeholder="your@email.com" {...field} className="pl-10" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </div>
                             <div className="grid md:grid-cols-2 gap-6">
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
                                 <FormField
                                    control={form.control}
                                    name="position"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Applying For</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a position" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {jobOpenings.map(job => (
                                                    <SelectItem key={job.id} value={job.title}>{job.title}</SelectItem>
                                                ))}
                                                <SelectItem value="General Application">General Application</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </div>
                            
                            <FormField
                                control={form.control}
                                name="resume"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CV / Resume</FormLabel>
                                        <FormControl>
                                            <Input type="file" onChange={(e) => field.onChange(e.target.files)} accept=".pdf,.doc,.docx" />
                                        </FormControl>
                                        <FormDescription>Please upload your resume in PDF or DOC/DOCX format.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="coverLetter"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cover Letter (Optional)</FormLabel>
                                    <FormControl>
                                    <Textarea
                                        placeholder="Tell us why you'd be a great fit for TT Group..."
                                        className="resize-y"
                                        rows={5}
                                        {...field}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            
                            <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                                Submit Application
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
