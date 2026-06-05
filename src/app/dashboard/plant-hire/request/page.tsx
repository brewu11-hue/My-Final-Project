
"use client";

import { Suspense } from "react";
import { MiningIndustrialForm } from "@/components/mining-industrial-form";

export default function PlantHireRequestPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MiningIndustrialForm />
        </Suspense>
    );
}
