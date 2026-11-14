import { buttonVariants } from "@/components/ui/button";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { JsonLd } from "@/components/seo/json-ld";
import { industries, getIndustry } from "@/lib/industries";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return industries.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) { const item = getIndustry((await params).slug); return item ? pageMetadata({ title: `${item.name} Security in Edmonton`, description: item.focus, path: `/industries/${item.slug}` }) : {}; }
export default async function IndustryPage({ params }: Props) {
 const item = getIndustry((await params).slug); if (!item) notFound();
 return <><JsonLd data={breadcrumbJsonLd([{ name: "Home", url: siteConfig.url }, { name: "Industries", url: `${siteConfig.url}/industries` }, { name: item.name, url: `${siteConfig.url}/industries/${item.slug}` }])} /><ContentPage eyebrow="Industries we serve" title={`${item.name} security`} intro={item.focus}><div className="grid gap-12 lg:grid-cols-3"><div className="lg:col-span-2"><h2 className="text-3xl font-bold text-brand-ink">A plan for your environment</h2><p className="mt-4 max-w-3xl leading-relaxed text-gray-600">{item.focus} We start by discussing your site, operating hours and priorities, then consider the people, procedures and systems that can support your security plan.</p><h2 className="mt-10 text-2xl font-bold text-brand-ink">What to consider</h2><ul className="mt-4 list-disc space-y-3 pl-5 text-gray-600">{item.priorities.map((priority) => <li key={priority}>{priority}</li>)}</ul><h2 className="mt-10 text-2xl font-bold text-brand-ink">Explore your options</h2><p className="mt-4 leading-relaxed text-gray-600">Depending on the site, a plan may include <Link href="/services/security-guards" className="text-brand-link underline">security guards</Link>, <Link href="/services/mobile-patrols" className="text-brand-link underline">mobile patrols</Link> or <Link href="/services/security-cameras" className="text-brand-link underline">security cameras</Link>. We can discuss the right combination for your requirements.</p></div><aside className="h-fit rounded-2xl bg-brand-dark p-7 text-white"><h2 className="text-xl font-semibold">Discuss your property</h2><p className="mt-3 text-white/75">Tell us about your site and the coverage you need.</p><Link href="/contact" className={buttonVariants({ className: "mt-6" })}>Get a quote</Link></aside></div></ContentPage></>;
}
