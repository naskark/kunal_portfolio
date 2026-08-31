import { portfolio, type PortfolioData } from "@/data/portfolio";

/**
 * Single seam between the UI and the portfolio content source.
 * Today it resolves the bundled static data. When a backend exists, set
 * NEXT_PUBLIC_PORTFOLIO_API_URL and the fetch branch takes over without any
 * change to the components consuming these functions.
 */
const API_URL = process.env.NEXT_PUBLIC_PORTFOLIO_API_URL;

export async function getPortfolio(): Promise<PortfolioData> {
  if (!API_URL) return portfolio;

  try {
    const res = await fetch(`${API_URL}/portfolio`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Portfolio API responded ${res.status}`);
    return (await res.json()) as PortfolioData;
  } catch {
    // Content must always render, so the bundled snapshot is the fallback.
    return portfolio;
  }
}

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
  botcheck?: string;
};

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const CONTACT_EMAIL = portfolio.profile.email;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 100, email: 200, message: 4000 };

/**
 * Submits straight from the browser because Web3Forms rejects server-side
 * requests on the free plan. Delivery is only reported as successful when
 * Web3Forms confirms it, so a failure is never shown as a success.
 */
export async function sendContactMessage(
  payload: ContactMessage
): Promise<{ ok: boolean; message: string }> {
  if (!WEB3FORMS_KEY) {
    return {
      ok: false,
      message: `The form isn't connected yet — please email ${CONTACT_EMAIL} directly.`,
    };
  }

  const name = payload.name.trim();
  const email = payload.email.trim();
  const message = payload.message.trim();

  if (!name || !email || !message) {
    return { ok: false, message: "Please fill in your name, email and message." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, message: "That email address doesn't look valid." };
  }

  if (
    name.length > MAX.name ||
    email.length > MAX.email ||
    message.length > MAX.message
  ) {
    return { ok: false, message: "That message is too long — please shorten it." };
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `Portfolio enquiry from ${name}`,
        from_name: "Portfolio Contact Form",
        name,
        email,
        message,
        // Web3Forms drops submissions where this hidden field is filled in.
        botcheck: payload.botcheck ?? "",
      }),
    });

    const result = (await res.json()) as { success?: boolean };

    if (!res.ok || !result.success) {
      throw new Error(`Web3Forms responded ${res.status}`);
    }

    return { ok: true, message: "Message sent — I'll get back to you shortly." };
  } catch (error) {
    console.error("Contact form delivery failed:", error);
    return {
      ok: false,
      message: `Couldn't send that right now. Please email ${CONTACT_EMAIL} directly.`,
    };
  }
}
