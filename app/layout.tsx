
import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

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
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "10px",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#008f3d",
                secondary: "#ffffff",
              },
            },
          }}
        />

        <Suspense
          fallback={
            <div className="h-16 border-b border-base-300 bg-base-100" />
          }
        >
          <Navbar categories={categories} />
        </Suspense>

        <Ticker products={products} />

        {children}
      </body>
    </html>
  );
}

