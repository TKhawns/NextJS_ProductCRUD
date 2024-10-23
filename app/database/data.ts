import { sql } from "@vercel/postgres";
import { Product } from "./model";

export async function fetchProducts() {
    try {
      const data = await sql<Product>`SELECT * FROM products;`;
      console.log(data);
      return data.rows;
      

    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch revenue data.');
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