import { fetchProducts, fetColors } from "@/app/database/data";
import { validateToken } from "@/app/database/validate_token";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Products from "./product";

export default async function Productpage() {
  // Check if token is valid
  const isValidated = await validateToken();
  // Fetch products and colors
  const queryClient = new QueryClient();

  if (isValidated) {
    await queryClient.prefetchQuery({
      queryKey: ["products"],
      queryFn: () => fetchProducts(),
    });
    await queryClient.prefetchQuery({
      queryKey: ["colors"],
      queryFn: () => fetColors(),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Products />
    </HydrationBoundary>
  );
}
