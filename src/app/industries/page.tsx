import { ContentPage, ContentCard } from "@/components/content-page";
import { industries } from "@/lib/industries";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: "Industries We Serve", description: "Explore security services for Edmonton businesses, properties and communities.", path: "/industries" });
export default function IndustriesPage() { return <ContentPage eyebrow="Industries" title="Security for the places people use every day" intro="Different environments need different approaches. Explore the properties and communities we serve across Edmonton and the surrounding region."><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{industries.map((item) => <ContentCard key={item.slug} href={`/industries/${item.slug}`} title={item.name} text={item.focus} />)}</div></ContentPage>; }
