"use server";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LoginSchemaType } from "../validate_schema/user_schema";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const FormSchema = z.object({
  product_id: z.string(),
  name: z.string(),
  cost: z.string(),
  image_url: z.string(),
  description: z.string(),
});

const CreateProduct = FormSchema.omit({ product_id: true });

export async function createProduct(formData: FormData) {
  const { name, cost, image_url, description } = CreateProduct.parse({
    name: formData.get("name"),
    cost: formData.get("cost"),
    image_url: formData.get("image_url"),
    description: formData.get("description"),
  });
  try {
    const res = await fetch("http://localhost:8080/user/create-product", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        cost: parseInt(cost as string),
        url_image: image_url,
        description: description,
      }),
    });

    const result = await res.json();
    console.log("Test result: ", result);
    if (result.statusCode) {
      return result.message;
    }
    return "";
  } catch (error) {
    console.log(error);
    return { message: "Failed to create product" };
  }
  // finally {
  //   if (status === "") {
  //     // revalidatePath("/home/product");
  //     // redirect("/home/product");
  //   }
  // }
}

const UpdateProduct = FormSchema.omit({});

export async function updateProduct(formData: FormData) {
  const { product_id, name, cost, image_url, description } =
    UpdateProduct.parse({
      product_id: formData.get("product_id"),
      name: formData.get("name"),
      cost: formData.get("cost"),
      image_url: formData.get("image_url"),
      description: formData.get("description"),
    });

  try {
    await sql`
      UPDATE products
      SET name = ${name}, cost = ${cost}, image_url = ${image_url}, description = ${description}
      WHERE product_id = ${product_id}; `;
  } catch (error) {
    console.log(error);
    return {
      message: "error update",
    };
  }
  revalidatePath("/home/product");
  redirect("/home/product");
}

export async function deleteProduct(product_id: string) {
  await sql`
    DELETE FROM products
    WHERE product_id = ${product_id}; `;

  revalidatePath("/home/product");
}

export async function loginUser(loginData: LoginSchemaType) {
  console.log("Test apiUrl: ", apiUrl);
  let status = "";
  try {
    const res = await fetch(`${apiUrl}/user/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
    });

    const result = await res.json();
    // if login fail, statusCode have in response, else null.
    console.log("Test result: ", result);
    if (result.statusCode) {
      status = result.statusCode;
      return result.message;
    }
    setAuthCookie(res);
    return result;
  } catch (e) {
    console.log(e);
    return e as string;
  } finally {
    if (status === "") {
      // redirect("/home/product");
      console.log("Test status: ", status);
    }
  }
}

const setAuthCookie = async (response: Response) => {
  const setCookieHeader = response.headers.get("Set-Cookie");
  const cookieStore = await cookies();

  if (setCookieHeader) {
    const accessToken = setCookieHeader.split(";")[0].split("=")[1];
    const refreshToken = setCookieHeader
      .split("refreshToken")[1]
      .split(";")[0]
      .split("=")[1];

    cookieStore.set({
      name: "accessToken",
      value: accessToken,
      secure: true,
      httpOnly: true,
    });
    cookieStore.set({
      name: "refreshToken",
      value: refreshToken,
      secure: true,
      httpOnly: true,
    });
    console.log("Test set cookie: ", cookieStore);
  }
};
