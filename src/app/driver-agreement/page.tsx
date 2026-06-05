
import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DriverAgreementPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto flex-1 py-24 px-4 md:px-6">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">
              TT GROUP PARTNER DRIVER AGREEMENT
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-stone dark:prose-invert max-w-none">
            
            <h2>1. PARTIES TO AGREEMENT</h2>
            <p>
                <strong>TT Group App (Pty) Ltd</strong><br />
                Registration Number: K2025711621<br />
                Address: 5742 Doornkop Ext 6, Soweto, 1874<br />
                (Hereinafter referred to as "TT Group App")
            </p>
            <p><strong>AND</strong></p>
            <p>
                <strong>Partner Driver:</strong><br />
                Full Name: _________________________<br />
                ID Number: _________________________<br />
                Address: _________________________<br />
                Vehicle Details: _________________________<br />
                (Hereinafter referred to as "Partner Driver")
            </p>
            
            <h2>2. BACKGROUND</h2>
            <p>2.1. TT Group App operates a digital platform connecting waste collection services with households and businesses.</p>
            <p>2.2. TT Group App holds Municipal Permit No: ___________ for waste collection and disposal at Palm Springs Landfill Site.</p>
            <p>2.3. Partner Driver wishes to provide waste collection services through the TT Group App platform.</p>

            <h2>3. TERMS AND CONDITIONS</h2>
            <h3>3.1. PERMIT COMPLIANCE</h3>
            <p>Partner Driver AGREES to:</p>
            <ul>
                <li>Operate SOLELY under TT Group App's municipal permit</li>
                <li>Comply with ALL waste management regulations</li>
                <li>Follow designated routes to Palm Springs Landfill Site</li>
                <li>Adhere to operating hours and municipal bylaws</li>
            </ul>

            <h3>3.2. VEHICLE REQUIREMENTS</h3>
            <p>Partner Driver MUST maintain:</p>
            <ul>
                <li>Valid vehicle registration certificate</li>
                <li>Current roadworthy certificate</li>
                <li>Comprehensive insurance coverage</li>
                <li>Vehicle in good mechanical condition</li>
                <li>TT Group App branding (where required)</li>
            </ul>

            <h3>3.3. WASTE HANDLING PROTOCOLS</h3>
            <p>Partner Driver SHALL:</p>
            <ul>
                <li>Only collect pre-approved waste types</li>
                <li>No hazardous or prohibited materials</li>
                <li>Secure loads during transportation</li>
                <li>Maintain clean operation areas</li>
                <li>Report any incidents immediately</li>
            </ul>
            
            <h3>3.4. OPERATIONAL STANDARDS</h3>
            <ul>
                <li>Professional conduct with customers</li>
                <li>Timely collection and disposal</li>
                <li>Accurate trip reporting via app</li>
                <li>Daily vehicle safety checks</li>
                <li>Proper use of personal protective equipment</li>
            </ul>

            <h2>4. DOCUMENTATION REQUIREMENTS</h2>
            <p>Partner Driver MUST submit:</p>
            <ul>
                <li>Certified copy of ID document</li>
                <li>Vehicle registration certificate</li>
                <li>Roadworthy certificate</li>
                <li>Driver's license (with PDP if required)</li>
                <li>Insurance certificate</li>
                <li>Proof of address</li>
            </ul>

            <h2>5. INSURANCE AND LIABILITY</h2>
            <p>5.1. Partner Driver maintains own vehicle insurance</p>
            <p>5.2. TT Group App maintains public liability insurance</p>
            <p>5.3. Partner Driver liable for own vehicle damages</p>
            <p>5.4. TT Group App liable for waste compliance issues</p>

            <h2>6. PAYMENT TERMS</h2>
            <p>6.1. Payment based on completed trips via app</p>
            <p>6.2. Weekly settlements to registered bank account</p>
            <p>6.3. 15% service fee deducted by TT Group App</p>
            <p>6.4. Detailed statements available in driver portal</p>

            <h2>7. TERMINATION CLAUSE</h2>
            <p>TT Group App MAY immediately terminate this agreement for:</p>
            <ul>
                <li>Violation of municipal regulations</li>
                <li>Multiple customer complaints</li>
                <li>Safety violations</li>
                <li>Fraudulent activity</li>
                <li>Non-compliance with this agreement</li>
            </ul>

            <h2>8. INDEMNITY</h2>
            <p>Partner Driver INDEMNIFIES and holds harmless TT Group App against:</p>
            <ul>
                <li>Any fines or penalties incurred by Partner Driver</li>
                <li>Vehicle-related accidents or incidents</li>
                <li>Personal injury claims during operations</li>
                <li>Property damage during collections</li>
            </ul>

            <h2>9. TRAINING AND SUPPORT</h2>
            <p>9.1. Mandatory compliance training required</p>
            <p>9.2. Ongoing support via TT Group App</p>
            <p>9.3. 24/7 operational support line</p>
            <p>9.4. Regular compliance updates</p>

            <h2>10. AGREEMENT PERIOD</h2>
            <p>This agreement is valid for 12 months from date of signing, renewable annually subject to compliance record.</p>

            <h2>SIGNATORIES</h2>
            <p>
                <strong>FOR TT GROUP APP (PTY) LTD:</strong><br />
                Signature<br />
                Name: THLOLOGELO MAROGA<br />
                Title: Managing Director<br />
                Date: _______________
            </p>
            <p>
                <strong>FOR PARTNER DRIVER:</strong><br />
                Signature<br />
                Name: _________________________<br />
                ID Number: _________________________<br />
                Date: _______________
            </p>
            <p>
                <strong>WITNESS:</strong><br />
                Signature<br />
                Name: _________________________<br />
                Date: _______________
            </p>

            <h2>ATTACHMENTS CHECKLIST</h2>
            <ul>
                <li>Driver ID Document</li>
                <li>Vehicle Registration</li>
                <li>Roadworthy Certificate</li>
                <li>Driver's License</li>
                <li>Insurance Certificate</li>
                <li>Compliance Training Certificate</li>
            </ul>

            <h2>OPERATIONAL MANUAL ACKNOWLEDGEMENT</h2>
            <p>I hereby confirm I have received and understood the TT Group App Operational Manual covering:</p>
            <ul>
                <li>Waste handling procedures</li>
                <li>Municipal compliance requirements</li>
                <li>Safety protocols</li>
                <li>Customer service standards</li>
                <li>Emergency procedures</li>
            </ul>
            <p>
                Partner Driver Signature: _________________________<br />
                Date: _______________
            </p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
