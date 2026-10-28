import { ClassgridVideoSection } from "./ClassgridVideoSection";

export function LegacyClassgridVideo({ cmsClassgridVideo }: { cmsClassgridVideo: any }) {
  return (
    <ClassgridVideoSection
      label={cmsClassgridVideo?.label ?? "Your Campus, All Day"}
      title={cmsClassgridVideo?.title ?? "With Every Role, From Morning to Night"}
      description={cmsClassgridVideo?.description ?? "Classgrid works silently behind every role on your campus — from the first attendance bell at sunrise to the last report reviewed at midnight. One platform, every stakeholder, every hour."}
      videos={
        Array.isArray(cmsClassgridVideo?.videoPlaylist) && cmsClassgridVideo.videoPlaylist.length > 0
          ? cmsClassgridVideo.videoPlaylist.map((v: any) => v?.videoUrl).filter(Boolean)
          : ["https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"]
      }
      highlights={cmsClassgridVideo?.highlights ?? [
        { text: "Students, faculty, admins, accountants, librarians — every role, one login" },
        { text: "Admissions at dawn, attendance by noon, fee reports by evening" },
        { text: "Real-time sync across 25+ modules — nothing falls through the cracks" },
        { text: "From small coaching centres to multi-campus universities, it just scales" },
      ]}
      ctaLabel={cmsClassgridVideo?.ctaLabel ?? "Book a Free Demo"}
      ctaHref={cmsClassgridVideo?.ctaHref ?? "/#demo"}
    />
  );
}
