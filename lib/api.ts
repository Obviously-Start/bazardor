"use cache";

const BASE_URL =
  "https://api.api-store.workers.dev/api/bazardor";

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Products fetch failed");
  }

  return response.json();
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error("Categories fetch failed");
  }

  return response.json();
}

export async function getProduct(id: string | number) {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Product fetch failed");
  }

  return response.json();
}

export async function getCategory(slug: string) {
  const response = await fetch(`${BASE_URL}/categories/${slug}`);

  if (!response.ok) {
    throw new Error("Category fetch failed");
  }

  return response.json();
}