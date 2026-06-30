import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbSegment {
  label: string;
  href?: string;
}

interface PageBreadcrumbsProps {
  segments: BreadcrumbSegment[];
}

export function PageBreadcrumbs({ segments }: PageBreadcrumbsProps) {
  return (
    <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
      <Link
        href="/"
        className="hover:text-foreground transition-colors"
      >
        Каталог
      </Link>
      {segments.map((seg, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5" />
          {seg.href ? (
            <Link
              href={seg.href}
              className="hover:text-foreground transition-colors"
            >
              {seg.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{seg.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
