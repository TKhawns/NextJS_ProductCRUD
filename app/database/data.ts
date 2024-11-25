import { sql } from "@vercel/postgres";
import { Product } from "./model";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProducts(token: string) {
  console.log("Test apiUrl from products: ", apiUrl);
  try {
    const res = await fetch(`${apiUrl}/user/product-list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // const res = await fetch("/api/products", {
    //   method: "GET",
    // });
    const temp = await res.json();
    console.log(temp);
    return temp;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function fetchFilterProduct(queryColor: string[], token: string) {
  const errorData = await fetchProducts(token);
  if (queryColor.length === 0) {
    return errorData;
  }
  try {
    console.log(JSON.stringify({ colorIds: queryColor }));
    const res = await fetch("http://localhost:8080/user/product-filter", {
      method: "POST",
      body: JSON.stringify({ colorIds: queryColor }),
    });
    console.log(res);
    // Test return []
    return errorData;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetColors(accessToken: string) {
  try {
    // const res = await fetch("/api/colors", {
    //   method: "GET",
    // });
    const res = await fetch(`${apiUrl}/user/color-list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
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
