
'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Landmark, Percent, Leaf, CheckCircle } from 'lucide-react';

export default function CompliancePage() {
    return (
    <div className="space-y-8">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight">Compliance Center</h1>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
                Official documentation and reporting for TT Group App.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <FileText className="text-primary" />
                        Waste Licence
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        TT Group App operates under the following municipal waste licence.
                    </p>
                    <div className="p-4 bg-muted rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Licence Number</p>
                        <p className="text-2xl font-mono font-semibold tracking-wider">GPS-16-643</p>
                    </div>
                     <Button asChild variant="outline" className="w-full">
                        <a href="/Waste_Licence.pdf" download>
                            <Download className="mr-2" />
                            Download Licence Document
                        </a>
                    </Button>
                </CardContent>
            </Card>

            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Landmark className="text-primary" />
                        SARS Compliance
                    </CardTitle>
                    <CardDescription>
                        VAT and Tax compliance reporting and documentation.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                     <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                            <p className="font-semibold">Tax Compliance Status</p>
                            <p className="text-sm text-muted-foreground">Verified on {new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle />
                            <span className="font-semibold">Compliant</span>
                        </div>
                     </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" asChild>
                        <a href="/Tax_Clearance_Certificate.pdf" download>
                            <Download className="mr-2" />
                            Download Tax Clearance
                        </a>
                    </Button>
                </CardFooter>
            </Card>

             <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Percent className="text-primary" />
                        B-BBEE Reporting
                    </CardTitle>
                    <CardDescription>
                        Broad-Based Black Economic Empowerment status.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                     <div className="p-4 bg-muted rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Current B-BBEE Status</p>
                        <p className="text-3xl font-bold">Level 1 Contributor</p>
                        <p className="text-sm font-semibold">135% Procurement Recognition</p>
                    </div>
                </CardContent>
                <CardFooter>
                     <Button className="w-full" asChild>
                        <a href="/B-BBEE_Certificate.pdf" download>
                            <Download className="mr-2" />
                            Download Certificate
                        </a>
                    </Button>
                </CardFooter>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Leaf className="text-primary" />
                        Environmental Compliance
                    </CardTitle>
                    <CardDescription>
                        Reports and certifications related to environmental standards.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center justify-between p-4 border rounded-lg">
                         <p className="font-semibold">Annual Environmental Impact Report (2023)</p>
                         <Button variant="secondary" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            View
                         </Button>
                     </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                         <p className="font-semibold">ISO 14001 Certification</p>
                         <Button variant="secondary" size="sm">
                             <Download className="mr-2 h-4 w-4" />
                            View
                         </Button>
                     </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
