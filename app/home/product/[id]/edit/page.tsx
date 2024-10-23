import Form from "../../../../ui/create_form";
import { listProducts } from "../../mock_data";

export default async function EditPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id_find = params.id;
    var filterListProduct = listProducts.filter((item) => item.id === id_find)
    console.log(filterListProduct);
    return (
        <div>
            <Form isEdit={true} product={filterListProduct[0]} />
        </div>
    );
}