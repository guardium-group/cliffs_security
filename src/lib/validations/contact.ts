import { z } from "zod";

export const serviceOptions = [
  "Security Guards",
  "Mobile Patrol Security",
  "Event Security",
  "Fire, Flood & Gas Watches",
  "Executive Protection",
  "Video Monitoring & Access Control",
  "Other / Not Sure",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone number is too long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
  services: z.array(z.string()).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
