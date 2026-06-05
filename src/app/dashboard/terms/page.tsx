
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

export default function TermsDashboardPage() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Waste Collection Policy */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
            <div>
              <CardTitle className="text-3xl">
                TT Group App – On-Demand Waste Collection Policy
              </CardTitle>
              <CardDescription>
                Website-Based Booking. {currentDate && `Last updated: ${currentDate}`}
              </CardDescription>
            </div>
            <Button asChild className="w-full sm:w-auto">
              <a href="/TT_Waste_Control_On-Demand_Waste_Collection_Policy.pdf" download>
                <Download className="mr-2" />
                Download PDF
              </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="prose prose-stone dark:prose-invert max-w-none">
          <h2>1. Policy Statement</h2>
          <p>
            TT Group App offers flexible waste pickup services for mining,
            schools, fast food, and industries through online booking
            requests. We ensure timely, eco-friendly disposal with
            transparent tracking via email/SMS updates.
          </p>
          <h3>Key Features:</h3>
          <ul>
            <li>
              <strong>Online Booking Portal</strong> – Clients submit pickup
              requests via website.
            </li>
            <li>
              <strong>Same-Day or Scheduled Pickups</strong> – Choose urgency
              (e.g., within 24hrs or weekly).
            </li>
            <li>
              <strong>Waste Category Selection</strong> – Mining sludge,
              organic, recyclables, hazardous, etc.
            </li>
            <li>
              <strong>Digital Confirmations & Receipts</strong> – Email/SMS
              updates at each step.
            </li>
          </ul>

          <h2>
            2. Team Structure (Optimized for Manual Booking System)
          </h2>
          <h3>A. Operations & Customer Support</h3>
          <ol>
            <li>
              <strong>Booking Coordinator</strong> – Manages incoming website
              requests and assigns drivers.
            </li>
            <li>
              <strong>Dispatch Team</strong> – Assigns drivers based on
              location/waste type.
            </li>
            <li>
              <strong>Customer Support</strong> – Handles inquiries via
              phone/email (no app chat yet).
            </li>
          </ol>
          <h3>B. Field Teams</h3>
          <ol>
            <li>
              <strong>Collection Drivers</strong> – Equipped with GPS-enabled
              phones for route tracking.
            </li>
            <li>
              <strong>Sorting Facility Staff</strong> – Segregates waste
              post-collection.
            </li>
            <li>
              <strong>Hazardous Waste Handlers</strong> – Specialized team
              for mining/industrial clients.
            </li>
          </ol>

          <h2>3. Service Conditions (Website-Based Model)</h2>
          <h3>A. Booking Process</h3>
          <ol>
            <li>
              <strong>Client Submits Request</strong> – Fills form on website
              (pickup type, volume, location).
            </li>
            <li>
              <strong>TTWC Confirms via Email/SMS</strong> – Provides
              estimated cost & time window.
            </li>
            <li>
              <strong>Driver Assigned</strong> – Client receives driver
              details and tracking link (if GPS available).
            </li>
            <li>
              <strong>Post-Pickup Report</strong> – Email summary of waste
              collected & disposal method.
            </li>
          </ol>
          <h3>B. Pricing & Payment</h3>
          <ul>
            <li>Pay Online (Credit card, bank transfer) or Cash on Pickup.</li>
            <li>
              Dynamic Pricing Based On:
              <ul>
                <li>Waste type (hazardous = +20% fee).</li>
                <li>Urgency (same-day = +15%).</li>
                <li>Volume (discounts for bulk/recurring pickups).</li>
              </ul>
            </li>
             <li>Final price may change if actual waste differs from the booking.</li>
             <li>Late payments incur a 5% monthly interest fee.</li>
          </ul>
          <h3>C. Cancellation & Rescheduling</h3>
          <ul>
            <li>Free cancellation >12 hours before pickup.</li>
            <li>50% fee if canceled &lt;12 hours.</li>
            <li>
              No-show penalty (100% charge if truck arrives and waste isn’t
              ready).
            </li>
          </ul>

          <h2>4. Sustainability Goals & KPIs</h2>
          <h3>A. 2025 Targets</h3>
          <ul>
            <li>♻ 75% Waste Recycled (vs. landfill).</li>
            <li>100% Digital Documentation (no paper receipts).</li>
            <li>⏱ 90% On-Time Pickups (within 2-hour window).</li>
          </ul>
          <div className="overflow-x-auto">
            <table className="w-full my-4">
              <thead>
                <tr>
                  <th className="p-2 border text-left">KPI</th>
                  <th className="p-2 border text-left">Measurement</th>
                  <th className="p-2 border text-left">Target</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">Booking Response Time</td>
                  <td className="p-2 border">Time to confirm request</td>
                   <td className="p-2 border">&lt;1 hour</td>
                </tr>
                <tr>
                  <td className="p-2 border">Client Satisfaction</td>
                  <td className="p-2 border">Post-service surveys</td>
                   <td className="p-2 border">4.5/5</td>
                </tr>
                <tr>
                  <td className="p-2 border">Recycling Rate</td>
                  <td className="p-2 border">% waste diverted</td>
                  <td className="p-2 border">70%+</td>
                </tr>
                <tr>
                  <td className="p-2 border">
                    Hazardous Waste Compliance
                  </td>
                  <td className="p-2 border">Correct disposal rate</td>
                  <td className="p-2 border">100%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>How to Accept These Terms</h2>
          <p>By booking a pickup, you agree to these T&Cs.</p>
          <p>For questions, contact us at: <a href="mailto:info@ttwastecontrol.co.za">info@ttwastecontrol.co.za</a> or call us on 0714683849 / 0696337294.</p>
        </CardContent>
      </Card>

      {/* Mining Services Agreement */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
            <div>
              <CardTitle className="text-3xl uppercase">
                Master Services Agreement for Open Cast Mining Operations
              </CardTitle>
              <CardDescription>
                TT Group Holdings (Pty) Ltd. Legal template for industrial clients.
              </CardDescription>
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <FileText className="mr-2" />
              Contract Template
            </Button>
          </div>
        </CardHeader>
        <CardContent className="prose prose-stone dark:prose-invert max-w-none">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg text-amber-800 dark:text-amber-200 text-sm mb-8 not-prose">
            <strong>DISCLAIMER:</strong> This document is a draft template based on industry standards and legal research. It <strong>MUST</strong> be reviewed by a qualified South African mining law attorney before use.
          </div>

          <p><strong>BETWEEN:</strong></p>
          <p>
            <strong>TT GROUP HOLDINGS (PTY) LTD</strong><br />
            Registration Number: K2025711621<br />
            (Hereinafter referred to as the "Contractor")
          </p>
          <p><strong>AND:</strong></p>
          <p>
            __________________________________________(the "Client")<br />
            (Hereinafter referred to as the "Client")
          </p>

          <h2>1. DEFINITIONS</h2>
          <ul>
            <li><strong>"MPRDA"</strong> means the Mineral and Petroleum Resources Development Act, 2002.</li>
            <li><strong>"DMRE"</strong> means the Department of Mineral Resources and Energy.</li>
            <li><strong>"EMP"</strong> means the Environmental Management Programme.</li>
          </ul>

          <h2>2. LEGAL FRAMEWORK</h2>
          <p>2.1 This Agreement is a contract for services and not a lease or cession of Mining Rights.</p>
          <p>2.4 Title to all Minerals extracted remains vested in the Client at all times.</p>

          <h2>3. SCOPE OF SERVICES</h2>
          <p>Included: Vegetation clearing, Drilling & Blasting, Overburden removal, Mineral extraction, and Rehabilitation.</p>

          <h2>6. PAYMENT</h2>
          <p>The Contractor shall be paid for services rendered in accordance with the rates set out in Schedule C.</p>

          <h2>8. STATUTORY COMPLIANCE</h2>
          <p>Contractor must comply with all provisions of the MPRDA, NEMA, and OHSA.</p>

          <h2>15. INSURANCE REQUIREMENTS</h2>
          <ul>
            <li>Public Liability: Min R10,000,000</li>
            <li>Professional Indemnity: Min R5,000,000</li>
            <li>Replacement value for all plant and equipment.</li>
          </ul>

          <h2>19. B-BBEE STATUS</h2>
          <p>The Contractor warrants that it holds a valid Level 1 B-BBEE status throughout the duration of the agreement.</p>

          <Separator className="my-8" />

          <div className="grid grid-cols-2 gap-8 not-prose border p-6 rounded-lg bg-muted/30">
            <div>
              <p className="font-bold border-b pb-2 mb-4">FOR TT GROUP HOLDINGS (PTY) LTD</p>
              <div className="h-12" />
              <p>Thlologelo Maroga</p>
              <p className="text-sm text-muted-foreground">Managing Director</p>
            </div>
            <div>
              <p className="font-bold border-b pb-2 mb-4">FOR THE CLIENT</p>
              <div className="h-12" />
              <p>Name: __________________________</p>
              <p className="text-sm text-muted-foreground">Title: ___________________________</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
