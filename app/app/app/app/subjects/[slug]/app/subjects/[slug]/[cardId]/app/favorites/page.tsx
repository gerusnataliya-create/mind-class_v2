"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { subjects, cards } from "@/lib/data";
import { MindMapCard } from "@/components/mind-map-card";
import { getFavorites } from "@/lib/favorites";

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteIds(getFavorites());
  }, []);

  const favoriteCards = cards.filter((c) => favoriteIds.includes(c.id));

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Каталог
        </Link>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Избранное
          </h1>
        </div>
      </div>

      {favoriteCards.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteCards.map((card) => {
            const subject = subjects.find(
              (s) => s.slug === card.subjectSlug
            )!;
            return (
              <MindMapCard key={card.id} card={card} subject={subject} />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-24 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold">В избранном пока пусто</h2>
          <p className="text-sm text-muted-foreground">
            Добавляйте карты в избранное, чтобы они появились здесь
          </p>
          <Link
            href="/"
            className="mt-2 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Перейти к каталогу
          </Link>
        </div>
      )}
    </div>
  );
}
