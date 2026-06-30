"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { isFavorite, addFavorite, removeFavorite } from "@/lib/favorites";
import { toast } from "sonner";

interface FavoritesButtonProps {
  cardId: string;
}

export function FavoritesButton({ cardId }: FavoritesButtonProps) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(cardId));
  }, [cardId]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (favorite) {
      removeFavorite(cardId);
      setFavorite(false);
      toast.success("Удалено из избранного");
    } else {
      addFavorite(cardId);
      setFavorite(true);
      toast.success("Добавлено в избранное");
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent transition-colors"
      aria-label={favorite ? "Удалить из избранного" : "Добавить в избранное"}
    >
      <Heart
        className={`h-4 w-4 transition-colors ${
          favorite
            ? "fill-red-500 text-red-500"
            : "text-muted-foreground hover:text-red-400"
        }`}
      />
    </button>
  );
}
