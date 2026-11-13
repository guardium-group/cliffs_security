import Link from "next/link";
import { Fragment, type ReactNode } from "react";

// Renders plain content strings with inline links written as [label](/path).
const LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(LINK_PATTERN)) {
    const [whole, label, href] = match;
    const start = match.index ?? 0;
    if (start > lastIndex) parts.push(text.slice(lastIndex, start));
    parts.push(
      href.startsWith("/") ? (
        <Link key={start} href={href} className="text-brand-link underline underline-offset-4 hover:no-underline">
          {label}
        </Link>
      ) : (
        <a
          key={start}
          href={href}
          className="text-brand-link underline underline-offset-4 hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      )
    );
    lastIndex = start + whole.length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <Fragment>{parts}</Fragment>;
}

/** Strips [label](/path) link markup, for plain-text uses such as JSON-LD and meta tags. */
export function stripLinks(text: string): string {
  return text.replace(LINK_PATTERN, "$1");
}
