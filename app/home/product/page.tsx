import { fetchProducts } from "@/app/database/data";
import { CreateProduct } from "../../ui/crud_button";
import Search from "../../ui/search";
import Product from "@/app/ui/product_ui";
import { FormattedProduct } from "@/app/lib/mapping";
import { validateToken } from "@/app/database/validate_token";

export default async function Productpage(props: {
  searchParams?: Promise<{
    query?: string;}>;
}) {

    // const searchParams = await props.searchParams;
    // const query = searchParams?.query;

    const  isValidated = await validateToken();
    let products;

    if (isValidated) {
      products = await fetchProducts() ;
    }
    

  //   if (query) {
  //     products = await fetchSearchProduct(query);

  //   }

    return (
      <div className="w-full h-5/6">
        <div className="flex w-full items-center justify-between">
          <h1 className={`text-2xl`}>All products</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search product..."  />
          <CreateProduct/>
        </div>
        <div className="w-full h-full overflow-y-auto grid grid grid-cols-3 gap-10 my-10">
          {products.map((product: FormattedProduct) => <Product key={product.id} products={product}/> )}
        </div>
      </div>
    );
  }