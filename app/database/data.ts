"use server";

import { sql } from "@vercel/postgres";
import { Product } from "./model";
import { cookies } from "next/headers";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProducts() {
  console.log("Test apiUrl from products: ", apiUrl);
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value as string;

  try {
    const res = await fetch("http://localhost:8080/user/product-list", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("Test response res: ", res);
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
    console.log(res);
    // Test return []
    return errorData;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetColors() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value as string;
  try {
    const res = await fetch(`${apiUrl}/user/color-list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
