
import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto flex-1 py-24 px-4 md:px-6 flex items-center justify-center">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Contact Us</CardTitle>
            <CardDescription>
              We're here to help. Reach out with any questions or inquiries.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted">
                <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-muted-foreground">For general inquiries and support.</p>
                    <a href="mailto:info@ttwastecontrol.co.za" className="text-primary font-medium hover:underline">
                        info@ttwastecontrol.co.za
                    </a>
                </div>
            </div>
             <div className="flex items-start gap-4 p-4 rounded-lg bg-muted">
                <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold">General Phone Lines</h3>
                    <p className="text-muted-foreground">For other questions and information.</p>
                    <div className="flex flex-col sm:flex-row sm:gap-4 mt-1">
                        <a href="tel:0714683849" className="text-primary font-medium hover:underline">
                            071 468 3849
                        </a>
                        <span className="hidden sm:inline text-muted-foreground">/</span>
                        <a href="tel:0696337294" className="text-primary font-medium hover:underline">
                            069 633 7294
                        </a>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
