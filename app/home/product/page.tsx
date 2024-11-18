import { fetchProducts, fetColors } from "@/app/database/data";
import { validateToken } from "@/app/database/validate_token";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Products from "./product";

export default async function Productpage(props: {
  searchParams?: Promise<{
    query?: string;
    colors?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const queryColor = searchParams?.colors?.split(",") || [];
  console.log("Test queryColor: ", queryColor);

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
