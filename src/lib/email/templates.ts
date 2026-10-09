import type { EmailMessage } from "@/lib/email/provider";
import type { LeadInput } from "@/lib/lead-store";

/**
 * Email templates (Phase 6 Rule 15/21/22).
 *
 * All body values are HTML-escaped; recipients come only from trusted server
 * config (never user-controlled); subjects are capped; no user-controlled
 * headers / attachments. The confirmation makes NO operational SLA promise.
 */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safeSubject(text: string): string {
  return text.slice(0, 200);
}

/** Internal notification to the sales inbox (Rule 21). */
export function internalNotification(lead: LeadInput): EmailMessage {
  const e = {
    intent: escapeHtml(lead.intent),
    interest: escapeHtml(lead.interest),
    name: escapeHtml(lead.name),
    email: escapeHtml(lead.email),
    company: escapeHtml(lead.company),
    country: escapeHtml(lead.country),
    businessType: escapeHtml(lead.businessType),
    message: escapeHtml(lead.message),
    source: escapeHtml(lead.source),
  };

  const html = `
    <h2>New FOREXAA inquiry</h2>
    <table>
      <tr><td><strong>Interest</strong></td><td>${e.interest}</td></tr>
      <tr><td><strong>Context</strong></td><td>${e.intent}</td></tr>
      <tr><td><strong>Name</strong></td><td>${e.name}</td></tr>
      <tr><td><strong>Email</strong></td><td>${e.email}</td></tr>
      <tr><td><strong>Company</strong></td><td>${e.company}</td></tr>
      <tr><td><strong>Country</strong></td><td>${e.country}</td></tr>
      <tr><td><strong>Business type</strong></td><td>${e.businessType}</td></tr>
      <tr><td><strong>Source</strong></td><td>${e.source}</td></tr>
    </table>
    <p><strong>Message:</strong></p>
    <blockquote style="white-space:pre-line;">${e.message}</blockquote>
  `;

  const text = [
    "New FOREXAA inquiry",
    "",
    `Interest: ${lead.interest}`,
    `Context: ${lead.intent}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company}`,
    `Country: ${lead.country}`,
    `Business type: ${lead.businessType}`,
    `Source: ${lead.source}`,
    "",
    "Message:",
    lead.message,
  ].join("\n");

  return {
    to: process.env.SALES_EMAIL ?? "sales@forexaa.com",
    subject: safeSubject(`New inquiry: ${lead.interest} — ${lead.company}`),
    html,
    text,
  };
}

/**
 * User confirmation (Rule 21/25). Brief; no fabricated response-time SLA.
 * Recipient is the lead's own validated email address.
 */
export function userConfirmation(lead: LeadInput): EmailMessage {
  const name = escapeHtml(lead.name);
  const html = `
    <p>Hi ${name},</p>
    <p>Thanks for contacting FOREXAA. Your request has been received.</p>
    <p>We have your details and will be in touch to scope the next steps for
       your brokerage technology.</p>
    <p>— The FOREXAA team</p>
  `;
  const text = `Hi ${lead.name},

Thanks for contacting FOREXAA. Your request has been received.

We have your details and will be in touch to scope the next steps for your
brokerage technology.

— The FOREXAA team`;

  return {
    to: lead.email,
    subject: "We received your FOREXAA request",
    html,
    text,
  };
}
