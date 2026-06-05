
import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto flex-1 py-24 px-4 md:px-6 space-y-12">
        {/* Waste Collection Policy */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
              <div>
                <CardTitle className="text-3xl">
                  TT Group App – On-Demand Waste Collection Policy
                </CardTitle>
                <CardDescription>
                  Website-Based Booking. Last updated: {new Date().toLocaleDateString()}
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
            <h3>B. Key Performance Indicators (KPIs)</h3>
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
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
              <div>
                <CardTitle className="text-3xl uppercase">
                  Master Services Agreement for Open Cast Mining Operations
                </CardTitle>
                <CardDescription>
                  TT Group Holdings (Pty) Ltd. Professional Mining Template.
                </CardDescription>
              </div>
              <Button variant="outline" className="w-full sm:w-auto">
                <FileText className="mr-2" />
                View as Template
              </Button>
            </div>
          </CardHeader>
          <CardContent className="prose prose-stone dark:prose-invert max-w-none">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm mb-8 not-prose">
              <strong>DISCLAIMER:</strong> This document is a draft template based on industry standards and legal research. It <strong>MUST</strong> be reviewed by a qualified South African mining law attorney before use, as mining contracts involve complex statutory obligations under the MPRDA and may require ministerial approval depending on the structure.
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
              Registration Number: __________________________________________<br />
              (Hereinafter referred to as the "Client")
            </p>
            <p><strong>IN RESPECT OF:</strong></p>
            <p>Open cast mining services to be performed at __________________________________________ (the "Mining Area")</p>

            <h2>1. DEFINITIONS AND INTERPRETATION</h2>
            <ul>
              <li><strong>"Act" or "MPRDA"</strong> means the Mineral and Petroleum Resources Development Act, 2002 (Act 28 of 2002), as amended.</li>
              <li><strong>"B-BBEE Act"</strong> means the Broad-Based Black Economic Empowerment Act, 2003 (Act 53 of 2003), as amended.</li>
              <li><strong>"DMRE"</strong> means the Department of Mineral Resources and Energy.</li>
              <li><strong>"Environmental Management Programme" or "EMP"</strong> means the environmental management programme approved by the DMRE.</li>
              <li><strong>"OHSA"</strong> means the Mine Health and Safety Act, 1996 (Act 29 of 1996), as amended.</li>
            </ul>

            <h2>2. INTERPRETATION AND LEGAL FRAMEWORK</h2>
            <p>2.1 The parties acknowledge that this Agreement is entered into as a contract for services and not a lease or cession of the Client's Mining Right.</p>
            <p>2.2 The Client warrants that it is the lawful holder of the Mining Right and that such Mining Right is in good standing with the DMRE.</p>
            <p>2.4 To ensure compliance with the MPRDA:
              <ul>
                <li>2.4.1 The Contractor shall be paid a determined fee for services, not a royalty;</li>
                <li>2.4.2 Title to all Minerals extracted shall remain vested in the Client at all times;</li>
                <li>2.4.3 The Client retains the right to sell the Minerals.</li>
              </ul>
            </p>

            <h2>3. APPOINTMENT AND SCOPE OF SERVICES</h2>
            <p>3.1 The Client hereby appoints the Contractor as its independent contractor to perform open cast mining services.</p>
            <p>3.2 The scope of services includes: Clearing, Drilling and Blasting, Excavation, Loading, Hauling, and Rehabilitation.</p>

            <h2>4. POSSESSION AND ACCESS</h2>
            <p>4.1 The Client grants the Contractor exclusive possession of the Mining Area for the purpose of performing the services.</p>

            <h2>5. TERM AND TERMINATION</h2>
            <p>5.1 This Agreement shall commence on the Effective Date for an initial period as specified in the service schedule.</p>

            <h2>6. PAYMENT AND MEASUREMENT</h2>
            <p>6.1 Payment shall be based on rates set out in Schedule C.</p>
            <p>6.2 All quantities shall be measured by an Independent Surveyor appointed jointly by the parties.</p>

            <h2>8. STATUTORY COMPLIANCE AND OBLIGATIONS</h2>
            <p>8.1 Client's Obligations: Ensure Mining Right is in good standing and pay all royalties due to the State.</p>
            <p>8.2 Contractor's Obligations: Comply with all provisions of the MPRDA, NEMA, and OHSA.</p>

            <h2>9. ENVIRONMENTAL AND REHABILITATION OBLIGATIONS</h2>
            <p>9.1 The Client retains primary responsibility for financial assurance for rehabilitation under Section 41 of the MPRDA.</p>

            <h2>10. HEALTH AND SAFETY</h2>
            <p>10.1 The Contractor shall comply with all provisions of the Mine Health and Safety Act, 1996.</p>

            <h2>13. LIABILITY AND INDEMNITY</h2>
            <p>13.3 The Contractor shall indemnify and hold harmless the Client against claims arising from Contractor's breach or negligence.</p>

            <h2>15. INSURANCE</h2>
            <p>15.1 The Contractor shall maintain: Public liability (min R10M), Employers' liability, Plant and equipment insurance, and Professional indemnity (min R5M).</p>

            <h2>16. DISPUTE RESOLUTION</h2>
            <p>16.2 Disputes shall be referred to arbitration in accordance with the rules of the Arbitration Foundation of Southern Africa (AFSA), held in Johannesburg.</p>

            <h2>19. B-BBEE COMPLIANCE</h2>
            <p>19.1 The Contractor warrants that it holds a valid B-BBEE certificate reflecting Level 1 status.</p>

            <Separator className="my-8" />

            <h3>SCHEDULE A: MINING AREA AND RIGHT DETAILS</h3>
            <p>Mining Right / Permit Number: ______________________________</p>
            <p>Location / Farm Details: ______________________________</p>

            <h3>SCHEDULE B: SCOPE OF SERVICES</h3>
            <ul>
              <li><strong>Clearing and Grubbing:</strong> Removal of vegetation and topsoil.</li>
              <li><strong>Mineral Extraction:</strong> Loading and hauling.</li>
              <li><strong>Rehabilitation:</strong> Reshaping and revegetation.</li>
            </ul>

            <h3>SCHEDULE C: RATES AND PAYMENT</h3>
            <p>Overburden removal: Per bank cubic metre</p>
            <p>Mineral extraction: Per tonne</p>
            <p>Haulage: Per tonne-kilometre</p>

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

            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-2 border text-left">Aspect</th>
                    <th className="p-2 border text-left">Critical Consideration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border font-bold">Section 11 Consent</td>
                    <td className="p-2 border">If your contract resembles a lease, it may require Ministerial consent.</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-bold">Title to Minerals</td>
                    <td className="p-2 border">The Client MUST retain ownership of all minerals extracted.</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-bold">B-BBEE</td>
                    <td className="p-2 border">Level 1 status is a valuable compliance asset in the mining industry.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
