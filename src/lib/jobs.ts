export const jobs = [
  {
    slug: "concierge-customer-service", title: "Concierge Customer Service", datePosted: "2026-11-09", active: true, minSalary: 15, maxSalary: 18.5,
    summary: "Join a residential community in Edmonton in a people-focused concierge and security role.",
    responsibilities: ["Welcome residents, visitors and contractors and respond to their questions.", "Help coordinate deliveries, move-ins, move-outs and contractor access.", "Monitor access, carry out property patrols and respond calmly to concerns or alarms.", "Keep clear activity logs and communicate with property management."],
    qualifications: ["Valid Alberta Security Services Licence and Standard First Aid with CPR/AED.", "Customer-facing, concierge, residential or hospitality experience.", "Clear English communication and confidence using mobile reporting tools.", "Ability to stand and walk for extended periods, including outdoor patrols, and legal authorisation to work in Canada."],
    schedule: "Full-time, permanent. Day, evening, overnight, weekday, weekend and holiday shifts may be available; shifts are 8 to 12 hours. Expected hours: 36 per week.",
  },
  {
    slug: "static-security-guard", title: "Static Security Guard", datePosted: "2026-11-09", active: true, minSalary: 15.5, maxSalary: 18,
    summary: "Provide on-site security for properties in Edmonton and surrounding areas.",
    responsibilities: ["Monitor sites and security systems, conduct patrols and respond to incidents and alarms.", "Prepare accurate incident reports and daily logs using digital tools.", "Communicate with client contacts and emergency services as needed.", "Follow site post orders, assess hazards and de-escalate challenging situations."],
    qualifications: ["Valid Alberta security licence, Class 5 driver's licence and access to a vehicle.", "One to two years of security or law-enforcement experience and legal authorisation to work in Canada.", "First Aid Level C with CPR/AED, or willingness to obtain it within three months.", "Ability to work evenings, nights and weekends; strong English, reporting and computer skills; bondable and insurable in Alberta."],
    schedule: "Full-time, permanent. Evening, overnight and weekend availability is required. Expected hours: 36 per week.",
  },
] as const;
export function getOpenJob(slug: string) { return jobs.find((job) => job.slug === slug && job.active); }
