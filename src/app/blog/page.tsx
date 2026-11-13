import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { BreadcrumbHero } from "@/components/breadcrumb-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { blogPosts } from "@/lib/blog";
import { siteConfig, SHOW_TESTIMONIALS } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Testimonials } from "@/components/testimonials";
import { ServiceFAQ } from "@/components/service-faq";
import { CTACarousel } from "@/components/cta-carousel";

export const metadata: Metadata = pageMetadata({
  title: "Security Guides & Articles",
  description:
    "Security guides for Edmonton businesses, property managers, contractors and event organizers: guards, patrols, fire watch, cameras and theft prevention.",
  path: "/blog",
});

export default function BlogPage() {
  const [featured, ...posts] = blogPosts;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: siteConfig.url },
          { name: "Articles", url: `${siteConfig.url}/blog` },
        ])}
      />
      <BreadcrumbHero
        title="Security Guides & Articles"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Articles" },
        ]}
      />

      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-12 sm:mb-16">
            <div className="lg:col-span-5">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-primary mb-4">
                Security resources
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink leading-tight tracking-tight mb-4 text-balance">
                Practical security advice, written for real sites.
              </h2>
              <p className="text-gray-500 leading-relaxed max-w-[58ch]">
                These articles help property managers, contractors, retailers
                and logistics operators plan security before something goes
                wrong.
              </p>
            </div>

            <Link
              href={`/blog/${featured.slug}`}
              className="group lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 bg-brand-dark rounded-2xl overflow-hidden"
            >
              <div className="relative min-h-[260px] bg-brand-dark">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-white/60 mb-4">
                  <span className="text-white">{featured.category}</span>
                  <span>{featured.readingTime}</span>
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight tracking-tight mb-3 text-balance">
                  {featured.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Read the guide
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-gray-50 rounded-2xl overflow-hidden hover:bg-white hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] transition-all duration-300"
              >
                <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-3">
                    <span>{post.category}</span>
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="font-semibold text-brand-ink leading-snug mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      
      <ServiceFAQ />
      {SHOW_TESTIMONIALS && <Testimonials />}
      <CTACarousel />
    </>
  );
}
