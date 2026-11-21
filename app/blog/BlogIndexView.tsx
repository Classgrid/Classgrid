import { BlogClient } from "./BlogClient";

import { blogCopy } from "@/content/siteContent";
import { extractLocaleString, type SupportedLang } from "@/lib/locale";
import { getPageSettings, getPosts } from "@/sanity/lib/marketing";

// The blog's list, in one language. Drawn by app/blog/page.tsx (English) and app/i18n/[lang]/blog/page.tsx (Hindi,
// Marathi): see lib/locale.ts for why the page does not read ?lang= itself.
export async function BlogIndexView({ lang }: { lang: SupportedLang }) {
  const [cmsSettings, cmsPosts] = await Promise.all([getPageSettings("blog"), getPosts()]);

  const title = extractLocaleString((cmsSettings as any)?.title, lang, (blogCopy as any).title);
  const subtitle = extractLocaleString((cmsSettings as any)?.subtitle, lang, (blogCopy as any).subtitle);
  const posts = (cmsPosts as any)?.length ? cmsPosts : [];

  return (
    <div className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, gray 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute left-[30%] top-[-5%] h-[400px] w-[600px] rounded-full bg-foreground/[0.03] blur-[120px]" />
      </div>

      <div className="fixed top-0 left-0 w-full h-[2px] z-50 bg-foreground rounded-full" />

      <div className="relative z-10 pt-16 pb-12">
        <BlogClient posts={posts as any} title={title} subtitle={subtitle} lang={lang} />
      </div>
    </div>
  );
}
