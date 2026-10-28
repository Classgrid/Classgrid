import { defineField, defineType } from 'sanity'

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/

export const pluginItemType = defineType({
  name: 'pluginItem',
  title: 'Plugin',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Plugin Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo (SVG only)',
      type: 'image',
      options: { accept: 'image/svg+xml,.svg' },
      validation: (rule) =>
        rule.required().custom((value: any) => {
          const ref: string | undefined = value?.asset?._ref
          if (!ref) return true
          return ref.endsWith('-svg') ? true : 'Only SVG logos are allowed'
        }),
    }),
    defineField({
      name: 'brandColor',
      title: 'Brand Colour',
      type: 'string',
      description: 'Hex colour for the card glow and the ring on hover, like #EA4335',
      validation: (rule) =>
        rule.custom((value?: string) => (!value || HEX_COLOR.test(value) ? true : 'Use a hex colour like #EA4335')),
    }),
    defineField({
      name: 'invertInDark',
      title: 'Turn logo white in dark mode',
      type: 'boolean',
      description: 'For black logos like GitHub and Vercel',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'brandColor', media: 'logo' },
  },
})

export const pluginsPageType = defineType({
  name: 'pluginsPage',
  title: 'Plugins Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Plugins',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'plugins',
      title: 'Plugins',
      type: 'array',
      of: [{ type: 'pluginItem' }],
      description: 'Shown on /plugins in this order',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Plugins Page' }),
  },
})
