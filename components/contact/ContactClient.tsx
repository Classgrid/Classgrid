"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, ChevronRight, LifeBuoy, Lock, MapPin, Phone, ShieldCheck } from "lucide-react"

const MESSAGE_LIMIT = 1000

const inputClass =
  "h-12 w-full rounded-md border border-border bg-background px-4 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground"

function RequiredLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-foreground">
      {children}
      <span className="ml-0.5 text-red-500">*</span>
    </label>
  )
}

function CardLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http")
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-[13px] font-medium text-foreground transition-colors hover:bg-slate-200 dark:hover:bg-zinc-800"
    >
      {children}
      <ChevronRight className="h-3.5 w-3.5" />
    </Link>
  )
}

type ContactCard = {
  icon: typeof LifeBuoy
  title: string
  body: React.ReactNode
  note?: string
  links: { label: string; href: string }[]
}

const CONTACT_CARDS: ContactCard[] = [
  {
    icon: LifeBuoy,
    title: "Support",
    body: "Find answers in the Help Center, or send us a request and track it until it's resolved.",
    links: [
      { label: "Go to Help Center", href: "/help-center" },
      { label: "Submit a request", href: "/support/ticket" },
    ],
  },
  {
    icon: Phone,
    title: "Call or email us",
    body: (
      <>
        <a href="tel:+918623947038" className="block font-medium text-foreground hover:underline">+91 8623947038</a>
        <a href="tel:+918149277038" className="block font-medium text-foreground hover:underline">+91 8149277038</a>
        <a href="mailto:support@classgrid.in" className="mt-1 block font-medium text-foreground hover:underline">support@classgrid.in</a>
        <span className="mt-2 block">We usually reply within 24 hours.</span>
      </>
    ),
    links: [],
  },
  {
    icon: Lock,
    title: "Privacy requests",
    body: "You have rights over your data. Email support@classgrid.in and we'll take care of your request.",
    links: [{ label: "Read our Privacy Policy", href: "/privacy" }],
  },
  {
    icon: ShieldCheck,
    title: "Security",
    body: "Found a security issue in one of our products? Email support@classgrid.in with the details and we'll look into it right away.",
    note: "General bugs should be reported through Support.",
    links: [{ label: "Read our Security Policy", href: "/security" }],
  },
  {
    icon: MapPin,
    title: "Office",
    body: "Akurdi Railway Station Road, Sector No. 26, Pradhikaran, Nigdi, Pimpri-Chinchwad, Maharashtra 411044, India",
    links: [{ label: "Open in Google Maps", href: "https://www.google.com/maps?q=Akurdi+Railway+Station+Road+Nigdi" }],
  },
]

export default function ContactClient() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [messageLength, setMessageLength] = useState(0)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    // Read the fields before they are locked: locked fields are left out of FormData
    const formData = new FormData(form)
    setIsSubmitting(true)
    setIsSuccess(false)
    setError("")

    try {
      const firstName = String(formData.get("firstName") || "").trim()
      const lastName = String(formData.get("lastName") || "").trim()
      const role = String(formData.get("role") || "").trim()
      const message = String(formData.get("message") || "").trim()
      const wantsUpdates = formData.get("wantsUpdates") ? "Yes" : "No"
      const payload = {
        fullName: `${firstName} ${lastName}`.trim(),
        email: formData.get("email") as string,
        message: `Role: ${role}\nWants product updates: ${wantsUpdates}\n\n${message}`,
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })
      if (response.ok) {
        setIsSuccess(true)
        form.reset()
        setMessageLength(0)
      } else {
        const data = await response.json().catch(() => ({}))
        setError(data?.message || "We couldn't send your message. Please try again.")
      }
    } catch (err) {
      console.error("Form submission error", err)
      setError("We couldn't send your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-background text-foreground">
      {/* Heading */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="px-6 pb-10 pt-28 md:px-10 md:pb-14 md:pt-36 lg:border-r lg:border-border">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
            <h1 className="mt-5 text-balance text-5xl font-medium tracking-[-0.035em] md:text-7xl">
              Get in touch with the team
            </h1>
          </div>
          <div className="flex items-end px-6 pb-10 md:px-10 md:pb-14">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Questions about Classgrid AI, your account or working with us? Send us a message and we&apos;ll reply by email.
            </p>
          </div>
        </div>
      </section>

      {/* Contact options and form */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="bg-muted/40 px-6 py-12 md:px-10 lg:border-r lg:border-border lg:py-16">
            <div className="divide-y divide-border border border-border bg-background">
              {CONTACT_CARDS.map((card) => (
                <div key={card.title} className="p-7 md:p-8">
                  <div className="flex items-center gap-3">
                    <card.icon className="h-6 w-6 shrink-0" />
                    <h2 className="text-2xl font-medium tracking-[-0.02em]">{card.title}</h2>
                  </div>
                  <div className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{card.body}</div>
                  {card.links.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {card.links.map((link) => (
                        <CardLink key={link.href} href={link.href}>
                          {link.label}
                        </CardLink>
                      ))}
                    </div>
                  ) : null}
                  {card.note ? <p className="mt-4 text-[13px] text-muted-foreground">{card.note}</p> : null}
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-12 md:px-10 lg:py-16">
            <div className="mx-auto w-full max-w-xl">
              <form onSubmit={handleSubmit}>
                <fieldset disabled={isSubmitting} className="space-y-6 disabled:opacity-60">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <RequiredLabel htmlFor="firstName">First name</RequiredLabel>
                      <input id="firstName" name="firstName" placeholder="Aarav" className={inputClass} required />
                    </div>
                    <div>
                      <RequiredLabel htmlFor="lastName">Last name</RequiredLabel>
                      <input id="lastName" name="lastName" placeholder="Sharma" className={inputClass} required />
                    </div>
                  </div>

                  <div>
                    <RequiredLabel htmlFor="email">Company email</RequiredLabel>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="aarav@company.com"
                      pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                      title="Please enter a valid email address (e.g. name@company.com)"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <RequiredLabel htmlFor="role">Role</RequiredLabel>
                    <input id="role" name="role" placeholder="Founder" className={inputClass} required />
                  </div>

                  <div>
                    <RequiredLabel htmlFor="message">Tell us about your project, so we can connect you with the right team</RequiredLabel>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      maxLength={MESSAGE_LIMIT}
                      onChange={(e) => setMessageLength(e.target.value.length)}
                      placeholder="Share your goals and anything we should know, like your team size or the work you want Classgrid AI to handle."
                      className="w-full resize-y rounded-md border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground"
                      required
                    />
                    <p className="mt-1.5 text-right text-xs text-muted-foreground">
                      {messageLength} / {MESSAGE_LIMIT}
                    </p>
                  </div>

                  <label className="flex cursor-pointer items-center gap-3 text-[15px] text-foreground">
                    <input
                      type="checkbox"
                      name="wantsUpdates"
                      className="h-5 w-5 shrink-0 cursor-pointer rounded border-border accent-foreground"
                    />
                    I want to receive updates about new features and products from Classgrid
                  </label>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    By sending this form, you agree to our{" "}
                    <Link href="/terms" className="text-foreground underline underline-offset-2">Terms of Service</Link>. We use your
                    details only to reply to your message, as described in our{" "}
                    <Link href="/privacy" className="text-foreground underline underline-offset-2">Privacy Policy</Link>.
                  </p>

                  {error ? <p className="text-sm text-red-500">{error}</p> : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-11 items-center gap-1.5 rounded-md bg-foreground px-5 text-[15px] font-medium text-background transition-colors hover:bg-zinc-700 disabled:opacity-60 dark:hover:bg-zinc-300"
                  >
                    {isSubmitting ? "Sending..." : "Talk with our team"}
                    {!isSubmitting && <ChevronRight className="h-4 w-4" />}
                  </button>
                </fieldset>

                {isSuccess ? (
                  <div className="mt-6 flex items-start gap-3 rounded-md border border-border bg-muted/40 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                      <p className="text-[15px] font-medium text-foreground">Message sent</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        Thanks for reaching out. Our team has received your message and will reply by email soon.
                      </p>
                    </div>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
