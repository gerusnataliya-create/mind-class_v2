import { CardSearch } from "@/components/card-search";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Каталог предметов
        </h1>
        <p className="text-muted-foreground">
          Выберите предмет для изучения ментальных карт
        </p>
      </div>
      <CardSearch />
    </div>
  );
}
