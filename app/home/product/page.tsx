import { fetchProducts, fetColors } from "@/app/database/data";
import { validateToken } from "@/app/database/validate_token";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Products from "./product";
import { cookies } from "next/headers";

export default async function Productpage() {
  // Check if token is valid
  const isValidated = await validateToken();
  // Fetch products and colors
  const queryClient = new QueryClient();
  // Get access token from cookies server side.
  const accessToken =
    (await cookies()).get("accessToken")?.value.toString() || "";

  try {
    if (isValidated && accessToken) {
      await queryClient.prefetchQuery({
        queryKey: ["products"],
        queryFn: () => fetchProducts(accessToken),
      });
      await queryClient.prefetchQuery({
        queryKey: ["colors"],
        queryFn: () => fetColors(accessToken),
      });
    }
  } catch (e) {
    console.log("Error fetching products or colors", e);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Products token={accessToken} />
    </HydrationBoundary>
  );
}
