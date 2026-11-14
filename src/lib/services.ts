import { siteConfig } from "@/lib/site";

export interface ServiceSection {
  heading: string;
  body: string[];
  list?: string[];
}

export interface ServiceSpotlight {
  title: string;
  description: string;
  benefits: string[];
  stat?: { value: string; label: string };
  urgentBadge?: string;
}

export interface ServiceData {
  slug: string;
  /** Full display name, e.g. "Security guards" */
  name: string;
  /** Short label used in navigation, cards and form options */
  shortName: string;
  /** One-line card description */
  shortDescription: string;
  badge?: string;
  title: string;
  metaDescription: string;
  heroImage: string;
  heroImageAlt: string;
  intro: string;
  spotlight: ServiceSpotlight;
  sections: ServiceSection[];
  faqs: Array<{ q: string; a: string }>;
  keywords: string[];
  relatedSlugs: string[];
}

const existingServices: ServiceData[] = [
  {
    slug: "security-guards",
    name: "Security guards",
    shortName: "Security guards",
    shortDescription: "Uniformed officers on site, visible and ready to respond.",
    badge: "Popular",
    title: "Security Guards in Edmonton",
    metaDescription:
      "Licensed security guards in Edmonton for construction sites, condos, offices and retail. Uniformed officers, daily reports and 24/7 dispatch.",
    heroImage: "/images/security/static-guards.webp",
    heroImageAlt: "Uniformed security officer standing post at a commercial property entrance",
    intro:
      "Uniformed security guards are still the most effective deterrent there is. Cliffs Security places licensed security guards at construction sites, condominiums, office towers, retail stores and industrial yards across Edmonton and the Capital Region, with schedules built around the hours that actually matter to your property.",
    spotlight: {
      title: "A visible officer, exactly where you need one.",
      description:
        "Static guards hold a fixed post at your site: controlling who comes and goes, watching for problems before they escalate, and responding immediately when something happens.",
      benefits: [
        "Licensed officers trained in First Aid and CPR/AED",
        "Access control, visitor logs and patrols of the immediate area",
        "Daily check-in reports for owners and property managers",
        "Day, night, weekend and holiday coverage",
      ],
      stat: { value: "24/7", label: "Coverage available" },
    },
    sections: [
      {
        heading: "What a security guard does on your site",
        body: [
          "A static guard is assigned to a fixed post for an agreed schedule. That could be a lobby desk in an office tower, the gate of a construction site, the loss-prevention door of a retail store, or a roving post inside a warehouse. Their job is to be seen, to control access, and to respond the moment something is out of place.",
          "Every post comes with written post orders that we build with you: who is allowed on site, which doors stay locked, who to call for which kind of incident, and what goes into the daily report.",
        ],
        list: [
          "Access control and visitor or contractor sign-in",
          "Interior and perimeter checks of the assigned area",
          "Incident response, documentation and escalation",
          "Alarm response and coordination with police, fire or EMS",
          "Concierge and front-desk duties for residential and commercial lobbies",
          "Opening and lockup procedures",
        ],
      },
      {
        heading: "Licensed, trained and accountable",
        body: [
          "Every Cliffs Security officer holds a valid Alberta security services licence and is trained in First Aid and CPR/AED. Officers are briefed on your site before their first shift, and supervisors check in on posts so standards hold on the night shift as well as the day shift.",
          "You receive written reports covering who came and went, what was checked, and anything that needed attention. If an incident happens, you hear about it from us first, with the details documented.",
        ],
      },
      {
        heading: "Properties we cover",
        body: [
          "Static guards suit any property where a constant presence matters: active construction sites with equipment and materials on the ground, residential towers that want a staffed front desk, offices with controlled floors, retail stores dealing with theft, and industrial yards with valuable inventory.",
          "Not every site needs a guard around the clock. We often pair static posts during busy or high-risk hours with [mobile patrols](/services/mobile-patrols) or [monitored cameras](/services/cctv-access-control) for the rest of the day.",
        ],
      },
    ],
    faqs: [
      {
        q: "How quickly can a security guard start at my site?",
        a: `For urgent needs we can often place a guard within a short window once we have the site address and the hours you need covered. Call ${siteConfig.phone.display} and we will confirm availability while you are on the phone.`,
      },
      {
        q: "Are your guards licensed?",
        a: "Yes. Every officer we place holds a valid Alberta security services licence and is trained in First Aid and CPR/AED.",
      },
      {
        q: "Can I get guards for nights and weekends only?",
        a: "Yes. Most of our static posts cover after-hours periods only. We build the schedule around your risk, not a fixed minimum.",
      },
      {
        q: "What do the daily reports include?",
        a: "Reports record start and end of shift, checks completed, visitors and contractors on site, and any incidents with times and actions taken. They can be sent to multiple people, such as an owner, a property manager and a board.",
      },
      {
        q: "Can a security guard also do concierge work?",
        a: "Yes. For condominiums and office lobbies we provide concierge-style officers who greet residents and visitors, manage deliveries and keep the front desk secure.",
      },
    ],
    keywords: [
      "security guards Edmonton",
      "static security guards",
      "construction site security Edmonton",
      "condo security Edmonton",
      "concierge security",
      "on-site security officer",
    ],
    relatedSlugs: ["mobile-patrols", "cctv-access-control", "fire-watch"],
  },

  {
    slug: "mobile-patrols",
    name: "Mobile patrol security",
    shortName: "Mobile patrols",
    shortDescription: "Marked patrol vehicles running regular checks all night.",
    badge: "Popular",
    title: "Mobile Patrol Security in Edmonton",
    metaDescription:
      "Mobile patrol security in Edmonton for construction sites, condos and commercial properties. Randomized checks, alarm response and patrol reports.",
    heroImage: "/images/security/mobile-patrol.webp",
    heroImageAlt: "Marked security patrol vehicles parked in a row",
    intro:
      "Mobile patrol security gives you a presence across the whole night without the cost of a full-time guard. Cliffs Security patrol officers visit your property in marked vehicles, check the perimeter and access points, and respond to alarms, so your site is seen to repeatedly rather than once.",
    spotlight: {
      title: "Seen to all night, not just once.",
      description:
        "Marked patrol vehicles running perimeter and building checks at varied times, with each visit logged and alarm response when you need it.",
      benefits: [
        "Randomized visit times so patterns can't be predicted",
        "Lock and unlock services and perimeter checks",
        "Alarm response to keyholder calls",
        "Visit logs sent to you after every patrol",
      ],
      stat: { value: "Multi-visit", label: "Patrols every night" },
    },
    sections: [
      {
        heading: "How mobile patrols work",
        body: [
          "We agree on the number of visits per night and what each visit includes. Patrol officers then arrive at varied times, so anyone watching your site cannot predict when the next check is coming. Each visit is logged with a time stamp and notes.",
          "A visit can be a drive-by with a spotlight check, a full walk of the perimeter, an interior check of common areas, or a lock-up of doors and gates at closing time.",
        ],
        list: [
          "Perimeter, fence line and gate checks",
          "Interior checks of parkades, stairwells and common areas",
          "Lock-up and unlock services",
          "Removal of trespassers and loiterers",
          "Alarm response on behalf of keyholders",
          "Reporting of damage, leaks or hazards",
        ],
      },
      {
        heading: "Who mobile patrols suit",
        body: [
          "Patrols work well for construction sites between shifts, condominium complexes with parkades, commercial plazas, retail properties after close, and vacant buildings that need regular checks for insurance.",
          "If your site needs a constant presence during certain hours, patrols combine well with [security guards](/services/security-guards) for the busy period and [camera monitoring](/services/cctv-access-control) between visits.",
        ],
      },
      {
        heading: "Alarm response",
        body: [
          "When your alarm company calls a keyholder in the middle of the night, it can call us instead. A patrol officer attends, checks the property, secures it if needed, and coordinates with police when there is a confirmed break-in. You get a written report in the morning instead of a 3 a.m. drive.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many patrol visits do I need?",
        a: "It depends on the site and the risk. Many properties start with two to four visits per night and adjust once they see the reports. We will recommend a starting point after a site assessment.",
      },
      {
        q: "Are patrol times the same every night?",
        a: "No. Visit times are varied on purpose so that nobody watching the property can predict them.",
      },
      {
        q: "Can patrols respond to my alarm?",
        a: "Yes. We can be listed as the keyholder with your monitoring company and attend alarm calls at your property.",
      },
      {
        q: "Will I know when a patrol visited?",
        a: "Yes. Each visit is logged with the time and any observations, and you receive the patrol log after each night.",
      },
    ],
    keywords: [
      "mobile security patrol Edmonton",
      "security patrol service",
      "alarm response Edmonton",
      "construction site patrol",
      "condo patrol security",
    ],
    relatedSlugs: ["security-guards", "cctv-access-control", "event-security"],
  },

  {
    slug: "event-security",
    name: "Event security",
    shortName: "Event security",
    shortDescription: "Crowds, access control and liquor licence compliance.",
    title: "Event Security in Edmonton",
    metaDescription:
      "Event security in Edmonton for galas, festivals, concerts, sports and private events. Crowd control, access control and liquor licence compliance.",
    heroImage: "/images/security/event-team.webp",
    heroImageAlt: "Event security team in uniform ready for an event",
    intro:
      "A well-run event looks effortless because the security plan behind it was not. Cliffs Security provides event security for events of every size in Edmonton and the surrounding region, from a charity gala to a multi-day festival, with one team handling the job from load-in to the last guest out.",
    spotlight: {
      title: "Events that run without incident.",
      description:
        "End-to-end event security and venue safety for any scale of event, planned with you before the doors open and staffed by officers who know crowds.",
      benefits: [
        "Crowd management and access control",
        "Liquor licence compliance and ID checks",
        "Bag checks, wristbands and backstage access",
        "One team from load-in to last guest out",
      ],
      urgentBadge: "Any scale",
    },
    sections: [
      {
        heading: "Event security, planned in advance",
        body: [
          "We start by walking the venue or site plan with you: entry points, capacity, alcohol service areas, emergency exits, VIP or backstage zones, and where problems are likely to start. That turns into a deployment plan with a post for every officer and a clear chain of command on the day.",
        ],
        list: [
          "Front-of-house entry, ticket and wristband checks",
          "Bag checks and prohibited-item screening",
          "Crowd management and capacity control",
          "Liquor licence compliance, ID checks and intoxication monitoring",
          "Backstage, VIP and green-room access control",
          "Overnight site security for multi-day events",
        ],
      },
      {
        heading: "Events we staff",
        body: [
          "Charity galas, corporate functions, weddings, concerts, festivals, sporting events, trade shows, community celebrations and private parties. For outdoor and multi-day events, we can also cover the site overnight so equipment and staging stay secure between event days.",
        ],
      },
      {
        heading: "Working with organizers and venues",
        body: [
          "Your event has one security lead who coordinates with your organizer, the venue, bar staff, and police or EMS if needed. After the event you receive an incident summary, which is useful for your liquor licence records and your next event plan.",
        ],
      },
    ],
    faqs: [
      {
        q: "How far in advance should I book event security?",
        a: "As early as you can, especially for summer weekends and holiday parties. For smaller events, a couple of weeks' notice is usually enough. For festivals and large crowds, start the conversation months ahead.",
      },
      {
        q: "How many security officers does my event need?",
        a: "It depends on attendance, alcohol service, venue layout and the type of crowd. We will recommend staffing levels after reviewing your event details.",
      },
      {
        q: "Do you help with liquor licence requirements?",
        a: "Yes. Our officers handle ID checks, monitor for intoxication and help you meet the security conditions attached to your liquor licence.",
      },
      {
        q: "Can you secure the site overnight for multi-day events?",
        a: "Yes. We provide overnight static guards or patrols to protect equipment, staging and vendor areas between event days.",
      },
    ],
    keywords: [
      "event security Edmonton",
      "festival security",
      "concert security Edmonton",
      "gala security",
      "crowd management",
      "liquor licence security",
    ],
    relatedSlugs: ["security-guards", "executive-protection", "mobile-patrols"],
  },

  {
    slug: "fire-watch",
    name: "Fire, flood and gas watches",
    shortName: "Fire, flood & gas watches",
    shortDescription: "Continuous hazard watch when your alarm systems are offline.",
    title: "Fire Watch Security in Edmonton",
    metaDescription:
      "Fire watch security in Edmonton when fire alarms or sprinklers are offline. Trained fire, flood and gas watch officers for construction and maintenance.",
    heroImage: "/images/security/fire-watch.webp",
    heroImageAlt: "Security officer conducting a fire watch patrol inside a building",
    intro:
      "When a fire alarm, sprinkler system or gas detection system goes offline for repairs, renovation or construction, the building still needs someone watching for danger. Cliffs Security provides fire watch security and trained hazard watch personnel who patrol continuously and raise the alarm the moment something is wrong, until your systems are back online.",
    spotlight: {
      title: "Continuous watch while your systems are down.",
      description:
        "Trained hazard watch personnel patrol your building on a fixed schedule, log every round and raise the alarm immediately if fire, water or gas is detected.",
      benefits: [
        "Fire watch during alarm or sprinkler impairments",
        "Flood watch for plumbing and water system work",
        "Gas watch during line work or detector outages",
        "Logged rounds you can show to your insurer or fire inspector",
      ],
      urgentBadge: "On short notice",
      stat: { value: "Logged", label: "Every round documented" },
    },
    sections: [
      {
        heading: "When you need a hazard watch",
        body: [
          "A fire watch is usually required whenever a building's fire protection is impaired. Your fire inspector, insurer or property manager may require one during construction, renovation, alarm panel replacement, sprinkler repairs or after a system fault. Flood and gas watches follow the same idea for water and gas systems.",
        ],
        list: [
          "Fire alarm or sprinkler systems taken offline for maintenance",
          "Renovation and construction work involving hot work",
          "Alarm panel faults or failed inspections",
          "Plumbing, boiler or water main work with flood risk",
          "Gas line work or gas detection outages",
        ],
      },
      {
        heading: "What our watch personnel do",
        body: [
          "Watch personnel patrol the affected areas on a set route and frequency, checking for smoke, heat, water and gas. Every round is logged with a time. If a hazard is detected, they alert occupants, call 911 and contact your designated person immediately.",
          "The logs give you a documented record for your insurer, your fire inspector and your own files.",
        ],
      },
      {
        heading: "Short notice is normal",
        body: [
          "System failures rarely give warning. We can often put watch personnel in place on short notice and keep them there for as long as the impairment lasts, whether that is one night or several weeks.",
        ],
      },
    ],
    faqs: [
      {
        q: "When is a fire watch required?",
        a: "Generally whenever a building's fire alarm or sprinkler system is impaired or out of service. Your local fire authority, insurer or building owner sets the specific requirement, and we work to their conditions.",
      },
      {
        q: "How quickly can you provide a fire watch?",
        a: `Often on short notice. Call ${siteConfig.phone.display} with the address and the systems affected, and we will confirm a start time.`,
      },
      {
        q: "Do I get documentation of the watch?",
        a: "Yes. Every round is logged with the time and observations, and the logs are provided to you for your insurer or inspector.",
      },
      {
        q: "Can the same officer handle security as well as the fire watch?",
        a: "In many cases yes, as long as the watch duties come first. We will recommend a setup that meets your fire watch conditions.",
      },
    ],
    keywords: [
      "fire watch Edmonton",
      "fire watch security",
      "flood watch",
      "gas watch",
      "sprinkler impairment fire watch",
      "construction fire watch",
    ],
    relatedSlugs: ["security-guards", "mobile-patrols", "cctv-access-control"],
  },

  {
    slug: "executive-protection",
    name: "Executive protection",
    shortName: "Executive protection",
    shortDescription: "Discreet protection for individuals, executives and assets.",
    title: "Executive Protection in Edmonton",
    metaDescription:
      "Discreet executive protection in Edmonton for individuals, executives and high-value transfers. Close protection, secure escorts and investigations.",
    heroImage: "/images/security/private-protection.webp",
    heroImageAlt: "Close protection officer escorting a client",
    intro:
      "Some situations call for protection that is focused on a person or an asset rather than a building. Cliffs Security provides discreet executive and close protection, secure escorts and private investigation services, planned around the specific risk and kept confidential.",
    spotlight: {
      title: "Discreet protection, built around the person.",
      description:
        "Close protection and private investigation tailored to the individual or asset, with planning and discretion as the starting point.",
      benefits: [
        "Close protection for individuals and executives",
        "Secure escorts for high-value transfers",
        "Residential protection during periods of elevated risk",
        "Confidential private investigation services",
      ],
      stat: { value: "Confidential", label: "By default" },
    },
    sections: [
      {
        heading: "Protection for people",
        body: [
          "Executives travelling to Edmonton, public figures at events, individuals facing threats or harassment, and families during a period of elevated risk. We assess the threat, plan routes and venues, and assign officers whose presence fits the situation, whether that is visible or low-profile.",
        ],
        list: [
          "Executive and VIP close protection",
          "Residential protection",
          "Protection during terminations or difficult meetings",
          "Event and travel escorts",
        ],
      },
      {
        heading: "Protection for assets",
        body: [
          "High-value transfers of cash, inventory, equipment or documents need careful planning around timing and routes. We provide secure escorts and on-site protection during handovers.",
        ],
      },
      {
        heading: "Private investigation",
        body: [
          "Through licensed investigators, we can look into internal theft, fraud, workplace misconduct and other matters where you need facts gathered quietly and documented properly.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is private protection visible or low-profile?",
        a: "Either. We match the approach to the situation. Some clients want a visible deterrent, others need officers who blend in.",
      },
      {
        q: "Is my information kept confidential?",
        a: "Yes. Details of private protection and investigation work are shared only with the officers assigned and the people you authorize.",
      },
      {
        q: "Can you provide protection on short notice?",
        a: `In many cases yes. Call ${siteConfig.phone.display} to discuss the situation and we will tell you what we can put in place and when.`,
      },
    ],
    keywords: [
      "private protection Edmonton",
      "executive protection",
      "bodyguard Edmonton",
      "close protection",
      "private investigation Edmonton",
    ],
    relatedSlugs: ["event-security", "security-guards", "mobile-patrols"],
  },

  {
    slug: "cctv-access-control",
    name: "Remote video monitoring and access control",
    shortName: "Video monitoring & access",
    shortDescription: "Camera towers, IP cameras and smart card access, monitored 24/7.",
    title: "Remote Video Monitoring in Edmonton",
    metaDescription:
      "Remote video monitoring in Edmonton: CCTV, camera towers and smart card access control, monitored 24/7 with a documented audit trail.",
    heroImage: "/images/security/brand-collage.webp",
    heroImageAlt: "Collage of security officers, vehicles and monitoring equipment",
    intro:
      "Guards cannot be everywhere, but cameras can. Cliffs Security provides remote video monitoring, installing and monitoring CCTV and access control systems, including mobile camera towers for construction sites, so every entry point is watched and every event has a record.",
    spotlight: {
      title: "Eyes on every entry point, around the clock.",
      description:
        "Video surveillance and access control installed and monitored around the clock, with guards dispatched when something needs a person on the ground.",
      benefits: [
        "Mobile CCTV camera towers for construction sites",
        "IP camera systems for commercial and residential buildings",
        "Smart card and fob access control",
        "Remote monitoring with guard dispatch",
      ],
      stat: { value: "24/7", label: "Remote monitoring" },
      urgentBadge: "Technology",
    },
    sections: [
      {
        heading: "Video surveillance",
        body: [
          "We design camera coverage around the risk: entrances, loading docks, parkades, perimeters and areas where materials are stored. Systems can be recorded locally, viewed remotely and monitored by our team.",
        ],
        list: [
          "Mobile camera towers for construction and temporary sites",
          "IP cameras for offices, retail, condos and industrial sites",
          "Remote viewing from your phone or computer",
          "Recorded footage for incident review and insurance claims",
        ],
      },
      {
        heading: "Access control",
        body: [
          "Smart card and fob systems let you control who can open which door and when, and keep a record of every entry. Access rights can be changed instantly when staff, tenants or contractors change.",
        ],
      },
      {
        heading: "Monitoring with a response",
        body: [
          "Cameras are most useful when someone is watching and can act. Our remote monitoring connects your cameras and alarms to people who can dispatch a [mobile patrol](/services/mobile-patrols), contact police, and document the incident with a full audit trail.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you provide camera towers for construction sites?",
        a: "Yes. Mobile CCTV camera towers can be placed on construction and temporary sites where permanent cameras are not practical, and monitored remotely.",
      },
      {
        q: "Can I view my cameras myself?",
        a: "Yes. Systems we install can be viewed remotely from your phone or computer, in addition to any monitoring we provide.",
      },
      {
        q: "What happens if the monitoring team sees something?",
        a: "They follow the response plan we agree with you: dispatching a patrol officer, contacting police, and notifying your designated contacts, with the incident documented.",
      },
      {
        q: "Can you combine cameras with guards?",
        a: "Yes. Many clients use cameras to cover most of the day and guards or patrols for the highest-risk hours. That hybrid approach usually costs less than guards alone.",
      },
    ],
    keywords: [
      "CCTV installation Edmonton",
      "security camera tower",
      "access control Edmonton",
      "remote video monitoring",
      "construction site cameras",
    ],
    relatedSlugs: ["mobile-patrols", "security-guards", "fire-watch"],
  },
];


type NewService = { slug: string; name: string; summary: string; details: string; considerations: string[] };
const additionalServices: NewService[] = [
  { slug: "tactical-security", name: "Tactical security", summary: "Security support for sites with elevated or changing risks.", details: "A tactical security plan starts with the nature of the site, the people present and the situations officers may encounter. Discuss the scope and staffing requirements with our team before assigning coverage.", considerations: ["Site-specific risk assessment and post orders", "Incident communication and escalation", "Visible presence tailored to the environment"] },
  { slug: "commercial-security", name: "Commercial security", summary: "Security planning for commercial buildings and business premises.", details: "Commercial properties have different access patterns throughout the day. A plan can address opening and closing, visitors, deliveries and after-hours checks around the needs of the building.", considerations: ["Visitor and contractor access", "Common-area and perimeter checks", "Opening and closing procedures"] },
  { slug: "residential-security", name: "Residential security", summary: "A welcoming security presence for residential properties.", details: "Residential security balances access management and incident response with the experience of residents and guests. Coverage can be discussed with property management to fit the building's routines.", considerations: ["Resident and visitor access", "Common-area observations", "Property-specific incident procedures"] },
  { slug: "concierge-security", name: "Concierge security", summary: "Front-desk service combined with a security-minded presence.", details: "A concierge security role brings together a helpful reception experience and the building's agreed access procedures. The right duties depend on the property and its residents or tenants.", considerations: ["Welcoming residents, guests and contractors", "Visitor and delivery coordination", "Reporting concerns to property management"] },
  { slug: "access-control", name: "Access control", summary: "Manage how people enter and move through a property.", details: "Access control can help property managers organise entry points, credentials and visitor procedures. Discuss the building, its users and existing equipment to identify a suitable approach.", considerations: ["Doors and controlled entry points", "Credentials and visitor procedures", "Integration with existing site operations"] },
  { slug: "intrusion-alarms", name: "Intrusion alarms", summary: "Alarm solutions for unauthorised entry and site security.", details: "Intrusion detection can support a property's security plan when premises are closed or areas are restricted. The design should reflect entrances, occupancy patterns and the response arrangements for an alarm.", considerations: ["Entry points and detection zones", "Arming schedules and authorised users", "Alarm notification and response procedures"] },
  { slug: "security-cameras", name: "Security cameras", summary: "Camera coverage designed around your property and its risks.", details: "A camera plan starts with the areas that need visibility, lighting, retention needs and the privacy of people on site. We can discuss how cameras fit alongside officers, access control and monitoring.", considerations: ["Entrances, common areas and perimeter visibility", "Lighting and camera placement", "Privacy and recording requirements"] },
  { slug: "alarm-monitoring", name: "Alarm monitoring", summary: "A defined process for receiving and responding to alarm signals.", details: "Alarm monitoring arrangements should identify who receives an alert, how it is assessed and who is contacted. We can discuss the right response plan for your property and equipment.", considerations: ["Notification and contact lists", "Escalation and keyholder arrangements", "Site-specific response procedures"] },
  { slug: "remote-camera-monitoring", name: "Remote camera monitoring", summary: "Remote video monitoring as part of a layered security plan.", details: "Remote monitoring can complement on-site personnel and physical safeguards. Discuss the camera coverage, monitoring schedule and response expectations that suit your site.", considerations: ["Monitoring schedules and coverage", "Incident review and escalation", "Coordination with on-site security"] },
];

function createAdditionalService(item: NewService): ServiceData {
  const description = `${item.name} in Edmonton and the Capital Region. Discuss your property and security needs with Cliffs Security.`;
  return {
    slug: item.slug, name: item.name, shortName: item.name,
    shortDescription: item.summary, title: `${item.name} in Edmonton`, metaDescription: description,
    heroImage: "/images/security/hero-team.webp", heroImageAlt: "Security personnel at work",
    intro: item.summary + " " + item.details,
    spotlight: { title: `A practical approach to ${item.name.toLowerCase()}`, description: item.details, benefits: item.considerations },
    sections: [
      { heading: `Planning ${item.name.toLowerCase()} for your site`, body: [item.details], list: item.considerations },
      { heading: "A plan built around your property", body: ["Tell us about your location, operating hours and priorities. We can discuss coverage options and a scope of work suited to your site."] },
    ],
    faqs: [{ q: `How do I discuss ${item.name.toLowerCase()} for my property?`, a: "Contact Cliffs Security with your location, operating hours and the concerns you would like to address. We can discuss your requirements and available options." }],
    keywords: [], relatedSlugs: ["security-guards", "mobile-patrols", "cctv-access-control"],
  };
}
export const services: ServiceData[] = [...existingServices, ...additionalServices.map(createAdditionalService)];
export const serviceCategories = [
  { name: "Physical Security", slugs: ["security-guards", "event-security", "mobile-patrols", "tactical-security", "commercial-security", "residential-security", "concierge-security", "fire-watch", "executive-protection"] },
  { name: "Security Systems", slugs: ["access-control", "intrusion-alarms", "security-cameras", "alarm-monitoring", "remote-camera-monitoring", "cctv-access-control"] },
] as const;

export function getService(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
