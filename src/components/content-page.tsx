import Link from "next/link";
import type { ReactNode } from "react";
export function ContentPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return <div className="bg-white"><header className="bg-brand-dark text-white pt-36 pb-16 sm:pt-40 sm:pb-20"><div className="mx-auto max-w-7xl px-5 sm:px-6"><p className="mb-5 text-xs font-mono uppercase tracking-[0.18em] text-white/70">{eyebrow}</p><h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1><p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/75">{intro}</p></div></header><div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">{children}</div></div>;
}
export function ContentCard({ href, title, text }: { href: string; title: string; text: string }) {
  return <Link href={href} className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-colors hover:border-primary/40 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><h2 className="text-xl font-semibold text-brand-ink group-hover:text-primary">{title}</h2><p className="mt-3 text-sm leading-relaxed text-gray-600">{text}</p><span className="mt-5 inline-block text-sm font-semibold text-brand-link">Learn more &rarr;</span></Link>;
}
