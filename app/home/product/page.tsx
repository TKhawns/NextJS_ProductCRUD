import { fetchProducts, fetColors } from "@/app/database/data";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Products from "./product";
import { getQueryClient } from "@/app/get-query-client";

export default async function Productpage() {
  const queryClient = getQueryClient();

  try {
    queryClient.prefetchQuery({
      queryKey: ["products"],
      queryFn: async () => {
        const products = await fetchProducts();
        console.log("Debug - Products response:", products); // Debug log
        return products;
      },
    });

    queryClient.prefetchQuery({
      queryKey: ["colors"],
      queryFn: async () => {
        const colors = await fetColors();
        console.log("Debug - Colors response:", colors); // Debug log
        return colors;
      },
    });
  } catch (e) {
    console.error("Error fetching data because of token");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Products />
    </HydrationBoundary>
  );
}
