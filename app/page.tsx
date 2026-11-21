import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { DemoRequestForm } from "@/components/sections/DemoRequestForm";
import { HomeDevScrollReset } from "@/components/layout/HomeDevScrollReset";
import { AgentHeroSection } from "@/components/sections/agent/AgentHeroSection";
import { ViewPlatformPreview } from "@/components/sections/ViewPlatformPreview";
import { AgentWorkflowsSection } from "@/components/sections/agent/AgentWorkflowsSection";
import { AgentRealWorkSection } from "@/components/sections/agent/AgentRealWorkSection";
import { AgentSchedulesSection } from "@/components/sections/agent/AgentSchedulesSection";
import { AgentGetStartedSection } from "@/components/sections/agent/AgentGetStartedSection";
import { AgentModelsSection } from "@/components/sections/agent/AgentModelsSection";
import { AgentFaqSection } from "@/components/sections/agent/AgentFaqSection";
import { AgentFinalCtaSection } from "@/components/sections/agent/AgentFinalCtaSection";
import { AgentPluginsSection } from "@/components/sections/agent/AgentPluginsSection";
import { AgentStudioSection } from "@/components/sections/agent/AgentStudioSection";
import { Reveal } from "@/components/sections/Reveal";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { TrustedInstitutionsShowcase } from "@/components/sections/TrustedInstitutionsShowcase";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { FAQSection } from "@/components/ui/faqsection";
import { placeholderHomePage, resolveHomePageContent } from "@/content/homePlaceholders";
import {
  getAboutPage,
  getDemoPage,
  getHomeChrome,
  getHomePage,
  getClassgridIntegrations,
  getClassgridTalks,
  getPricingPage,
  getTestimonials,
  getTestimonialVideos,
  getTourPage,
  getSectionSettings,
  getTurboClassgrid,
  getIsometricStack,
  getAppEcosystem,
  getClassgridVideo,
  getClassgridTeamVision,
} from "@/sanity/lib/marketing";

import { ClassgridVideoSection } from "@/components/sections/ClassgridVideoSection";
import { SectionHeader } from "@/components/sections/SectionHeader";

import { WhyClassgridSection } from "@/components/sections/WhyClassgridSection";
import { TeamVisionSection } from "@/components/sections/TeamVisionSection";
import { TurboComparisonNew } from "@/components/sections/TurboComparisonNew";
import { IsometricStackSection } from "@/components/sections/IsometricStackSection";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

const TestimonialCarousel = dynamic(() => import("@/components/ui/testimonial-carousel"));
const TestimonialCarouselV2 = dynamic(() => import("@/components/ui/testimonial-carousel-v2"));
const IntegrationsMarquee = dynamic(() => import("@/components/integrations-marquee"));
const ModulesGrid = dynamic(() =>
  import("@/components/sections/ModulesGrid").then((module) => module.ModulesGrid)
);
const PlatformAnimatedBeam = dynamic(() =>
  import("@/components/sections/PlatformAnimatedBeam").then((module) => module.PlatformAnimatedBeam)
);
const ClassgridRoleShowcase = dynamic(() =>
  import("@/components/sections/ClassgridRoleShowcase").then((module) => module.ClassgridRoleShowcase)
);
const HeroVideoSlider = dynamic(() =>
  import("@/components/sections/HeroVideoSlider").then((module) => module.HeroVideoSlider)
);
const YouTubeStylePlayer = dynamic(() =>
  import("@/components/sections/YouTubeStylePlayer").then((module) => module.YouTubeStylePlayer)
);
const EmpowerSliderSection = dynamic(() =>
  import("@/components/sections/EmpowerSliderSection").then((module) => module.EmpowerSliderSection)
);

// Kept for an hour, and built again at once when something is published in Sanity (the webhook in
// app/api/sync-embeddings/route.ts). An hour, not the site's day, because this page also shows content the webhook
// does not fire for (testimonials, talks, the section switches).
export const revalidate = 3600;

type IntegrationLogoItem = {
  name: string;
  url?: string;
  color?: string;
  imageClassName?: string;
};

function hasNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function withFallbackString(value: unknown, fallback: string) {
  return hasNonEmptyString(value) ? value : fallback;
}

function withFallbackItems<T>(items: T[], fallback: T[]) {
  return items.length > 0 ? items : fallback;
}

type LocalizedPageProps = {
  lang: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = "en";
  const cms = (await getHomePage()) as any;
  const home = resolveHomePageContent(cms ?? {}) as any;
  const siteUrl = typeof home?.siteUrl === "string" ? home.siteUrl.replace(/\/$/, "") : undefined;
  const siteName = typeof home?.brandName === "string" ? home.brandName : undefined;
  const metaTitle = typeof home?.seo?.metaTitle === "string" ? home.seo.metaTitle : undefined;
  const metaDescription =
    typeof home?.seo?.metaDescription === "string" ? home.seo.metaDescription : undefined;
  const slug =
    typeof home?.seo?.slug === "string" && home.seo.slug.trim() && home.seo.slug !== "home"
      ? `/${home.seo.slug.replace(/^\/+/, "")}`
      : "/";
  const pageUrl = siteUrl ? `${siteUrl}${slug}` : undefined;
  const resolvedTitle = metaTitle || siteName;

  return {
    title: resolvedTitle,
    description: metaDescription,
    openGraph: resolvedTitle || metaDescription || pageUrl
      ? {
        title: resolvedTitle,
        description: metaDescription,
        url: pageUrl,
        siteName,
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Do anything with Classgrid AI" }],
      }
      : undefined,
    twitter: resolvedTitle || metaDescription
      ? {
        card: "summary_large_image",
        title: resolvedTitle,
        description: metaDescription,
        images: ["/og-image.png"],
      }
      : undefined,
  };
}

// The page does not read the address's query. Until 2026-11-21 it read ?lang= (and then used it for nothing: the
// home page has one language), and reading the query alone made the server build this whole page again on every
// single visit instead of keeping it. It was the largest page of the site and the most visited.
export default function Page() {
  return <LocalizedHomePage lang="en" />;
}

async function LocalizedHomePage({ lang }: LocalizedPageProps) {
  const [
    cms,
    cmsTestimonials,
    cmsTestimonialVideos,
    cmsIntegrationsPage,
    sectionSettings,
    cmsTurboClassgrid,
    cmsIsometricStack,
    cmsAppEcosystem,
    cmsClassgridVideo,
    cmsClassgridTeamVision,
  ] = await Promise.all([
    getHomePage(),
    getClassgridTalks(),
    getTestimonialVideos(),
    getClassgridIntegrations(),
    getSectionSettings(),
    getTurboClassgrid(),
    getIsometricStack(),
    getAppEcosystem(),
    getClassgridVideo(),
    getClassgridTeamVision(),
  ]);

  const cmsHome = (cms as any) ?? {};
  const home = resolveHomePageContent(cmsHome) as any;
  const classgridIntegrations = cmsIntegrationsPage as any[];

  const productVideoUrl = withFallbackString(
    home?.productVideo?.videoUrl,
    placeholderHomePage.productVideo.videoUrl
  );
  const productVideoPosterUrl = withFallbackString(
    home?.productVideo?.posterUrl,
    placeholderHomePage.productVideo.posterUrl
  );
  const productVideoPosterAlt = withFallbackString(
    home?.productVideo?.posterAlt,
    placeholderHomePage.productVideo.posterAlt
  );

  const testimonialsLabel = withFallbackString(
    home?.testimonialsLabel,
    placeholderHomePage.testimonialsLabel
  );
  const testimonialsTitle = withFallbackString(
    home?.testimonialsHeading ?? home?.testimonialsTitle,
    placeholderHomePage.testimonialsHeading
  );
  const videoSectionTitle = withFallbackString(
    home?.videoSectionHeading ?? home?.videoSectionTitle,
    placeholderHomePage.videoSectionHeading
  );
  const videoSectionDescription = withFallbackString(
    home?.videoSectionSubtext ?? home?.videoSectionDescription,
    placeholderHomePage.videoSectionSubtext
  );
  const testimonialsSectionDescription = withFallbackString(
    home?.testimonialsSubtext ?? home?.testimonialsSectionDescription,
    placeholderHomePage.testimonialsSubtext
  );
  const testimonials =
    Array.isArray(cmsTestimonials) && cmsTestimonials.length > 0
      ? cmsTestimonials.map((item: any) => ({
        name: item.name,
        role: item.role,
        company: item.college,
        quote: item.quote,
        avatarUrl: item.avatarUrl,
        avatarAlt: item.avatarAlt,
        institutionLogoUrl: item.institutionLogoUrl,
        rating: item.rating,
      }))
      : placeholderHomePage.testimonials;
  const testimonialVideos =
    Array.isArray(cmsTestimonialVideos) && cmsTestimonialVideos.length > 0
      ? cmsTestimonialVideos
        .filter((video: any) => video?.videoUrl)
        .map((video: any) => ({
          url: video.videoUrl,
          name: video?.name,
          role: video?.role,
          subtitle: video?.subtitle,
          avatarUrl: video?.avatarUrl,
          avatarAlt: video?.avatarAlt,
        }))
      : placeholderHomePage.testimonialVideos;
  const homeIntegrationLogos: IntegrationLogoItem[] = Array.isArray(home?.integrationLogos)
    ? home.integrationLogos
      .filter((logo: any) => logo?.name || logo?.imageUrl || logo?.logoUrl)
      .map((logo: any) => ({
        name: logo?.name ?? "",
        url: logo?.imageUrl ?? logo?.logoUrl,
        color: logo?.accentColor,
        imageClassName: logo?.imageClassName,
      }))
    : [];
  const pageIntegrationLogos: IntegrationLogoItem[] = Array.isArray(classgridIntegrations)
    ? classgridIntegrations
      .filter((item: any) => item?.name || item?.imageUrl)
      .map((item: any) => ({
        name: item?.name ?? "",
        url: item?.imageUrl,
        imageClassName: item?.imageClassName,
      }))
    : [];
  const integrationsKicker = withFallbackString(
    home?.integrationsKicker,
    placeholderHomePage.integrationsKicker
  );
  const integrationLogos = withFallbackItems(
    pageIntegrationLogos.length > 0 ? pageIntegrationLogos : homeIntegrationLogos,
    placeholderHomePage.integrationLogos.map((logo: any) => ({
      name: logo?.name ?? "",
      url: logo?.imageUrl ?? logo?.logoUrl,
      color: logo?.accentColor,
      imageClassName: logo?.imageClassName,
    }))
  );

  const demoSectionLabel = 'Book a Demo';
  const demoSectionHeading = 'Talk to our team';
  const demoSectionSubtext =
    'See how Classgrid AI can work for your team.\nAgent for everyday work, Studio with Project for code, WhatsApp and your connected apps, all in one place at chat.classgrid.in.';
  const demoSectionCtaLine = 'Tell us about your team and we will get in touch.';

  const ctaFormTitle = withFallbackString(
    home?.ctaFormTitle,
    placeholderHomePage.ctaFormTitle
  );
  const ctaFormSubtitle = withFallbackString(
    home?.ctaFormSubtitle,
    placeholderHomePage.ctaFormSubtitle
  );
  const ctaFormSubmitLabel = withFallbackString(
    home?.ctaFormSubmitLabel,
    placeholderHomePage.ctaFormSubmitLabel
  );
  const ctaFormDetailsHeading = withFallbackString(
    home?.ctaFormDetailsHeading,
    placeholderHomePage.ctaFormDetailsHeading
  );
  const ctaFormInstituteHeading = placeholderHomePage.ctaFormInstituteHeading;
  const ctaFormMessageHeading = withFallbackString(
    home?.ctaFormMessageHeading,
    placeholderHomePage.ctaFormMessageHeading
  );
  const ctaFormSuccessTitle = withFallbackString(
    home?.ctaFormSuccessTitle,
    placeholderHomePage.ctaFormSuccessTitle
  );
  const ctaFormSuccessBody = withFallbackString(
    home?.ctaFormSuccessBody,
    placeholderHomePage.ctaFormSuccessBody
  );
  const ctaFormCopy =
    home?.ctaFormCopy && typeof home.ctaFormCopy === "object"
      ? { ...placeholderHomePage.ctaFormCopy, ...home.ctaFormCopy }
      : placeholderHomePage.ctaFormCopy;
  const hasDemoFormCopyContent =
    ctaFormCopy &&
    typeof ctaFormCopy === "object" &&
    (Object.entries(ctaFormCopy).some(([key, value]) => {
      if (key === "solutionOptions") {
        return Array.isArray(value) && value.some((option: any) => hasNonEmptyString(option?.label));
      }

      return hasNonEmptyString(value);
    }) ||
      false);

  const moduleGridEnabled = sectionSettings ? sectionSettings.showModuleGrid !== false : true;
  const showShowcase = true; // Forced true
  // Respect the Sanity "Testimonials Controls" toggles â€” if the toggle is OFF (false), hide the section.
  // If sectionSettings is null (fetch failed), default to showing the sections to avoid blank pages.
  const trustedInstitutionsEnabled = sectionSettings ? sectionSettings.showTrustedInstitutions === true : true;
  const clientTestimonialsEnabled = sectionSettings ? sectionSettings.showClientTestimonials === true : true;
  const testimonialVideosEnabled = sectionSettings ? sectionSettings.showTestimonialVideos === true : true;
  const showVideoSection = testimonialVideosEnabled && Boolean(testimonialVideos?.length || productVideoUrl);
  // Read player style from first testimonial video document
  const firstVideoStyle = Array.isArray(cmsTestimonialVideos) && cmsTestimonialVideos.length > 0
    ? (cmsTestimonialVideos[0] as any)?.playerStyle
    : undefined;
  const videoPlayerStyle = firstVideoStyle === 'youtube' ? 'youtube' : 'classic';
  const showTestimonials = clientTestimonialsEnabled && Boolean(testimonials.length);
  const showWhyClassgrid = true;
  const showClassgridVideo = (cmsClassgridVideo as any)?.isVisible === true;
  const showTeamVision = (cmsClassgridTeamVision as any)?.isVisible === true;
  const showTurboComparison = true;
  const showIsometricStack = true;
  const whyClassgridTitle = sectionSettings?.whyClassgridTitle;
  const whyClassgridDescription = sectionSettings?.whyClassgridDescription;
  const whyClassgridCards = Array.isArray(sectionSettings?.whyClassgridCards) ? sectionSettings.whyClassgridCards : [];
  const showIntegrations = Boolean(integrationLogos.length);
  const showDemoForm = Boolean(
    ctaFormTitle ||
    ctaFormSubtitle ||
    ctaFormSubmitLabel ||
    ctaFormDetailsHeading ||
    ctaFormInstituteHeading ||
    ctaFormMessageHeading ||
    ctaFormSuccessTitle ||
    ctaFormSuccessBody ||
    hasDemoFormCopyContent
  );

  return (
    <div className="relative overflow-x-clip bg-background text-foreground selection:bg-[#ff0080]/30 dark:bg-black">
      <ScrollToTop />
      <HomeDevScrollReset />
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, gray 1px, transparent 0)`,
            backgroundSize: `40px 40px`,
          }}
        />
        <div className="absolute left-[-5%] top-[15%] h-[500px] w-[500px] animate-pulse rounded-full bg-foreground/5 blur-[120px]" />
        <div className="absolute right-[-5%] top-[40%] h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-[150px]" />
      </div>

      <AgentHeroSection />

      {showShowcase ? (
        <div className="relative z-10 w-full dark:[&>main]:bg-black">
          <ViewPlatformPreview />
        </div>
      ) : null}


      <AgentRealWorkSection />

      <AgentStudioSection />

      <AgentPluginsSection />

      {showTurboComparison ? (
        <Reveal>
          <TurboComparisonNew 
            headline={cmsTurboClassgrid?.headline}
            subheadline={cmsTurboClassgrid?.subheadline}
            leftBox1Line0={cmsTurboClassgrid?.leftBox1Line0}
            leftBox1Line1={cmsTurboClassgrid?.leftBox1Line1}
            leftBox1Line2={cmsTurboClassgrid?.leftBox1Line2}
            leftBox1Line3={cmsTurboClassgrid?.leftBox1Line3}
            leftBox2Line0={cmsTurboClassgrid?.leftBox2Line0}
            leftBox2Line1={cmsTurboClassgrid?.leftBox2Line1}
            leftBox2Line2={cmsTurboClassgrid?.leftBox2Line2}
            leftBox2Line3={cmsTurboClassgrid?.leftBox2Line3}
            leftLabel={cmsTurboClassgrid?.leftLabel}
            leftTime={cmsTurboClassgrid?.leftTime}
            rightTermCmd={cmsTurboClassgrid?.rightTermCmd}
            rightTermLine1={cmsTurboClassgrid?.rightTermLine1}
            rightTermLine2={cmsTurboClassgrid?.rightTermLine2}
            rightTermLine3={cmsTurboClassgrid?.rightTermLine3}
            rightLabel={cmsTurboClassgrid?.rightLabel}
            rightTime={cmsTurboClassgrid?.rightTime}
          />
        </Reveal>
      ) : null}

      {showVideoSection ? (
        <Reveal>
          {videoPlayerStyle === 'youtube' ? (
            <YouTubeStylePlayer
              videos={testimonialVideos}
              fallbackVideoUrl={productVideoUrl}
              fallbackPosterUrl={productVideoPosterUrl}
              fallbackPosterAlt={productVideoPosterAlt}
              title={videoSectionTitle}
              description={videoSectionDescription}
              useFallbackContent={false}
            />
          ) : (
            <HeroVideoSlider
              videos={testimonialVideos}
              fallbackVideoUrl={productVideoUrl}
              fallbackPosterUrl={productVideoPosterUrl}
              fallbackPosterAlt={productVideoPosterAlt}
              title={videoSectionTitle}
              description={videoSectionDescription}
              useFallbackContent={false}
            />
          )}
        </Reveal>
      ) : null}

      {showTestimonials ? (
        <Reveal>
          <section className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-12 md:py-24 lg:px-16">
            {(testimonialsLabel || testimonialsTitle || testimonialsSectionDescription) && (
              <SectionHeader
                label={testimonialsLabel}
                title={testimonialsTitle}
                description={testimonialsSectionDescription}
              />
            )}
            <TestimonialCarouselV2 testimonials={testimonials} useFallbackContent={false} />
          </section>
        </Reveal>
      ) : null}

      {showWhyClassgrid ? (
        <Reveal>
          <WhyClassgridSection
            title={whyClassgridTitle}
            description={whyClassgridDescription}
            cards={whyClassgridCards}
          />
        </Reveal>
      ) : null}

      {showIntegrations ? (
        <Reveal>
          <div id="integrations">
            <IntegrationsMarquee
              kicker={integrationsKicker}
              title="Built on"
              subtitle="The cloud, AI and app services Classgrid runs on. These are the tools we use, not partners or endorsements."
              logos={integrationLogos}
              useFallbackContent={false}
            />
          </div>
        </Reveal>
      ) : null}

      <div id="faq">
        <AgentFaqSection />
      </div>

      {/* Schedules and "Get started": right before "Talk to our team" */}
      <AgentSchedulesSection />
      <AgentGetStartedSection />

      {showDemoForm ? (
        <>
          <Reveal>
            <section
              id="demo"
              className="border-t border-black/5 bg-muted/50 px-6 py-24 dark:border-white/10 md:px-12 md:py-32 lg:px-16"
            >
              <div className="mx-auto max-w-[1400px]">
                <DemoRequestForm
                  label={demoSectionLabel}
                  title={demoSectionHeading}
                  subtitle={demoSectionSubtext}
                  ctaLine={demoSectionCtaLine}
                  formTitle={ctaFormTitle}
                  formSubtitle={ctaFormSubtitle}
                  submitLabel={ctaFormSubmitLabel}
                  detailsSectionTitle={ctaFormDetailsHeading}
                  instituteSectionTitle={ctaFormInstituteHeading}
                  messageSectionTitle={ctaFormMessageHeading}
                  successTitle={ctaFormSuccessTitle}
                  successBody={ctaFormSuccessBody}
                  copy={ctaFormCopy}
                />
              </div>
            </section>
          </Reveal>
        </>
      ) : null}

      <AgentFinalCtaSection />
    </div>
  );
}
