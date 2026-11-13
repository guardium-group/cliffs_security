import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-primary mb-4">404</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-ink tracking-tight mb-3">Page Not Found</h1>
        <p className="text-gray-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist. If you need a security officer right away, call dispatch now.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="rounded-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="secondary" asChild className="rounded-full">
            <a href={siteConfig.phone.href}>
              <Phone className="mr-2 h-4 w-4" />
              Call Us Now
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
