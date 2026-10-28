// Same plugins, names and logos as the AI Hub in the Classgrid app (INTEGRATIONS_LIST in AskAiPanel.tsx).
// Used until the Plugins Page in Sanity has plugins.
const CDN = "https://cdn.classgrid.in/classgrid_intgration";

export type Plugin = {
  id: string;
  name: string;
  logo: string;
  brandColor: string;
  invertInDark?: boolean;
};

export const PLUGINS: Plugin[] = [
  { id: "gmail", name: "Gmail", logo: `${CDN}/Gmail_icon_(2026).svg`, brandColor: "#EA4335" },
  { id: "gdrive", name: "Google Drive", logo: `${CDN}/Google_Drive_icon_(2026).svg`, brandColor: "#34A853" },
  { id: "gcal", name: "Google Calendar", logo: `${CDN}/Google_Calendar_icon_(2026).svg`, brandColor: "#4285F4" },
  { id: "mcp-notion", name: "Notion", logo: `${CDN}/Notion-logo.svg`, brandColor: "#A1A1AA" },
  { id: "slack", name: "Slack", logo: `${CDN}/slack-new-logo-logo-svgrepo-com.svg`, brandColor: "#E01E5A" },
  { id: "github", name: "GitHub", logo: `${CDN}/github-icon.svg`, brandColor: "#8B949E", invertInDark: true },
  { id: "gclass", name: "Google Classroom", logo: `${CDN}/Google_Classroom_Logo.svg`, brandColor: "#0F9D58" },
  { id: "gmeet", name: "Google Meet", logo: `${CDN}/Google_Meet_icon_(2026).svg`, brandColor: "#00897B" },
  { id: "gforms", name: "Google Forms", logo: `${CDN}/Google_Forms_icon_(2026).svg`, brandColor: "#7248B9" },
  { id: "outlook", name: "Microsoft Outlook", logo: `${CDN}/Microsoft_Outlook_Icon_(2025%C3%A2%C2%80%C2%93present).svg`, brandColor: "#0078D4" },
  { id: "teams", name: "Microsoft Teams", logo: `${CDN}/microsoft-teams-svgrepo-com.svg`, brandColor: "#6264A7" },
  { id: "zoom", name: "Zoom", logo: `${CDN}/zoom-communications-icon_(1).svg`, brandColor: "#2D8CFF" },
  { id: "whatsapp", name: "WhatsApp Business", logo: `${CDN}/whatsapp-svgrepo-com_(1).svg`, brandColor: "#25D366" },
  { id: "vercel", name: "Vercel", logo: `${CDN}/vercel-icon-svgrepo-com.svg`, brandColor: "#A1A1AA", invertInDark: true },
  { id: "canva", name: "Canva", logo: `${CDN}/canva.svg`, brandColor: "#00C4CC" },
  { id: "spotify", name: "Spotify", logo: `${CDN}/spotify.svg`, brandColor: "#1DB954" },
  { id: "youtube", name: "YouTube", logo: "https://cdn.classgrid.in/youtube-icon.svg", brandColor: "#FF0000" },
  { id: "supabase", name: "Supabase", logo: `${CDN}/supabase-icon.svg`, brandColor: "#3ECF8E" },
  { id: "sanity", name: "Sanity CMS", logo: `${CDN}/sanity-icon-logo-png_seeklogo-653456.png`, brandColor: "#F03E2F", invertInDark: true },
  { id: "facebook", name: "Facebook Pages", logo: `${CDN}/2023_Facebook_icon.svg`, brandColor: "#1877F2" },
  { id: "instagram", name: "Instagram Business", logo: `${CDN}/Instagram_logo_2016.svg`, brandColor: "#E1306C" },
];
