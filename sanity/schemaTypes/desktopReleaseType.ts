import { defineArrayMember, defineField, defineType } from "sanity";

// One released version of the Classgrid desktop app (classgrid.in/download). Each version keeps the download address
// of every platform it came out on, so a new version is added here instead of in the code. The download page shows,
// for each platform, the newest version that has an address for it; a platform with none says "Coming soon".
export const desktopReleaseType = defineType({
  name: "desktopRelease",
  title: "Desktop App Release",
  type: "document",
  fields: [
    defineField({
      name: "version",
      title: "Version",
      type: "string",
      description: "Example: 1.0.3",
      validation: (Rule) =>
        Rule.required().regex(/^\d+\.\d+\.\d+$/, { name: "version", invert: false }).error("Use the form 1.0.3"),
    }),
    defineField({
      name: "releaseDate",
      title: "Release date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "windowsUrl",
      title: "Windows download address",
      type: "url",
      description: "The public copy of this version's installer on the CDN, for example https://cdn.classgrid.in/desktop/Classgrid-Setup-1.0.4.exe",
      validation: (Rule) => Rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "macosUrl",
      title: "macOS download address",
      type: "url",
      description: "Leave empty until the macOS app is out: the page shows \"Coming soon\".",
      validation: (Rule) => Rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "linuxUrl",
      title: "Linux download address",
      type: "url",
      description: "Leave empty until the Linux app is out: the page shows \"Coming soon\".",
      validation: (Rule) => Rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "notes",
      title: "What changed",
      type: "array",
      description: "One short line per change, as people will read it on the download page.",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "releaseDateDesc",
      by: [
        { field: "releaseDate", direction: "desc" },
        { field: "version", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: { version: "version", date: "releaseDate", windows: "windowsUrl", macos: "macosUrl", linux: "linuxUrl" },
    prepare({ version, date, windows, macos, linux }) {
      const platforms = [windows && "Windows", macos && "macOS", linux && "Linux"].filter(Boolean).join(", ");
      return { title: version ? `Version ${version}` : "New version", subtitle: [date, platforms].filter(Boolean).join(" · ") };
    },
  },
});
