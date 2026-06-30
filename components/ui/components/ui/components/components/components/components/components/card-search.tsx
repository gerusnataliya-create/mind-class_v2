"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SubjectCard } from "@/components/subject-card";
import { MindMapCard } from "@/components/mind-map-card";
import { subjects, cards } from "@/lib/data";

export function CardSearch() {
  const [query, setQuery] = useState("");

  const trimmed = query.trim();
  const isSearching = trimmed.length > 0;

  const filtered = isSearching
    ? cards.filter((card) => {
        const subject = subjects.find((s) => s.slug === card.subjectSlug);
        const q = trimmed.toLowerCase();
        return (
          card.title.toLowerCase().includes(q) ||
          (subject?.name.toLowerCase().includes(q) ?? false)
        );
      })
    : [];

  return (
    <div className="space-y-6">
      <div className="relative mx-auto max-w-xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Поиск карт по названию или предмету..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {isSearching ? (
        filtered.length > 0 ? (
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((card) => {
              const subject = subjects.find(
                (s) => s.slug === card.subjectSlug
              )!;
              return (
                <MindMapCard key={card.id} card={card} subject={subject} />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium">Ничего не найдено</p>
            <p className="text-sm text-muted-foreground">
              Попробуйте изменить запрос или найти карту по-другому
            </p>
          </div>
        )
      ) : (
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {subjects.map((subject) => (
            <SubjectCard key={subject.slug} subject={subject} />
          ))}
        </div>
      )}
    </div>
  );
}
