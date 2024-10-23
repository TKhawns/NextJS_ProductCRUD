import { CreateProduct } from "../../ui/crud_button";
import Product from "../../ui/product_ui";
import Search from "../../ui/search";
import { listProducts } from "./mock_data";

export default function Homepage() {
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
          {listProducts.map((product, index) => <Product key={index} products={product}/> )}
        </div>
      </div>
    );
  }