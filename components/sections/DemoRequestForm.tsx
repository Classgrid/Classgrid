"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Building2,
  Search,
  MessageSquare,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  Globe,
  Briefcase,
  Users,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Chip } from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Turnstile } from "@marsidev/react-turnstile";

type DemoRequestFormCopy = {
  fullNameLabel?: string;
  fullNamePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  phoneLabel?: string;
  phonePlaceholder?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  captchaPlaceholder?: string;
  captchaMismatchMessage?: string;
  securityCheckRequiredMessage?: string;
  submitLoadingLabel?: string;
  genericErrorMessage?: string;
  validationFullNameRequired?: string;
  validationEmailInvalid?: string;
  validationPhoneInvalid?: string;
};

const TEAM_SIZE_OPTIONS = ["1-10", "11-50", "51-200", "201-1000", "1000+"] as const;

const USE_CASE_OPTIONS = [
  "Agent for everyday work",
  "Project Mode for code",
  "WhatsApp automation",
  "Connected apps & automation",
  "Something else",
] as const;

function createDemoSchema(copy?: DemoRequestFormCopy) {
  return z.object({
    name: z.string().trim().min(2, copy?.validationFullNameRequired || "Full name is required."),
    workEmail: z.string().trim().email(copy?.validationEmailInvalid || "Please enter a valid email address."),
    company: z.string().trim().min(2, "Company is required."),
    role: z.string().trim().min(2, "Role / job title is required."),
    teamSize: z.string().refine((value) => (TEAM_SIZE_OPTIONS as readonly string[]).includes(value), {
      message: "Please select your team size.",
    }),
    phone: z
      .string()
      .regex(/^[0-9]{10,15}$/, copy?.validationPhoneInvalid || "Please enter a valid phone number."),
    useCase: z.string().refine((value) => (USE_CASE_OPTIONS as readonly string[]).includes(value), {
      message: "Please select what you want to use Classgrid AI for.",
    }),
    message: z.string().optional(),
    website: z.string().optional().refine(val => !val || /^(https?:\/\/)/.test(val), {
      message: "Please include http:// or https://"
    }),
  });
}

type DemoFormValues = z.infer<ReturnType<typeof createDemoSchema>>;

type DemoRequestFormProps = {
  label?: string;
  title?: string;
  subtitle?: string;
  ctaLine?: string;
  successTitle?: string;
  successBody?: string;
  formTitle?: string;
  formSubtitle?: string;
  submitLabel?: string;
  detailsSectionTitle?: string;
  instituteSectionTitle?: string;
  messageSectionTitle?: string;
  copy?: DemoRequestFormCopy;
};

function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function DemoRequestForm({
  label,
  title,
  subtitle,
  ctaLine,
  submitLabel,
  detailsSectionTitle,
  instituteSectionTitle,
  messageSectionTitle,
  copy,
}: DemoRequestFormProps) {
  const router = useRouter();
  const demoSchema = createDemoSchema(copy);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "";

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  useEffect(() => {
    setCaptchaCode(generateCaptcha());
  }, []);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<DemoFormValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      name: "",
      workEmail: "",
      company: "",
      role: "",
      teamSize: "",
      phone: "",
      useCase: "",
      message: "",
      website: "",
    },
  });

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    setCaptchaInput("");
    setCaptchaError("");
  };

  const onSubmit = async (payload: DemoFormValues) => {
    if (captchaInput.toUpperCase() !== captchaCode) {
      setCaptchaError(copy?.captchaMismatchMessage || "Incorrect CAPTCHA, please try again.");
      setCaptchaCode(generateCaptcha());
      setCaptchaInput("");
      setTimeout(() => setCaptchaError(""), 3000);
      return;
    }

    if (turnstileSiteKey && !turnstileToken) {
      setCaptchaError(copy?.securityCheckRequiredMessage || "");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const backendUrl = process.env.NEXT_PUBLIC_PLATFORM_API_URL || "https://api.classgrid.in";
      const response = await fetch(`${backendUrl}/api/public/request-demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name.trim(),
          workEmail: payload.workEmail.trim(),
          company: payload.company.trim(),
          role: payload.role.trim(),
          teamSize: payload.teamSize,
          phone: payload.phone.trim(),
          useCase: payload.useCase,
          message: payload.message?.trim() || "",
          website: payload.website?.trim() || "",
          turnstileToken,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || copy?.genericErrorMessage || "Something went wrong. Please try again.");
      }
      const requestId =
        typeof data?.id === "string" && data.id.trim().length > 0
          ? data.id.trim()
          : null;
      if (requestId) {
        await fetch(`/api/request-demo/${encodeURIComponent(requestId)}`, { method: "POST" }).catch(() => null);
      }
      router.push(requestId ? `/demo/success?requestId=${encodeURIComponent(requestId)}` : "/demo/success");
    } catch (err: any) {
      setError(err.message || copy?.genericErrorMessage || "");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Reusable icon-box input ── */
  const IconInput = ({
    icon: Icon,
    error: fieldError,
    children,
    label,
  }: {
    icon: any;
    error?: string;
    children: React.ReactNode;
    label: string;
  }) => (
    <div className="space-y-2">
      {label?.trim() ? (
        <Label className="text-sm font-medium text-foreground">
          {label}<span className="ml-0.5 text-red-500">*</span>
        </Label>
      ) : null}
      <div className="overflow-hidden rounded-md border border-border bg-background transition-colors focus-within:border-foreground">
        {children}
      </div>
      {fieldError && <p className="text-xs text-red-500">{fieldError}</p>}
    </div>
  );

  /* ── Reusable icon-box select ── */
  const renderIconSelect = (
    name: "teamSize" | "useCase",
    fieldLabel: string,
    placeholder: string,
    Icon: any,
    options: readonly string[],
  ) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">
        {fieldLabel}<span className="ml-0.5 text-red-500">*</span>
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            <Select value={field.value} onValueChange={field.onChange}>
              <div className="overflow-hidden rounded-md border border-border bg-background transition-colors focus-within:border-foreground">
                <SelectTrigger className="flex !h-12 w-full items-center justify-between rounded-none border-0 !bg-transparent px-4 text-[15px] text-foreground shadow-none ring-0 focus-visible:ring-0">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </div>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <select
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute inset-0 w-full h-full opacity-0 sm:hidden z-10 appearance-none"
            >
              <option value="" disabled>{placeholder}</option>
              {options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )}
      />
      {errors[name]?.message && <p className="text-xs text-red-500">{errors[name]?.message}</p>}
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-12 text-center">

        {title?.trim() ? (
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            {title}
          </h2>
        ) : null}

        {subtitle?.trim() ? (
          <div className="mx-auto mt-6 max-w-[90%] md:max-w-2xl text-center text-[15px] md:text-base leading-[1.75] text-muted-foreground space-y-4">
            {subtitle.split('\n').map((line, i) => (
              <p
                key={i}
                className="text-balance"
              >
                {line}
              </p>
            ))}
          </div>
        ) : null}
      </div>

      {/* ── Bounded card ── */}
      <div className="rounded-2xl border border-border bg-card px-8 py-10 shadow-xl md:px-12 md:py-14">

        {/* Form specific header / CTA line */}
        {ctaLine?.trim() ? (
          <div className="mb-8 text-center">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
              {ctaLine}
            </h3>
          </div>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* ── SECTION 1: YOUR DETAILS ── */}
          <div>
            {detailsSectionTitle?.trim() ? (
              <div className="mb-5 flex items-center gap-2">
                <User className="h-4 w-4 text-foreground" />
                <h3 className="text-[13px] font-bold uppercase tracking-widest text-foreground">
                  {detailsSectionTitle}
                </h3>
              </div>
            ) : null}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <IconInput icon={User} label="Full name" error={errors.name?.message}>
                <Input
                  placeholder="Enter your full name"
                  className="h-12 rounded-none border-0 bg-transparent px-4 text-[15px] text-foreground shadow-none focus-visible:ring-0"
                  {...register("name")}
                />
              </IconInput>

              <IconInput icon={Mail} label="Work email" error={errors.workEmail?.message}>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  className="h-12 rounded-none border-0 bg-transparent px-4 text-[15px] text-foreground shadow-none focus-visible:ring-0"
                  {...register("workEmail")}
                />
              </IconInput>

              <IconInput icon={Phone} label="Phone" error={errors.phone?.message}>
                <Input
                  placeholder="Enter your phone number"
                  className="h-12 rounded-none border-0 bg-transparent px-4 text-[15px] text-foreground shadow-none focus-visible:ring-0"
                  {...register("phone")}
                />
              </IconInput>
            </div>
          </div>

          {/* ── SECTION 2: COMPANY DETAILS ── */}
          <div>
            {instituteSectionTitle?.trim() ? (
              <div className="mb-5 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-foreground" />
                <h3 className="text-[13px] font-bold uppercase tracking-widest text-foreground">
                  {instituteSectionTitle}
                </h3>
              </div>
            ) : null}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <IconInput icon={Building2} label="Company" error={errors.company?.message}>
                <Input
                  placeholder="Enter your company name"
                  className="h-12 rounded-none border-0 bg-transparent px-4 text-[15px] text-foreground shadow-none focus-visible:ring-0"
                  {...register("company")}
                />
              </IconInput>

              <IconInput icon={Briefcase} label="Role / job title" error={errors.role?.message}>
                <Input
                  placeholder="e.g. Founder, Engineering Lead"
                  className="h-12 rounded-none border-0 bg-transparent px-4 text-[15px] text-foreground shadow-none focus-visible:ring-0"
                  {...register("role")}
                />
              </IconInput>

              {renderIconSelect("teamSize", "Team size", "Select team size", Users, TEAM_SIZE_OPTIONS)}

              <div className="md:col-span-2">
                {renderIconSelect(
                  "useCase",
                  "What do you want to use Classgrid AI for?",
                  "Select an option",
                  Search,
                  USE_CASE_OPTIONS,
                )}
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Website <span className="font-normal text-muted-foreground">(Optional)</span>
                </Label>
                <div className="overflow-hidden rounded-md border border-border bg-background transition-colors focus-within:border-foreground">
                  <Input
                    placeholder="https://..."
                    className="h-12 rounded-none border-0 bg-transparent px-4 text-[15px] text-foreground shadow-none focus-visible:ring-0"
                    {...register("website")}
                  />
                </div>
                {errors.website?.message && <p className="text-xs text-red-500">{errors.website.message}</p>}
              </div>
            </div>
          </div>

          {/* ── SECTION 3: MESSAGE ── */}
          <div>
            {messageSectionTitle?.trim() ? (
              <div className="mb-5 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-foreground" />
                <h3 className="text-[13px] font-bold uppercase tracking-widest text-foreground">
                  {messageSectionTitle}
                </h3>
              </div>
            ) : null}

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Tell us about your team, so we can prepare the right demo <span className="font-normal text-muted-foreground">(Optional)</span>
              </Label>
              <textarea
                rows={5}
                maxLength={1000}
                placeholder="Tell us about your team and what you want Classgrid AI to do"
                className="w-full resize-y rounded-md border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground"
                {...register("message")}
              />
              <p className="text-right text-xs text-muted-foreground">{(watch("message") || "").length} / 1000</p>
            </div>
          </div>

          {/* ── SECURITY CHECKS ── */}
          <div className="flex flex-col items-center gap-6 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/5">
            {/* Custom Captcha */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="select-none rounded-md border border-border bg-background px-5 py-2.5 text-xl font-bold italic tracking-[0.4em] text-foreground">
                  {captchaCode}
                </div>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
              <Input
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder={copy?.captchaPlaceholder}
                className="h-10 w-full max-w-[220px] border-slate-200 bg-white text-center text-sm font-bold uppercase tracking-widest text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Cloudflare Turnstile */}
            <div className="flex flex-col items-center justify-center border-t border-slate-200 pt-4 dark:border-white/10 w-full">
              {turnstileSiteKey ? (
                <Turnstile
                  siteKey={turnstileSiteKey}
                  onSuccess={(token) => setTurnstileToken(token)}
                  options={{ theme: "auto" }}
                />
              ) : (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  Security check is disabled because Turnstile site key is not configured.
                </p>
              )}
            </div>

            {captchaError && <p className="text-[11px] text-rose-500">{captchaError}</p>}
          </div>

          {/* ── SUBMIT ── */}
          {submitLabel?.trim() || copy?.submitLoadingLabel?.trim() ? (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-muted-foreground">
                By sending this form, you agree to our{" "}
                <Link href="/terms" className="text-foreground underline underline-offset-2">Terms of Service</Link>. We use your
                details only to arrange your demo, as described in our{" "}
                <Link href="/privacy" className="text-foreground underline underline-offset-2">Privacy Policy</Link>.
              </p>
              <Button
                type="submit"
                disabled={submitting}
                className="h-11 w-full gap-1.5 rounded-md border-transparent bg-foreground px-5 text-[15px] font-medium text-background hover:border-transparent hover:bg-zinc-700 hover:text-background sm:w-auto dark:bg-foreground dark:text-background dark:hover:bg-zinc-300 dark:hover:text-background"
              >
                {submitting && <Spinner className="h-5 w-5 text-inherit" />}
                {submitting ? copy?.submitLoadingLabel || "Submitting..." : submitLabel}
                {!submitting && <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          ) : null}

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="overflow-hidden"
              >
                <div className="mt-4 flex items-center gap-3 rounded-lg border border-rose-200/50 bg-rose-50/50 p-3 text-sm font-medium text-rose-600 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <p>{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
