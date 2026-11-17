import { siteMeta } from "./siteMeta";
import {
  DEFAULT_FOOTER_STATUS_STATE,
  normalizeFooterStatusState,
  type FooterStatusState,
} from "@/lib/footer-status";

type ChromeLink = {
  label?: string;
  href?: string;
  description?: string;
};

type ChromeSection = {
  heading?: string;
  links?: ChromeLink[];
};

type ChromeMenuItem = {
  label?: string;
  href?: string;
  sections?: ChromeSection[];
};

type ChromeColumn = {
  heading?: string;
  links?: ChromeLink[];
};

type ChromeSocialLink = {
  platform?: string;
  href?: string;
};

export type ChromeContent = {
  brandName?: string;
  brandTagline?: string;
  siteUrl?: string;
  contactEmail?: string;
  logoUrl?: string;
  logoAlt?: string;
  navbarMenuItems?: ChromeMenuItem[];
  navbarSecondaryLinkLabel?: string;
  navbarSecondaryLinkHref?: string;
  navbarPrimaryCtaLabel?: string;
  navbarPrimaryCtaHref?: string;
  mobileMenuTitle?: string;
  footerColumns?: ChromeColumn[];
  footerContactHeading?: string;
  footerAddressLines?: string[];
  footerMapHref?: string;
  footerPhoneNumbers?: string[];
  footerEmailAddresses?: string[];
  footerLegalLinks?: ChromeLink[];
  footerSocialLinks?: ChromeSocialLink[];
  footerCopyrightText?: string;
  footerStatusLabel?: string;
  footerStatusState?: FooterStatusState;
  footerStatusHref?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    slug?: string;
  };
};

export const placeholderChromeContent: ChromeContent = {
  brandName: "Classgrid",
  brandTagline: "Your AI agent for everyday work",
  siteUrl: siteMeta.domain,
  contactEmail: siteMeta.supportEmail,
  logoUrl: "/logo.png?v=2",
  logoAlt: "Classgrid logo",
  navbarMenuItems: [
    {
      label: "Solutions",
      sections: [
        {
          heading: "Classgrid AI",
          links: [
            { label: "Agent mode", href: "/solutions/agent-mode" },
            { label: "Project in Studio", href: "/solutions/project-mode" },
            { label: "Grids", href: "/solutions/grids" },
            { label: "WhatsApp calls", href: "/solutions/whatsapp-calls" },
            { label: "Research & data", href: "/solutions/research" },
          ],
        },
        {
          heading: "Everyday work",
          links: [
            { label: "Documents & files", href: "/solutions/documents-and-files" },
            { label: "Reminders & automation", href: "/solutions/reminders-and-automation" },
            { label: "Email & calendar", href: "/solutions/email-and-calendar" },
          ],
        },
      ],
    },
    {
      label: "Product",
      sections: [
        {
          links: [
            { label: "Agent", href: "/agent" },
            { label: "Use Cases", href: "/use-cases" },
            { label: "Docs", href: "/docs" },
            { label: "Integrations", href: "/#integrations" },

            { label: "Compare", href: "/compare" },
            { label: "Changelog", href: "/changelog" },
          ],
        },
      ],
    },
    { label: "Pricing", href: "/pricing" },
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],
  navbarSecondaryLinkLabel: "Log In",
  navbarSecondaryLinkHref: "/login",
  navbarPrimaryCtaLabel: "Book a Demo",
  navbarPrimaryCtaHref: "/#demo",
  mobileMenuTitle: "Explore Classgrid",
  footerColumns: [
    {
      heading: "Quick Links",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Integrations", href: "/integrations" },
        { label: "Security", href: "/security" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Use Cases", href: "/use-cases" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "FAQ", href: "/#faq" },
        { label: "Support", href: "/support" },
        { label: "Help Center", href: "/help-center" },
        { label: "Book a Demo", href: "/#demo" },
        { label: "Reviews", href: "/reviews" },
      ],
    },
  ],
  footerContactHeading: "Get In Touch",
  footerAddressLines: [
    "Akurdi Railway Station Road, Sector No. 26, Pradhikaran, Nigdi, Pimpri-Chinchwad, Maharashtra 411044",
  ],
  footerMapHref:
    "https://maps.google.com/?q=Akurdi+Railway+Station+Road,+Sector+No.+26,+Pradhikaran,+Nigdi,+Pimpri-Chinchwad,+Maharashtra+411044",
  footerPhoneNumbers: ["+91 8623947038", "+91 8149277038"],
  footerEmailAddresses: [siteMeta.supportEmail, "nikhil.shinde@classgrid.in"],
  footerLegalLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "/security" },
    { label: "Cookies", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "IP Protection", href: "/ip-protection" },
    { label: "Sitemap", href: "/sitemap.xml" },
  ],
  footerSocialLinks: [
    { platform: "linkedin", href: "https://linkedin.com/company/classgrid" },
    { platform: "instagram", href: "https://www.instagram.com/classgridedu/" },
    { platform: "youtube", href: "https://www.youtube.com/@classgrid-y7f" },
    { platform: "facebook", href: "https://www.facebook.com/profile.php?id=61588646851017" },
  ],
  footerCopyrightText: `© ${new Date().getFullYear()} Classgrid. All rights reserved.`,
  footerStatusLabel: "All systems normal",
  footerStatusState: DEFAULT_FOOTER_STATUS_STATE,
  footerStatusHref: "https://status.classgrid.in",
  seo: {
    metaTitle: "Classgrid AI — The AI Agent That Does Real Work For You",
    metaDescription: "Classgrid AI researches, reads files, runs code, makes documents, works inside your connected apps, and takes tasks over WhatsApp. Try free at chat.classgrid.in.",
    slug: "home",
  },
};

// Only the home page fields that app/page.tsx still shows. Sanity values win; these are the fallbacks.
export const placeholderHomePage = {
  testimonialsLabel: "Testimonials",
  testimonialsHeading: "What people say about Classgrid AI",
  testimonialsSubtext: "Hear from people who use Classgrid AI.",
  testimonials: [] as Array<{
    quote: string;
    name: string;
    role: string;
    company: string;
    rating: number;
  }>,
  videoSectionHeading: "See Classgrid in action",
  videoSectionSubtext: "Watch how Classgrid AI gets real work done for you.",
  testimonialVideos: [],
  productVideo: {
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    posterUrl: "/dashboards/admin-overview.png",
    posterAlt: "Classgrid product video poster",
  },
  integrationsKicker: "Integrations",
  integrationLogos: [
    { name: "AWS", imageUrl: "/integrations/aws.svg", accentColor: "from-orange-500/20" },
    { name: "Google Meet", imageUrl: "https://cdn.simpleicons.org/googlemeet/00897B", accentColor: "from-zinc-500/20" },
    { name: "Zoom", imageUrl: "https://cdn.simpleicons.org/zoom/0B5CFF", accentColor: "from-blue-500/20" },
  ],
  ctaFormTitle: "Talk to our team",
  ctaFormSubtitle: "See how Classgrid AI can work for your team.",
  ctaFormSubmitLabel: "Submit Demo Request",
  ctaFormDetailsHeading: "Your Details",
  ctaFormInstituteHeading: "Company Details",
  ctaFormMessageHeading: "Message",
  ctaFormSuccessTitle: "Demo request received",
  ctaFormSuccessBody:
    "The Classgrid team will review your request and connect with you to schedule the demo discussion.",
  ctaFormCopy: {
    fullNameLabel: "Full name",
    fullNamePlaceholder: "Enter your full name",
    emailLabel: "Work email",
    emailPlaceholder: "you@company.com",
    phoneLabel: "Phone",
    phonePlaceholder: "Enter your phone number",
    messageLabel: "Message",
    messagePlaceholder: "Tell us about your team and what you want Classgrid AI to do",
    captchaPlaceholder: "Enter captcha",
    captchaMismatchMessage: "Captcha did not match. Please try again.",
    securityCheckRequiredMessage: "Please complete the security check.",
    submitLoadingLabel: "Submitting",
    genericErrorMessage: "Something went wrong. Please try again.",
    validationFullNameRequired: "Full name is required.",
    validationEmailInvalid: "Please enter a valid email address.",
    validationPhoneInvalid: "Please enter a valid phone number.",
    solutionOptions: [
      { value: "Agent for everyday work", label: "Agent for everyday work" },
      { value: "Project in Studio for code", label: "Project in Studio for code" },
      { value: "WhatsApp automation", label: "WhatsApp automation" },
      { value: "Connected apps & automation", label: "Connected apps & automation" },
      { value: "Something else", label: "Something else" },
    ],
  },
  seo: placeholderChromeContent.seo,
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeWithPlaceholders<T>(fallback: T, value: unknown): T {
  if (Array.isArray(fallback)) {
    return (Array.isArray(value) && value.length > 0 ? value : fallback) as T;
  }

  if (typeof fallback === "string") {
    return (typeof value === "string" && value.trim().length > 0 ? value : fallback) as T;
  }

  if (isPlainObject(fallback)) {
    const result: Record<string, unknown> = { ...fallback };
    const source = isPlainObject(value) ? value : {};

    for (const key of Object.keys(source)) {
      result[key] = mergeWithPlaceholders(
        (fallback as Record<string, unknown>)[key],
        source[key]
      );
    }

    return result as T;
  }

  return (value ?? fallback) as T;
}

export function resolveHomePageContent(input?: Record<string, unknown> | null) {
  return mergeWithPlaceholders(placeholderHomePage, input ?? {});
}

const BLOG_NAV_LINK: ChromeMenuItem = { label: "Blog", href: "/blog" };

function normalizeValue(value?: string) {
  return value?.trim().toLowerCase() ?? "";
}

function isViewPlatformLink(link?: { label?: string }) {
  return Boolean(link?.label?.toLowerCase().includes("view platform"));
}

function ensureCorrectViewPlatformLink(menuItems?: ChromeMenuItem[]): ChromeMenuItem[] {
  if (!Array.isArray(menuItems)) return [];
  return menuItems
    .filter((item) => !isViewPlatformLink(item))
    .map((item) => {
      if (item.sections) {
        return {
          ...item,
          sections: item.sections.map((section) => ({
            ...section,
            links: section.links?.filter((link) => !isViewPlatformLink(link)),
          })),
        };
      }
      return item;
    });
}

function removeViewPlatformFromFooter(columns?: ChromeColumn[]): ChromeColumn[] {
  if (!Array.isArray(columns)) return [];
  return columns.map((column) => ({
    ...column,
    links: Array.isArray(column.links) ? column.links.filter((link) => !isViewPlatformLink(link)) : [],
  }));
}

function ensureBlogInNavbar(menuItems?: ChromeMenuItem[]): ChromeMenuItem[] {
  const safeItems = Array.isArray(menuItems) ? menuItems.filter(Boolean) : [];
  const hasBlogItem = safeItems.some(
    (item) =>
      normalizeValue(item?.href) === "/blog" || normalizeValue(item?.label) === "blog"
  );

  if (hasBlogItem) {
    return safeItems;
  }

  const pricingIndex = safeItems.findIndex(
    (item) => normalizeValue(item?.label) === "pricing"
  );

  if (pricingIndex >= 0) {
    const withBlog = [...safeItems];
    withBlog.splice(pricingIndex + 1, 0, BLOG_NAV_LINK);
    return withBlog;
  }

  return [...safeItems, BLOG_NAV_LINK];
}

function removeBlogFromFooter(columns?: ChromeColumn[]): ChromeColumn[] {
  if (!Array.isArray(columns)) return [];

  return columns
    .map((column) => {
      const safeLinks = Array.isArray(column?.links)
        ? column.links.filter(
          (link) =>
            normalizeValue(link?.label) !== "blog"
            && normalizeValue(link?.href) !== "/blog"
        )
        : [];

      return {
        ...column,
        links: safeLinks,
      };
    })
    .filter((column) => (column.links?.length ?? 0) > 0);
}

function fixCompareLinksInFooter(columns?: ChromeColumn[]): ChromeColumn[] {
  if (!Array.isArray(columns)) return [];

  return columns.map((column) => ({
    ...column,
    links: Array.isArray(column.links)
      ? column.links.map((link) => {
          if (normalizeValue(link?.href) === "/compare/vs-competitors") {
            return { ...link, href: "/compare" };
          }
          return link;
        })
      : [],
  }));
}

export function resolveChromeContent(input?: ChromeContent | null): ChromeContent {
  const chrome = mergeWithPlaceholders(placeholderChromeContent, input ?? {}) as ChromeContent;
  const hasNavbarItems = Array.isArray(chrome.navbarMenuItems)
    && chrome.navbarMenuItems.some(
      (item) =>
        item?.label?.trim()
        && (
          item?.href?.trim()
          || (
            Array.isArray(item?.sections)
            && item.sections.some(
              (section) =>
                Array.isArray(section?.links)
                && section.links.some((link) => link?.label?.trim() && link?.href?.trim())
            )
          )
        )
    );
  const hasFooterColumns = Array.isArray(chrome.footerColumns)
    && chrome.footerColumns.some(
      (column) =>
        column?.heading?.trim()
        || (
          Array.isArray(column?.links)
          && column.links.some((link) => link?.label?.trim() && link?.href?.trim())
        )
    );
  const hasSocialLinks = Array.isArray(chrome.footerSocialLinks)
    && chrome.footerSocialLinks.some((link) => link?.platform?.trim() && link?.href?.trim());
  const hasLegalLinks = Array.isArray(chrome.footerLegalLinks)
    && chrome.footerLegalLinks.some((link) => link?.label?.trim() && link?.href?.trim());
  const hasAddressLines = Array.isArray(chrome.footerAddressLines)
    && chrome.footerAddressLines.some((line) => typeof line === "string" && line.trim().length > 0);
  const hasPhones = Array.isArray(chrome.footerPhoneNumbers)
    && chrome.footerPhoneNumbers.some((line) => typeof line === "string" && line.trim().length > 0);
  const hasEmails = Array.isArray(chrome.footerEmailAddresses)
    && chrome.footerEmailAddresses.some((line) => typeof line === "string" && line.trim().length > 0);
  const normalizeFooterEmails = (emails?: string[]) => {
    const allowed = new Set(["support@classgrid.in", "nikhil.shinde@classgrid.in", "contact@classgrid.in"]);
    const normalized = Array.isArray(emails)
      ? emails
        .filter((line) => typeof line === "string")
        .map((line) => line.trim().toLowerCase())
        .filter((line) => allowed.has(line))
      : [];
    return Array.from(new Set(normalized));
  };

  return {
    ...chrome,
    navbarMenuItems: ensureCorrectViewPlatformLink(ensureBlogInNavbar(
      hasNavbarItems
        ? chrome.navbarMenuItems
        : placeholderChromeContent.navbarMenuItems
    )),
    footerColumns: removeViewPlatformFromFooter(fixCompareLinksInFooter(removeBlogFromFooter(
      hasFooterColumns
        ? chrome.footerColumns
        : placeholderChromeContent.footerColumns
    ))),
    footerSocialLinks: hasSocialLinks
      ? chrome.footerSocialLinks
      : placeholderChromeContent.footerSocialLinks,
    footerLegalLinks: hasLegalLinks
      ? chrome.footerLegalLinks
      : placeholderChromeContent.footerLegalLinks,
    footerAddressLines: hasAddressLines
      ? chrome.footerAddressLines
      : placeholderChromeContent.footerAddressLines,
    footerPhoneNumbers: hasPhones
      ? chrome.footerPhoneNumbers
      : placeholderChromeContent.footerPhoneNumbers,
    footerEmailAddresses: hasEmails
      ? normalizeFooterEmails(chrome.footerEmailAddresses)
      : normalizeFooterEmails(placeholderChromeContent.footerEmailAddresses),
    footerStatusState: normalizeFooterStatusState(chrome.footerStatusState),
  };
}
