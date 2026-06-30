import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { subjects, getCardsBySubject } from "@/lib/data";
import { cn } from "@/lib/utils";
import { MindMapCard } from "@/components/mind-map-card";
import { PageBreadcrumbs } from "@/components/breadcrumbs";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subject = subjects.find((s) => s.slug === slug);

  if (!subject) {
    notFound();
  }

  const Icon = subject.icon;
  const subjectCards = getCardsBySubject(slug);

  const currentIndex = subjects.findIndex((s) => s.slug === slug);
  const prevSubject = currentIndex > 0 ? subjects[currentIndex - 1] : null;
  const nextSubject =
    currentIndex < subjects.length - 1 ? subjects[currentIndex + 1] : null;

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageBreadcrumbs segments={[{ label: subject.name }]} />

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `${subject.color}1a`,
              color: subject.color,
            }}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {subject.name}
            </h1>
            <p className="text-muted-foreground">{subject.description}</p>
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-2">
        {subjects.map((s) => {
          const isActive = s.slug === slug;
          return (
            <Link
              key={s.slug}
              href={`/subjects/${s.slug}`}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {s.name}
            </Link>
          );
        })}
      </div>

      <div className="mb-10 flex items-center justify-between">
        <div>
          {prevSubject ? (
            <Link
              href={`/subjects/${prevSubject.slug}`}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← {prevSubject.name}
            </Link>
          ) : (
            <div />
          )}
        </div>
        <div>
          {nextSubject ? (
            <Link
              href={`/subjects/${nextSubject.slug}`}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {nextSubject.name} →
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      {subjectCards.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjectCards.map((card) => (
            <MindMapCard key={card.id} card={card} subject={subject} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-24 text-center">
          <div
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
            style={{
              backgroundColor: `${subject.color}1a`,
              color: subject.color,
            }}
          >
            <BookOpen className="h-8 w-8" />
          </div>
          <h2 className={cn("mb-1 text-xl font-semibold", subject.textClass)}>
            Карты скоро появятся
          </h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Ментальные карты по {subject.name.toLowerCase()} будут добавлены в
            ближайшее время. Следите за обновлениями!
          </p>
        </div>
      )}
    </div>
  );
}
