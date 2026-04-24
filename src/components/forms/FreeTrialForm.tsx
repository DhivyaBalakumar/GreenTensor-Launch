"use client";

import { useRouter } from "next/navigation";
import LeadForm from "./LeadForm";
import type { LeadSubmissionResponse } from "@/lib/schemas/lead";

export default function FreeTrialForm() {
  const router = useRouter();

  const handleSuccess = (response: LeadSubmissionResponse) => {
    if (response.redirectUrl) {
      router.push(response.redirectUrl);
    }
  };

  return (
    <LeadForm
      conversionPath="trial"
      buttonLabel="Start Free Trial"
      buttonVariant="primary"
      onSuccess={handleSuccess}
    />
  );
}
