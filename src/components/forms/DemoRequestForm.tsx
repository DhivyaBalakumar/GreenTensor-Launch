"use client";

import LeadForm from "./LeadForm";

export default function DemoRequestForm() {
  const handleSuccess = () => {
    // Success state is handled inside LeadForm
  };

  return (
    <LeadForm
      conversionPath="demo"
      buttonLabel="Request a Demo"
      buttonVariant="secondary"
      onSuccess={handleSuccess}
    />
  );
}
