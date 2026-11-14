import { buttonVariants } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/content-page";
import { JsonLd } from "@/components/seo/json-ld";
import { jobs, getOpenJob } from "@/lib/jobs";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return jobs.filter(job => job.active).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) { const job = getOpenJob((await params).slug); return job ? pageMetadata({ title: `${job.title} Careers in Edmonton`, description: job.summary, path: `/careers/${job.slug}` }) : {}; }
export default async function JobPage({ params }: Props) {
 const job = getOpenJob((await params).slug); if (!job) notFound();
 const description = `<p>${job.summary}</p><p>${job.schedule}</p><h2>Responsibilities</h2><ul>${job.responsibilities.map(x => `<li>${x}</li>`).join("")}</ul><h2>Qualifications</h2><ul>${job.qualifications.map(x => `<li>${x}</li>`).join("")}</ul><p>Apply by emailing ${siteConfig.email}.</p>`;
 const schema = { "@context": "https://schema.org", "@type": "JobPosting", title: job.title, description, datePosted: job.datePosted, employmentType: "FULL_TIME", hiringOrganization: { "@type": "Organization", name: "Cliffs Security", sameAs: siteConfig.url }, jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Edmonton", addressRegion: "AB", addressCountry: "CA" } }, baseSalary: { "@type": "MonetaryAmount", currency: "CAD", value: { "@type": "QuantitativeValue", minValue: job.minSalary, maxValue: job.maxSalary, unitText: "HOUR" } } };
 const mail = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`;
 return <><JsonLd data={breadcrumbJsonLd([{ name: "Home", url: siteConfig.url }, { name: "Careers", url: `${siteConfig.url}/careers` }, { name: job.title, url: `${siteConfig.url}/careers/${job.slug}` }])} /><JsonLd data={schema} /><ContentPage eyebrow="Careers - Edmonton, Alberta" title={job.title} intro={job.summary}><div className="grid gap-12 lg:grid-cols-3"><div className="lg:col-span-2 space-y-10"><div><h2 className="text-2xl font-bold">Position details</h2><p className="mt-4 text-gray-600">{job.schedule}</p><p className="mt-3 text-gray-600">Pay: ${job.minSalary.toFixed(2)} - ${job.maxSalary.toFixed(2)} per hour. Work location: in person, Edmonton.</p><p className="mt-3 text-gray-600">Posted: November 9, 2026. Employer: Cliffs Security.</p></div><section><h2 className="text-2xl font-bold">Responsibilities</h2><ul className="mt-4 list-disc space-y-3 pl-5 text-gray-600">{job.responsibilities.map(item => <li key={item}>{item}</li>)}</ul></section><section><h2 className="text-2xl font-bold">Qualifications</h2><ul className="mt-4 list-disc space-y-3 pl-5 text-gray-600">{job.qualifications.map(item => <li key={item}>{item}</li>)}</ul></section></div><aside className="h-fit rounded-2xl bg-brand-dark p-7 text-white"><h2 className="text-xl font-semibold">Apply for this role</h2><p className="mt-3 text-white/75">Email your application to {siteConfig.email}. Your email app will open with the position in the subject line.</p><a href={mail} className={buttonVariants({ className: "mt-6" })}>Apply by email</a></aside></div></ContentPage></>;
}
