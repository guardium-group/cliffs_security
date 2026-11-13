import { siteConfig } from "@/lib/site";

export interface AreaData {
  slug: string;
  name: string;
  metaDescription: string;
  intro: string;
  /** Short summary for the key-facts bar, e.g. "Guards, patrols & monitoring" */
  coverage: string;
  /** Property types we commonly protect in this community */
  propertyTypes: string[];
  /** Commercial, industrial and residential districts in this community */
  keyDistricts: string[];
  /** Extra city-specific copy. Body strings may contain [label](/path) links. */
  sections?: Array<{ heading: string; body: string[] }>;
  faqs: Array<{ q: string; a: string }>;
  keywords: string[];
}

interface AreaSeed {
  slug: string;
  name: string;
  /** Unique search description (155 characters or fewer). Falls back to a shared template. */
  metaDescription?: string;
  intro: string;
  coverage?: string;
  propertyTypes: string[];
  keyDistricts: string[];
  sections?: AreaData["sections"];
  extraFaqs?: AreaData["faqs"];
}

function buildArea(seed: AreaSeed): AreaData {
  const { name } = seed;
  return {
    slug: seed.slug,
    name,
    metaDescription:
      seed.metaDescription ??
      `Security guards, mobile patrols, event security and fire watch in ${name}, Alberta. Licensed officers and 24/7 dispatch from Cliffs Security.`,
    intro: seed.intro,
    coverage: seed.coverage ?? "Guards, patrols & monitoring",
    propertyTypes: seed.propertyTypes,
    keyDistricts: seed.keyDistricts,
    sections: seed.sections,
    faqs: [
      ...(seed.extraFaqs ?? []),
      {
        q: `Do you provide security guards in ${name}?`,
        a: `Yes. We place licensed security guards across ${name} for construction sites, commercial properties, residential buildings and events, on schedules that match your risk.`,
      },
      {
        q: `Can mobile patrols cover my property in ${name}?`,
        a: `Yes. Our patrol officers visit properties in ${name} at varied times through the night, check the perimeter and access points, and can respond to alarm calls as your keyholder.`,
      },
      {
        q: `How do I get a security quote for a site in ${name}?`,
        a: `Call ${siteConfig.phone.display} or send a request through our contact page. We will arrange a free site assessment and send you a coverage plan and quote.`,
      },
    ],
    keywords: [
      `security guards ${name}`,
      `security company ${name}`,
      `mobile patrol ${name}`,
      `event security ${name}`,
      `fire watch ${name}`,
    ],
  };
}

const seeds: AreaSeed[] = [
  {
    slug: "edmonton",
    name: "Edmonton",
    intro:
      "Edmonton is our home base. From downtown office towers and Ice District events to construction sites in new south-side neighbourhoods and industrial yards in the southeast, Cliffs Security protects properties across the city with licensed guards, mobile patrols and monitored systems, dispatched 24/7 from our Roper Road office.",
    coverage: "Citywide guards, patrols & monitoring",
    propertyTypes: [
      "Office towers and commercial buildings",
      "Construction sites and new developments",
      "Condominiums and rental apartments",
      "Retail stores and shopping centres",
      "Warehouses and industrial yards",
      "Concerts, galas and festivals",
    ],
    keyDistricts: [
      "Downtown core and the Ice District",
      "Whyte Avenue and Old Strathcona",
      "West Edmonton Mall area",
      "South Edmonton Common",
      "Southeast industrial areas around Roper Road",
      "Northwest industrial areas",
    ],
    sections: [
      {
        heading: "Security for a growing city",
        body: [
          "New neighbourhoods are going up on every edge of Edmonton, and active construction sites are a constant target for theft of materials, tools and equipment. We combine [mobile patrols](/services/mobile-patrols), [camera towers](/services/cctv-access-control) and [static guards](/services/security-guards) so sites are covered between shifts without paying for more than they need.",
          "Downtown and in mature neighbourhoods, condominium boards and property managers use our officers for front-desk concierge coverage, parkade patrols and after-hours checks.",
        ],
      },
    ],
    extraFaqs: [
      {
        q: "Do you cover events in downtown Edmonton?",
        a: "Yes. We staff galas, corporate functions, concerts and festivals across Edmonton, including crowd management, access control and liquor licence compliance.",
      },
    ],
  },
  {
    slug: "sherwood-park",
    name: "Sherwood Park",
    metaDescription:
      "Security guards, patrols and fire watch in Sherwood Park and Strathcona County for industrial sites, retail plazas and condos. 24/7 dispatch.",
    intro:
      "Sherwood Park and Strathcona County combine busy residential communities with some of the region's largest industrial operations. Cliffs Security provides guards, patrols and fire watch services for commercial plazas, condominium complexes and industrial sites across the area.",
    propertyTypes: [
      "Industrial and energy-sector sites",
      "Retail plazas and shopping centres",
      "Condominium and townhouse complexes",
      "Construction sites",
      "Community and private events",
    ],
    keyDistricts: [
      "Sherwood Park Mall area",
      "Baseline Road commercial corridor",
      "Strathcona County industrial areas",
      "Emerald Hills and newer residential communities",
    ],
    sections: [
      {
        heading: "Industrial security across Strathcona County",
        body: [
          "Strathcona County is home to some of the largest refining and energy-sector operations in Alberta, and the contractors, laydown yards and shutdown crews that support them. Our [security guards](/services/security-guards) handle gate control, contractor sign-in and site patrols, so only the right people and vehicles get through and every entry is on record.",
          "When fire alarms or sprinkler systems are taken offline for maintenance or a turnaround, a [fire watch](/services/fire-watch) officer patrols the affected areas on a set schedule and logs every round, giving you the documented coverage that facility managers and fire officials ask for.",
        ],
      },
      {
        heading: "Retail plazas, condos and construction in Sherwood Park",
        body: [
          "Along the Baseline Road corridor and around Sherwood Park Mall, retailers use our officers for loss prevention and after-hours checks, while condominium and townhouse boards use [mobile patrol security](/services/mobile-patrols) for parkades, common areas and vacant units.",
          "New residential communities mean active construction sites, which are most exposed at night and on weekends. We pair patrols with [remote video monitoring](/services/cctv-access-control) so materials and equipment are watched between visits, and add a guard during high-value phases.",
        ],
      },
    ],
    extraFaqs: [
      {
        q: "Do you provide security for industrial sites in Strathcona County?",
        a: "Yes. We provide gate and access control, contractor sign-in, site patrols and fire watch for industrial and energy-sector sites in Sherwood Park and across Strathcona County.",
      },
      {
        q: "Can you patrol condominium complexes in Sherwood Park?",
        a: "Yes. Our patrol officers check parkades, common areas, doors and amenities at varied times overnight and send the board or property manager a report after each visit.",
      },
    ],
  },
  {
    slug: "st-albert",
    name: "St. Albert",
    metaDescription:
      "Security guards and mobile patrols in St. Albert for retail, business parks, condos and construction sites. Licensed officers and 24/7 dispatch.",
    intro:
      "St. Albert businesses and property managers rely on Cliffs Security for after-hours patrols, retail loss prevention and construction-site protection. We cover the city's commercial corridors, business parks and residential complexes with licensed officers and 24/7 dispatch.",
    propertyTypes: [
      "Retail stores and commercial plazas",
      "Business park offices and warehouses",
      "Condominium complexes",
      "Construction sites",
      "Community events",
    ],
    keyDistricts: [
      "St. Albert Trail commercial corridor",
      "Campbell Business Park",
      "Downtown St. Albert",
      "Riel Business Park",
    ],
    sections: [
      {
        heading: "Retail and business park security in St. Albert",
        body: [
          "St. Albert Trail is lined with retail centres, restaurants and auto dealerships that stay attractive to thieves after closing. Our [security guards](/services/security-guards) provide visible loss prevention during busy hours, and [mobile patrol security](/services/mobile-patrols) checks doors, lots and loading areas overnight, with alarm response as your keyholder.",
          "In Campbell and Riel business parks, warehouses, contractor shops and offices often need coverage only at night and on weekends. Patrols at varied times, backed by [remote video monitoring](/services/cctv-access-control), give those sites a presence without the cost of a full-time guard.",
        ],
      },
      {
        heading: "Condos, construction and community events",
        body: [
          "Condominium boards and property managers in St. Albert use our officers for parkade patrols, common-area checks and vacant-unit inspections, with a report after every visit.",
          "We also protect construction sites in the city's newer neighbourhoods, and staff community events and private functions with [event security](/services/event-security) covering access control, crowd management and liquor licence compliance.",
        ],
      },
    ],
    extraFaqs: [
      {
        q: "Do you provide retail security on St. Albert Trail?",
        a: "Yes. We provide uniformed loss-prevention officers for stores and plazas along St. Albert Trail, plus overnight patrols and alarm response after closing.",
      },
      {
        q: "Can I hire a security guard in St. Albert for one event?",
        a: "Yes. We staff one-off community events, private functions and corporate events in St. Albert, sized to your guest count, venue and liquor licence requirements.",
      },
    ],
  },
  {
    slug: "spruce-grove",
    name: "Spruce Grove",
    metaDescription:
      "Construction site security, mobile patrols and security guards in Spruce Grove for new developments, retail and industrial sites. 24/7 dispatch.",
    intro:
      "Spruce Grove is one of the fastest-growing cities in the Capital Region, with new residential and commercial construction underway across town. Cliffs Security protects those sites, along with retail and industrial properties, using patrols, guards and monitored cameras.",
    propertyTypes: [
      "Construction sites and new subdivisions",
      "Retail and commercial centres",
      "Light industrial properties",
      "Condominium complexes",
    ],
    keyDistricts: [
      "Highway 16A commercial corridor",
      "Westwind and Westgrove commercial areas",
      "Spruce Grove industrial areas",
      "Newer residential developments",
    ],
    sections: [
      {
        heading: "Construction site security in a fast-growing city",
        body: [
          "With new subdivisions and commercial buildings going up across Spruce Grove, construction sites are the most common security request we see west of Edmonton. Materials, tools and equipment are most at risk at night and on weekends, when the site is empty.",
          "Most builders start with [mobile patrol security](/services/mobile-patrols) several times a night, add [camera towers and remote video monitoring](/services/cctv-access-control) for continuous coverage, and bring in [security guards](/services/security-guards) during high-value phases such as appliance and fixture deliveries.",
        ],
      },
      {
        heading: "Retail and light industrial properties",
        body: [
          "Along the Highway 16A corridor and in the Westwind and Westgrove commercial areas, retailers and property owners use patrols for after-hours checks and alarm response, and uniformed officers for visible loss prevention.",
          "Light industrial and contractor yards in Spruce Grove's industrial areas get perimeter checks, gate and lock checks, and a written report after each patrol, so you know exactly when the site was visited and what was found.",
        ],
      },
    ],
    extraFaqs: [
      {
        q: "How do you protect construction sites in Spruce Grove?",
        a: "We combine mobile patrols at varied times, monitored camera towers and, when needed, an on-site security guard, so the site is covered between shifts without paying for more than it needs.",
      },
      {
        q: "Do you cover Stony Plain as well as Spruce Grove?",
        a: "Yes. We serve Spruce Grove, Stony Plain and the Acheson industrial area, so one provider can cover sites across the west side of the Capital Region.",
      },
    ],
  },
  {
    slug: "leduc",
    name: "Leduc",
    metaDescription:
      "Security guards and patrols in Leduc and Nisku for warehouses, equipment yards and airport-area logistics sites. Licensed officers, 24/7 dispatch.",
    intro:
      "Leduc's business parks and its location next to Edmonton International Airport make it a hub for logistics, distribution and industrial services. Cliffs Security provides guards, patrols and access control for warehouses, yards and commercial sites in and around Leduc.",
    propertyTypes: [
      "Warehouses and distribution centres",
      "Industrial and equipment yards",
      "Retail and commercial properties",
      "Construction sites",
    ],
    keyDistricts: [
      "Leduc Business Park",
      "Edmonton International Airport area",
      "Downtown Leduc",
      "Leduc Common retail area",
    ],
    sections: [
      {
        heading: "Logistics, warehouses and equipment yards",
        body: [
          "Leduc's business parks and the nearby Nisku Business Park hold warehouses, distribution centres, trucking yards and energy-service shops, much of it near Edmonton International Airport. Trailers, equipment and parts stored outside are the usual target, especially overnight and on long weekends.",
          "We protect these sites with [mobile patrol security](/services/mobile-patrols) at varied times, [remote video monitoring](/services/cctv-access-control) of yards and gates, and [security guards](/services/security-guards) for gate control and driver sign-in where traffic needs to be checked around the clock. See our guide to [cargo theft in logistics](/blog/cargo-theft-logistics) for the practices that work alongside security.",
        ],
      },
      {
        heading: "Retail, downtown and construction sites",
        body: [
          "Around Leduc Common and downtown Leduc, retailers and property managers use patrols for after-hours checks and alarm response, and uniformed officers for loss prevention during busy periods.",
          "Construction sites in Leduc's newer neighbourhoods get the same layered approach we use across the region: patrols, camera towers and a guard during high-risk phases. If [fire alarms or sprinklers are offline](/services/fire-watch) during construction or maintenance, we provide fire watch officers too.",
        ],
      },
    ],
    extraFaqs: [
      {
        q: "Do you provide security in Nisku as well as Leduc?",
        a: "Yes. We cover Leduc, the Nisku Business Park and the Edmonton International Airport area, so one provider can patrol and monitor sites across the area.",
      },
      {
        q: "Can you check trucks and drivers at a yard gate in Leduc?",
        a: "Yes. Our security guards can run gate control at logistics and industrial yards, checking drivers, trailers and paperwork and keeping a log of every vehicle in and out.",
      },
    ],
  },
  {
    slug: "beaumont",
    name: "Beaumont",
    intro:
      "Beaumont is growing quickly, with new residential neighbourhoods and commercial development. Cliffs Security protects construction sites, retail properties and community events in Beaumont with mobile patrols, static guards and event staff.",
    propertyTypes: [
      "Residential construction sites",
      "Retail and commercial properties",
      "Community events",
      "Condominium complexes",
    ],
    keyDistricts: [
      "Beaumont town centre",
      "50 Street commercial area",
      "New residential developments",
    ],
  },
  {
    slug: "devon",
    name: "Devon",
    intro:
      "Devon's mix of small-town commercial properties and nearby energy-sector operations calls for flexible security. Cliffs Security provides mobile patrols, static guards and fire watch services across Devon and the surrounding area.",
    propertyTypes: [
      "Commercial and retail properties",
      "Energy and industrial sites",
      "Construction sites",
      "Community events",
    ],
    keyDistricts: [
      "Devon town centre",
      "Surrounding industrial and energy-sector sites",
      "Residential communities",
    ],
  },
  {
    slug: "morinville",
    name: "Morinville",
    intro:
      "Morinville businesses and property owners use Cliffs Security for after-hours patrols and alarm response without needing a guard on site all night. We also staff community events and protect construction sites in town.",
    propertyTypes: [
      "Retail and commercial properties",
      "Light industrial sites",
      "Construction sites",
      "Community events",
    ],
    keyDistricts: [
      "Downtown Morinville",
      "Highway 2 commercial corridor",
      "Local light-industrial areas",
    ],
  },
  {
    slug: "fort-saskatchewan",
    name: "Fort Saskatchewan",
    metaDescription:
      "Industrial security in Fort Saskatchewan: gate security, guards, patrols and fire watch for Industrial Heartland sites. Licensed officers, 24/7 dispatch.",
    intro:
      "Fort Saskatchewan sits at the heart of Alberta's Industrial Heartland, home to major petrochemical and processing facilities. Cliffs Security provides guards, gate and access control, patrols and fire watch for industrial and commercial sites in and around the city.",
    coverage: "Industrial guards, patrols & fire watch",
    propertyTypes: [
      "Industrial and petrochemical sites",
      "Contractor yards and laydown areas",
      "Retail and commercial properties",
      "Construction sites",
    ],
    keyDistricts: [
      "Alberta's Industrial Heartland",
      "Downtown Fort Saskatchewan",
      "Highway 15 commercial corridor",
    ],
    sections: [
      {
        heading: "Security for Industrial Heartland sites",
        body: [
          "Fort Saskatchewan sits in Alberta's Industrial Heartland, where petrochemical plants, processing facilities and the contractors who maintain them run around the clock. Sites like these need controlled gates, a record of who is on site and patrols that don't stop at shift change.",
          "Our [security guards](/services/security-guards) run gate and access control, contractor and visitor sign-in, and scheduled site patrols. For laydown areas and contractor yards, [mobile patrol security](/services/mobile-patrols) and [remote video monitoring](/services/cctv-access-control) cover the perimeter between visits.",
        ],
      },
      {
        heading: "Fire watch during shutdowns and turnarounds",
        body: [
          "Maintenance shutdowns, turnarounds and construction often mean fire alarms, sprinklers or gas detection are taken out of service. While they are offline, a [fire watch](/services/fire-watch) officer patrols the affected areas on a set schedule, looks for fire, smoke and gas hazards, and keeps a written log of every round.",
          "Read [when fire watch is required in Alberta](/blog/fire-watch-requirements-alberta) for how impaired systems are usually handled, and always confirm the exact requirements with your local fire authority.",
        ],
      },
    ],
    extraFaqs: [
      {
        q: "Do you provide gate security for industrial sites?",
        a: "Yes. Our security guards handle gate and access control, contractor sign-in and site patrols for industrial and construction sites in the Fort Saskatchewan area.",
      },
      {
        q: "Can you provide fire watch during a plant shutdown or turnaround?",
        a: "Yes. We provide fire watch officers who patrol areas where fire protection systems are out of service, on the schedule your site or fire authority sets, with a written log of every round.",
      },
    ],
  },
  {
    slug: "stony-plain",
    name: "Stony Plain",
    intro:
      "Stony Plain's historic downtown, commercial corridor and community events all benefit from a visible security presence. Cliffs Security provides patrols, guards and event security across Stony Plain and Parkland County.",
    propertyTypes: [
      "Retail and commercial properties",
      "Community events and festivals",
      "Construction sites",
      "Industrial properties",
    ],
    keyDistricts: [
      "Old Town Stony Plain",
      "Highway 16A commercial corridor",
      "Stony Plain industrial areas",
    ],
  },
  {
    slug: "nisku",
    name: "Nisku",
    intro:
      "Nisku is one of the largest industrial parks in Canada, filled with energy-service companies, equipment yards and logistics operations. Cliffs Security protects these sites with mobile patrols, static guards, camera towers and alarm response.",
    coverage: "Industrial patrols, guards & cameras",
    propertyTypes: [
      "Equipment and contractor yards",
      "Energy-service shops and facilities",
      "Warehouses and logistics operations",
      "Construction sites",
    ],
    keyDistricts: [
      "Nisku Business Park",
      "Airport-adjacent logistics areas",
      "Highway 2 corridor",
    ],
    extraFaqs: [
      {
        q: "Can you protect equipment yards in Nisku overnight?",
        a: "Yes. We combine mobile patrols, camera towers and alarm response so equipment yards are checked and monitored through the night.",
      },
    ],
  },
  {
    slug: "acheson",
    name: "Acheson",
    intro:
      "Acheson's industrial area west of Edmonton is home to large distribution centres, manufacturers and logistics operations. Cliffs Security provides access control, guards, patrols and monitored cameras to protect inventory, equipment and people.",
    coverage: "Industrial guards, patrols & access control",
    propertyTypes: [
      "Distribution centres and warehouses",
      "Manufacturing facilities",
      "Logistics and trucking yards",
      "Construction sites",
    ],
    keyDistricts: [
      "Acheson Industrial Area",
      "Highway 16 and Highway 60 corridors",
      "Logistics and distribution parks",
    ],
  },
];

export const serviceAreas: AreaData[] = seeds.map(buildArea);

export function getArea(slug: string): AreaData | undefined {
  return serviceAreas.find((a) => a.slug === slug);
}
