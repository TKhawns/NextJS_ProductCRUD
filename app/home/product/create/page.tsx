import Form from "../../../ui/create_form";
import { emptyProduct } from "../mock_data";

export default function CreatePage() {
    return (
        <div>
            <Form isEdit={false} product={""}/>
        </div>
    );
}