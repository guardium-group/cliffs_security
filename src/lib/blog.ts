export interface BlogSection {
  heading: string;
  body: string[];
  list?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Shorter search-result title (page part; " | Cliffs Security" is appended). Falls back to title. */
  seoTitle?: string;
  description: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  sections: BlogSection[];
  takeaway: string;
  relatedService?: { label: string; href: string };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "fire-watch-requirements-alberta",
    title: "When is fire watch required in Alberta?",
    seoTitle: "Fire Watch Requirements in Alberta",
    description:
      "When fire watch is required in Alberta: what happens when fire alarms or sprinklers are offline, what a fire watch officer does, and how to arrange one.",
    excerpt:
      "Fire alarm or sprinklers out of service? What the Alberta Fire Code expects, and what a fire watch officer actually does.",
    category: "Fire watch",
    publishedAt: "2026-11-10",
    updatedAt: "2026-11-10",
    readingTime: "5 min read",
    image: "/images/security/fire-watch.webp",
    imageAlt: "Security officer conducting a fire watch patrol inside a building",
    keywords: [
      "fire watch requirements Alberta",
      "fire watch Edmonton",
      "fire watch security",
      "fire alarm out of service",
      "sprinkler impairment",
    ],
    sections: [
      {
        heading: "When a fire watch is needed",
        body: [
          "Under the Alberta Fire Code, building owners are responsible for keeping fire protection systems working. When a fire alarm, sprinkler system or other fire protection system is shut down, impaired or out of service, the owner is expected to notify the fire department and put alternative safety measures in place until the system is restored. A fire watch is the most common of those measures.",
          "Typical situations include:",
        ],
        list: [
          "Fire alarm or sprinkler repairs, upgrades or testing",
          "Renovations and construction that disable part of a system",
          "Freeze-ups, water damage or power outages that knock a system offline",
          "Hot work such as welding or cutting near combustible materials",
          "New buildings occupied before every system is commissioned",
        ],
      },
      {
        heading: "Confirm the rules with your fire authority",
        body: [
          "Exact requirements, such as how often rounds must be made and what must be logged, are set by the authority having jurisdiction, which is usually the local fire department. Some municipalities publish their own fire watch guidelines. Before a planned shutdown, call your fire department, tell them what will be out of service and for how long, and ask what they expect. This article is general information, not legal or code advice.",
        ],
      },
      {
        heading: "What a fire watch officer does",
        body: [
          "A fire watch officer patrols the areas no longer protected by the system, on a set schedule, looking for fire, smoke, gas odours and anything that could start a fire. If something is found, they raise the alarm, call 911 and help people get out.",
        ],
        list: [
          "Continuous patrols of affected areas on a fixed schedule",
          "Checks of exits, stairwells and hot-work areas",
          "A written log of every round, with times and findings",
          "Notifying the fire department and building contacts if a hazard is found",
        ],
      },
      {
        heading: "Fire, flood and gas watch",
        body: [
          "The same approach applies when other systems are offline. A flood watch covers buildings with damaged plumbing or heating during cold weather, and a gas watch covers sites where gas detection is out of service. Cliffs Security provides [fire watch security](/services/fire-watch), including flood and gas watch, in Edmonton, [Fort Saskatchewan](/service-areas/fort-saskatchewan), [Sherwood Park](/service-areas/sherwood-park) and across the Capital Region.",
        ],
      },
    ],
    takeaway:
      "If a fire alarm or sprinkler system is out of service, call your fire department, arrange a fire watch until it is restored, and keep a written log of every round.",
    relatedService: { label: "Fire watch security", href: "/services/fire-watch" },
  },
  {
    slug: "security-guard-cost-edmonton",
    title: "What affects the cost of security guards in Edmonton",
    seoTitle: "Security Guard Cost in Edmonton",
    description:
      "What affects the cost of security guards in Edmonton: hours, site risk, guards vs patrols, licensing, reporting and notice, and how to get an accurate quote.",
    excerpt:
      "Why security quotes vary, and how to get coverage that fits your risk and budget.",
    category: "Planning",
    publishedAt: "2026-11-10",
    updatedAt: "2026-11-10",
    readingTime: "5 min read",
    image: "/images/security/hero-team.webp",
    imageAlt: "Team of uniformed security officers",
    keywords: [
      "security guard cost Edmonton",
      "how much does a security guard cost",
      "security services pricing",
      "hire security guard Edmonton",
    ],
    sections: [
      {
        heading: "Why quotes vary",
        body: [
          "There is no single price for security in Edmonton because no two sites need the same coverage. A quote reflects how many hours of coverage you need, what the officer has to do, and how much risk the site carries. Knowing what drives the price helps you compare quotes fairly and avoid paying for coverage you don't need.",
        ],
      },
      {
        heading: "The main cost factors",
        body: [
          "These are the things that change a security quote the most:",
        ],
        list: [
          "Hours and schedule: overnight, weekend and holiday coverage, and how many shifts per week",
          "Type of coverage: a full-time guard on site costs more than mobile patrols that visit several times a night",
          "Site risk and duties: gate control, concierge work, loss prevention or fire watch each need different training",
          "Number of officers: large sites and events may need more than one officer at a time",
          "Reporting and technology: daily reports, patrol logs and remote video monitoring",
          "Notice: last-minute or emergency coverage can cost more than planned coverage",
        ],
      },
      {
        heading: "Guards, patrols or both",
        body: [
          "Many sites don't need a guard every hour of the day. [Mobile patrol security](/services/mobile-patrols) gives you a presence through the night for less than a full-time guard, and [remote video monitoring](/services/cctv-access-control) covers the gaps between visits. A [security guard](/services/security-guards) makes sense where someone needs to be on site the whole time, such as a front desk, a busy gate or a high-value construction phase. Our guide to [hybrid security](/blog/hybrid-security-guide) explains how the two work together.",
        ],
      },
      {
        heading: "Licensing is not optional",
        body: [
          "Security guards in Alberta must hold a valid security services licence, and the company must be licensed too. A quote that seems unusually low may cut corners on licensing, training or insurance. Ask any provider to confirm their licence and insurance before you sign.",
        ],
      },
      {
        heading: "How to get an accurate quote",
        body: [
          "The fastest way to an accurate price is a short site assessment. Tell us your address, the hours you need covered and what you are worried about, and we will recommend a coverage plan that fits your risk and budget. [Request a free quote](/contact) or call our 24/7 dispatch.",
        ],
      },
    ],
    takeaway:
      "Security cost depends on hours, coverage type, site risk and notice. Mixing patrols and monitoring with guards where they are truly needed usually gives the best value.",
    relatedService: { label: "Security guards", href: "/services/security-guards" },
  },
  {
    slug: "hybrid-security-guide",
    title: "Hybrid security: how guards and technology work together",
    seoTitle: "Hybrid Security: Guards and Technology",
    description:
      "A practical guide to hybrid security for Edmonton businesses and property managers: when to use guards, when to use cameras, and how to combine both.",
    excerpt:
      "Guards where you need eyes on, monitored systems everywhere else. How to build coverage that fits the risk and the budget.",
    category: "Security planning",
    publishedAt: "2026-10-20",
    updatedAt: "2026-11-05",
    readingTime: "5 min read",
    image: "/images/security/brand-collage.webp",
    imageAlt: "Security officers, patrol vehicles and monitoring equipment",
    keywords: [
      "hybrid security",
      "security guards vs cameras",
      "security planning Edmonton",
      "remote video monitoring",
    ],
    sections: [
      {
        heading: "What hybrid security means",
        body: [
          "Hybrid security combines people and technology in one plan. Instead of choosing between a guard on site around the clock or cameras alone, you use each where it is strongest: officers for judgement, presence and response, and cameras, alarms and access control for constant coverage.",
          "For many properties, a hybrid plan gives better coverage than guards alone, at a lower cost.",
        ],
      },
      {
        heading: "Where guards are worth it",
        body: [
          "A person on site is hard to beat when you need someone to make decisions, talk to the public or respond immediately. Guards are usually the right call for:",
        ],
        list: [
          "Busy lobbies, front desks and loading docks during operating hours",
          "Events, where crowds and alcohol need active management",
          "Sites with a history of break-ins or confrontations",
          "Fire watch when alarm or sprinkler systems are offline",
        ],
      },
      {
        heading: "Where technology does more",
        body: [
          "Cameras do not get tired, and they cover large areas at once. Monitored CCTV, camera towers and access control are ideal for perimeters, parkades, quiet hours and construction sites between shifts, especially when paired with [mobile patrols](/services/mobile-patrols) that can respond when something is spotted.",
        ],
      },
      {
        heading: "Building the plan",
        body: [
          "Start with a site assessment: list the entry points, the assets at risk and the hours when problems happen. Then assign each hour and area to the right layer: guard, patrol, or monitored technology. Review the reports after a month and adjust.",
        ],
      },
    ],
    takeaway:
      "Use guards for judgement and presence, technology for constant coverage, and patrols to connect the two. Review the reports and adjust the mix over time.",
    relatedService: { label: "Video monitoring & access control", href: "/services/cctv-access-control" },
  },
  {
    slug: "construction-site-security-edmonton",
    title: "Construction site security: protecting materials, tools and equipment",
    seoTitle: "Construction Site Security in Edmonton",
    description:
      "How Edmonton contractors and developers can reduce theft and vandalism on construction sites with patrols, guards, camera towers and good site practices.",
    excerpt:
      "Theft of materials and equipment can stall a project. Practical ways to keep your construction site secure after hours.",
    category: "Construction",
    publishedAt: "2026-09-15",
    updatedAt: "2026-11-05",
    readingTime: "5 min read",
    image: "/images/security/mobile-patrol.webp",
    imageAlt: "Marked security patrol vehicles ready for construction site patrols",
    keywords: [
      "construction site security Edmonton",
      "construction theft prevention",
      "site security patrol",
      "camera tower construction",
    ],
    sections: [
      {
        heading: "Why construction sites are targets",
        body: [
          "Construction sites are open, often unlit, and full of valuable materials such as copper, lumber, tools and fuel. They are empty for most of the night and every weekend, and the layout changes from week to week.",
        ],
      },
      {
        heading: "Simple steps that help",
        body: ["Good site practices reduce the opportunity before security even arrives:"],
        list: [
          "Fence the perimeter and keep gates locked after hours",
          "Store tools and small equipment in locked containers",
          "Schedule material deliveries close to when they will be used",
          "Light the site and keep sightlines clear",
          "Post signage showing the site is patrolled and monitored",
        ],
      },
      {
        heading: "Choosing the right security layer",
        body: [
          "Most sites start with [mobile patrols](/services/mobile-patrols) several times a night, which shows the site is being watched without the cost of a full-time guard. Camera towers add constant coverage between visits. For high-value phases or sites with repeated incidents, a [security guard](/services/security-guards) at the gate is often worth it.",
          "Whichever you choose, make sure you get reports: patrol logs and incident reports help with insurance claims and show your client the site is being looked after.",
        ],
      },
    ],
    takeaway:
      "Combine good site practices with patrols and camera towers, and step up to a static guard during high-value phases or after repeated incidents.",
    relatedService: { label: "Mobile patrol security", href: "/services/mobile-patrols" },
  },
  {
    slug: "retail-security-matters",
    title: "Retail security matters more than you think",
    seoTitle: "Retail Security in Edmonton",
    description:
      "How retail stores in Edmonton can reduce theft, protect staff and keep customers comfortable with the right mix of guards, cameras and patrols.",
    excerpt:
      "Shoplifting, after-hours break-ins and staff safety: what retail owners can do about each.",
    category: "Retail",
    publishedAt: "2026-08-12",
    updatedAt: "2026-11-05",
    readingTime: "4 min read",
    image: "/images/security/static-guards.webp",
    imageAlt: "Uniformed security officer on duty at a retail property",
    keywords: [
      "retail security Edmonton",
      "loss prevention",
      "store security guard",
      "shoplifting prevention",
    ],
    sections: [
      {
        heading: "The real cost of retail theft",
        body: [
          "Theft affects more than inventory. It costs staff time, raises insurance costs and can make employees feel unsafe at work. Customers notice too: a store that feels unsafe loses business.",
        ],
      },
      {
        heading: "During opening hours",
        body: [
          "A uniformed [security guard](/services/security-guards) near the entrance is one of the most effective deterrents for shoplifting, and gives staff someone to call on when a situation escalates. Cameras covering entrances, tills and high-value aisles support the guard and provide evidence.",
        ],
      },
      {
        heading: "After hours",
        body: [
          "Break-ins usually happen when the store is closed. Monitored alarms, cameras and [mobile patrols](/services/mobile-patrols) with alarm response mean someone checks the store when an alarm goes off, instead of the owner driving over at 3 a.m.",
        ],
        list: [
          "Monitored alarm with a security company listed as keyholder",
          "Cameras covering doors, windows and the back of the building",
          "Patrol checks at varied times overnight",
          "Good lighting at entrances and loading areas",
        ],
      },
    ],
    takeaway:
      "A visible guard during busy hours and monitored alarms with patrol response after hours cover the two times retail stores are most at risk.",
    relatedService: { label: "Security guards", href: "/services/security-guards" },
  },
  {
    slug: "cargo-theft-logistics",
    title: "Cargo theft in logistics: protecting yards, trailers and warehouses",
    seoTitle: "Cargo Theft Prevention for Logistics",
    description:
      "How logistics, trucking and warehouse operators in the Edmonton region can reduce cargo theft with access control, cameras, patrols and good yard practices.",
    excerpt:
      "Trailers, yards and loading docks are prime targets. How logistics operators can keep cargo where it belongs.",
    category: "Logistics",
    publishedAt: "2026-07-08",
    updatedAt: "2026-11-05",
    readingTime: "5 min read",
    image: "/images/security/patrol-suv.webp",
    imageAlt: "Security patrol vehicle used for yard and warehouse checks",
    keywords: [
      "cargo theft prevention",
      "logistics security Edmonton",
      "warehouse security",
      "truck yard security",
    ],
    sections: [
      {
        heading: "Why cargo theft is a growing problem",
        body: [
          "Loaded trailers parked in yards overnight, busy loading docks and high staff turnover all create opportunities for theft. Industrial areas such as Nisku, Acheson and the Leduc business parks, with their many logistics operations, are common targets.",
        ],
      },
      {
        heading: "Control who gets in",
        body: [
          "Most cargo theft depends on access. [Access control](/services/cctv-access-control) with cards or fobs, staffed gates during shift changes, and visitor and driver logs make it much harder for someone to drive away with a trailer unnoticed.",
        ],
        list: [
          "Gate control and driver check-in",
          "Smart card access for staff areas",
          "Kingpin locks and wheel locks on parked trailers",
          "Cameras on gates, docks and parking rows",
        ],
      },
      {
        heading: "Watch the yard after hours",
        body: [
          "Yards are most vulnerable at night and on weekends. Monitored camera coverage combined with [mobile patrols](/services/mobile-patrols) at varied times keeps the yard watched without a full-time guard. For high-value loads, a static guard at the gate overnight may be justified.",
        ],
      },
    ],
    takeaway:
      "Control access at the gate, lock parked trailers, and combine monitored cameras with patrols so the yard is watched through the night.",
    relatedService: { label: "Video monitoring & access control", href: "/services/cctv-access-control" },
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedBlogPosts(limit = 3) {
  return blogPosts.slice(0, limit);
}
