"use client";

import LeadForm from "./LeadForm";

export default function WaitlistForm() {
  const handleSuccess = () => {
    // Success state is handled inside LeadForm
  };

  return (
    <LeadForm
      conversionPath="waitlist"
      buttonLabel="Join the Waitlist"
      buttonVariant="ghost"
      onSuccess={handleSuccess}
    />
  );
}
