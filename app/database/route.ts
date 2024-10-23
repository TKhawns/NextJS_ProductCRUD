import { db } from "@vercel/postgres";
import { listProducts } from "../home/product/mock_data";

const client = await db.connect();

async function seedCustomers() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        product_id TEXT,
        name text,
        cost text,
        image_url text,
        description text
      );
    `;

  const insertedProducts = await Promise.all(
    listProducts.map(
      (product) => client.sql`
        INSERT INTO products (product_id, name, cost, image_url, description)
        VALUES (${product.id}, ${product.name}, ${product.cost}, ${product.image_url}, ${product.description})
       ;
      `,
    ),
  );

  return insertedProducts;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedCustomers();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error });
  }
}
