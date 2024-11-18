import { fetchProducts } from "@/app/database/data";
import Form from "../../../../ui/create_form";
import { FormattedProduct } from "@/app/lib/mapping";
// import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default async function EditPage(props: {
  params: Promise<{ id: string }>;
}) {
  // const productName = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

  const products = await fetchProducts();
  const params = await props.params;
  const id_find = params.id;

  const filterListProduct = products.filter(
    (item: FormattedProduct) => item.id === id_find
  );

  // const editParam = new URLSearchParams(productName);
  // if (params) {
  //   editParam.set("name", filterListProduct[0].name);
  // } else {
  //   editParam.delete("name");
  // }

  // replace(`${pathname}?${params.toString()}`);

  return (
    <div>
      <Form isEdit={true} product={filterListProduct[0]} />
    </div>
  );
}
