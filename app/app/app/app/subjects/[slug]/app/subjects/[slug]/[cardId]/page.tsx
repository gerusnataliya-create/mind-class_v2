import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Map } from "lucide-react";
import { subjects, cards, getMindMapData } from "@/lib/data";
import { MindMapViewer } from "@/components/mind-map-viewer";
import { DownloadMapButton } from "@/components/download-map-button";
import { PageBreadcrumbs } from "@/components/breadcrumbs";

export default async function MindMapPage({
  params,
}: {
  params: Promise<{ slug: string; cardId: string }>;
}) {
  const { slug, cardId } = await params;

  const subject = subjects.find((s) => s.slug === slug);
  if (!subject) notFound();

  const card = cards.find((c) => c.id === cardId);
  if (!card) notFound();

  const mindMapData = getMindMapData(cardId);
  if (!mindMapData) notFound();

  return (
    <div className="container mx-auto flex h-[calc(100vh-8rem)] flex-col px-4 py-6">
      <PageBreadcrumbs
        segments={[
          { label: subject.name, href: `/subjects/${slug}` },
          { label: card.title },
        ]}
      />

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Каталог
          </Link>
          <div className="h-4 w-px bg-border" />
          <Link
            href={`/subjects/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {subject.name}
          </Link>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2 text-sm">
            <Map className="h-4 w-4" style={{ color: subject.color }} />
            <span className="font-medium">{card.title}</span>
          </div>
        </div>

        <DownloadMapButton data={mindMapData} cardTitle={card.title} />
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border bg-card">
        <MindMapViewer data={mindMapData} accentColor={subject.color} />
      </div>
    </div>
  );
}
