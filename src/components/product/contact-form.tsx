"use client";

import { useEffect, useState } from "react";
import {
  ContactDemoSchema,
  COUNTRIES,
  BUSINESS_TYPES,
  INTERESTS,
  toFieldErrors,
} from "@/validation/forms";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { track } from "@/lib/analytics";
import { submitContactForm } from "@/app/actions/contact";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  preselectedInterest,
  intent,
}: {
  preselectedInterest?: string;
  intent?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  // Non-sensitive start signal only (never form values / PII).
  useEffect(() => {
    track("contact_start", { target: "/contact", context: intent });
    // intent is stable for the lifetime of the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const raw: Record<string, string> = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      country: String(data.get("country") ?? ""),
      businessType: String(data.get("businessType") ?? ""),
      interest: String(data.get("interest") ?? ""),
      message: String(data.get("message") ?? ""),
      website_url: String(data.get("website_url") ?? ""),
    };

    const honeypotFilled = (raw.website_url?.length ?? 0) > 0;

    const parsed = ContactDemoSchema.safeParse(raw);
    if (!parsed.success || honeypotFilled) {
      setErrors(parsed.success ? {} : toFieldErrors(parsed.error));
      setStatus("error");
      track("contact_submit_error", { target: "/contact", context: intent, section: "form" });
      return;
    }

    if (!privacyAccepted) {
      setErrors({ privacy: "Please accept the privacy notice." });
      setStatus("error");
      return;
    }

    const value = parsed.data;
    setStatus("submitting");

    track("contact_submit_success", {
      interest: value.interest,
      businessType: value.businessType,
      context: intent,
      section: "form",
    });

    const result = await submitContactForm(data);

    if (result.success) {
      setStatus("success");
      form.reset();
      setErrors({});
      setPrivacyAccepted(false);
    } else {
      setStatus("error");
      if (result.fieldErrors) {
        setErrors(result.fieldErrors);
      }
    }
  }

  if (status === "success") {
    return (
      <Card variant="glass" className="flex flex-col items-center gap-4 p-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
          <svg
            className="h-7 w-7 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="type-h3">Request Received</div>
        <p className="max-w-sm type-body text-text-muted">
          Your brokerage technology request has been securely submitted. The
          team will review your requirements and respond to scope the next
          steps.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="primary" onClick={() => setStatus("idle")}>
            Send another message
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Name"
          name="name"
          autoComplete="name"
          required
          error={errors.name}
          placeholder="Your name"
        />
        <Input
          label="Business email"
          name="email"
          type="email"
          autoComplete="email"
          required
          error={errors.email}
          placeholder="you@broker.com"
        />
        <Input
          label="Company"
          name="company"
          autoComplete="organization"
          required
          error={errors.company}
          placeholder="Your brokerage or firm"
        />
        <Select
          label="Country"
          name="country"
          options={COUNTRIES.map((c) => ({ value: c, label: c }))}
          defaultValue=""
          placeholder="Select country"
          error={errors.country}
        />
        <Select
          label="Business type"
          name="businessType"
          options={BUSINESS_TYPES}
          defaultValue=""
          placeholder="Select business type"
          error={errors.businessType}
        />
        <Select
          label="What are you looking for?"
          name="interest"
          options={INTERESTS}
          defaultValue={preselectedInterest ?? ""}
          placeholder="Select one"
          error={errors.interest}
        />
      </div>

      <Textarea
        label="Message (optional)"
        name="message"
        placeholder="Tell us about your structure, timeline and what you want to solve."
        error={errors.message}
      />

      {/* Context intent: a known enum value, validated server-side and used
          only as non-sensitive lead source metadata. Never free text. */}
      <input type="hidden" name="context" value={intent ?? "general"} />

      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="website_url">Websites</label>
        <input id="website_url" name="website_url" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-2.5 type-small text-text-muted">
          <input
            type="checkbox"
            name="privacy"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            className="mt-0.5"
          />
          I understand my details are used to respond to this request. See the
          privacy notice.
        </label>
        {errors.privacy ? (
          <p role="alert" className="type-caption text-danger">
            {errors.privacy}
          </p>
        ) : null}
      </div>

      {status === "error" && !errors.privacy ? (
        <p role="alert" className="type-caption text-danger">
          Please check the highlighted fields.
        </p>
      ) : null}

      <Button type="submit" variant="primary" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send request"}
      </Button>

      <p className="type-caption text-text-muted">
        We do not ask for passwords, payment details, identity documents or
        API keys.
      </p>
    </form>
  );
}
