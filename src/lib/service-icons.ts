import { Car, Cctv, Flame, ShieldCheck, UserCheck, Users, type LucideIcon } from "lucide-react";

export const serviceIcons: Record<string, LucideIcon> = {
  "security-guards": ShieldCheck,
  "mobile-patrols": Car,
  "event-security": Users,
  "fire-watch": Flame,
  "executive-protection": UserCheck,
  "cctv-access-control": Cctv,
};

export function getServiceIcon(slug: string): LucideIcon {
  return serviceIcons[slug] ?? ShieldCheck;
}
