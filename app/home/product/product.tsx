"use client";
import { fetchProducts, fetColors } from "@/app/database/data";
import { FormattedProduct } from "@/app/lib/mapping";
import { CreateProduct } from "@/app/ui/crud_button";
import Filter from "@/app/ui/filter";
import Product from "@/app/ui/product_ui";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function Products() {
  // Use react-query to fetch products and colors.
  const { data: productData, isLoading: productLoading } = useSuspenseQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });
  const { data: colorData, isLoading: colorLoading } = useSuspenseQuery({
    queryKey: ["colors"],
    queryFn: () => fetColors(),
  });

  if (productLoading) {
    return <div className="text-red">Loading...</div>;
  }
  return (
    <div className="w-full h-5/6">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>All products</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {!colorLoading && <Filter colors={colorData} />}

        <CreateProduct />
      </div>
      <div className="w-full h-full overflow-y-auto grid grid grid-cols-3 gap-10 my-10">
        {productData.map((product: FormattedProduct) => (
          <Product key={product.id} products={product} />
        ))}
      </div>
    </div>
  );
}
