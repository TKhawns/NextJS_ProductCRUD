'use server';
import { v4 } from "uuid";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const FormSchema = z.object({
    product_id: z.string(),
    name: z.string(),
    cost: z.string(),
    image_url: z.string(),
    description: z.string(),
  });

const CreateProduct = FormSchema.omit({product_id: true});

export async function createProduct(formData: FormData) {
  const {name, cost, image_url, description} = CreateProduct.parse({
    name: formData.get('name'),
    cost: formData.get('cost'),
    image_url: formData.get('image_url'),
    description: formData.get('description')
  });
  const product_id = v4();

  // Check if product have existed
  const duplicated = await sql`
  SELECT p.name FROM products p
  WHERE p.name = ${name};
  `
  if (duplicated.rowCount !== 0) {
    return { message: 'Duplicated product'}
  }
  else {
    try {
      await sql`
            INSERT INTO products (product_id, name, cost, image_url, description)
            VALUES (${product_id}, ${name}, ${cost}, ${image_url}, ${description});`;
    } catch(e) {
      return { message: "Failed to create product" };

    }
    revalidatePath('/home/product');
    redirect('/home/product');
  }
}

const UpdateProduct = FormSchema.omit({});

export async function updateProduct(formData: FormData) {
    const {product_id, name, cost, image_url, description} = UpdateProduct.parse({
      product_id: formData.get('product_id'),
      name: formData.get('name'),
      cost: formData.get('cost'),
      image_url: formData.get('image_url'),
      description: formData.get('description')
    });
    
    try {
      await sql`
      UPDATE products
      SET name = ${name}, cost = ${cost}, image_url = ${image_url}, description = ${description}
      WHERE product_id = ${product_id}; `;
    } catch (error) {
      console.log(error)
      return {
        message: "error update"
      }
    }  
    revalidatePath('/home/product');
    redirect('/home/product');  
  }

  export async function deleteProduct(product_id: string) {
    await sql`
    DELETE FROM products
    WHERE product_id = ${product_id}; `;
  
    revalidatePath('/home/product');  
  }