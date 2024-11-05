import { fetchProducts } from "@/app/database/data";
import Form from "../../../../ui/create_form";
import { FormattedProduct } from "@/app/lib/mapping";

export default async function EditPage(props: { params: Promise<{ id: string }> }) {
    const products = await fetchProducts();

    const params = await props.params;
    const id_find = params.id;
    const filterListProduct = products.filter((item: FormattedProduct) => item.id === id_find)

    return (
        <div>
            <Form isEdit={true} product={filterListProduct[0]} />
        </div>
    );
}