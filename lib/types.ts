export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type ProductChange = {
  dir: "up" | "down" | "flat";
  pct: number;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: ProductChange;
  markets: Market[];
};