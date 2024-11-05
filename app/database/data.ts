import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { Product } from "./model";

export async function fetchProducts() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value.toString();
    try {
       const res = await fetch("http://localhost:8080/user/product-list", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',

        },
      })
      // const temp = await res.json();
      // console.log("Result", temp);
      // const data = await sql<Product>`SELECT * FROM products`;
      const temp = await res.json();
      return temp;

    } catch (error) {
      console.log(error);
      return [];
    }
}

export async function fetchSearchProduct(query: string) {
    try {
      const data = await sql<Product>`SELECT * FROM products p WHERE p.name LIKE ${`%${query}%`}`;
      return data.rows;

    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch revenue data.');
    }
}