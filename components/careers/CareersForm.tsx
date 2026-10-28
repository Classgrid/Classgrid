// @ts-nocheck
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, Paperclip, Eye, Trash2, CalendarIcon, ChevronDown, ChevronLeft, ChevronRight, Loader2, ShieldCheck, MessageSquare } from "lucide-react";
import { Github } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getPresignedUrlForResume } from "@/app/actions/r2-actions";
import FilePreviewModal from "@/app/support/components/FilePreviewModal";
import { Spinner } from "@/components/ui/spinner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import locationData from "@/data/india-locations.json";

const DEGREES = [
  "B.Tech", "B.E.", "B.Sc", "B.Com", "B.A.", "BBA", "BCA", "B.Arch", "B.Pharm",
  "MBBS", "BDS", "BPT", "B.Sc Nursing", "B.Ed", "LLB", "BA LLB", "BBA LLB", "B.Des", "B.Voc",
  "M.Tech / M.E.", "M.Sc", "M.Com", "M.A.", "MBA", "MCA", "M.Arch", "M.Pharm",
  "MD / MS", "MDS", "MPT", "M.Sc Nursing", "M.Ed", "LLM", "M.Des", "Ph.D",
  "Diploma in Engineering", "Diploma in Pharmacy", "Diploma in Management", "ITI",
  "BMM", "BMS", "BHM (Hotel Management)", "BFA", "B.Lib.I.Sc", "M.Lib.I.Sc",
  "B.P.Ed", "M.P.Ed", "Integrated B.Tech+M.Tech", "Integrated B.Sc+M.Sc",
  "Integrated BBA+MBA", "Other"
];

const CAREER_STEPS = ["About you", "Location & education", "Role & availability", "Your profiles", "Skills & questions"];

type FieldOption = { value: string; label: string };
const toOptions = (values: string[]): FieldOption[] => values.map((v) => ({ value: v, label: v }));

// Our Select for the look, plus a hidden native select with the same name so FormData,
// "required" and the step checks keep working. On phones a see-through native select sits on top.
function FieldSelect({ name, options, placeholder, value, onChange, required, disabled }: {
  name?: string;
  options: FieldOption[];
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
}) {
  const [inner, setInner] = useState("");
  const current = value ?? inner;
  const update = (next: string) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
  };
  const labelOf = (v: string) => options.find((o) => o.value === v)?.label ?? v;

  return (
    <div className="relative">
      <Select value={current} onValueChange={(v) => update(String(v ?? ""))} disabled={disabled}>
        <SelectTrigger className={`!h-12 w-full rounded-md border border-border bg-background px-4 text-[15px] font-normal shadow-none disabled:cursor-not-allowed disabled:opacity-50 ${current ? "text-foreground" : "text-muted-foreground"}`}>
          <SelectValue placeholder={placeholder}>{(v) => (v ? labelOf(String(v)) : placeholder)}</SelectValue>
        </SelectTrigger>
        <SelectContent side="bottom" className="max-h-[300px] overflow-y-auto">
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <select
        value={current}
        onChange={(e) => update(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        disabled={disabled}
        aria-label={placeholder}
        className="absolute inset-0 z-10 h-full w-full appearance-none opacity-0 sm:hidden"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {name ? (
        <select
          name={name}
          required={required}
          disabled={disabled}
          value={current}
          onChange={(e) => update(e.target.value)}
          tabIndex={-1}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 h-px w-px opacity-0"
        >
          <option value="" />
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : null}
    </div>
  );
}

const YEARS_OF_STUDY = [
  "1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Graduated", "Post-Graduated", "Dropped Out"
];

type SalesRole = {
  label: string;
  value: string;
};


type CareersFormProps = {
  formTitle: string;
  formSubtitle: string;
  submitLabel: string;
  fieldName: string;
  fieldEmail: string;
  fieldInstitution: string;
  fieldRole: string;
  rolePlaceholder: string;
  roles: SalesRole[];
  techStackGroups?: Record<string, string[]>;
};

export function CareersForm({
  formTitle,
  formSubtitle,
  submitLabel,
  fieldName,
  fieldEmail,
  fieldInstitution,
  fieldRole,
  rolePlaceholder,
  roles,
  techStackGroups = {},
}: CareersFormProps) {
  // TOGGLE: Set to true once Meta WhatsApp billing issue is resolved
  const REQUIRE_OTP = false;

  const [isSubmitting, setIsSubmitting] = useState(false);

  // The form is shown one step at a time; every field stays in the form, hidden steps are only not shown
  const [step, setStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const firstInvalidField = (index: number) => {
    const container = stepRefs.current[index];
    if (!container) return null;
    const fields = container.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea");
    return Array.from(fields).find((field) => !field.disabled && field.type !== "hidden" && !field.checkValidity()) || null;
  };

  const showStep = (index: number) => {
    setStep(index);
    const form = stepRefs.current[0]?.closest("form");
    if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goNext = () => {
    const invalid = firstInvalidField(step);
    if (invalid) {
      invalid.reportValidity();
      return;
    }
    showStep(Math.min(step + 1, CAREER_STEPS.length - 1));
  };

  const goBack = () => showStep(Math.max(step - 1, 0));

  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [showStacks, setShowStacks] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const itemVariants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } } as any;

  // --- Location cascading state ---
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [availabilityDate, setAvailabilityDate] = useState<Date>();
  const [tempDate, setTempDate] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // OAuth States
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleFilled, setGoogleFilled] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [selectedGithubRepos, setSelectedGithubRepos] = useState<string[]>([]);
  const [githubProfile, setGithubProfile] = useState<{ username: string, url: string } | null>(null);
  const [selectedDropdownRepo, setSelectedDropdownRepo] = useState("");
  const [isVerifyingRepo, setIsVerifyingRepo] = useState(false);
  const [isGithubVerified, setIsGithubVerified] = useState(false);
  const [isUnder18, setIsUnder18] = useState(false);

  // WhatsApp OTP Verification State
  const [phoneValue, setPhoneValue] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneVerificationToken, setPhoneVerificationToken] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [otpExpiry, setOtpExpiry] = useState(0);
  const otpCooldownRef = useRef<NodeJS.Timeout | null>(null);
  const otpExpiryRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (otpCooldownRef.current) clearInterval(otpCooldownRef.current);
      if (otpExpiryRef.current) clearInterval(otpExpiryRef.current);
    };
  }, []);

  const handleSendOtp = async () => {
    const cleanPhone = phoneValue.replace(/^\+91/, "").replace(/\s+/g, "");
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setOtpError("Enter a valid 10-digit Indian phone number.");
      return;
    }
    setOtpLoading(true);
    setOtpError("");
    try {
      const res = await fetch("/api/careers/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpSent(true);
        setOtpInput("");
        // Start 30s resend cooldown
        setOtpCooldown(30);
        if (otpCooldownRef.current) clearInterval(otpCooldownRef.current);
        otpCooldownRef.current = setInterval(() => {
          setOtpCooldown((prev) => {
            if (prev <= 1) { clearInterval(otpCooldownRef.current!); return 0; }
            return prev - 1;
          });
        }, 1000);
        // Start 5min expiry countdown
        setOtpExpiry(120);
        if (otpExpiryRef.current) clearInterval(otpExpiryRef.current);
        otpExpiryRef.current = setInterval(() => {
          setOtpExpiry((prev) => {
            if (prev <= 1) { clearInterval(otpExpiryRef.current!); setOtpSent(false); setOtpError("OTP expired. Please request a new one."); return 0; }
            return prev - 1;
          });
        }, 1000);
      } else {
        setOtpError(data.message || "Failed to send OTP.");
      }
    } catch {
      setOtpError("Network error. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const cleanPhone = phoneValue.replace(/^\+91/, "").replace(/\s+/g, "");
    if (!/^\d{6}$/.test(otpInput)) {
      setOtpError("Enter the 6-digit code from WhatsApp.");
      return;
    }
    setOtpLoading(true);
    setOtpError("");
    try {
      const res = await fetch("/api/careers/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone, otp: otpInput }),
      });
      const data = await res.json();
      if (res.ok && data.verified) {
        setPhoneVerified(true);
        setPhoneVerificationToken(data.token);
        if (otpCooldownRef.current) clearInterval(otpCooldownRef.current);
        if (otpExpiryRef.current) clearInterval(otpExpiryRef.current);
      } else {
        setOtpError(data.message || "Invalid OTP.");
      }
    } catch {
      setOtpError("Network error. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== 'object') return;

      if (data.type === 'google_oauth_success') {
        setGoogleLoading(false);
        setGoogleFilled(true);
        const { firstName, lastName, email } = data.profile;
        const fnInput = document.querySelector('input[name="firstName"]') as HTMLInputElement;
        const lnInput = document.querySelector('input[name="lastName"]') as HTMLInputElement;
        const emInput = document.querySelector('input[name="email"]') as HTMLInputElement;
        if (fnInput && firstName) fnInput.value = firstName;
        if (lnInput && lastName) lnInput.value = lastName;
        if (emInput && email) emInput.value = email;
      }

      if (data.type === 'github_oauth_success') {
        setGithubLoading(false);
        setGithubRepos(data.repos);
        setGithubProfile({ username: data.username, url: data.profileUrl });
      }

      if (data.type === 'oauth_error') {
        setGoogleLoading(false);
        setGithubLoading(false);
        setErrorMsg("OAuth Error: " + data.error);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleGooglePrefill = () => {
    setGoogleLoading(true);
    setErrorMsg("");
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open('/api/oauth/google/login', 'Google OAuth', `width=${width},height=${height},left=${left},top=${top}`);
  };

  const handleGithubConnect = () => {
    setGithubLoading(true);
    setErrorMsg("");
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open('/api/oauth/github/login', 'GitHub OAuth', `width=${width},height=${height},left=${left},top=${top}`);
  };

  // Merge states + union territories into one sorted list
  const allStates = useMemo(() => {
    return [
      ...Object.keys(locationData.states),
      ...Object.keys(locationData.unionTerritories),
    ].sort();
  }, []);

  // Get districts for selected state
  const districts = useMemo(() => {
    if (!selectedState) return [];
    const stateData =
      (locationData.states as Record<string, Record<string, string[]>>)[selectedState] ||
      (locationData.unionTerritories as Record<string, Record<string, string[]>>)[selectedState] ||
      {};
    return Object.keys(stateData).sort();
  }, [selectedState]);

  // Get talukas for selected district
  const talukas = useMemo(() => {
    if (!selectedState || !selectedDistrict) return [];
    const stateData =
      (locationData.states as Record<string, Record<string, string[]>>)[selectedState] ||
      (locationData.unionTerritories as Record<string, Record<string, string[]>>)[selectedState] ||
      {};
    return (stateData[selectedDistrict] || []).sort();
  }, [selectedState, selectedDistrict]);

  // Reset child dropdowns when parent changes
  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedDistrict("");
    setSelectedTaluka("");
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    setSelectedTaluka(district === "Other" ? "Other" : "");
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const toggleStack = (stack: string) => {
    if (selectedStacks.includes(stack)) {
      setSelectedStacks(selectedStacks.filter((s) => s !== stack));
    } else if (selectedStacks.length < 10) {
      setSelectedStacks([...selectedStacks, stack]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    setUploadProgress(0);

    if (selectedGithubRepos.length === 0) {
      setErrorMsg("Please connect GitHub and select your best repository.");
      setIsSubmitting(false);
      return;
    }

    if (REQUIRE_OTP && (!phoneVerified || !phoneVerificationToken)) {
      setErrorMsg("Please verify your phone number via WhatsApp OTP before submitting.");
      setIsSubmitting(false);
      return;
    }

    let progressInterval: NodeJS.Timeout;
    if (selectedFile) {
      progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 400);
    }

    try {
      const formData = new FormData(e.currentTarget);

      let resumeUrl = "";
      if (selectedFile) {
        if (selectedFile.size > 5 * 1024 * 1024) {
          setErrorMsg("Resume must be less than 5MB.");
          setIsSubmitting(false);
          return;
        }

        try {
          const { uploadUrl, publicUrl } = await getPresignedUrlForResume(
            selectedFile.name,
            selectedFile.type || 'application/octet-stream'
          );

          const r2Response = await fetch(uploadUrl, {
            method: "PUT",
            body: selectedFile,
            headers: {
              "Content-Type": selectedFile.type || 'application/octet-stream',
            },
          });

          if (!r2Response.ok) {
            throw new Error(`R2 upload failed: ${r2Response.statusText}`);
          }

          resumeUrl = publicUrl;
          setUploadProgress(100);
        } catch (error: any) {
          console.error("Cloudflare R2 upload error:", error.message || error);
          setErrorMsg("Failed to upload resume. Please try again.");
          setIsSubmitting(false);
          clearInterval(progressInterval!);
          return;
        }
      }

      const payload = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        gender: formData.get("gender") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        country: formData.get("country") as string,
        state: selectedState,
        district: selectedDistrict === "Other" ? formData.get("customDistrict") as string : selectedDistrict,
        taluka: selectedTaluka === "Other" ? formData.get("customTaluka") as string : selectedTaluka,
        cityVillage: formData.get("cityVillage") as string,
        degree: formData.get("degree") as string,
        yearOfStudy: formData.get("yearOfStudy") as string,
        college: formData.get("college") as string,
        branch: formData.get("branch") as string,
        cgpa: formData.get("cgpa") as string,
        currentOccupation: formData.get("currentOccupation") as string,
        experience: formData.get("experience") as string,
        availability: availabilityDate ? format(availabilityDate, 'yyyy-MM-dd') : "",
        workType: formData.get("workType") as string,
        role: formData.get("role") as string,
        techStack: selectedStacks.join(", "),
        skills: formData.get("skills") as string,
        whyJoin: formData.get("whyJoin") as string,
        age18: formData.get("age18") as string,
        twitter: formData.get("twitter") as string,
        githubRepos: selectedGithubRepos,
        githubProfileUrl: githubProfile?.url || "",
        githubUsername: githubProfile?.username || "",
        linkedin: formData.get("linkedin") as string,
        portfolio: formData.get("portfolio") as string,
        codingProfile: formData.get("codingProfile") as string,
        openSource: formData.get("openSource") as string,
        asyncRemote: formData.get("asyncRemote") as string,
        resumeUrl: resumeUrl,
        termsConsent: formData.get("termsConsent") === "on",
        phoneVerificationToken,
      };

      const response = await fetch("/api/careers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const data = await response.json();
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error", error);
      setErrorMsg("Failed to submit. Please check your connection.");
    } finally {
      if (selectedFile) clearInterval(progressInterval!);
      setIsSubmitting(false);
    }
  };

  // Before sending, check every step; if one has a missing field, open that step and point to the field
  const handleStepsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    for (let i = 0; i < CAREER_STEPS.length; i++) {
      if (firstInvalidField(i)) {
        e.preventDefault();
        showStep(i);
        setTimeout(() => firstInvalidField(i)?.reportValidity(), 350);
        return;
      }
    }
    if (selectedGithubRepos.length === 0) {
      e.preventDefault();
      setErrorMsg("Please connect GitHub and select your best repository.");
      showStep(3);
      return;
    }
    handleSubmit(e);
  };

  return (
    <>
      {(
        <>
          <h2 className="text-xl font-semibold">{formTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{formSubtitle}</p>

          {errorMsg && (
            <div className="mt-4 p-3 bg-red-500/10 text-red-500 text-sm rounded-lg border border-red-500/20">
              {errorMsg}
            </div>
          )}

          {isUnder18 && (
            <div className="mt-4 p-4 bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl border border-red-500/20 flex items-start gap-3 shadow-sm">
              <span className="text-xl shrink-0">⛔</span>
              <div>
                <div className="font-semibold text-sm sm:text-base text-red-700 dark:text-red-400">Not Eligible to Apply</div>
                <div className="text-xs sm:text-sm text-red-600/90 dark:text-red-300/90 mt-0.5">
                  Applicants must be at least 18 years of age to apply for roles at Classgrid.
                </div>
              </div>
            </div>
          )}

          {!googleFilled && (
            <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between bg-muted/40 p-4 rounded-md border border-border">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground block">Save time applying</span>
                Autofill your name and email using Google.
              </div>
              <button
                type="button"
                onClick={handleGooglePrefill}
                disabled={googleLoading}
                className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-white px-4 py-2 text-sm font-semibold text-foreground border border-slate-200 shadow-sm transition hover:bg-slate-50 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 disabled:opacity-50"
              >
                <img src="https://cdn.classgrid.in/svg__logo_collection/google-icon-logo-svgrepo-com.svg" alt="Google" className="h-5 w-5" />
                {googleLoading ? "Connecting..." : "Fill with Google"}
              </button>
            </div>
          )}

          <motion.form
            onSubmit={handleStepsSubmit}
            noValidate
            className="mt-6 space-y-6"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.04 }
              }
            }}
          >
            {/* Locked while sending, and after the application is sent */}
            <fieldset disabled={isSubmitting || isSuccess} className="m-0 min-w-0 space-y-6 border-0 p-0 disabled:opacity-60">
            {/* Step progress */}
            {!isUnder18 && (
              <div>
                <div className="flex items-center justify-between text-sm">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={step}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="font-medium text-foreground"
                    >
                      {CAREER_STEPS[step]}
                    </motion.span>
                  </AnimatePresence>
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    Step {step + 1} of {CAREER_STEPS.length}
                  </span>
                </div>
                <div className="mt-3 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${CAREER_STEPS.length}, minmax(0, 1fr))` }}>
                  {CAREER_STEPS.map((label, i) => (
                    <div key={label} className="h-1 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className="h-full bg-foreground"
                        initial={false}
                        animate={{ width: i <= step ? "100%" : "0%" }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div ref={(el) => { stepRefs.current[0] = el; }} className={step === 0 ? "space-y-6 animate-in fade-in slide-in-from-right-4 duration-300" : "hidden"}>
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">First Name <span className="text-red-500">*</span></span>
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="John"
                  className="h-12 w-full rounded-md border border-border bg-background px-4 text-[15px] text-foreground outline-none transition focus:border-foreground"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">Last Name <span className="text-red-500">*</span></span>
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Doe"
                  className="h-12 w-full rounded-md border border-border bg-background px-4 text-[15px] text-foreground outline-none transition focus:border-foreground"
                />
              </label>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">{fieldEmail} <span className="text-red-500">*</span></span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-md border border-border bg-background px-4 text-[15px] text-foreground outline-none transition focus:border-foreground"
                />
              </label>
              <div className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">Phone Number <span className="text-red-500">*</span></span>
                {!REQUIRE_OTP ? (
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="10-digit number"
                    maxLength={13}
                    className="h-12 w-full rounded-md border border-border bg-background px-4 text-[15px] text-foreground outline-none transition focus:border-foreground"
                  />
                ) : phoneVerified ? (
                  <div className="flex items-center gap-2">
                    <div className="h-11 flex-1 flex items-center rounded-lg border border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20 px-3 text-foreground">
                      <span>+91 {phoneValue.replace(/^\+91/, "").replace(/\s+/g, "")}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-sm font-semibold whitespace-nowrap">
                      <ShieldCheck className="w-4 h-4" />
                      Verified
                    </div>
                    <input type="hidden" name="phone" value={phoneValue.replace(/^\+91/, "").replace(/\s+/g, "")} />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        value={phoneValue}
                        onChange={(e) => { setPhoneValue(e.target.value); setOtpSent(false); setOtpError(""); setPhoneVerified(false); }}
                        placeholder="10-digit number"
                        maxLength={13}
                        className="h-11 flex-1 rounded-md border border-border bg-background px-3 text-foreground outline-none transition focus:border-foreground"
                      />
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={otpLoading || otpCooldown > 0 || phoneValue.replace(/^\+91/, "").replace(/\s+/g, "").length < 10}
                        className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-sm transition hover:bg-zinc-700 dark:hover:bg-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <MessageSquare className="w-4 h-4" />
                        {otpLoading ? "Sending..." : otpCooldown > 0 ? `Resend (${otpCooldown}s)` : otpSent ? "Resend OTP" : "Send OTP"}
                      </button>
                    </div>

                    {otpSent && !phoneVerified && (
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          OTP sent to your WhatsApp! Expires in {Math.floor(otpExpiry / 60)}:{String(otpExpiry % 60).padStart(2, "0")}
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={otpInput}
                            onChange={(e) => { setOtpInput(e.target.value.replace(/\D/g, "").slice(0, 6)); setOtpError(""); }}
                            placeholder="Enter 6-digit OTP"
                            maxLength={6}
                            className="h-11 flex-1 rounded-md border border-border bg-background px-3 text-foreground outline-none transition focus:border-foreground tracking-[0.3em] text-center font-mono text-lg"
                          />
                          <button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={otpLoading || otpInput.length !== 6}
                            className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-slate-900 dark:bg-white px-4 py-2 text-sm font-semibold text-white dark:text-slate-900 shadow-sm transition hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            {otpLoading ? "Verifying..." : "Verify"}
                          </button>
                        </div>
                      </div>
                    )}

                    {otpError && (
                      <p className="text-xs text-red-500 font-medium">{otpError}</p>
                    )}
                    <input type="hidden" name="phone" value={phoneValue.replace(/^\+91/, "").replace(/\s+/g, "")} />
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">Gender <span className="text-red-500">*</span></span>
                <FieldSelect
                  name="gender"
                  required
                  placeholder="Select Gender"
                  options={toOptions(["Male", "Female", "Other", "Prefer not to say"])}
                />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">Are you over the age of 18? <span className="text-red-500">*</span></span>
                <div className="flex gap-4 items-center h-11 px-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="age18" 
                      value="Yes" 
                      required 
                      onChange={() => setIsUnder18(false)}
                      className="accent-foreground w-4 h-4"
                    />
                    <span className="text-foreground">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="age18" 
                      value="No" 
                      required 
                      onChange={() => setIsUnder18(true)}
                      className="accent-foreground w-4 h-4"
                    />
                    <span className="text-foreground">No</span>
                  </label>
                </div>
              </label>
            </motion.div>

            </div>
            {!isUnder18 && (
              <>
            <div ref={(el) => { stepRefs.current[1] = el; }} className={step === 1 ? "space-y-6 animate-in fade-in slide-in-from-right-4 duration-300" : "hidden"}>

            {/* Location: Country → State → District → Taluka */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">Country</span>
                <div className="flex items-center gap-2 h-11 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 text-foreground cursor-not-allowed dark:border-zinc-800 dark:bg-zinc-900 opacity-80">
                  <img
                    src="https://bumxgscngzjadyozdpce.supabase.co/storage/v1/object/public/LOGO%20AND%20%20SVG/Flag_of_India.svg.png"
                    alt="India"
                    className="h-auto w-[22px] rounded-none object-contain shadow-sm border border-slate-200/50 dark:border-zinc-700/50"
                  />
                  <span className="font-medium text-[15px]">India</span>
                  <input type="hidden" name="country" value="India" />
                </div>
              </label>
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">State / UT <span className="text-red-500">*</span></span>
                <FieldSelect
                  name="state"
                  required
                  value={selectedState}
                  onChange={handleStateChange}
                  placeholder="Select State"
                  options={toOptions(allStates)}
                />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">District <span className="text-red-500">*</span></span>
                <FieldSelect
                  name="district"
                  required
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  disabled={!selectedState}
                  placeholder={selectedState && districts.length === 0 ? "Coming soon" : "Select District"}
                  options={[...toOptions(districts), { value: "Other", label: "Other (Please specify)" }]}
                />
              </label>
              {selectedDistrict !== "Other" && (
                <label className="block text-sm">
                  <span className="mb-2 block font-medium text-foreground">Taluka <span className="text-red-500">*</span></span>
                  <FieldSelect
                    name="taluka"
                    required
                    value={selectedTaluka}
                    onChange={setSelectedTaluka}
                    disabled={!selectedDistrict}
                    placeholder={selectedDistrict && talukas.length === 0 ? "Coming soon" : "Select Taluka"}
                    options={[...toOptions(talukas), { value: "Other", label: "Other (Please specify)" }]}
                  />
                </label>
              )}
            </motion.div>

            {selectedDistrict === "Other" && (
              <motion.label variants={{ hidden: { opacity: 0, height: 0 }, show: { opacity: 1, height: "auto" } }} className="block text-sm overflow-hidden">
                <span className="mb-2 block font-medium text-foreground">Enter your District</span>
                <input
                  type="text"
                  name="customDistrict"
                  required
                  placeholder="Your District name"
                  className="h-12 w-full rounded-md border border-border bg-background px-4 text-[15px] text-foreground outline-none transition focus:border-foreground"
                />
              </motion.label>
            )}

            {selectedTaluka === "Other" && (
              <motion.label variants={{ hidden: { opacity: 0, height: 0 }, show: { opacity: 1, height: "auto" } }} className="block text-sm overflow-hidden">
                <span className="mb-2 block font-medium text-foreground">Enter your Taluka</span>
                <input
                  type="text"
                  name="customTaluka"
                  required
                  placeholder="Your Taluka name"
                  className="h-12 w-full rounded-md border border-border bg-background px-4 text-[15px] text-foreground outline-none transition focus:border-foreground"
                />
              </motion.label>
            )}

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">Highest Qualification / Degree <span className="text-red-500">*</span></span>
                <FieldSelect name="degree" required placeholder="Select your degree" options={toOptions(DEGREES)} />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">Current Year of Study <span className="text-red-500">*</span></span>
                <FieldSelect name="yearOfStudy" required placeholder="Select year" options={toOptions(YEARS_OF_STUDY)} />
              </label>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">College / University Name <span className="text-red-500">*</span></span>
                <input
                  type="text"
                  name="college"
                  required
                  placeholder="Your College Name"
                  className="h-12 w-full rounded-md border border-border bg-background px-4 text-[15px] text-foreground outline-none transition-all focus:border-foreground"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">Branch / Specialization <span className="text-red-500">*</span></span>
                <input
                  type="text"
                  name="branch"
                  required
                  placeholder="e.g. CSE, IT, ECE"
                  className="h-12 w-full rounded-md border border-border bg-background px-4 text-[15px] text-foreground outline-none transition-all focus:border-foreground"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">CGPA / Percentage <span className="text-xs text-muted-foreground font-normal">(Optional)</span></span>
                <input
                  type="text"
                  name="cgpa"
                  placeholder="Optional"
                  className="h-12 w-full rounded-md border border-border bg-background px-4 text-[15px] text-foreground outline-none transition-all focus:border-foreground"
                />
              </label>
            </motion.div>

            <motion.label variants={itemVariants} className="block text-sm">
              <span className="mb-2 block font-medium text-foreground">City / Village <span className="text-red-500">*</span></span>
              <input
                type="text"
                name="cityVillage"
                required
                placeholder="Your City or Village name"
                className="h-12 w-full rounded-md border border-border bg-background px-4 text-[15px] text-foreground outline-none transition-all focus:border-foreground"
              />
            </motion.label>

            </div>
            <div ref={(el) => { stepRefs.current[2] = el; }} className={step === 2 ? "space-y-6 animate-in fade-in slide-in-from-right-4 duration-300" : "hidden"}>
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">{fieldRole} <span className="text-red-500">*</span></span>
                <FieldSelect name="role" required placeholder={rolePlaceholder} options={toOptions(roles.map((role) => role.label))} />
              </label>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">Current Occupation <span className="text-red-500">*</span></span>
                <FieldSelect name="currentOccupation" required placeholder="Select Occupation" options={toOptions(["Student", "Fresher", "Working Professional"])} />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">Years of Experience <span className="text-red-500">*</span></span>
                <FieldSelect
                  name="experience"
                  required
                  placeholder="Select Experience"
                  options={[
                    { value: "0", label: "0 (Fresher)" },
                    { value: "1-2", label: "1–2 Years" },
                    { value: "3-5", label: "3–5 Years" },
                    { value: "5+", label: "5+ Years" },
                  ]}
                />
              </label>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">Expected Joining Date <span className="text-red-500">*</span></span>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className={`h-12 w-full rounded-md border border-border bg-background px-4 text-[15px] text-left font-normal outline-none transition-all focus:border-foreground flex items-center gap-2 ${!availabilityDate ? "text-slate-500 dark:text-zinc-500" : "text-foreground"}`}
                      onClick={() => { setTempDate(availabilityDate); setIsCalendarOpen(true); }}
                    >
                      <CalendarIcon className="h-4 w-4" />
                      {availabilityDate ? format(availabilityDate, "PPP") : "Select date"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3 shadow-2xl rounded-xl border border-slate-200 dark:border-zinc-800 animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95" align="start">
                    <Calendar
                      mode="single"
                      selected={tempDate}
                      onSelect={setTempDate}
                      initialFocus
                      required
                      fixedWeeks
                      className="p-0 border-none"
                    />
                    <div className="p-2 border-t border-slate-100 dark:border-zinc-800 mt-1">
                      <button
                        type="button"
                        onClick={() => { setAvailabilityDate(tempDate); setIsCalendarOpen(false); }}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium bg-transparent text-foreground hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-md transition-all border border-transparent dark:hover:border-zinc-700 hover:scale-[0.98]"
                      >
                        Apply <span className="opacity-50 text-[10px]">↵</span>
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">Preferred Work Type <span className="text-red-500">*</span></span>
                <FieldSelect name="workType" required placeholder="Select Work Type" options={toOptions(["Remote", "Hybrid", "On-site"])} />
              </label>
            </motion.div>

            </div>
            <div ref={(el) => { stepRefs.current[3] = el; }} className={step === 3 ? "space-y-6 animate-in fade-in slide-in-from-right-4 duration-300" : "hidden"}>
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">Twitter / X profile <span className="text-xs text-muted-foreground font-normal">(Optional)</span></span>
                <input
                  type="url"
                  name="twitter"
                  placeholder="https:// (Optional)"
                  className="h-12 w-full rounded-md border border-border bg-background px-4 text-[15px] text-foreground outline-none transition focus:border-foreground"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">LinkedIn profile <span className="text-xs text-muted-foreground font-normal">(Optional)</span></span>
                <input
                  type="url"
                  name="linkedin"
                  placeholder="https:// (Optional)"
                  className="h-12 w-full rounded-md border border-border bg-background px-4 text-[15px] text-foreground outline-none transition focus:border-foreground"
                />
              </label>
            </motion.div>

            <motion.div variants={itemVariants} className="block text-sm border border-border p-5 rounded-xl bg-slate-50/50 dark:bg-[#111]">
              <span className="mb-2 block font-medium text-foreground">GitHub Portfolio <span className="text-red-500">*</span></span>
              <p className="text-xs text-muted-foreground mb-4">Connect your GitHub to select your best project to show us.</p>

              {githubRepos.length === 0 ? (
                <button
                  type="button"
                  onClick={handleGithubConnect}
                  disabled={githubLoading}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap rounded-lg bg-[#24292F] px-4 py-2.5 text-sm font-semibold text-white border border-transparent shadow-sm transition hover:bg-[#24292F]/90 disabled:opacity-50"
                >
                  <Github className="h-4 w-4" />
                  {githubLoading ? "Connecting to GitHub..." : "Connect GitHub"}
                </button>
              ) : (
                <div className="space-y-4">
                  {isGithubVerified ? (
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-[#111] space-y-2">
                      <div className="text-[11px] font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
                        GITHUB VERIFIED
                      </div>
                      <div className="text-sm text-foreground">
                        Handle: <span className="font-semibold">@{githubProfile?.username}</span>
                      </div>
                      <div className="text-sm text-foreground">
                        Repository: <span className="font-semibold">{selectedGithubRepos.map(url => {
                          const repo = githubRepos.find(r => r.url === url);
                          return repo ? repo.name : url;
                        }).join(', ')}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsGithubVerified(false);
                          setSelectedGithubRepos([]);
                          setSelectedDropdownRepo("");
                        }}
                        className="text-xs text-muted-foreground underline hover:text-foreground mt-2 block"
                      >
                        Change repository
                      </button>
                    </div>
                  ) : (
                    <>
                      {githubProfile && (
                        <div className="text-sm font-medium text-muted-foreground">
                          Handle: <a href={githubProfile.url} target="_blank" rel="noreferrer" className="text-foreground hover:underline font-semibold">@{githubProfile.username}</a>
                        </div>
                      )}
                      <div className="flex flex-col gap-3">
                        <FieldSelect
                          value={selectedDropdownRepo}
                          onChange={setSelectedDropdownRepo}
                          disabled={isVerifyingRepo}
                          placeholder="Select a repository you've contributed to..."
                          options={githubRepos.map((repo) => ({
                            value: repo.url,
                            label: `${repo.name}${repo.language ? ` • ${repo.language}` : ""}${repo.stars > 0 ? ` • ★ ${repo.stars}` : ""}`,
                          }))}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (selectedDropdownRepo) {
                              setIsVerifyingRepo(true);
                              setSelectedGithubRepos([selectedDropdownRepo]);
                              setTimeout(() => {
                                setIsVerifyingRepo(false);
                                setIsGithubVerified(true);
                                setSelectedDropdownRepo("");
                              }, 600);
                            }
                          }}
                          disabled={!selectedDropdownRepo || isVerifyingRepo}
                          className="w-full sm:w-auto sm:self-start h-11 px-6 rounded-lg bg-white border border-slate-200 text-foreground text-sm font-medium hover:bg-slate-50 transition dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 disabled:opacity-50 shadow-sm"
                        >
                          {isVerifyingRepo ? "Verifying..." : "Use this repository"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">Portfolio / Personal Website</span>
                <input
                  type="url"
                  name="portfolio"
                  placeholder="https:// (Optional)"
                  className="h-12 w-full rounded-md border border-border bg-background px-4 text-[15px] text-foreground outline-none transition focus:border-foreground"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-foreground">Coding Profile (LeetCode/HackerRank)</span>
                <input
                  type="url"
                  name="codingProfile"
                  placeholder="https:// (Optional)"
                  className="h-12 w-full rounded-md border border-border bg-background px-4 text-[15px] text-foreground outline-none transition focus:border-foreground"
                />
              </label>
            </motion.div>

            </div>
            <div ref={(el) => { stepRefs.current[4] = el; }} className={step === 4 ? "space-y-6 animate-in fade-in slide-in-from-right-4 duration-300" : "hidden"}>
            {Object.keys(techStackGroups).length > 0 && (
              <motion.div variants={itemVariants} className="block text-sm">
                <span className="mb-1 flex items-center justify-between text-muted-foreground">
                  <span>Your Tech Stack <span className="text-xs text-muted-foreground font-normal">(Optional)</span></span>
                  <span className="text-xs text-slate-500">
                    {selectedStacks.length} / 10 selected
                  </span>
                </span>
                <p className="text-[11px] text-slate-400 dark:text-zinc-500 mb-3">Click below to open the list and select up to 10 technologies you're proficient in.</p>

                {/* Show selected chips */}
                {selectedStacks.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedStacks.map((stack) => (
                      <span
                        key={stack}
                        className="inline-flex items-center gap-1 rounded-full border border-foreground/15 bg-foreground/5 px-2.5 py-1 text-xs font-medium text-foreground"
                      >
                        {stack}
                        <button
                          type="button"
                          onClick={() => toggleStack(stack)}
                          className="ml-0.5 hover:text-red-400 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Toggle button */}
                <button
                  type="button"
                  onClick={() => setShowStacks(!showStacks)}
                  className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-2.5 text-xs font-medium text-muted-foreground transition-all hover:border-slate-400 hover:bg-slate-100 dark:border-zinc-700 dark:bg-[#111] dark:hover:border-zinc-600 dark:hover:bg-[#1a1a1a]"
                >
                  {showStacks ? "▲ Hide Tech Stack List" : "▼ Select from 200+ Technologies"}
                </button>

                {/* Collapsible grouped list */}
                {showStacks && (
                  <div className="mt-3 space-y-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-zinc-800 dark:bg-[#111] max-h-[400px] overflow-y-auto">
                    {Object.entries(techStackGroups).map(([group, items]) => (
                      <div key={group}>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-2">
                          {group}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {items.map((stack) => {
                            const isSelected = selectedStacks.includes(stack);
                            const isDisabled = !isSelected && selectedStacks.length >= 10;
                            return (
                              <button
                                key={stack}
                                type="button"
                                disabled={isDisabled}
                                onClick={() => toggleStack(stack)}
                                className={`rounded-md border px-2.5 py-1.5 text-xs font-medium transition-all ${isSelected
                                    ? "border-foreground bg-foreground/10 text-foreground"
                                    : "border-border bg-background text-muted-foreground hover:border-foreground/40"
                                  } ${isDisabled ? "cursor-not-allowed opacity-40" : ""}`}
                              >
                                {stack}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            <motion.label variants={itemVariants} className="block text-sm">
              <span className="mb-2 block font-medium text-foreground">Additional Skills <span className="text-xs text-muted-foreground font-normal">(Optional)</span></span>
              <textarea
                name="skills"
                rows={2}
                placeholder="e.g. Project Management, Graphic Design, Public Speaking..."
                className="w-full rounded-md border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none transition-all focus:border-foreground resize-y"
              ></textarea>
            </motion.label>

            <motion.label variants={itemVariants} className="block text-sm">
              <span className="mb-2 block font-medium text-foreground">Upload Resume (PDF, DOCX) - Max 5MB (Optional)</span>
              <div className="relative">
                <motion.div
                  whileHover={(!isSubmitting ? { scale: 1.01 } : {}) as any}
                  whileTap={(!isSubmitting ? { scale: 0.99 } : {}) as any}
                  className={`flex items-center gap-3 h-11 w-full rounded-lg border border-dashed bg-white px-3 transition-colors relative overflow-hidden ${isSubmitting ? 'border-slate-200 dark:border-zinc-800' : 'border-slate-300 hover:border-slate-900 dark:border-zinc-700 dark:hover:border-white'
                    } dark:bg-[#0A0A0A]`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"

                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      } else {
                        clearFile();
                      }
                    }}
                    className={`absolute inset-0 w-full h-full opacity-0 ${isSubmitting || selectedFile ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer'} z-10`}
                    disabled={isSubmitting || !!selectedFile}
                    title=""
                  />
                  {/* Background progress fill */}
                  {isSubmitting && selectedFile && (
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-slate-900/5 dark:bg-white/10 z-0"
                      initial={{ width: "0%" }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ ease: "easeInOut", duration: 0.3 }}
                    />
                  )}

                  <Paperclip className="h-4 w-4 text-slate-500 dark:text-zinc-400 z-10 shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400 truncate z-10 text-sm">
                    {selectedFile ? selectedFile.name : "Choose a file..."}
                  </span>

                  {isSubmitting && selectedFile ? (
                    <span className="ml-auto text-xs font-bold text-slate-700 dark:text-zinc-300 z-10 shrink-0 tabular-nums">
                      {uploadProgress}%
                    </span>
                  ) : selectedFile ? (
                    <div className="ml-auto flex items-center gap-1 z-30 shrink-0 relative">
                      <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 mr-2 tabular-nums pointer-events-none">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setPreviewOpen(true); }}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                        title="Preview file"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); clearFile(); }}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-md text-slate-500 hover:text-red-500 transition-colors"
                        title="Remove file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : null}
                </motion.div>
              </div>
            </motion.label>

            <motion.label variants={itemVariants} className="block text-sm">
              <span className="mb-2 block font-medium text-foreground">Have you made any open source contributions in the past that you'd like to share with us? <span className="text-red-500">*</span></span>
              <textarea
                name="openSource"
                rows={3}
                required
                placeholder="Type here..."
                className="w-full rounded-md border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none transition-all focus:border-foreground resize-y"
              ></textarea>
            </motion.label>

            <motion.label variants={itemVariants} className="block text-sm">
              <span className="mb-2 block font-medium text-foreground">Why are you interested in joining the Classgrid team? <span className="text-red-500">*</span></span>
              <textarea
                name="whyJoin"
                rows={3}
                required
                placeholder="Type here..."
                className="w-full rounded-md border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none transition-all focus:border-foreground resize-y"
              ></textarea>
            </motion.label>

            <motion.label variants={itemVariants} className="block text-sm">
              <span className="mb-2 block font-medium text-foreground">Tell us about your experience working in an async and/or remote environment. What practices or approaches have worked well for you? What challenges have you faced? <span className="text-red-500">*</span></span>
              <textarea
                name="asyncRemote"
                rows={4}
                required
                placeholder="Type here..."
                className="w-full rounded-md border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none transition-all focus:border-foreground resize-y"
              ></textarea>
            </motion.label>

            <motion.label variants={itemVariants} className="flex items-start gap-3 text-sm cursor-pointer mt-6 mb-2">
              <input type="checkbox" name="termsConsent" required className="accent-foreground w-4 h-4 mt-1" />
              <span className="text-muted-foreground leading-relaxed">
                I agree to the <a href="/terms" className="text-foreground hover:underline">Terms & Conditions</a> and <a href="/privacy" className="text-foreground hover:underline">Privacy Policy</a>, and I consent to my data being processed for recruitment purposes.
              </span>
            </motion.label>

            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-md border border-transparent bg-foreground px-5 text-[15px] font-medium text-background transition-colors hover:bg-zinc-700 dark:hover:bg-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="h-4 w-4 text-inherit" />
                  <span>Submitting Application...</span>
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Application sent</span>
                </>
              ) : (
                <>
                  <span>{submitLabel}</span>
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border pt-6">
              {step > 0 ? (
                <button type="button" onClick={goBack} className="inline-flex h-11 items-center gap-1.5 rounded-md border border-border bg-background px-5 text-[15px] font-medium text-foreground transition-colors hover:bg-muted">
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              ) : <span />}
              {step < CAREER_STEPS.length - 1 ? (
                <button type="button" onClick={goNext} className="inline-flex h-11 items-center gap-1.5 rounded-md bg-foreground px-5 text-[15px] font-medium text-background transition-colors hover:bg-zinc-700 dark:hover:bg-zinc-300">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          </>
        )}
            </fieldset>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 rounded-md border border-border bg-muted/40 p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="text-[15px] font-medium text-foreground">Application sent</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Thank you for applying to Classgrid! We have received your application and will be in touch soon.
                  </p>
                </div>
              </motion.div>
            ) : null}
      </motion.form>
        </>
      )}

      {previewOpen && selectedFile && (
        <FilePreviewModal
          file={{ name: selectedFile.name, src: selectedFile }}
          onClose={() => setPreviewOpen(false)}
          onDelete={() => {
            clearFile();
            setPreviewOpen(false);
          }}
        />
      )}
    </>
  );
}
