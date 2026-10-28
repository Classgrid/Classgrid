import { ChevronRight, Download, Ellipsis, FileSpreadsheet, FileText, Files, Image as ImageIcon } from "lucide-react";
import { Reveal } from "@/components/sections/Reveal";

// A task the agent really does: read a spreadsheet, run Python, draw charts, hand back files.
const CREATED_FILES = [
  { dir: "reports/", name: "sales_report.pdf", size: "1.4 MB", icon: FileText },
  { dir: "charts/", name: "revenue_by_region.png", size: "286 KB", icon: ImageIcon },
  { dir: "data/", name: "top_products.csv", size: "4 KB", icon: FileSpreadsheet },
];

export function AgentRealWorkSection() {
  return (
    <section className="bg-background text-[#0d0d0d] dark:bg-black dark:text-white">
      <div className="mx-auto max-w-[1728px] px-5 pb-24 pt-8 md:px-10 md:pb-32 lg:pb-40">
        <Reveal>
          <h2 className="text-balance text-center text-3xl font-medium tracking-[-0.03em] md:text-[44px] md:leading-[1.15]">
            The best way to get work done with AI
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:items-end lg:gap-12">
          {/* Text */}
          <Reveal className="lg:col-span-4 lg:pb-8">
            <h3 className="text-balance text-3xl font-medium leading-[1.12] tracking-[-0.03em] md:text-[44px]">
              Built to do your real work
            </h3>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-black/75 md:text-[21px] md:leading-[1.65] dark:text-white/70">
              Give the agent your toughest tasks, from analysing spreadsheets and PDFs to running Python,
              drawing charts and writing reports. It works through every step and hands you finished files.
            </p>
          </Reveal>

          {/* Visual */}
          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#d4d4d8] via-[#5e9fe0] to-[#93a9f6] p-4 sm:p-6 md:aspect-[16/10] md:p-0 lg:aspect-[16/9] dark:from-[#27272a] dark:via-[#1b3d78] dark:to-[#363d8c]">
              {/* Soft light blobs */}
              <div aria-hidden className="pointer-events-none absolute -left-16 -top-24 h-80 w-80 rounded-full bg-white/35 blur-3xl dark:bg-white/10" />
              <div aria-hidden className="pointer-events-none absolute -bottom-28 right-10 h-96 w-96 rounded-full bg-[#c7d2fe]/50 blur-3xl dark:bg-[#6366f1]/20" />

              {/* Chat card */}
              <div className="relative rounded-2xl bg-white/60 p-5 shadow-sm ring-1 ring-white/60 backdrop-blur-xl md:absolute md:left-[7%] md:top-[9%] md:w-[64%] md:p-7 dark:bg-black/45 dark:ring-white/10">
                <div className="flex items-center gap-3 text-[15px] font-medium">
                  Quarterly sales analysis
                  <Ellipsis className="h-4 w-4 text-black/40 dark:text-white/40" />
                </div>

                <div className="mt-5 flex justify-end">
                  <p className="max-w-[92%] rounded-2xl bg-black/[0.06] px-4 py-2.5 text-[14px] leading-6 md:text-[15px] dark:bg-white/10">
                    Analyse sales.xlsx and send me a PDF report with charts
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1 text-[14px] text-black/45 dark:text-white/45">
                  Worked for 2m 14s
                  <ChevronRight className="h-4 w-4" />
                </div>

                <div className="mt-3 space-y-3 text-[14px] leading-6 text-black/70 [mask-image:linear-gradient(to_bottom,black_45%,transparent)] md:text-[15px] dark:text-white/70">
                  <p>
                    Read 312 rows across 6 regions. Total revenue is up 12.4% on last quarter, and the South
                    region grew the most at 18%.
                  </p>
                  <p>Listed the 10 best-selling products and flagged 3 that dropped below target.</p>
                  <p>Built the PDF report with a revenue chart and a short summary for each region.</p>
                </div>
              </div>

              {/* Floating files card */}
              <Reveal
                delay={0.35}
                distance={24}
                className="relative mt-4 md:absolute md:bottom-[9%] md:right-[4%] md:mt-0 md:w-[54%]"
              >
                <div className="rounded-2xl bg-white p-5 shadow-xl ring-1 ring-black/5 md:p-6 dark:bg-[#0f0f0f] dark:ring-white/10">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black/[0.05] dark:bg-white/10">
                      <Files className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="whitespace-nowrap text-[16px] font-medium md:text-[17px]">Created 3 files</p>
                      <p className="text-[14px] text-emerald-600 dark:text-emerald-400">Ready to download</p>
                    </div>
                    <span aria-label="Download" className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-black/10 p-2.5 text-[14px] font-medium sm:px-4 sm:py-2 dark:border-white/15">
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Download</span>
                    </span>
                  </div>

                  <ul className="mt-4 divide-y divide-black/5 dark:divide-white/10">
                    {CREATED_FILES.map((file) => (
                      <li key={file.name} className="flex items-center gap-3 py-2.5 text-[14px] md:text-[15px]">
                        <file.icon className="h-4 w-4 shrink-0 text-black/40 dark:text-white/40" />
                        <span className="min-w-0 flex-1 truncate">
                          <span className="text-black/45 dark:text-white/45">{file.dir}</span>
                          {file.name}
                        </span>
                        <span className="shrink-0 tabular-nums text-black/45 dark:text-white/45">{file.size}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
