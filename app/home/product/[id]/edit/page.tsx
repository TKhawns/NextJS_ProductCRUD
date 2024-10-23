import { fetchProducts } from "@/app/database/data";
import Form from "../../../../ui/create_form";

export default async function EditPage(props: { params: Promise<{ id: string }> }) {
    const products = await fetchProducts();
    console.log(products);
    const params = await props.params;
    const id_find = params.id;
    const filterListProduct = products.filter((item) => item.product_id === id_find)
    console.log(filterListProduct);
    return (
        <div>
            <Form isEdit={true} product={filterListProduct[0]} />
        </div>
    );
}