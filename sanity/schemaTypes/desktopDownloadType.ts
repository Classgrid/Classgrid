import { defineField, defineType } from "sanity";

// Download counts of classgrid.in/download (lib/downloadCount.ts writes them; nothing here is typed by hand).
// People: each person once, by the address they download from. Clicks: every download, the same person's too.

// The totals, one document ("desktopDownloadStats")
export const desktopDownloadStatsType = defineType({
  name: "desktopDownloadStats",
  title: "Desktop App Downloads",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "people", title: "People who downloaded", type: "number", description: "Each person once, by the address they downloaded from" }),
    defineField({ name: "clicks", title: "Download clicks", type: "number", description: "Every download, also the same person's again" }),
    defineField({ name: "windowsPeople", title: "Windows: people", type: "number" }),
    defineField({ name: "windowsClicks", title: "Windows: clicks", type: "number" }),
    defineField({ name: "macosPeople", title: "macOS: people", type: "number" }),
    defineField({ name: "macosClicks", title: "macOS: clicks", type: "number" }),
    defineField({ name: "linuxPeople", title: "Linux: people", type: "number" }),
    defineField({ name: "linuxClicks", title: "Linux: clicks", type: "number" }),
    defineField({ name: "updatedAt", title: "Last download", type: "datetime" }),
  ],
  preview: {
    select: { people: "people", clicks: "clicks" },
    prepare: ({ people, clicks }) => ({ title: "Desktop App Downloads", subtitle: `${people || 0} people · ${clicks || 0} clicks` }),
  },
});

// One person who downloaded (private: its id has a dot, so only the Studio and the counter can read it). Only a hash of
// their address is kept, never the address.
export const desktopDownloaderType = defineType({
  name: "desktopDownloader",
  title: "Downloader",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "firstAt", title: "First download", type: "datetime" }),
    defineField({ name: "lastAt", title: "Last download", type: "datetime" }),
    defineField({ name: "clicks", title: "Downloads", type: "number" }),
    defineField({ name: "versions", title: "Versions downloaded", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "platforms", title: "Platforms", type: "array", of: [{ type: "string" }] }),
  ],
});
