import { defineArrayMember, defineField, defineType } from 'sanity'

const LIVE_VALUES_HELP =
  'You can type these and the page fills in the live number from the super admin dashboard: {freeTokens} {freeRefill} {imageLimit} {imageRefill} {whatsappLimit} {whatsappRefill} {creditsPerInr} {imageTokenCost} {topupMin} {topupMax} {creditDays} {premiumUnlock}. Refill times read best after "every", like "every {freeRefill}".'

const CREDITS_HELP = 'Credits per 1 million tokens. Type the full number, like 7580000 for 7.58M.'

const planFields = (defaults: { name: string; priceLabel: string }) => [
  defineField({ name: 'name', title: 'Plan name', type: 'string', initialValue: defaults.name }),
  defineField({
    name: 'priceLabel',
    title: 'Price',
    type: 'string',
    description: 'The big price text, like ₹0 or From {topupMin}',
    initialValue: defaults.priceLabel,
  }),
  defineField({ name: 'tagline', title: 'Short line under the price', type: 'string' }),
  defineField({
    name: 'features',
    title: 'What you get',
    type: 'array',
    of: [defineArrayMember({ type: 'string' })],
    description: `One line per point. ${LIVE_VALUES_HELP}. A line whose live number can't be loaded is hidden.`,
  }),
  defineField({ name: 'ctaLabel', title: 'Button text', type: 'string' }),
  defineField({ name: 'ctaHref', title: 'Button link', type: 'string', description: 'Like https://chat.classgrid.in' }),
]

export const aiPricingModelType = defineType({
  name: 'aiPricingModel',
  title: 'Model',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Model name',
      type: 'string',
      description: 'As shown in the app, like Claude Sonnet 5.5',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'provider', title: 'Made by', type: 'string', description: 'Like Anthropic, DeepSeek or Meta' }),
    defineField({
      name: 'group',
      title: 'Group',
      type: 'string',
      description: 'Models with the same group are shown together, like Claude, DeepSeek or More models',
    }),
    defineField({
      name: 'input',
      title: 'Input',
      type: 'number',
      description: CREDITS_HELP,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'output',
      title: 'Output',
      type: 'number',
      description: CREDITS_HELP,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'cachedInput',
      title: 'Cached input',
      type: 'number',
      description: `${CREDITS_HELP} Leave empty if the model has no cached price.`,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'cacheWrite',
      title: 'Cache write',
      type: 'number',
      description: `${CREDITS_HELP} Only Claude models have this. Leave empty for the rest.`,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'badge',
      title: 'Small label (optional)',
      type: 'string',
      description: 'Like Most capable, or Unlocks after {premiumUnlock} in top-ups (fills in the live amount)',
    }),
    defineField({
      name: 'hidden',
      title: 'Hide this model',
      type: 'boolean',
      description: 'Turn on to hide the model from the page without deleting it',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Smaller numbers are shown first',
    }),
  ],
  preview: {
    select: { title: 'name', group: 'group', input: 'input', output: 'output', hidden: 'hidden' },
    prepare: ({ title, group, input, output, hidden }) => {
      const m = (n?: number) => (typeof n === 'number' ? `${(n / 1_000_000).toFixed(2)}M` : '–')
      return {
        title: `${title ?? 'Model'}${hidden ? ' (hidden)' : ''}`,
        subtitle: `${group ? `${group} · ` : ''}In ${m(input)} · Out ${m(output)}`,
      }
    },
  },
})

export const aiPricingPageType = defineType({
  name: 'aiPricingPage',
  title: 'AI Pricing',
  type: 'document',
  groups: [
    { name: 'top', title: 'Top & plans', default: true },
    { name: 'models', title: 'Model prices' },
    { name: 'more', title: 'More sections' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'lastUpdated',
      title: 'Last updated',
      type: 'date',
      group: 'top',
      description: 'Shown on the page as "Last updated". Change it whenever you change prices.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Top of the page',
      type: 'object',
      group: 'top',
      fields: [
        defineField({ name: 'eyebrow', title: 'Small text above the title', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Text under the title', type: 'text', rows: 2, description: LIVE_VALUES_HELP }),
        defineField({ name: 'primaryCtaLabel', title: 'Button text', type: 'string' }),
        defineField({ name: 'primaryCtaHref', title: 'Button link', type: 'string' }),
      ],
    }),
    defineField({
      name: 'freePlan',
      title: 'Free plan card',
      type: 'object',
      group: 'top',
      fields: planFields({ name: 'Free', priceLabel: '₹0' }),
    }),
    defineField({
      name: 'paygPlan',
      title: 'Pay as you go card',
      type: 'object',
      group: 'top',
      fields: planFields({ name: 'Pay as you go', priceLabel: 'From {topupMin}' }),
    }),
    defineField({
      name: 'calculator',
      title: 'Top-up calculator',
      type: 'object',
      group: 'top',
      description: 'The slider that shows how many credits a top-up gives. Amounts and credits come from the super admin dashboard.',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Text under the title', type: 'text', rows: 2, description: LIVE_VALUES_HELP }),
        defineField({ name: 'show', title: 'Show the calculator', type: 'boolean', initialValue: true }),
      ],
    }),
    defineField({
      name: 'howItWorks',
      title: 'How tokens are used',
      type: 'object',
      group: 'more',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({
          name: 'steps',
          title: 'Points',
          type: 'array',
          description: LIVE_VALUES_HELP,
          of: [
            defineArrayMember({
              type: 'object',
              name: 'step',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'body', title: 'Text', type: 'text', rows: 3 }),
              ],
              preview: { select: { title: 'title', subtitle: 'body' } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'modelPricing',
      title: 'Model prices',
      type: 'object',
      group: 'models',
      description:
        'Add, remove or change models and their prices here. Note: what people are really charged is set in the app code, so when a price changes here, the app must be changed to match.',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'intro', title: 'Text above the table', type: 'text', rows: 3 }),
        defineField({ name: 'note', title: 'Small note under the table', type: 'text', rows: 3 }),
        defineField({
          name: 'models',
          title: 'Models',
          type: 'array',
          of: [defineArrayMember({ type: 'aiPricingModel' })],
        }),
      ],
    }),
    defineField({
      name: 'teams',
      title: 'For teams',
      type: 'object',
      group: 'more',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'body', title: 'Text', type: 'text', rows: 2 }),
        defineField({ name: 'ctaLabel', title: 'Button text', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'Button link', type: 'string' }),
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'Questions',
      type: 'array',
      group: 'more',
      description: LIVE_VALUES_HELP,
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faq',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'question', subtitle: 'answer' } },
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({ name: 'title', title: 'Page title (Google & browser tab)', type: 'string' }),
        defineField({ name: 'description', title: 'Page description (Google)', type: 'text', rows: 2 }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'AI Pricing' }),
  },
})
