import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { ServiceAreasMap } from "@/components/service-areas-map";

export function ServiceAreas() {
  return (
    <section
      id="service-areas"
      className="py-16 sm:py-24 bg-white border-t border-black/[0.06] scroll-mt-24 overflow-hidden"
    >
      <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: copy + city pills */}
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-primary mb-4">
              Service area
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink leading-tight tracking-tight mb-4 text-balance">
              Serving Edmonton &amp; surroundings.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6 max-w-[46ch]">
              Static guards, mobile patrols, event security and monitored
              systems across the greater Edmonton region, 24/7. Not sure if we
              cover your site? Call dispatch.
            </p>
            <a
              href={siteConfig.phone.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4 mb-8"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phone.display}
            </a>

            {/* City pills */}
            <div className="flex flex-wrap gap-2 mt-2">
              {siteConfig.serviceArea.map((area) => {
                const slug = area.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-");
                return (
                  <Link
                    key={area}
                    href={`/service-areas/${slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 bg-gray-50 border border-gray-200 hover:border-primary/40 hover:text-brand-ink rounded-full px-3.5 py-2.5 transition-colors duration-200"
                  >
                    <MapPin className="h-2.5 w-2.5 text-primary/70 shrink-0" />
                    {area}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: interactive map */}
          <ServiceAreasMap />

        </div>
      </div>
    </section>
  );
}
