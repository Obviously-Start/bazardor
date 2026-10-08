import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";

import { getCategories, getProducts } from "@/lib/api";
import { Category, Product } from "@/lib/types";

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories: Category[] = await getCategories();
  const products: Product[] = await getProducts();

  return (
    <html lang="bn">
      <body>
        <Navbar categories={categories} />

        <Ticker products={products} />

        {children}
      </body>
    </html>
  );
}