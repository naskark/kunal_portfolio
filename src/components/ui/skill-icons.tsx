import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiNestjs,
  SiExpo,
  SiRedux,
  SiReactquery,
  SiTailwindcss,
  SiShadcnui,
  SiMui,
  SiSass,
  SiJest,
  SiFirebase,
  SiSocketdotio,
  SiGit,
  SiJira,
  SiLinux,
  SiFigma,
  SiIntellijidea,
  SiPostman,
  SiXcode,
  SiAndroidstudio,
  SiGithubactions,
  SiFastlane,
  SiBitrise,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";
import {
  LuUsers,
  LuTarget,
  LuMessageCircle,
  LuCalendarCheck,
  LuNetwork,
  LuBinary,
  LuRefreshCw,
  LuCrown,
  LuLink,
  LuBell,
  LuChartNoAxesCombined,
  LuSparkles,
} from "react-icons/lu";

type IconEntry = { Icon: IconType; color: string };

/**
 * Brand marks with their official colours. Tools with no published icon
 * (AppsFlyer, Airship, Branch IO) intentionally fall back to a monogram.
 */
const ICONS: Record<string, IconEntry> = {
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  HTML: { Icon: SiHtml5, color: "#E34F26" },
  CSS: { Icon: SiCss, color: "#663399" },

  "React.js": { Icon: SiReact, color: "#61DAFB" },
  "React Native": { Icon: SiReact, color: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs, color: "#FFFFFF" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  "Nest.js": { Icon: SiNestjs, color: "#E0234E" },
  Expo: { Icon: SiExpo, color: "#FFFFFF" },
  Redux: { Icon: SiRedux, color: "#764ABC" },
  "Tanstack Query": { Icon: SiReactquery, color: "#FF4154" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  "Shadcn UI": { Icon: SiShadcnui, color: "#FFFFFF" },
  "Material UI": { Icon: SiMui, color: "#007FFF" },
  Sass: { Icon: SiSass, color: "#CC6699" },
  Jest: { Icon: SiJest, color: "#C21325" },
  Firebase: { Icon: SiFirebase, color: "#FFCA28" },
  "Socket.IO": { Icon: SiSocketdotio, color: "#FFFFFF" },

  Git: { Icon: SiGit, color: "#F05032" },
  Jira: { Icon: SiJira, color: "#0052CC" },
  VSCode: { Icon: VscVscode, color: "#007ACC" },
  Linux: { Icon: SiLinux, color: "#FCC624" },
  Figma: { Icon: SiFigma, color: "#F24E1E" },
  IntelliJ: { Icon: SiIntellijidea, color: "#FE315D" },
  Postman: { Icon: SiPostman, color: "#FF6C37" },
  "Branch IO": { Icon: LuLink, color: "#7B61FF" },
  Airship: { Icon: LuBell, color: "#00A0DF" },
  AppsFlyer: { Icon: LuChartNoAxesCombined, color: "#22D3EE" },
  Xcode: { Icon: SiXcode, color: "#1575F9" },
  "Android Studio": { Icon: SiAndroidstudio, color: "#3DDC84" },

  AWS: { Icon: FaAws, color: "#FF9900" },
  Bitrise: { Icon: SiBitrise, color: "#683D87" },
  "GitHub Actions": { Icon: SiGithubactions, color: "#2088FF" },
  Fastlane: { Icon: SiFastlane, color: "#00F200" },
  // Simple Icons dropped the OpenAI mark for trademark reasons.
  OpenAI: { Icon: LuSparkles, color: "#FFFFFF" },

  Leadership: { Icon: LuCrown, color: "#FBBF24" },
  Ownership: { Icon: LuTarget, color: "#34D399" },
  Communication: { Icon: LuMessageCircle, color: "#22D3EE" },
  Planning: { Icon: LuCalendarCheck, color: "#A78BFA" },
  "System Modelling & Design": { Icon: LuNetwork, color: "#4F7CFF" },
  "Data Structures & Algorithms": { Icon: LuBinary, color: "#F472B6" },
  Agile: { Icon: LuRefreshCw, color: "#34D399" },
  Scrum: { Icon: LuUsers, color: "#22D3EE" },
};

export function getSkillIcon(name: string): IconEntry | null {
  return ICONS[name] ?? null;
}

export function SkillIcon({
  name,
  className = "text-base",
}: {
  name: string;
  className?: string;
}) {
  const entry = getSkillIcon(name);

  if (!entry) {
    return (
      <span
        aria-hidden
        className="grid h-4 w-4 shrink-0 place-items-center rounded-[4px] bg-ice/12 font-mono text-[9px] font-bold text-mist"
      >
        {name.charAt(0)}
      </span>
    );
  }

  const { Icon, color } = entry;

  return (
    <Icon
      aria-hidden
      className={`shrink-0 ${className}`}
      style={{ color }}
    />
  );
}
