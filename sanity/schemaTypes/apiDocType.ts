import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const apiDocType = defineType({
  name: 'apiDoc',
  title: 'Classgrid Documentation',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Getting Started', value: 'getting-started' },
          { title: 'Agent mode', value: 'agent-mode' },
          { title: 'Project Mode', value: 'project-mode' },
          { title: 'Grids', value: 'grids' },
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'Plugins', value: 'plugins' },
          { title: 'Account', value: 'account' },
          { title: 'Platform Guides (old)', value: 'platform-guides' },
          { title: 'API Reference (old)', value: 'api-reference' },
          { title: 'Administrator Setup (old)', value: 'admin-setup' },
        ],
      },
      initialValue: 'getting-started',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'docsVersion',
      title: 'Docs version',
      type: 'string',
      description: 'Only "ai" docs show in the Classgrid AI docs sidebar',
      options: { list: [{ title: 'Classgrid AI', value: 'ai' }, { title: 'Old', value: 'old' }] },
    }),
    defineField({
      name: 'order',
      title: 'Order in its section',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'content',
      title: 'Markdown Content (MDX)',
      description: 'Write your documentation here using raw Markdown. You can also use code blocks like ```js.',
      type: 'text',
      rows: 20,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      description: 'Manually set the published date shown on the website. If left blank, the original creation date will be shown. This prevents the date from changing every time the document is edited.',
      type: 'datetime',
    }),
    defineField({
      name: 'helpfulCount',
      title: 'Helpful Votes (Thumbs Up)',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'notHelpfulCount',
      title: 'Not Helpful Votes (Thumbs Down)',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'feedbackHistory',
      title: 'Feedback History',
      type: 'array',
      description: 'Log of individual ratings for this document.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'reaction', type: 'string', title: 'Reaction' },
            { name: 'title', type: 'string', title: 'Feedback Title' },
            { name: 'comment', type: 'text', title: 'Detailed Comment' },
            { name: 'userEmail', type: 'string', title: 'User Email (if logged in)' },
            { name: 'pageUrl', type: 'string', title: 'URL' },
            { name: 'userAgent', type: 'string', title: 'User Agent' },
            { name: 'submittedAt', type: 'datetime', title: 'Date Submitted' },
          ],
          preview: {
            select: {
              reaction: 'reaction',
              title: 'title',
              comment: 'comment',
              userEmail: 'userEmail',
              date: 'submittedAt'
            },
            prepare({ reaction, title, comment, userEmail, date }) {
              const icon = reaction === 'helpful' ? '👍' : '👎'
              
              // If there's a title, show it. Otherwise fall back to a snippet of the comment.
              let displayTitle = title 
                ? title 
                : (comment ? `"${comment.substring(0, 40)}..."` : (reaction === 'helpful' ? 'Helpful Vote' : 'Not Helpful Vote'))
              
              // Show email if available, otherwise show date
              let displaySubtitle = userEmail 
                ? `${userEmail} • ${date ? new Date(date).toLocaleDateString() : ''}`
                : (date ? new Date(date).toLocaleString() : '')

              return {
                title: `${icon} ${displayTitle}`,
                subtitle: displaySubtitle
              }
            }
          }
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
})
