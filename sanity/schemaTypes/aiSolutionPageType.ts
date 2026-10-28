import { defineArrayMember, defineField, defineType } from 'sanity'

// Card pictures on the page (demo tabs and feature panels) are stored as JSON in the shape of
// PanelVisual from content/solutions/types.ts: { "main": {...}, "floating": {...} }
const visualJsonField = defineField({
  name: 'visualJson',
  title: 'Picture (JSON)',
  type: 'text',
  rows: 12,
  description: 'The mock cards shown in the colour panel. Shape: { "main": {...}, "floating": {...} }',
  validation: (rule) =>
    rule.required().custom((value?: string) => {
      if (!value) return true
      try {
        const parsed = JSON.parse(value)
        return parsed && typeof parsed === 'object' && parsed.main ? true : 'Needs a "main" card'
      } catch {
        return 'Not valid JSON'
      }
    }),
})

export const aiSolutionPageType = defineType({
  name: 'aiSolutionPage',
  title: 'Solution Page (AI)',
  type: 'document',
  groups: [
    { name: 'menu', title: 'Menu', default: true },
    { name: 'hero', title: 'Hero' },
    { name: 'demo', title: 'Demo' },
    { name: 'features', title: 'Features' },
    { name: 'more', title: 'Plugins, tasks, FAQ' },
    { name: 'plain', title: 'Plain English' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'slug', title: 'Slug', type: 'slug', group: 'menu', validation: (rule) => rule.required() }),
    defineField({ name: 'order', title: 'Order', type: 'number', group: 'menu', initialValue: 99 }),
    defineField({
      name: 'menuGroup',
      title: 'Menu group',
      type: 'string',
      group: 'menu',
      options: { list: [{ title: 'Product', value: 'product' }, { title: 'Use case', value: 'useCase' }], layout: 'radio' },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'menuLabel', title: 'Menu label', type: 'string', group: 'menu', validation: (rule) => rule.required() }),
    defineField({ name: 'menuDescription', title: 'Menu description', type: 'string', group: 'menu' }),

    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'hero' }),
    defineField({ name: 'headline', title: 'Headline', type: 'string', group: 'hero', validation: (rule) => rule.required() }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'text', rows: 2, group: 'hero' }),
    defineField({
      name: 'primaryCta',
      title: 'Main button',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'href', title: 'Link', type: 'string' }),
      ],
    }),

    defineField({ name: 'demoHeading', title: 'Demo heading', type: 'string', group: 'demo' }),
    defineField({
      name: 'demoTabs',
      title: 'Demo tabs',
      type: 'array',
      group: 'demo',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'demoTab',
          fields: [defineField({ name: 'label', title: 'Tab label', type: 'string' }), visualJsonField],
          preview: { select: { title: 'label' } },
        }),
      ],
    }),

    defineField({
      name: 'features',
      title: 'Feature blocks',
      type: 'array',
      group: 'features',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'solutionFeature',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 3 }),
            visualJsonField,
          ],
          preview: { select: { title: 'title', subtitle: 'text' } },
        }),
      ],
    }),

    defineField({ name: 'pluginsHeading', title: 'Plugins heading', type: 'string', group: 'more' }),
    defineField({
      name: 'plugins',
      title: 'Plugins',
      type: 'array',
      group: 'more',
      description: 'Name must match a plugin on the Plugins Page so its logo shows',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'solutionPlugin',
          fields: [
            defineField({ name: 'name', title: 'Plugin name', type: 'string' }),
            defineField({ name: 'line', title: 'One line', type: 'string' }),
          ],
          preview: { select: { title: 'name', subtitle: 'line' } },
        }),
      ],
    }),
    defineField({ name: 'tasksHeading', title: 'Example tasks heading', type: 'string', group: 'more' }),
    defineField({ name: 'exampleTasks', title: 'Example tasks', type: 'array', group: 'more', of: [{ type: 'string' }] }),
    defineField({
      name: 'faqs',
      title: 'FAQ',
      type: 'array',
      group: 'more',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'solutionFaq',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'question' } },
        }),
      ],
    }),

    defineField({ name: 'plainEnglishHeading', title: 'Plain English heading', type: 'string', group: 'plain' }),
    defineField({
      name: 'plainEnglish',
      title: 'Plain English paragraphs',
      type: 'array',
      group: 'plain',
      of: [{ type: 'text', rows: 4 }],
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({ name: 'title', title: 'Meta title', type: 'string' }),
        defineField({ name: 'description', title: 'Meta description', type: 'text', rows: 2 }),
      ],
    }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'menuLabel', subtitle: 'slug.current' },
    prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle ? `/solutions/${subtitle}` : '' }),
  },
})
