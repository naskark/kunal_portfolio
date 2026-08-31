"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { PortfolioData } from "@/data/portfolio";
import SectionShell from "@/components/ui/SectionShell";
import Magnetic from "@/components/ui/Magnetic";
import { sendContactMessage } from "@/lib/portfolio-service";
import {
  LuMail,
  LuPhone,
  LuLinkedin,
  LuCopy,
  LuCheck,
  LuArrowUpRight,
  LuMapPin,
} from "react-icons/lu";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact({ data }: { data: PortfolioData }) {
  const { profile } = data;
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    botcheck: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setFeedback("");

    const result = await sendContactMessage(form);
    setStatus(result.ok ? "sent" : "error");
    setFeedback(result.message);

    if (result.ok) {
      setForm({ name: "", email: "", message: "", botcheck: "" });
    }
  };

  const channels = [
    {
      id: "email",
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      Icon: LuMail,
      color: "#22D3EE",
      copyable: true,
      external: false,
    },
    {
      id: "phone",
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/[^+\d]/g, "")}`,
      Icon: LuPhone,
      color: "#34D399",
      copyable: true,
      external: false,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "in/kunal-naskar",
      href: profile.linkedin,
      Icon: LuLinkedin,
      color: "#0A66C2",
      copyable: false,
      external: true,
    },
  ];

  const copy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      // Clipboard can be blocked; the link itself still works.
    }
  };

  return (
    <SectionShell
      id="contact"
      index="05"
      eyebrow="Contact"
      title={
        <>
          Got something worth building?{" "}
          <span className="text-gradient">Let&apos;s talk.</span>
        </>
      }
      description="Open to senior engineering roles, product partnerships and interesting problems."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div>
          {channels.map((channel, index) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex items-center gap-4 border-b border-ice/8 py-5"
            >
              <a
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className="flex min-w-0 flex-1 items-center gap-4"
              >
                <span
                  className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ice/12 bg-ice/[0.03] transition-all duration-300 group-hover:scale-105"
                  style={{ borderColor: `${channel.color}40` }}
                >
                  <span
                    className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40"
                    style={{ background: channel.color }}
                  />
                  <channel.Icon
                    aria-hidden
                    className="relative text-xl"
                    style={{ color: channel.color }}
                  />
                </span>

                <span className="min-w-0">
                  <span className="block font-mono text-[10px] tracking-[0.24em] text-mist/50 uppercase">
                    {channel.label}
                  </span>
                  <span className="mt-1 block truncate text-base font-medium text-ice transition-colors duration-300 group-hover:text-cyan">
                    {channel.value}
                  </span>
                </span>
              </a>

              {channel.copyable ? (
                <button
                  type="button"
                  onClick={() => copy(channel.id, channel.value)}
                  aria-label={`Copy ${channel.label.toLowerCase()}`}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-ice/10 text-mist/50 transition-colors duration-300 hover:border-cyan/40 hover:text-cyan"
                >
                  {copied === channel.id ? (
                    <LuCheck aria-hidden className="text-cyan" />
                  ) : (
                    <LuCopy aria-hidden />
                  )}
                </button>
              ) : (
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open LinkedIn profile"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-ice/10 text-mist/50 transition-all duration-300 hover:border-cyan/40 hover:text-cyan"
                >
                  <LuArrowUpRight aria-hidden />
                </a>
              )}
            </motion.div>
          ))}

          <AnimatePresence>
            {copied ? (
              <motion.p
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="pt-3 font-mono text-[10px] tracking-[0.2em] text-cyan uppercase"
              >
                Copied to clipboard
              </motion.p>
            ) : null}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-start gap-4 pt-7"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-violet/25 bg-ice/[0.03]">
              <LuMapPin aria-hidden className="text-xl text-violet" />
            </span>
            <span>
              <span className="block font-mono text-[10px] tracking-[0.24em] text-mist/50 uppercase">
                Availability
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-mist/70">
                Based in {profile.location}. Comfortable with remote and hybrid
                teams across time zones.
              </span>
            </span>
          </motion.div>
        </div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8"
        >
          <div className="pointer-events-none absolute -top-28 -right-20 h-64 w-64 rounded-full bg-violet/15 blur-3xl" />

          <div className="relative space-y-5">
            <input
              type="text"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              value={form.botcheck}
              onChange={(event) =>
                setForm({ ...form, botcheck: event.target.value })
              }
              className="hidden"
            />

            {(
              [
                { name: "name", label: "Your name", type: "text" },
                { name: "email", label: "Email address", type: "email" },
              ] as const
            ).map((field) => (
              <label key={field.name} className="block">
                <span className="font-mono text-[10px] tracking-[0.24em] text-mist/55 uppercase">
                  {field.label}
                </span>
                <input
                  required
                  type={field.type}
                  maxLength={field.name === "email" ? 200 : 100}
                  autoComplete={field.name === "email" ? "email" : "name"}
                  value={form[field.name]}
                  onChange={(event) =>
                    setForm({ ...form, [field.name]: event.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-ice/12 bg-navy-950/40 px-4 py-3.5 text-sm text-ice outline-none transition-colors duration-300 placeholder:text-mist/30 focus:border-cyan/60 focus:bg-navy-950/70"
                  placeholder={field.name === "email" ? "you@company.com" : "Jane Doe"}
                />
              </label>
            ))}

            <label className="block">
              <span className="font-mono text-[10px] tracking-[0.24em] text-mist/55 uppercase">
                Message
              </span>
              <textarea
                required
                rows={5}
                maxLength={4000}
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                className="mt-2 w-full resize-none rounded-xl border border-ice/12 bg-navy-950/40 px-4 py-3.5 text-sm text-ice outline-none transition-colors duration-300 placeholder:text-mist/30 focus:border-cyan/60 focus:bg-navy-950/70"
                placeholder="Tell me about the role or the problem you're solving…"
              />
            </label>

            <Magnetic strength={0.15}>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative w-full overflow-hidden rounded-xl bg-ice py-4 text-sm font-semibold text-navy-900 disabled:opacity-70"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {status === "sending" ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                        className="inline-block h-4 w-4 rounded-full border-2 border-navy-900/30 border-t-navy-900"
                      />
                      Sending
                    </>
                  ) : (
                    <>
                      Send message
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  )}
                </span>
                <span className="absolute inset-0 z-0 translate-y-full bg-gradient-to-r from-cyan to-violet transition-transform duration-400 group-hover:translate-y-0" />
              </button>
            </Magnetic>

            <AnimatePresence>
              {feedback ? (
                <motion.p
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`text-center text-sm ${
                    status === "error" ? "text-red-300" : "text-cyan"
                  }`}
                >
                  {feedback}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>
    </SectionShell>
  );
}
