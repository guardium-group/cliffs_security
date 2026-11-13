"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { getFeaturedBlogPosts } from "@/lib/blog";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export function BlogPreview() {
  const posts = getFeaturedBlogPosts(3);
  const featured = posts[0];
  const secondary = posts.slice(1);

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-black/[0.04]">
      <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-primary mb-3">
              Guides &amp; articles
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink leading-tight tracking-tight text-balance">
              Practical security advice for Edmonton property managers, businesses and event organizers.
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-brand-ink transition-colors group whitespace-nowrap"
          >
            View all articles
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Featured card */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-7"
          >
          <Link
            href={`/blog/${featured.slug}`}
            className="group block bg-gray-50 rounded-2xl overflow-hidden ring-1 ring-black/[0.06] hover:ring-black/[0.10] hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              {/* Category badge */}
              <span className="absolute top-4 left-4 text-xs font-mono uppercase tracking-[0.15em] text-primary bg-white/90 border border-primary/20 rounded-full px-3 py-1 backdrop-blur-sm">
                {featured.category}
              </span>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-3">
                <Clock className="h-3 w-3" aria-hidden="true" />
                <span>{featured.readingTime}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-ink leading-tight tracking-tight mb-3 text-balance group-hover:text-primary transition-colors">
                {featured.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[60ch]">
                {featured.excerpt}
              </p>
            </div>
          </Link>
          </motion.div>

          {/* Secondary cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {secondary.map((post, i) => (
              <motion.div
                key={post.slug}
                variants={fadeUp}
                custom={i + 2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex gap-4 bg-gray-50 rounded-2xl p-4 ring-1 ring-black/[0.06] hover:ring-black/[0.10] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative w-24 min-[360px]:w-28 sm:w-36 aspect-[4/3] shrink-0 rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="144px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-mono text-gray-400 mb-2">
                    <span className="text-primary">{post.category}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                      <Clock className="h-2.5 w-2.5" aria-hidden="true" />
                      {post.readingTime}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-brand-ink leading-snug mb-1.5 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
