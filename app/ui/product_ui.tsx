"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import { FormattedProduct } from "../lib/mapping";
import { EditProduct } from "./crud_button";
import { useState, useTransition } from "react";
import { deleteProduct } from "../lib/action";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Product({ products }: { products: FormattedProduct }) {
  const colorParam = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [openModal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!openModal);
  };

  // Server action useTransition
  const [pending, startTransition] = useTransition();
  const handleDelete = (product_id: string) => {
    startTransition(async () => {
      deleteProduct(product_id);
    });
  };

  const handleChangeColor = (choice: string, productName: string) => {
    const params = new URLSearchParams(colorParam);
    if (choice) {
      params.set("name", productName);
      params.set("color", choice);
    } else {
      params.delete("name");
      params.delete("color");
    }

    replace(`${pathname}?${params.toString()}`);
    console.log(choice);
  };

  return (
    <div className="w-80 h-auto max-h-[300px] bg-gray-100 rounded-xl flex flex-col gap-3">
      <div className="flex flex-col justify-center items-center text-left py-2">
        <div className="w-full flex flex-row px-5">
          <img
            className="w-20 h-20 rounded-xl object-cover overflow-hidden"
            src={products.url_image}
          />
          <div className="pl-10 flex flex-col items-start justify-center font-bold">
            <div className="text-gray">{products.name}</div>
            <div className="text-sky-800">{products.cost}</div>
          </div>
        </div>
      </div>
      <div className="text-gray font-bold px-5">Summary</div>
      <div className="text-gray grow font-normal px-5">
        {products.description}
      </div>
      <div className="flex flex-row w-full justify-center items-center gap-10 py-5">
        <EditProduct id={products.id} />
        <button
          onClick={handleModal}
          className="rounded-md border p-2 hover:bg-sky-100"
        >
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-6" />
        </button>
      </div>
      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-25 flex justify-center items-center">
          <div className="min-w-[460px] bg-white py-4 rounded-xl">
            <h2 className="font-bold text-black-900 py-3 px-4 mb-4 text-xl">
              Delete product!
            </h2>
            <div className="px-4 pb-4">
              <p className="font-medium text-gray-700">
                Do you want to delete this product?
              </p>
            </div>
            <div className="border-t border-gray-300 px-4 pt-3 flex flex-row gap-5">
              <div className="flex grow"></div>
              <button
                type="button"
                disabled={pending}
                className="h-8 px-2 text-sm rounded-md bg-blue-600 text-white min-w-[100px] disabled:opacity-30"
                onClick={handleModal}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={pending}
                className="h-8 px-2 text-sm rounded-md bg-red-700 text-white min-w-[100px] disabled:opacity-30"
                onClick={() => handleDelete(products.id)}
              >
                {pending ? "Deleting" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
