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
  const queryClient = new QueryClient();

  // Get access token from cookies server side.
  const cookieStore = cookies();
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJhMDA0NzczLTI5ZjYtNGRhMC1hNWNhLTVmMjdiYjRlYTRiNyIsImVtYWlsIjoiZXhhbXBsZUBnbWFpbC5jb20iLCJpYXQiOjE3MzI1MjY4ODEsImV4cCI6MTczMjUzMDQ4MX0.btzqv3vizuzmyf7oZasKZXe_yZckWtGqOjBkvl0-scs";
  console.log("Debug - Access Token:", accessToken); // Debug log

  try {
    // if (isValidated && accessToken) {
    // Add check for accessToken
    console.log("Debug - API URL:", process.env.NEXT_PUBLIC_API_URL); // Debug log

    await queryClient.prefetchQuery({
      queryKey: ["products"],
      queryFn: async () => {
        const products = await fetchProducts(accessToken);
        console.log("Debug - Products response:", products); // Debug log
        return products;
      },
    });

    await queryClient.prefetchQuery({
      queryKey: ["colors"],
      queryFn: async () => {
        const colors = await fetColors(accessToken);
        console.log("Debug - Colors response:", colors); // Debug log
        return colors;
      },
    });
    // } else {
    //   console.log("Debug - Not validated or no access token"); // Debug log
    // }
  } catch (e) {
    console.error("Error fetching data:", {
      error: e,
      accessToken: accessToken ? "exists" : "missing",
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Products
        token={
          accessToken ||
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJhMDA0NzczLTI5ZjYtNGRhMC1hNWNhLTVmMjdiYjRlYTRiNyIsImVtYWlsIjoiZXhhbXBsZUBnbWFpbC5jb20iLCJpYXQiOjE3MzIwNzUyOTMsImV4cCI6MTczMjA3ODg5M30.hRJ_KoP1XTc6AyFV5Y1lx8aYHHMaHpQ5NmzmKxoEQqc"
        }
      />
    </HydrationBoundary>
  );
}
