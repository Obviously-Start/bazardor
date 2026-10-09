"use cache";

const BASE_URL =
  "https://api.abcz.workers.dev/api/bazardor";

export async function getProducts() {
  const response = await fetch(
    `${BASE_URL}/products`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Products fetch failed: ${response.status}`
    );
  }

  return response.json();
}

export async function getCategories() {
  const response = await fetch(
    `${BASE_URL}/categories`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Categories fetch failed: ${response.status}`
    );
  }

  return response.json();
}

export async function getProduct(
  id: string | number
) {
  const response = await fetch(
    `${BASE_URL}/products/${id}`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Product fetch failed: ${response.status}`
    );
  }

  return response.json();
}

export async function getCategory(
  slug: string
) {
  const response = await fetch(
    `${BASE_URL}/categories/${slug}`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Category fetch failed: ${response.status}`
    );
  }

  return response.json();
}

export async function getProductBySlug(
  slug: string
) {
  const products = await getProducts();

  return products.find(
    (product: { slug: string }) =>
      product.slug === slug
  );
}