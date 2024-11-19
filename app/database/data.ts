import { sql } from "@vercel/postgres";
import { Product } from "./model";

export async function fetchProducts() {
  try {
    const res = await fetch("/api/products", {
      method: "GET",
    });
    const temp = await res.json();
    return temp;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function fetchFilterProduct(queryColor: string[]) {
  const errorData = await fetchProducts();
  if (queryColor.length === 0) {
    return errorData;
  }
  try {
    console.log(JSON.stringify({ colorIds: queryColor }));
    const res = await fetch("http://localhost:8080/user/product-filter", {
      method: "POST",
      body: JSON.stringify({ colorIds: queryColor }),
    });
    // Test return []
    return errorData;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetColors() {
  try {
    const res = await fetch("/api/colors", {
      method: "GET",
    });
    const temp = await res.json();
    return temp;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchSearchProduct(query: string) {
  try {
    const data =
      await sql<Product>`SELECT * FROM products p WHERE p.name LIKE ${`%${query}%`}`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
