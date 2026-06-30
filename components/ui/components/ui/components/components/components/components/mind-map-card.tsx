import type { MindMapCard, Subject } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Map } from "lucide-react";
import Link from "next/link";
import { FavoritesButton } from "@/components/favorites-button";

interface MindMapCardProps {
  card: MindMapCard;
  subject: Subject;
}

export function MindMapCard({ card, subject }: MindMapCardProps) {
  return (
    <Link
      href={`/subjects/${subject.slug}/${card.id}`}
      className={cn(
        "group flex flex-col gap-4 rounded-xl p-5 ring-1 transition-all duration-200 card-hover",
        subject.bgClass,
        subject.ringClass
      )}
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${subject.color}1a`, color: subject.color }}
      >
        <Map className="h-6 w-6" />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className={cn("font-semibold leading-tight", subject.textClass)}>
            {card.title}
          </h3>
          <FavoritesButton cardId={card.id} />
        </div>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {card.description}
        </p>
      </div>

      <div className="mt-auto flex items-center gap-1.5">
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: subject.color }}
        />
        <span className="text-xs text-muted-foreground">{subject.name}</span>
      </div>
    </Link>
  );
}
