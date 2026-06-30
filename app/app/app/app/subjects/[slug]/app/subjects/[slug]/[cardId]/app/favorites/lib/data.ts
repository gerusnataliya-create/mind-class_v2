import {
  BookOpen,
  FlaskConical,
  Globe,
  Landmark,
  LetterText,
  Library,
  Sigma,
  type LucideIcon,
} from "lucide-react";

export interface Subject {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgClass: string;
  textClass: string;
  ringClass: string;
}

export const subjects: Subject[] = [
  {
    slug: "history",
    name: "История",
    description: "Даты, события, личности",
    icon: Landmark,
    color: "#b91c1c",
    bgClass: "bg-red-50 dark:bg-red-950/30",
    textClass: "text-red-700 dark:text-red-300",
    ringClass: "ring-red-200 dark:ring-red-800",
  },
  {
    slug: "russian",
    name: "Русский язык",
    description: "Правила и исключения",
    icon: LetterText,
    color: "#1d4ed8",
    bgClass: "bg-blue-50 dark:bg-blue-950/30",
    textClass: "text-blue-700 dark:text-blue-300",
    ringClass: "ring-blue-200 dark:ring-blue-800",
  },
  {
    slug: "literature",
    name: "Литература",
    description: "Произведения и авторы",
    icon: Library,
    color: "#15803d",
    bgClass: "bg-green-50 dark:bg-green-950/30",
    textClass: "text-green-700 dark:text-green-300",
    ringClass: "ring-green-200 dark:ring-green-800",
  },
  {
    slug: "physics",
    name: "Физика",
    description: "Законы и формулы",
    icon: Globe,
    color: "#7c3aed",
    bgClass: "bg-purple-50 dark:bg-purple-950/30",
    textClass: "text-purple-700 dark:text-purple-300",
    ringClass: "ring-purple-200 dark:ring-purple-800",
  },
  {
    slug: "chemistry",
    name: "Химия",
    description: "Элементы и реакции",
    icon: FlaskConical,
    color: "#0d9488",
    bgClass: "bg-teal-50 dark:bg-teal-950/30",
    textClass: "text-teal-700 dark:text-teal-300",
    ringClass: "ring-teal-200 dark:ring-teal-800",
  },
  {
    slug: "social",
    name: "Обществознание",
    description: "Понятия и теории",
    icon: BookOpen,
    color: "#d97706",
    bgClass: "bg-amber-50 dark:bg-amber-950/30",
    textClass: "text-amber-700 dark:text-amber-300",
    ringClass: "ring-amber-200 dark:ring-amber-800",
  },
  {
    slug: "math",
    name: "Математика",
    description: "Формулы и теоремы",
    icon: Sigma,
    color: "#e11d48",
    bgClass: "bg-rose-50 dark:bg-rose-950/30",
    textClass: "text-rose-700 dark:text-rose-300",
    ringClass: "ring-rose-200 dark:ring-rose-800",
  },
  {
    slug: "geometry",
    name: "Геометрия",
    description: "Фигуры и свойства",
    icon: Library,
    color: "#6366f1",
    bgClass: "bg-indigo-50 dark:bg-indigo-950/30",
    textClass: "text-indigo-700 dark:text-indigo-300",
    ringClass: "ring-indigo-200 dark:ring-indigo-800",
  },
];

export interface MindMapCard {
  id: string;
  title: string;
  description: string;
  subjectSlug: string;
}

export const cards: MindMapCard[] = [
  {
    id: "pushkin-tales",
    title: "А.С. Пушкин — 7 сказок",
    description:
      "Обзорная карта семи сказок Александра Сергеевича Пушкина",
    subjectSlug: "literature",
  },
  {
    id: "lermontov",
    title: "М.Ю. Лермонтов",
    description:
      "Ключевые произведения Михаила Юрьевича Лермонтова",
    subjectSlug: "literature",
  },
  {
    id: "mendeleev-table",
    title: "Таблица Менделеева",
    description:
      "Периодическая система химических элементов Д.И. Менделеева",
    subjectSlug: "chemistry",
  },
  {
    id: "physics-laws",
    title: "Законы физики",
    description:
      "Основные законы и формулы школьного курса физики",
    subjectSlug: "physics",
  },
  {
    id: "alexander-i",
    title: "Александр I",
    description:
      "Даты рождения и правления, ключевые события эпохи",
    subjectSlug: "history",
  },
  {
    id: "free-tillers-decree",
    title: "Указ о вольных хлебопашцах",
    description:
      "Указ 1803 года: предпосылки, содержание, значение",
    subjectSlug: "history",
  },
  {
    id: "war-1812",
    title: "Отечественная война 1812 года",
    description:
      "Ход событий войны 1812 года: причины, сражения, итоги",
    subjectSlug: "history",
  },
  {
    id: "decembrists",
    title: "Декабристы",
    description:
      "Восстание декабристов 1825 года: предпосылки, ход, последствия",
    subjectSlug: "history",
  },
  {
    id: "russian-rules",
    title: "Правила русского языка",
    description:
      "Основные правила орфографии и пунктуации",
    subjectSlug: "russian",
  },
  {
    id: "social-studies",
    title: "Ключевые понятия обществознания",
    description:
      "Базовые понятия курса обществознания",
    subjectSlug: "social",
  },
  {
    id: "math-formulas",
    title: "Формулы и теоремы",
    description:
      "Основные формулы и теоремы школьного курса математики",
    subjectSlug: "math",
  },
  {
    id: "geometry-shapes",
    title: "Фигуры и свойства",
    description:
      "Базовые фигуры планиметрии и стереометрии",
    subjectSlug: "geometry",
  },
];

export function getCardsBySubject(slug: string): MindMapCard[] {
  return cards.filter((card) => card.subjectSlug === slug);
}

export interface MindMapNode {
  id: string;
  label: string;
  description?: string;
  isCenter?: boolean;
}

export interface MindMapEdge {
  from: string;
  to: string;
}

export interface MindMapData {
  id: string;
  nodes: MindMapNode[];
  edges: MindMapEdge[];
}

export const mindMapData: Record<string, MindMapData> = {
  "pushkin-tales": {
    id: "pushkin-tales",
    nodes: [
      { id: "pushkin", label: "А.С. Пушкин", isCenter: true },
      { id: "golden-cockerel", label: "Сказка о золотом петушке" },
      { id: "dead-princess", label: "Сказка о мёртвой царевне" },
      { id: "fisherman-fish", label: "Сказка о рыбаке и рыбке" },
      { id: "tsar-saltan", label: "Сказка о царе Салтане" },
      { id: "priest-worker", label: "Сказка о попе и работнике его Балде" },
    ],
    edges: [
      { from: "pushkin", to: "golden-cockerel" },
      { from: "pushkin", to: "dead-princess" },
      { from: "pushkin", to: "fisherman-fish" },
      { from: "pushkin", to: "tsar-saltan" },
      { from: "pushkin", to: "priest-worker" },
    ],
  },
  lermontov: {
    id: "lermontov",
    nodes: [
      { id: "lermontov", label: "М.Ю. Лермонтов", isCenter: true },
      { id: "hero-of-our-time", label: "Герой нашего времени" },
      { id: "borodino", label: "Бородино" },
      { id: "mtsyri", label: "Мцыри" },
      { id: "demon", label: "Демон" },
      { id: "sail", label: "Парус" },
      { id: "death-of-poet", label: "Смерть поэта" },
    ],
    edges: [
      { from: "lermontov", to: "hero-of-our-time" },
      { from: "lermontov", to: "borodino" },
      { from: "lermontov", to: "mtsyri" },
      { from: "lermontov", to: "demon" },
      { from: "lermontov", to: "sail" },
      { from: "lermontov", to: "death-of-poet" },
    ],
  },
  "mendeleev-table": {
    id: "mendeleev-table",
    nodes: [
      { id: "mendeleev", label: "Таблица Менделеева", isCenter: true },
      { id: "metals", label: "Металлы" },
      { id: "nonmetals", label: "Неметаллы" },
      { id: "periods", label: "Периоды" },
      { id: "groups", label: "Группы" },
      { id: "lanthanides", label: "Лантаноиды" },
      { id: "actinides", label: "Актиноиды" },
    ],
    edges: [
      { from: "mendeleev", to: "metals" },
      { from: "mendeleev", to: "nonmetals" },
      { from: "mendeleev", to: "periods" },
      { from: "mendeleev", to: "groups" },
      { from: "mendeleev", to: "lanthanides" },
      { from: "mendeleev", to: "actinides" },
    ],
  },
  "physics-laws": {
    id: "physics-laws",
    nodes: [
      { id: "physics", label: "Законы физики", isCenter: true },
      { id: "mechanics", label: "Механика" },
      { id: "thermodynamics", label: "Термодинамика" },
      { id: "electrodynamics", label: "Электродинамика" },
      { id: "optics", label: "Оптика" },
      { id: "nuclear", label: "Ядерная физика" },
    ],
    edges: [
      { from: "physics", to: "mechanics" },
      { from: "physics", to: "thermodynamics" },
      { from: "physics", to: "electrodynamics" },
      { from: "physics", to: "optics" },
      { from: "physics", to: "nuclear" },
    ],
  },
  "alexander-i": {
    id: "alexander-i",
    nodes: [
      { id: "alexander", label: "Александр I", isCenter: true },
      { id: "birth", label: "Рождение (1777)" },
      { id: "reign-start", label: "Начало правления (1801)" },
      { id: "secret-committee", label: "Негласный комитет" },
      { id: "war-1812", label: "Отечественная война 1812" },
      { id: "holy-alliance", label: "Священный союз" },
      { id: "death", label: "Смерть (1825)" },
    ],
    edges: [
      { from: "alexander", to: "birth" },
      { from: "alexander", to: "reign-start" },
      { from: "alexander", to: "secret-committee" },
      { from: "alexander", to: "war-1812" },
      { from: "alexander", to: "holy-alliance" },
      { from: "alexander", to: "death" },
    ],
  },
  "free-tillers-decree": {
    id: "free-tillers-decree",
    nodes: [
      { id: "decree", label: "Указ о вольных хлебопашцах", isCenter: true },
      { id: "year-1803", label: "1803 год" },
      { id: "background", label: "Предпосылки" },
      { id: "content", label: "Содержание" },
      { id: "results", label: "Результаты" },
      { id: "significance", label: "Значение" },
    ],
    edges: [
      { from: "decree", to: "year-1803" },
      { from: "decree", to: "background" },
      { from: "decree", to: "content" },
      { from: "decree", to: "results" },
      { from: "decree", to: "significance" },
    ],
  },
  "war-1812": {
    id: "war-1812",
    nodes: [
      { id: "war1812", label: "Отечественная война 1812", isCenter: true },
      { id: "causes", label: "Причины" },
      { id: "borodino", label: "Бородинское сражение" },
      { id: "tarutino", label: "Тарутинский манёвр" },
      { id: "partisans", label: "Партизанское движение" },
      { id: "napoleon-retreat", label: "Отступление Наполеона" },
      { id: "results", label: "Итоги" },
    ],
    edges: [
      { from: "war1812", to: "causes" },
      { from: "war1812", to: "borodino" },
      { from: "war1812", to: "tarutino" },
      { from: "war1812", to: "partisans" },
      { from: "war1812", to: "napoleon-retreat" },
      { from: "war1812", to: "results" },
    ],
  },
  decembrists: {
    id: "decembrists",
    nodes: [
      { id: "decembrists", label: "Декабристы", isCenter: true },
      { id: "background", label: "Предпосылки" },
      { id: "secret-societies", label: "Тайные общества" },
      { id: "leaders", label: "Руководители" },
      { id: "uprising", label: "Восстание (14.12.1825)" },
      { id: "trial", label: "Суд и приговор" },
      { id: "significance", label: "Значение" },
    ],
    edges: [
      { from: "decembrists", to: "background" },
      { from: "decembrists", to: "secret-societies" },
      { from: "decembrists", to: "leaders" },
      { from: "decembrists", to: "uprising" },
      { from: "decembrists", to: "trial" },
      { from: "decembrists", to: "significance" },
    ],
  },
  "russian-rules": {
    id: "russian-rules",
    nodes: [
      { id: "russian", label: "Правила русского языка", isCenter: true },
      { id: "orthography", label: "Орфография" },
      { id: "punctuation", label: "Пунктуация" },
      { id: "roots", label: "Корни" },
      { id: "prefixes", label: "Приставки" },
      { id: "suffixes", label: "Суффиксы" },
    ],
    edges: [
      { from: "russian", to: "orthography" },
      { from: "russian", to: "punctuation" },
      { from: "russian", to: "roots" },
      { from: "russian", to: "prefixes" },
      { from: "russian", to: "suffixes" },
    ],
  },
  "social-studies": {
    id: "social-studies",
    nodes: [
      { id: "social", label: "Обществознание", isCenter: true },
      { id: "society", label: "Общество" },
      { id: "human", label: "Человек" },
      { id: "economy", label: "Экономика" },
      { id: "politics", label: "Политика" },
      { id: "law", label: "Право" },
      { id: "culture", label: "Духовная культура" },
    ],
    edges: [
      { from: "social", to: "society" },
      { from: "social", to: "human" },
      { from: "social", to: "economy" },
      { from: "social", to: "politics" },
      { from: "social", to: "law" },
      { from: "social", to: "culture" },
    ],
  },
  "math-formulas": {
    id: "math-formulas",
    nodes: [
      { id: "math", label: "Формулы и теоремы", isCenter: true },
      { id: "abbr-mult", label: "ФСУ" },
      { id: "powers", label: "Степени" },
      { id: "roots", label: "Корни" },
      { id: "logs", label: "Логарифмы" },
      { id: "progressions", label: "Прогрессии" },
      { id: "equations", label: "Уравнения" },
    ],
    edges: [
      { from: "math", to: "abbr-mult" },
      { from: "math", to: "powers" },
      { from: "math", to: "roots" },
      { from: "math", to: "logs" },
      { from: "math", to: "progressions" },
      { from: "math", to: "equations" },
    ],
  },
  "geometry-shapes": {
    id: "geometry-shapes",
    nodes: [
      { id: "geometry", label: "Фигуры и свойства", isCenter: true },
      { id: "triangles", label: "Треугольники" },
      { id: "quadrilaterals", label: "Четырёхугольники" },
      { id: "circle", label: "Окружность" },
      { id: "polyhedra", label: "Многогранники" },
      { id: "rotation", label: "Тела вращения" },
    ],
    edges: [
      { from: "geometry", to: "triangles" },
      { from: "geometry", to: "quadrilaterals" },
      { from: "geometry", to: "circle" },
      { from: "geometry", to: "polyhedra" },
      { from: "geometry", to: "rotation" },
    ],
  },
};

export function getMindMapData(cardId: string): MindMapData | undefined {
  return mindMapData[cardId];
}
