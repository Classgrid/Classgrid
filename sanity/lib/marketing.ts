import { client } from './client'
import {
  aboutPageQuery,
  campaignPagesQuery,
  campaignPageBySlugQuery,
  caseStudiesQuery,
  caseStudyBySlugQuery,
  caseStudySettingsQuery,
  changelogEntriesQuery,
  changelogEntryBySlugQuery,
  changelogSettingsQuery,
  compareHubPageQuery,
  comparisonPageBySlugQuery,
  comparisonPagesQuery,
  contactPageQuery,
  demoPageQuery,
  faqItemsQuery,

  homeChromeQuery,
  homePageQuery,
  appEcosystemQuery,
  classgridIntegrationsQuery,
  classgridTalkQuery,
  circularTimelineQuery,
  integrationsPageQuery,
  institutionPageByTypeQuery,
  institutionPagesQuery,
  legalPageBySlugQuery,
  latestChangelogEntryQuery,
  pageSettingsBySlugQuery,
  policyPageByTypeQuery,
  postsQuery,
  pricingPageQuery,
  salesContactPageQuery,
  statusPageQuery,
  supportPageQuery,
  testimonialsQuery,
  testimonialVideosQuery,
  tourPageQuery,
  useCasePageByAudienceQuery,
  useCasesLandingPageQuery,
  clientLogosQuery,
  moduleBySlugQuery,
  allModulesQuery,
  solutionPageBySlugQuery,
  allSolutionModulesQuery,
  solutionModuleBySlugQuery,
  homeStatsQuery,
  sectionSettingsQuery,
  turboClassgridQuery,
  isometricStackQuery,
  classgridVideoQuery,
  classgridTeamVisionQuery,
  pluginsPageQuery,
  aiUseCasesQuery,
  aiUseCaseBySlugQuery,
  aiSolutionPageBySlugQuery,
  aiSolutionPagesListQuery,
  aiPricingPageQuery,
} from './queries'

// How long a page keeps what it read from Sanity before it is built again by itself: one day. Pages are not kept
// fresh by this timer but by the Sanity webhook (app/api/sync-embeddings/route.ts), which marks the whole site as
// changed the moment something is published; the day is only the net under it. Until 2026-11-21 this was 5 minutes
// (and the root layout forced 1 minute), so the server built every page again and again all day for the crawlers:
// 8 h 38 min of Vercel CPU in a month against the plan's 4 h. A page that shows something the webhook does not
// cover sets its own shorter time (export const revalidate) and the shortest one wins.
export const SANITY_REVALIDATE_SECONDS = 86400
// Every read below carries this tag, so the webhook can mark all of them as changed at once (revalidateTag)
export const SANITY_CACHE_TAG = 'sanity'
const DEV_SANITY_TIMEOUT_MS = 15000   // increased: CDN can be slow from India
const PROD_SANITY_TIMEOUT_MS = 10000
const DEV_CACHE_TTL_MS = 60_000  // 60 s — fast enough for dev, avoids hitting Sanity on every hot reload
const PROD_CACHE_TTL_MS = SANITY_REVALIDATE_SECONDS * 1000

const inMemoryFetchCache = new Map<string, { expiresAt: number; value: unknown }>()

type SafeFetchOptions = {
  disableInMemoryCache?: boolean
  // How long this one read is kept, when it must be fresher than the day above: for content the Sanity webhook does
  // not cover. (A page's own "revalidate" only builds the page again; the read itself would still be a day old.)
  revalidateSeconds?: number
}

function getCacheKey(query: string, params?: Record<string, unknown>) {
  return `${query}::${JSON.stringify(params ?? {})}`
}

function getQueryLabel(query: string): string {
  const match = query.match(/\*\[_type\s*==\s*"([^"]+)"\]/)
  return match ? match[1] : query.slice(0, 40)
}

async function safeFetch<T>(
  query: string,
  params?: Record<string, unknown>,
  options?: SafeFetchOptions
): Promise<T | null> {
  // The copy kept in this process is for development only (it saves Sanity calls on every hot reload). On the
  // live site Next.js keeps the reads itself; a second copy here could hand a page being rebuilt after a publish
  // the old content, which would then stay for the whole day.
  const shouldUseInMemoryCache = process.env.NODE_ENV === 'development' && !options?.disableInMemoryCache
  const cacheKey = getCacheKey(query, params)
  const label = getQueryLabel(query)
  const now = Date.now()
  const cached = shouldUseInMemoryCache ? inMemoryFetchCache.get(cacheKey) : null
  // Only serve from cache if value is non-null (never cache failures)
  if (shouldUseInMemoryCache && cached && cached.expiresAt > now && cached.value !== null) {
    return cached.value as T
  }

  const isDev = process.env.NODE_ENV === 'development'
  const cacheTtlMs = isDev ? DEV_CACHE_TTL_MS : PROD_CACHE_TTL_MS
  const timeoutMs = isDev ? DEV_SANITY_TIMEOUT_MS : PROD_SANITY_TIMEOUT_MS
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  const start = Date.now()
  try {
    const response = await client.fetch<T>(query, params, {
      next: isDev ? undefined : { revalidate: options?.revalidateSeconds ?? SANITY_REVALIDATE_SECONDS, tags: [SANITY_CACHE_TAG] },
      // In dev: bypass Next.js fetch cache (in-memory cache handles dedup).
      // In prod: use 'default' so Next.js ISR fetch cache works with revalidate above.
      cache: isDev ? 'no-store' : 'default',
      signal: controller.signal,
    })

    const elapsed = Date.now() - start
    // console.log(`[sanity] ✅ ${label}: ${elapsed}ms — got ${Array.isArray(response) ? response.length + ' items' : response ? 'object' : 'NULL'}`)

    // Only cache successful non-null responses
    if (shouldUseInMemoryCache && response !== null && response !== undefined) {
      inMemoryFetchCache.set(cacheKey, {
        value: response,
        expiresAt: now + cacheTtlMs,
      })
    }

    return response
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.warn(`[sanity] ❌ ${label}: FAILED after ${Date.now() - start}ms — ${msg}`)
    return null
  } finally {
    clearTimeout(timeoutId)
  }
}

export const getHomePage = () => safeFetch(homePageQuery)
export const getCircularTimeline = () => safeFetch(circularTimelineQuery)
export const getHomeChrome = () => safeFetch(homeChromeQuery)
export const getAboutPage = () => safeFetch(aboutPageQuery)

export const getPricingPage = () => safeFetch(pricingPageQuery)
export const getDemoPage = () => safeFetch(demoPageQuery)
export const getTourPage = () => safeFetch(tourPageQuery)
export const getIntegrationsPage = () => safeFetch(integrationsPageQuery)
export const getClassgridIntegrations = () => safeFetch(classgridIntegrationsQuery)
export const getClassgridTalks = () => safeFetch(classgridTalkQuery)
export const getSupportPage = () => safeFetch(supportPageQuery)
export const getContactPage = () => safeFetch(contactPageQuery)
export const getSalesContactPage = () => safeFetch(salesContactPageQuery)
export const getUseCasesLandingPage = () => safeFetch(useCasesLandingPageQuery)
export const getUseCasePage = (audience: string) => safeFetch(useCasePageByAudienceQuery, { audience })
export const getInstitutionPages = () => safeFetch(institutionPagesQuery)
export const getInstitutionPage = (institutionType: string) =>
  safeFetch(institutionPageByTypeQuery, { institutionType })
export const getPolicyPage = (pageType: string) => safeFetch(policyPageByTypeQuery, { pageType })
export const getLegalPageBySlug = async (slug: string) => {
  const normalized = slug.toLowerCase().trim()
  const slugCandidates =
    normalized === 'cookies'
      ? ['cookies', 'cookie']
      : normalized === 'cookie'
        ? ['cookie', 'cookies']
        : [normalized]

  for (const candidate of slugCandidates) {
    const result = await safeFetch(legalPageBySlugQuery, { slug: candidate })
    if (result) {
      return result
    }
  }

  return null
}
export const getLegalPageDates = () =>
  safeFetch(`*[_type == "legalPage" && !(_id in path("drafts.**"))]{ "slug": slug.current, lastUpdated, _updatedAt }`)
export const getDocPageDates = () =>
  safeFetch(`*[_type == "apiDoc" && docsVersion == "ai" && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current, _updatedAt }`)
export const getStatusPage = () => safeFetch(statusPageQuery)
export const getPageSettings = (slug: string) => safeFetch(pageSettingsBySlugQuery, { slug })

export const getPosts = () => safeFetch(postsQuery)
export const getCaseStudies = () => safeFetch(caseStudiesQuery)
export const getCaseStudyBySlug = (slug: string) => safeFetch(caseStudyBySlugQuery, { slug })
export const getTestimonials = () => safeFetch(testimonialsQuery)
export const getTestimonialVideos = () => safeFetch(testimonialVideosQuery)
export const getFaqItems = () => safeFetch(faqItemsQuery)
export const getChangelogSettings = () => safeFetch(changelogSettingsQuery)
export const getChangelogEntries = () => safeFetch(changelogEntriesQuery)
export const getChangelogEntryBySlug = (slug: string) => safeFetch(changelogEntryBySlugQuery, { slug })
export const getLatestChangelogEntry = () => safeFetch(latestChangelogEntryQuery)
export const getCampaignPages = () => safeFetch(campaignPagesQuery)
export const getCampaignBySlug = (slug: string) => safeFetch(campaignPageBySlugQuery, { slug })
export const getCompareHubPage = () => safeFetch(compareHubPageQuery)
export const getComparisonPages = () => safeFetch(comparisonPagesQuery)
export const getComparisonBySlug = (slug: string) => safeFetch(comparisonPageBySlugQuery, { slug }, { disableInMemoryCache: true })
export const getClientLogos = () => safeFetch(clientLogosQuery)
export const getModuleBySlug = (slug: string) => safeFetch(solutionModuleBySlugQuery, { slug }, { disableInMemoryCache: true })
export const getAllModules = () => safeFetch(allModulesQuery, undefined, { disableInMemoryCache: true })
export const getSolutionPage = (slug: string) => safeFetch(solutionPageBySlugQuery, { slug }, { disableInMemoryCache: true })
export const getAllSolutionModules = () => safeFetch(allSolutionModulesQuery, undefined, { disableInMemoryCache: true })
export const getSolutionModule = (slug: string) => safeFetch(solutionModuleBySlugQuery, { slug })
export const getHomeStats = () => safeFetch(homeStatsQuery)
export const getSectionSettings = () => safeFetch(sectionSettingsQuery)

export const getTurboClassgrid = () => safeFetch(turboClassgridQuery)
export const getIsometricStack = () => safeFetch(isometricStackQuery)
export const getAppEcosystem = () => safeFetch(appEcosystemQuery)
export const getCaseStudySettings = () => safeFetch(caseStudySettingsQuery)
export const getClassgridVideo = () => safeFetch(classgridVideoQuery)
export const getClassgridTeamVision = () => safeFetch(classgridTeamVisionQuery)
export const getPluginsPage = () => safeFetch(pluginsPageQuery, undefined, { disableInMemoryCache: true })
export const getAiUseCases = () => safeFetch(aiUseCasesQuery, undefined, { disableInMemoryCache: true })
export const getAiUseCase = (slug: string) => safeFetch(aiUseCaseBySlugQuery, { slug }, { disableInMemoryCache: true })
export const getAiSolutionPage = (slug: string) =>
  safeFetch(aiSolutionPageBySlugQuery, { slug }, { disableInMemoryCache: true })
export const getAiSolutionPages = () => safeFetch(aiSolutionPagesListQuery, undefined, { disableInMemoryCache: true })
export const getAiPricingPage = () => safeFetch(aiPricingPageQuery, undefined, { disableInMemoryCache: true })

// Desktop app releases (classgrid.in/download), newest first
export type DesktopReleaseDoc = {
  version: string
  releaseDate: string
  windowsUrl?: string | null
  macosUrl?: string | null
  linuxUrl?: string | null
  notes?: string[] | null
}
const desktopReleasesQuery = `*[_type == "desktopRelease" && defined(version) && defined(releaseDate)] | order(releaseDate desc, version desc){
  version, releaseDate, windowsUrl, macosUrl, linuxUrl, notes
}`
// Kept 5 minutes, like the download page itself: a new desktop version is added by a script, not through the
// webhook, and with the day above the page went on showing the older version (1.0.43 was added on 2026-11-21 and
// the page still said 1.0.42)
export const getDesktopReleases = () => safeFetch<DesktopReleaseDoc[]>(desktopReleasesQuery, undefined, { revalidateSeconds: 300 })
