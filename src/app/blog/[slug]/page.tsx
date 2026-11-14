import { buttonVariants } from "@/components/ui/button";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { siteConfig, SHOW_TESTIMONIALS } from "@/lib/site";
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { CTACarousel } from "@/components/cta-carousel";
import { Testimonials } from "@/components/testimonials";
import { ServiceAreas } from "@/components/service-areas";
import { RichText } from "@/components/rich-text";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Article not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const base = pageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.image,
    imageAlt: post.imageAlt,
    type: "article",
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [siteConfig.name],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  // Same related service first, then same category, newest first within each group.
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score:
        (post.relatedService && p.relatedService?.href === post.relatedService.href ? 2 : 0) +
        (p.category === post.category ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || b.post.publishedAt.localeCompare(a.post.publishedAt))
    .slice(0, 3)
    .map(({ post: p }) => p);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: siteConfig.url },
          { name: "Articles", url: `${siteConfig.url}/blog` },
          { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
        ])}
      />
      <JsonLd data={blogPostingJsonLd(post)} />

      <article className="bg-white">
        <header className="relative overflow-hidden bg-brand-dark pt-36 sm:pt-40 pb-16 sm:pb-20 text-white">
          <div className="absolute inset-0 opacity-40" aria-hidden="true">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-br from-brand-dark via-brand-dark/70 to-brand-dark/30" />
          </div>

          <div className="relative z-10 container mx-auto px-5 sm:px-6 max-w-7xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to articles
            </Link>

            <div className="flex flex-wrap items-center gap-3 border-l border-primary pl-3 text-xs font-mono uppercase tracking-[0.16em] text-white/70 mb-5">
              <span className="text-white">{post.category}</span>
             
              <time dateTime={post.publishedAt}>
                {new Intl.DateTimeFormat("en-CA", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(`${post.publishedAt}T08:00:00-06:00`))}
              </time>
              {post.updatedAt > post.publishedAt && (
                <>
                  <span>·</span>
                  <span>
                    Updated{" "}
                    <time dateTime={post.updatedAt}>
                      {new Intl.DateTimeFormat("en-CA", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(`${post.updatedAt}T08:00:00-06:00`))}
                    </time>
                  </span>
                </>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance max-w-7xl mb-6">
              {post.title}
            </h1>
            <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-3xl">
              {post.description}
            </p>
          </div>
        </header>

        <div className="container mx-auto px-5 sm:px-6 max-w-7xl py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-8">
              <div className="space-y-12">
                {post.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink tracking-tight mb-4 text-balance">
                      {section.heading}
                    </h2>
                    <div className="space-y-4 text-gray-600 leading-relaxed text-base sm:text-lg max-w-[68ch]">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>
                          <RichText text={paragraph} />
                        </p>
                      ))}
                    </div>
                    {section.list && (
                      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
                        {section.list.map((item) => (
                          <li
                            key={item}
                            className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3 text-sm text-gray-700"
                          >
                            <RichText text={item} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 rounded-2xl bg-brand-dark text-white p-6 sm:p-7">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/70 mb-4">
                  Key takeaway
                </p>
                <p className="text-white/70 leading-relaxed mb-6">
                  {post.takeaway}
                </p>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-sm text-white/60 mb-4">
                    Need security now? Dispatch is available 24/7.
                  </p>
                  <a
                    href={siteConfig.phone.href}
                    className={buttonVariants({ className: "gap-2" })}
                  >
                    <Phone className="h-4 w-4" />
                    {siteConfig.phone.display}
                  </a>
                </div>
                {post.relatedService && (
                  <div className="border-t border-white/10 pt-5 mt-5">
                    <p className="text-xs font-mono uppercase tracking-[0.16em] text-white/60 mb-3">
                      Related service
                    </p>
                    <Link
                      href={post.relatedService.href}
                      className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors underline-offset-4 hover:underline"
                    >
                      {post.relatedService.label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <section className="border-t border-gray-100 bg-gray-50">
            <div className="container mx-auto px-5 sm:px-6 max-w-7xl py-16 sm:py-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink tracking-tight mb-8">
                Related articles
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedPosts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex h-full flex-col rounded-2xl bg-white border border-gray-100 p-6 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
                    >
                      <span className="text-xs font-mono uppercase tracking-[0.16em] text-primary mb-3">
                        {p.category}
                      </span>
                      <span className="font-semibold text-brand-ink leading-snug group-hover:text-primary transition-colors">
                        {p.title}
                      </span>
                      <span className="mt-3 text-sm text-gray-500 leading-relaxed">{p.excerpt}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </article>

      <ServiceAreas />
      {SHOW_TESTIMONIALS && <Testimonials />}
      <CTACarousel />
    </>
  );
}
