import Link from "next/link";
import type { Subject } from "@/lib/data";
import { cn } from "@/lib/utils";

interface SubjectCardProps {
  subject: Subject;
}

export function SubjectCard({ subject }: SubjectCardProps) {
  const Icon = subject.icon;

  return (
    <Link
      href={`/subjects/${subject.slug}`}
      className={cn(
        "group flex flex-col items-center gap-4 rounded-xl p-8 text-center ring-1 transition-all duration-200 card-hover",
        subject.bgClass,
        subject.ringClass
      )}
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{ backgroundColor: `${subject.color}1a`, color: subject.color }}
      >
        <Icon className="h-8 w-8" />
      </div>
      <div className="space-y-1">
        <h3 className={cn("text-lg font-semibold", subject.textClass)}>
          {subject.name}
        </h3>
        <p className="text-sm text-muted-foreground">{subject.description}</p>
      </div>
    </Link>
  );
}
