/**
 * Email provider abstraction (Rule 20).
 *
 * Server-side only. The provider is determined by environment configuration.
 * No SMTP credentials are hard-coded. Never log email credentials.
 */

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export interface EmailProvider {
  readonly name: string;
  send(message: EmailMessage): Promise<{ success: boolean; error?: string }>;
}

/**
 * Development-safe provider: logs the email instead of sending it.
 * Used when no production email provider is configured.
 */
class ConsoleEmailProvider implements EmailProvider {
  readonly name = "console";

  async send(message: EmailMessage): Promise<{ success: boolean; error?: string }> {
    // Never log the full email body — only metadata for debugging.
    console.info(`[email:console] to=${message.to} subject="${message.subject}"`);
    return { success: true };
  }
}

/**
 * SMTP provider: sends via nodemailer, resolved at runtime with createRequire.
 * nodemailer is an OPTIONAL, not-installed dependency: it is only required
 * when SMTP_* is configured, so it must not be statically bundled at build
 * time. Requires SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM.
 */
class SmtpEmailProvider implements EmailProvider {
  readonly name = "smtp";

  async send(message: EmailMessage): Promise<{ success: boolean; error?: string }> {
    try {
      // Runtime require of an optional dependency (only reached when SMTP_* is
      // set). node:module is a builtin, so nothing unresolvable is bundled.
      const { createRequire } = await import("node:module");
      const nodeRequire = createRequire(process.cwd() + "/");
      const nodemailer = nodeRequire("nodemailer") as {
        createTransport(config: unknown): { sendMail(m: unknown): Promise<unknown> };
      };
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: Number(process.env.SMTP_PORT ?? 587) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
      });

      return { success: true };
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unknown email error";
      console.error(`[email:smtp] failed: ${detail}`);
      return { success: false, error: detail };
    }
  }
}

let provider: EmailProvider | null = null;

export function getEmailProvider(): EmailProvider {
  if (provider) return provider;

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    provider = new SmtpEmailProvider();
  } else {
    provider = new ConsoleEmailProvider();
  }

  return provider;
}
