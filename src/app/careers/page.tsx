import { ContentPage, ContentCard } from "@/components/content-page";
import { jobs } from "@/lib/jobs";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: "Careers", description: "Explore open security and concierge positions with Cliffs Security in Edmonton.", path: "/careers" });
export default function CareersPage() { const open = jobs.filter(job => job.active); return <ContentPage eyebrow="Careers at Cliffs" title="Build a career helping people feel secure" intro="Explore current opportunities with Cliffs Security in Edmonton. Each position includes details about the role and how to apply."><h2 className="mb-6 text-3xl font-bold text-brand-ink">Open positions</h2>{open.length ? <div className="grid gap-5 md:grid-cols-2">{open.map(job => <ContentCard key={job.slug} href={`/careers/${job.slug}`} title={job.title} text={`${job.summary} Full-time, permanent.`} />)}</div> : <p>There are no open positions at this time.</p>}</ContentPage>; }
