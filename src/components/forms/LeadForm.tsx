"use client";

import { useRef, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import {
  leadSchema,
  type LeadFormData,
  type LeadSubmissionResponse,
} from "@/lib/schemas/lead";
import Button from "@/components/ui/Button";

interface LeadFormProps {
  conversionPath: LeadFormData["conversionPath"];
  personaEngaged?: LeadFormData["personaEngaged"];
  buttonLabel: string;
  buttonVariant?: "primary" | "secondary" | "ghost";
  onSuccess?: (response: LeadSubmissionResponse) => void;
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ id, label, error, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-gt-text text-sm font-medium">
        {label}
        {required && (
          <span className="text-gt-green ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-red-400 text-xs flex items-center gap-1"
        >
          <AlertCircle size={12} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Input styles ─────────────────────────────────────────────────────────────

const inputClass = [
  "w-full px-3 py-2.5 rounded-lg text-sm",
  "bg-gt-bg border border-gt-border text-gt-text",
  "placeholder:text-gt-muted/60",
  "focus:outline-none focus:border-gt-green focus:ring-1 focus:ring-gt-green/30",
  "transition-colors duration-150",
  "disabled:opacity-50 disabled:cursor-not-allowed",
].join(" ");

// ─── LeadForm ─────────────────────────────────────────────────────────────────

type UiState = "idle" | "loading" | "success" | "error";

export default function LeadForm({
  conversionPath,
  personaEngaged,
  buttonLabel,
  buttonVariant = "primary",
  onSuccess,
}: LeadFormProps) {
  const uid = useId();
  const fid = (field: string) => `${uid}-${field}`;

  const successRef = useRef<HTMLDivElement>(null);
  const [uiState, setUiState] = useState<UiState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [successResponse, setSuccessResponse] =
    useState<LeadSubmissionResponse | null>(null);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      conversionPath,
      personaEngaged,
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setUiState("loading");
    setServerError(null);

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const payload = {
        formData: data,
        pageUrl: window.location.href,
        utmSource: searchParams.get("utm_source") ?? undefined,
        utmMedium: searchParams.get("utm_medium") ?? undefined,
        utmCampaign: searchParams.get("utm_campaign") ?? undefined,
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json: LeadSubmissionResponse = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Submission failed. Please try again.");
      }

      setSuccessResponse(json);
      setUiState("success");
      onSuccess?.(json);

      // Move focus to success message
      setTimeout(() => successRef.current?.focus(), 50);
    } catch (err) {
      setUiState("error");
      setServerError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  const onInvalid = () => {
    // Move focus to first invalid field
    const firstError = Object.keys(errors)[0] as keyof LeadFormData | undefined;
    if (firstError) setFocus(firstError);
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (uiState === "success") {
    return (
      <motion.div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="assertive"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4 py-8 text-center focus:outline-none"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        >
          <CheckCircle2 size={48} className="text-gt-green" aria-hidden="true" />
        </motion.div>
        <div>
          <p className="text-gt-text font-semibold text-lg">You&apos;re in!</p>
          <p className="text-gt-muted text-sm mt-1">
            {successResponse?.message || "We&apos;ll be in touch shortly."}
          </p>
        </div>
      </motion.div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
      aria-label={`${conversionPath} form`}
    >
      {/* Live error region for screen readers */}
      <div aria-live="polite" className="sr-only">
        {Object.values(errors)
          .map((e) => e?.message)
          .filter(Boolean)
          .join(". ")}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field
          id={fid("firstName")}
          label="First Name"
          error={errors.firstName?.message}
          required
        >
          <input
            id={fid("firstName")}
            type="text"
            autoComplete="given-name"
            placeholder="Jane"
            className={inputClass}
            aria-describedby={
              errors.firstName ? `${fid("firstName")}-error` : undefined
            }
            aria-invalid={!!errors.firstName}
            {...register("firstName")}
          />
        </Field>

        <Field
          id={fid("lastName")}
          label="Last Name"
          error={errors.lastName?.message}
          required
        >
          <input
            id={fid("lastName")}
            type="text"
            autoComplete="family-name"
            placeholder="Smith"
            className={inputClass}
            aria-describedby={
              errors.lastName ? `${fid("lastName")}-error` : undefined
            }
            aria-invalid={!!errors.lastName}
            {...register("lastName")}
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field
          id={fid("email")}
          label="Work Email"
          error={errors.email?.message}
          required
        >
          <input
            id={fid("email")}
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            className={inputClass}
            aria-describedby={
              errors.email ? `${fid("email")}-error` : undefined
            }
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field
          id={fid("company")}
          label="Company"
          error={errors.company?.message}
          required
        >
          <input
            id={fid("company")}
            type="text"
            autoComplete="organization"
            placeholder="Acme Corp"
            className={inputClass}
            aria-describedby={
              errors.company ? `${fid("company")}-error` : undefined
            }
            aria-invalid={!!errors.company}
            {...register("company")}
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field
          id={fid("role")}
          label="Job Title"
          error={errors.role?.message}
          required
        >
          <input
            id={fid("role")}
            type="text"
            autoComplete="organization-title"
            placeholder="MLOps Engineer"
            className={inputClass}
            aria-describedby={
              errors.role ? `${fid("role")}-error` : undefined
            }
            aria-invalid={!!errors.role}
            {...register("role")}
          />
        </Field>
      </div>

      {/* Hidden fields */}
      <input type="hidden" {...register("conversionPath")} />
      {personaEngaged && (
        <input type="hidden" {...register("personaEngaged")} />
      )}

      {/* GDPR/CCPA consent checkbox */}
      <div className="mt-5">
        <div className="flex items-start gap-3">
          <input
            id={fid("consentGiven")}
            type="checkbox"
            className="mt-0.5 w-4 h-4 rounded border-gt-border bg-gt-bg text-gt-green focus:ring-gt-green/30 focus:ring-2 cursor-pointer"
            aria-describedby={
              errors.consentGiven
                ? `${fid("consentGiven")}-error`
                : undefined
            }
            aria-invalid={!!errors.consentGiven}
            {...register("consentGiven")}
          />
          <label
            htmlFor={fid("consentGiven")}
            className="text-gt-muted text-xs leading-relaxed cursor-pointer hover:text-gt-text transition-colors"
          >
            I agree to GreenTensor&apos;s{" "}
            <a
              href="/privacy"
              className="text-gt-green underline hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gt-green rounded"
            >
              Privacy Policy
            </a>{" "}
            and consent to being contacted about GreenTensor products and
            services.
          </label>
        </div>
        {errors.consentGiven && (
          <p
            id={`${fid("consentGiven")}-error`}
            role="alert"
            className="text-red-400 text-xs flex items-center gap-1 mt-1.5"
          >
            <AlertCircle size={12} aria-hidden="true" />
            {errors.consentGiven.message}
          </p>
        )}
      </div>

      {/* Server error */}
      <AnimatePresence>
        {serverError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2"
            role="alert"
          >
            <AlertCircle size={16} aria-hidden="true" />
            {serverError}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-5">
        <Button
          type="submit"
          variant={buttonVariant}
          size="md"
          disabled={uiState === "loading"}
          className="w-full"
        >
          {uiState === "loading" ? "Submitting…" : buttonLabel}
        </Button>
      </div>
    </form>
  );
}
