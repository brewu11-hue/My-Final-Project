
'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { 
  Package, 
  FlaskConical, 
  TrendingUp, 
  Video, 
  FileCheck, 
  QrCode, 
  Download, 
  MessageCircle,
  Clock,
  Zap,
  Info,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Camera,
  ShieldCheck,
  MapPin,
  Calendar as CalendarIcon,
  Layers,
  Check,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const stockpiles = [
  { 
    id: 'BATCH-2024-10-A', 
    grade: '42% Concentrate', 
    tons: 1200, 
    price: 'R 2,950', 
    status: 'Available',
    origin: 'Doornkop Pit #3',
    washedDate: '01 Oct 2024',
    assay: { cr: '42.1%', fe: '2.1', si: '4.2%' },
    image: 'https://images.unsplash.com/photo-1518173946687-a4c8a9b749f5?q=80&w=800'
  },
  { 
    id: 'BATCH-2024-09-C', 
    grade: '38% Concentrate', 
    tons: 850, 
    price: 'R 2,400', 
    status: 'Available',
    origin: 'Mooinooi East',
    washedDate: '25 Sep 2024',
    assay: { cr: '38.4%', fe: '1.9', si: '5.1%' },
    image: 'https://images.unsplash.com/photo-1574689049594-39c94314545d?q=80&w=800'
  },
  { 
    id: 'BATCH-2024-09-D', 
    grade: '36% Concentrate', 
    tons: 400, 
    price: 'R 2,100', 
    status: 'Limited',
    origin: 'Steelpoort North',
    washedDate: '20 Sep 2024',
    assay: { cr: '36.2%', fe: '1.7', si: '6.4%' },
    image: 'https://images.unsplash.com/photo-1518173946687-a4c8a9b749f5?q=80&w=800'
  },
];

const labResults = [
  { batch: 'BATCH-2024-10-A', grade: '42.1%', crFe: '2.1', sio2: '4.2%', date: '2024-10-02', lab: 'SGS' },
  { batch: 'BATCH-2024-09-C', grade: '38.4%', crFe: '1.9', sio2: '5.1%', date: '2024-09-28', lab: 'ALS' },
];

const standardTimeSlots = [
  { id: 'am', label: '08:00 - 12:00', available: true },
  { id: 'pm', label: '13:00 - 17:00', available: true },
];

export default function ChromeWashingPage() {
  const { toast } = useToast();
  const [quoteTons, setTons] = useState('');
  const [quoteGrade, setGrade] = useState('42');
  const [paymentTerm, setPaymentTerm] = useState('50/50');
  
  // Booking State
  const [bookingDate, setBookingDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  // Modal State
  const [selectedBatch, setSelectedBatch] = useState<typeof stockpiles[0] | null>(null);
  const [isBatchOpen, setIsBatchOpen] = useState(false);
  
  const plantImage = PlaceHolderImages.find(p => p.id === 'wash-plant');

  const handleGetQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteTons) return;
    
    const basePrice = stockpiles.find(s => s.grade.includes(quoteGrade))?.price || 'R 0';
    const numPrice = parseInt(basePrice.replace(/\D/g, ''));
    const finalPrice = paymentTerm === '100' ? numPrice * 0.95 : numPrice;

    toast({
      title: 'Instant Quote Generated',
      description: `Estimated price for ${quoteTons} tons: R ${finalPrice.toLocaleString()}/ton.`,
    });
  };

  const handleBookSlot = (slotId: string) => {
    if (!bookingDate) {
       toast({ title: 'Select Date First', description: 'Please pick a loading date.', variant: 'destructive' });
       return;
    }
    setSelectedSlot(slotId);
    toast({
      title: 'Slot Selected',
      description: `${format(bookingDate, 'PPP')} ${slotId === 'am' ? 'Morning' : 'Afternoon'}`,
    });
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header & Production Counter */}
      <div className="grid md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Chrome Operations & Sales</h1>
          <p className="text-muted-foreground mt-2">
            Live stockpile data and self-service purchasing.
          </p>
        </div>
        <Card className="md:col-span-4 bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Monthly Production <Badge>Active</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-xs mb-2">
              <span>2,340 tons produced</span>
              <span className="font-bold text-primary">Target: 6,800t</span>
            </div>
            <Progress value={(2340 / 6800) * 100} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="stockpile" className="w-full">
        <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          <TabsList className="flex w-max md:grid md:w-full grid-cols-5 h-auto gap-2 bg-transparent p-0">
            <TabsTrigger value="stockpile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border shadow-sm px-4 py-2 flex-shrink-0"><Package className="mr-2 h-4 w-4" /> Stockpile</TabsTrigger>
            <TabsTrigger value="quality" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border shadow-sm px-4 py-2 flex-shrink-0"><FlaskConical className="mr-2 h-4 w-4" /> Lab Grades</TabsTrigger>
            <TabsTrigger value="sales" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border shadow-sm px-4 py-2 flex-shrink-0"><TrendingUp className="mr-2 h-4 w-4" /> Get Quote</TabsTrigger>
            <TabsTrigger value="operations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border shadow-sm px-4 py-2 flex-shrink-0"><Video className="mr-2 h-4 w-4" /> Live Plant</TabsTrigger>
            <TabsTrigger value="strategy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border shadow-sm px-4 py-2 flex-shrink-0"><Lightbulb className="mr-2 h-4 w-4" /> Strategy</TabsTrigger>
          </TabsList>
        </div>

        {/* Stockpile Dashboard */}
        <TabsContent value="stockpile" className="space-y-6 mt-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stockpiles.map((stock) => (
              <Card key={stock.id} className="relative overflow-hidden group border-none shadow-md bg-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant={stock.status === 'Available' ? 'default' : 'secondary'}>{stock.status}</Badge>
                  </div>
                  <CardTitle className="mt-4">{stock.grade}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-foreground">
                    {stock.tons.toLocaleString()} tons <span className="text-sm font-normal text-muted-foreground">ready</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold text-primary">{stock.price}/ton ex-plant</p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="w-full" onClick={() => {
                      setSelectedBatch(stock);
                      setIsBatchOpen(true);
                    }}>
                      View Batch
                    </Button>
                    <Button size="sm" className="w-full" onClick={() => {
                        setSelectedBatch(stock);
                        setIsBatchOpen(true);
                    }}>Book Loading</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" /> Market Price Feed</CardTitle>
              <CardDescription>Daily Metal Bulletin Chrome Ore Price</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">UG2 Concentrate 42% (CIF China)</p>
                  <p className="text-2xl font-bold">$285.00 /ton</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 font-semibold">+$4.20 (1.5%)</p>
                  <p className="text-xs text-muted-foreground">Updated: 2 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lab Grade Tracker */}
        <TabsContent value="quality" className="mt-6 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Batch Assay Certificates</CardTitle>
              <CardDescription>Verified SGS/ALS reports.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Batch ID</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Lab</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {labResults.map((result) => (
                      <TableRow key={result.batch}>
                        <TableCell className="font-mono text-xs">{result.batch}</TableCell>
                        <TableCell className="font-semibold">{result.grade}</TableCell>
                        <TableCell><Badge variant="outline">{result.lab}</Badge></TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><QrCode className="h-5 w-5" /> Traceability QR</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-6">
                <div className="bg-white p-2 rounded-lg border flex-shrink-0">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-[url('https://placehold.co/100x100?text=QR')] bg-cover" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">Verify Batch</p>
                  <p className="text-xs text-muted-foreground">Scan to verify origin and mineral rights compliance.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileCheck className="h-5 w-5" /> Compliance Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start"><Download className="mr-2 h-4 w-4" /> Mining Permit (2024)</Button>
                <Button variant="outline" size="sm" className="w-full justify-start"><Download className="mr-2 h-4 w-4" /> Water Use License (WUL)</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sales Tool */}
        <TabsContent value="sales" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Instant Sales Quote</CardTitle>
                <CardDescription>Automated pricing and availability.</CardDescription>
              </CardHeader>
              <form onSubmit={handleGetQuote}>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tons">Tons Needed</Label>
                      <Input id="tons" type="number" placeholder="500" value={quoteTons} onChange={e => setTons(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade (%)</Label>
                      <select id="grade" className="w-full p-2 border rounded-md bg-background text-sm" value={quoteGrade} onChange={e => setGrade(e.target.value)}>
                        <option value="42">42% Concentrate</option>
                        <option value="38">38% Concentrate</option>
                        <option value="36">36% Concentrate</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Payment Terms</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Button type="button" variant={paymentTerm === '50/50' ? 'default' : 'outline'} onClick={() => setPaymentTerm('50/50')} className="text-xs">
                        50/50 Terms
                      </Button>
                      <Button type="button" variant={paymentTerm === '100' ? 'default' : 'outline'} onClick={() => setPaymentTerm('100')} className="text-xs">
                        100% Upfront (5% Disc)
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
                    <p className="text-sm font-semibold flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Delivery Insight</p>
                    <p className="text-xs text-muted-foreground">Current queue: 2 days. Estimated loading for your order: <strong>Next Tuesday, 15 Oct</strong>.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" size="lg">Get My Quote</Button>
                </CardFooter>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Book Loading Slot</CardTitle>
                  <CardDescription>Select your 4-hour window.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Loading Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal h-10",
                                    !bookingDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {bookingDate ? format(bookingDate, "PPP") : <span>Pick a loading date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={bookingDate}
                                onSelect={setBookingDate}
                                initialFocus
                                disabled={(date) => date < new Date()}
                            />
                        </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {standardTimeSlots.map((slot) => (
                      <div key={slot.id} className="relative">
                         <Button 
                          variant={selectedSlot === slot.id ? 'default' : 'outline'} 
                          className={cn(
                            "w-full justify-start transition-all h-12",
                            selectedSlot === slot.id && "ring-2 ring-primary ring-offset-2"
                          )}
                          disabled={!slot.available || !bookingDate}
                          onClick={() => handleBookSlot(slot.id)}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          <span className="truncate">{slot.label}</span>
                          {selectedSlot === slot.id && <Check className="ml-auto h-4 w-4" />}
                        </Button>
                        {!slot.available && (
                          <Badge className="absolute -top-2 -right-2 bg-amber-100 text-amber-800 border-amber-200 text-[10px] px-1.5 py-0">Full</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2">
                  <p className="text-[10px] text-muted-foreground italic leading-tight">
                    * Booking a slot requires a confirmed quote and payment proof.
                  </p>
                  <Button className="w-full mt-2" disabled={!selectedSlot || !bookingDate}>
                    Confirm Window
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-primary text-primary-foreground border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><MessageCircle /> Direct Dispatch</CardTitle>
                  <CardDescription className="text-primary-foreground/80">One tap to your load controller.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="secondary" className="w-full" asChild>
                    <a href="tel:0714683849">Call Load Controller</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Live Operations */}
        <TabsContent value="operations" className="mt-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Plant Operations (Live Feed)</CardTitle>
                <CardDescription>Wash plant in operation.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted group cursor-pointer border shadow-inner">
                  {plantImage && (
                    <Image src={plantImage.imageUrl} alt="Plant drone footage" fill className="object-cover transition-transform group-hover:scale-105" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                      <div className="w-0 h-0 border-t-[8px] md:border-t-[10px] border-t-transparent border-l-[12px] md:border-l-[15px] border-l-white border-b-[8px] md:border-b-[10px] border-b-transparent ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full text-[10px] md:text-xs text-white">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" /> Live
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between text-[10px] md:text-xs text-muted-foreground">
                <span>Last Updated: 02 Oct 2024</span>
              </CardFooter>
            </Card>

            <div className="space-y-6">
               <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle>Payment & Order Tracker</CardTitle>
                  <CardDescription>Active shipments status.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-semibold text-sm">Order #INV-1023</p>
                      <p className="text-[10px] text-muted-foreground">42% Concentrate</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-none text-[10px]">Paid</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                   <Button variant="ghost" size="sm" className="w-full text-xs">View History</Button>
                </CardFooter>
              </Card>

              <Card className="border-none shadow-sm bg-accent/5">
                <CardHeader>
                   <CardTitle className="text-accent flex items-center gap-2 text-sm"><Info className="h-4 w-4" /> Loyalty Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs">Purchased: <strong>3,400 tons</strong>. 1,600 more to discount.</p>
                  <Progress value={(3400 / 5000) * 100} className="h-2 mt-4" />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Strategy Tab */}
        <TabsContent value="strategy" className="mt-6">
           <Card className="border-none shadow-md bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl flex items-center gap-3">
                    <Lightbulb className="text-primary" /> ChromeCheck Playbook
                  </CardTitle>
                  <CardDescription>Strategic roadmap for mining technology.</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                  {/* Phase Summary */}
                  <div className="grid sm:grid-cols-3 gap-4 not-prose mb-8">
                    <div className="p-4 bg-background rounded-lg border shadow-sm">
                      <h4 className="font-bold text-primary text-xs mb-1 uppercase">Phase 1</h4>
                      <ul className="mt-2 text-[10px] space-y-1">
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" /> Validation</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" /> V0 Logbook</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-background rounded-lg border border-primary/50 ring-1 ring-primary/20 shadow-md">
                       <h4 className="font-bold text-primary text-xs mb-1 uppercase">Phase 2</h4>
                      <ul className="mt-2 text-[10px] space-y-1">
                        <li className="flex items-center gap-2"><Zap className="w-3 h-3 text-primary" /> Fine-tuned AI</li>
                        <li className="flex items-center gap-2"><Zap className="w-3 h-3 text-primary" /> XRF Integration</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-background rounded-lg border shadow-sm">
                       <h4 className="font-bold text-primary text-xs mb-1 uppercase">Phase 3</h4>
                      <ul className="mt-2 text-[10px] space-y-1">
                        <li className="flex items-center gap-2"><TrendingUp className="w-3 h-3 text-primary" /> Market Scale</li>
                        <li className="flex items-center gap-2"><TrendingUp className="w-3 h-3 text-primary" /> WhatsApp CRM</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold uppercase mb-4">Method Comparison</h3>
                  <div className="not-prose overflow-x-auto rounded-lg border shadow-sm bg-background">
                    <Table className="min-w-[500px]">
                      <TableHeader className="bg-muted">
                        <TableRow>
                          <TableHead className="text-xs">Method</TableHead>
                          <TableHead className="text-xs">Accuracy</TableHead>
                          <TableHead className="text-xs">Reality Check</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-bold text-xs">AI Color</TableCell>
                          <TableCell className="text-xs">+/- 8%</TableCell>
                          <TableCell className="text-xs">Good for "pre-screen".</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-bold text-xs">XRF Gun</TableCell>
                          <TableCell className="text-xs">+/- 1%</TableCell>
                          <TableCell className="text-xs">Industry standard.</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <h3 className="text-destructive flex items-center gap-2 mt-8 font-bold uppercase text-xs"><AlertTriangle className="w-4 h-4" /> Brutal Truths</h3>
                  <ul className="space-y-2 text-xs">
                    <li><strong>SGS is king:</strong> AI is a "sniff test", never a replacement for lab certs.</li>
                    <li><strong>Liability:</strong> Professional Indemnity insurance is mandatory before launch.</li>
                  </ul>
                </CardContent>
                <CardFooter className="flex-col items-start gap-4 border-t pt-6 mt-6">
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <Button className="w-full sm:flex-1 text-xs"><Download className="mr-2 h-4 w-4" /> Download Strategy</Button>
                    <Button variant="outline" className="w-full sm:flex-1 text-xs"><ShieldCheck className="mr-2 h-4 w-4" /> Compliance</Button>
                  </div>
                </CardFooter>
              </Card>
        </TabsContent>
      </Tabs>

      {/* Batch Details Modal - MOVED OUTSIDE TABS FOR ROBUSTNESS */}
      <Dialog open={isBatchOpen} onOpenChange={setIsBatchOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedBatch && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle className="text-2xl">{selectedBatch.grade}</DialogTitle>
                    <DialogDescription className="font-mono text-xs uppercase tracking-tight">
                      Batch ID: {selectedBatch.id}
                    </DialogDescription>
                  </div>
                  <Badge variant="default" className="bg-green-600">Verified</Badge>
                </div>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-lg overflow-hidden border">
                    <Image 
                      src={selectedBatch.image} 
                      alt="Batch stockpile" 
                      fill 
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2">
                       <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm border-none text-[10px]">
                        <Camera className="w-3 h-3 mr-1" /> Photo
                       </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 border rounded-lg bg-muted/30 text-center">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Tonnes</p>
                      <p className="text-base font-bold">{selectedBatch.tons.toLocaleString()}t</p>
                    </div>
                    <div className="p-3 border rounded-lg bg-muted/30 text-center">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Price</p>
                      <p className="text-base font-bold text-primary">{selectedBatch.price}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold flex items-center gap-2">
                      <Info className="w-4 h-4 text-primary" /> Origin
                    </h4>
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs py-1 border-b">
                        <span className="text-muted-foreground">Source</span>
                        <span className="font-semibold">{selectedBatch.origin}</span>
                      </div>
                      <div className="flex justify-between text-xs py-1 border-b">
                        <span className="text-muted-foreground">Washed</span>
                        <span className="font-semibold">{selectedBatch.washedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold flex items-center gap-2">
                      <FlaskConical className="w-4 h-4 text-primary" /> Assay
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2 border rounded bg-primary/5">
                        <p className="text-[10px] text-muted-foreground">Cr₂O₃</p>
                        <p className="font-bold text-xs">{selectedBatch.assay.cr}</p>
                      </div>
                      <div className="text-center p-2 border rounded bg-primary/5">
                        <p className="text-[10px] text-muted-foreground">Cr/Fe</p>
                        <p className="font-bold text-xs">{selectedBatch.assay.fe}</p>
                      </div>
                      <div className="text-center p-2 border rounded bg-primary/5">
                        <p className="text-[10px] text-muted-foreground">SiO₂</p>
                        <p className="font-bold text-xs">{selectedBatch.assay.si}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg bg-muted flex items-center gap-4">
                     <div className="bg-white p-1 rounded border">
                        <QrCode className="w-8 h-8 text-black" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold">Traceability</p>
                        <p className="text-[10px] text-muted-foreground leading-tight">
                          Scan to verify origin.
                        </p>
                     </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-2">
                <Button variant="ghost" onClick={() => setIsBatchOpen(false)} className="w-full sm:flex-1">Close</Button>
                <Button className="w-full sm:flex-1" onClick={() => setIsBatchOpen(false)}>Book Loading</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
