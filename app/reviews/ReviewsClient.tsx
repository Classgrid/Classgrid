"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, CheckCircle2, BadgeCheck, MessageSquareQuote, ChevronRight, Users
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import Masonry from "react-masonry-css";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const MotionDiv = motion.div as any;

// Classgrid AI features a review can be about (old reviews with other values show no tag)
const FEATURE_NAMES = ["Overall", "Agent Mode", "Project Mode", "WhatsApp", "Connected Apps", "Schedules", "Files & Reports", "Research", "AI Models"];

// Define the Review Type
type Review = {
  _id: string;
  name: string;
  institution: string;
  photoUrl?: string;
  reviewText: string;
  suggestion?: string;
  rating: number;
  status: string;
  adminReply?: string;
  category?: string;
  moduleName?: string;
  positives?: string[];
  negatives?: string[];
  isVerified?: boolean;
  isFeatured?: boolean;
  _createdAt: string;
};

const CATEGORIES = ["All", "5★", "4★", "3★ & below"];

export default function ReviewsClient({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [activeFilter, setActiveFilter] = useState("All");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    reviewText: "",
    suggestion: "",
    rating: 0,
    moduleName: "",
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");


  const filteredReviews = useMemo(() => {
    if (activeFilter === "All") return reviews;
    if (activeFilter === "5★") return reviews.filter(r => r.rating === 5);
    if (activeFilter === "4★") return reviews.filter(r => r.rating === 4);
    if (activeFilter === "3★ & below") return reviews.filter(r => r.rating <= 3);
    return reviews;
  }, [reviews, activeFilter]);

  const featuredReviews = useMemo(() => {
    return reviews.filter(r => r.isFeatured).slice(0, 6);
  }, [reviews]);

  const stats = useMemo(() => {
    const total = reviews.length;
    const avg = total > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / total).toFixed(1)
      : "0.0";

    const verifiedPercent = total > 0
      ? Math.round((reviews.filter(r => r.isVerified).length / total) * 100)
      : 0;

    return {
      total: total,
      average: avg,
      verified: `${verifiedPercent}%`
    };
  }, [reviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.institution || !formData.reviewText || formData.rating === 0 || !formData.moduleName) {
      setFormStatus("error");
      setErrorMessage("Please fill all required fields, select a feature, and give a star rating.");
      return;
    }

    setSubmitting(true);
    setFormStatus("idle");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit review.");

      setFormStatus("success");
      setFormData({ name: "", email: "", institution: "", reviewText: "", suggestion: "", rating: 0, moduleName: "" });
      setHoveredStar(0);
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error: any) {
      setFormStatus("error");
      setErrorMessage(error.message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const masonryBreakpoints = {
    default: 3,
    1100: 2,
    700: 1
  };


  const inputClass =
    "h-12 w-full rounded-md border border-border bg-background px-4 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground";

  const RequiredLabel = ({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) => (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-foreground">
      {children}
      <span className="ml-0.5 text-red-500">*</span>
    </label>
  );

  const STAT_CARDS = [
    { icon: MessageSquareQuote, value: String(stats.total), label: "Reviews" },
    { icon: Star, value: `${stats.average}/5`, label: "Average rating" },
    { icon: Users, value: stats.verified, label: "Verified users" },
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Heading */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="px-6 pb-10 pt-28 md:px-10 md:pb-14 md:pt-36 lg:border-r lg:border-border">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Reviews</p>
            <h1 className="mt-5 text-balance text-5xl font-medium tracking-[-0.035em] md:text-7xl">
              What our users say
            </h1>
          </div>
          <div className="flex items-end px-6 pb-10 md:px-10 md:pb-14">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Real feedback from people using Classgrid AI. Tried it yourself? Share your experience and help us make it better.
            </p>
          </div>
        </div>
      </section>

      {/* Stats and form */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="bg-muted/40 px-6 py-12 md:px-10 lg:border-r lg:border-border lg:py-16">
            <div className="divide-y divide-border border border-border bg-background">
              {STAT_CARDS.map((card) => (
                <div key={card.label} className="p-7 md:p-8">
                  <div className="flex items-center gap-3">
                    <card.icon className="h-6 w-6 shrink-0" />
                    <span className="text-4xl font-medium tracking-[-0.03em]">{card.value}</span>
                  </div>
                  <p className="mt-2 text-[15px] text-muted-foreground">{card.label}</p>
                </div>
              ))}
              <div className="p-7 md:p-8">
                <h2 className="text-2xl font-medium tracking-[-0.02em]">Share your experience</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  Your feedback helps us decide what to build next. Our team reads every review and replies to it.
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-12 md:px-10 lg:py-16">
            <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xl">
              <fieldset disabled={submitting} className="space-y-6 disabled:opacity-60">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <RequiredLabel htmlFor="review-name">Full name</RequiredLabel>
                  <input
                    id="review-name" type="text" required placeholder="Aarav Sharma"
                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <RequiredLabel htmlFor="review-company">Company / Organization</RequiredLabel>
                  <input
                    id="review-company" type="text" required placeholder="Acme Inc."
                    value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <RequiredLabel htmlFor="review-email">Email</RequiredLabel>
                <input
                  id="review-email" type="email" required placeholder="aarav@company.com"
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <RequiredLabel>Your rating</RequiredLabel>
                  <div className="flex h-12 items-center gap-2 rounded-md border border-border bg-background px-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star} type="button" aria-label={`${star} star${star > 1 ? "s" : ""}`}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="focus:outline-none"
                      >
                        <Star className={`h-6 w-6 transition-colors ${star <= (hoveredStar || formData.rating) ? "fill-foreground text-foreground" : "text-neutral-300 dark:text-neutral-700"}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <RequiredLabel>Which feature did you like most?</RequiredLabel>
                  <Select
                    value={formData.moduleName}
                    onValueChange={(val) => setFormData({ ...formData, moduleName: val })}
                  >
                    <SelectTrigger
                      className={`!h-12 w-full rounded-md border border-border bg-background px-4 text-[15px] font-normal shadow-none ${!formData.moduleName ? "text-muted-foreground" : "text-foreground"}`}
                    >
                      <SelectValue placeholder="Choose a feature" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Overall">Overall Experience</SelectItem>
                      <SelectItem value="Agent Mode">Agent Mode</SelectItem>
                      <SelectItem value="Project Mode">Project Mode</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp & Calls</SelectItem>
                      <SelectItem value="Connected Apps">Connected Apps</SelectItem>
                      <SelectItem value="Schedules">Schedules & Background Tasks</SelectItem>
                      <SelectItem value="Files & Reports">Files & Reports</SelectItem>
                      <SelectItem value="Research">Web Research</SelectItem>
                      <SelectItem value="AI Models">AI Models</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <RequiredLabel htmlFor="review-text">How did Classgrid AI help your daily work?</RequiredLabel>
                <textarea
                  id="review-text" required maxLength={2000} rows={5}
                  placeholder="Tell us what you used it for and what changed for you."
                  value={formData.reviewText} onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                  className="w-full resize-y rounded-md border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground"
                />
                <p className="mt-1.5 text-right text-xs text-muted-foreground">{formData.reviewText.length} / 2000</p>
              </div>

              <div>
                <label htmlFor="review-suggestion" className="mb-2 block text-sm font-medium text-foreground">
                  Any suggestions for us? <span className="font-normal text-muted-foreground">(Optional)</span>
                </label>
                <textarea
                  id="review-suggestion" maxLength={1000} rows={3}
                  placeholder="What should we improve or add next?"
                  value={formData.suggestion} onChange={(e) => setFormData({ ...formData, suggestion: e.target.value })}
                  className="w-full resize-y rounded-md border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground"
                />
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                By sending your review, you agree that we may publish it on this page with your name and company.
              </p>

              {formStatus === "error" && errorMessage ? <p className="text-sm text-red-500">{errorMessage}</p> : null}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-11 items-center gap-1.5 rounded-md bg-foreground px-5 text-[15px] font-medium text-background transition-colors hover:bg-zinc-700 disabled:opacity-60 dark:hover:bg-zinc-300"
              >
                {submitting ? <><Spinner className="h-4 w-4 text-inherit" /> Submitting...</> : <>Submit review <ChevronRight className="h-4 w-4" /></>}
              </button>
              </fieldset>

              {formStatus === "success" && (
                <div className="mt-6 flex items-start gap-3 rounded-md border border-border bg-muted/40 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-[15px] font-medium text-foreground">Review sent</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">Thanks! We have received your review. Our team will reply to you and publish it in the feed.</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Reviews feed */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Feedback</p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.03em] md:text-4xl">Latest reviews</h2>
          </div>

          <div className="flex gap-1 overflow-x-auto rounded-md border border-border p-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`whitespace-nowrap rounded px-4 py-1.5 text-[13px] font-medium transition-colors ${activeFilter === cat ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredReviews.length === 0 ? (
          <div className="rounded-md border border-dashed border-border py-24 text-center">
            <MessageSquareQuote className="mx-auto mb-4 h-10 w-10 text-muted-foreground/50" />
            <p className="text-xl font-medium text-foreground">No reviews yet</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">Be the first to share your experience with Classgrid AI.</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <Masonry breakpointCols={masonryBreakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
              {filteredReviews.map((rev, index) => (
                <MotionDiv
                  key={rev._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="rounded-md border border-border bg-background p-7 transition-colors hover:border-foreground/40">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        {rev.photoUrl ? (
                          <img src={rev.photoUrl} alt={rev.name} className="h-11 w-11 shrink-0 rounded-full border border-border object-cover" />
                        ) : (
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted text-base font-semibold text-foreground">
                            {rev.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <h3 className="truncate text-base font-medium text-foreground">{rev.name}</h3>
                            {rev.isVerified && <span title="Verified Classgrid User" className="cursor-default"><BadgeCheck className="h-5 w-5 shrink-0 fill-[#1D9BF0] text-background" /></span>}
                          </div>
                          <p title="User's Organization" className="truncate text-[13px] text-muted-foreground">{rev.institution}</p>
                          <p className="mt-0.5 text-[12px] text-muted-foreground">{new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(rev._createdAt))}</p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-foreground">
                        <span className="text-sm font-medium leading-none">{rev.rating}</span>
                        <Star className="h-3.5 w-3.5 fill-current" />
                      </div>
                    </div>

                    <div className="space-y-5">
                      <p className="text-[15px] leading-relaxed text-muted-foreground">&ldquo;{rev.reviewText}&rdquo;</p>

                      {(!!rev.positives?.length || (rev.moduleName && FEATURE_NAMES.includes(rev.moduleName))) && (
                        <div className="flex flex-wrap gap-2">
                          {rev.moduleName && rev.moduleName !== 'Overall' && FEATURE_NAMES.includes(rev.moduleName) && (
                            <span title={`This user specifically reviewed ${rev.moduleName}.`} className="cursor-default rounded-sm bg-muted px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground">Feature: {rev.moduleName}</span>
                          )}
                          {rev.positives?.filter(p => p && p.trim() !== '').map((p, i) => (
                            <span key={i} title="A key positive point mentioned by the user" className="cursor-default rounded-sm bg-muted px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{p}</span>
                          ))}
                        </div>
                      )}

                      {rev.suggestion && (
                        <div className="rounded-md border border-border bg-muted/40 p-4">
                          <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Suggestion</span>
                          <p className="text-[13px] leading-relaxed text-muted-foreground">{rev.suggestion}</p>
                        </div>
                      )}

                      {rev.adminReply && (
                        <div className="border-t border-border pt-5">
                          <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-background">
                              <img src="/logo.png" alt="CG" className="h-5 w-5 object-contain" />
                            </div>
                            <div className="flex-1">
                              <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-foreground">Team response</span>
                              <p className="rounded-md border border-border bg-muted/40 p-3 text-sm leading-relaxed text-muted-foreground">
                                {rev.adminReply}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </Masonry>
          </AnimatePresence>
        )}
      </section>
    </div>
  );
}
