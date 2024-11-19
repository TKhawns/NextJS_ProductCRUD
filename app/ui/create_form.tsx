"use client";
import {
  DocumentChartBarIcon,
  GlobeAltIcon,
  Square2StackIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "./button";
import { FormattedProduct } from "../lib/mapping";
import { createProduct } from "../lib/action";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Common component for create and edit product, have 2 props: isEdit and product to handle
interface InputData {
  name: string;
  description: string;
  cost: string;
  image_url: string;
}
export default function Form({
  isEdit,
  product,
}: {
  isEdit: boolean;
  product: FormattedProduct | string;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const productName = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [inputData, setInputData] = useState<InputData | null>();

  const { mutate: createMutation, isPending: createPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const result = await createProduct(data);
      console.log("Test result of create: ", result);
      if (result !== "") {
        throw new Error(result);
      }
      return result;
    },
    onSuccess: async () => {
      toast.success("Product created successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/home/product");
    },
    onError: () => {
      toast.error("Failed to create product");
    },
  });

  useEffect(() => {
    const editParam = new URLSearchParams(productName);
    typeof product === "string"
      ? editParam.delete("name")
      : editParam.set("name", product.name);

    replace(`${pathname}?${editParam.toString()}`);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createMutation(formData);
    // if (isEdit) {
    //   updateMutation.mutate(formData);
    // }
  };

  // const submitHandler = async (_previousState: object, formData: FormData) => {
  //   try {
  //     let response;
  //     if (!isEdit) {
  //       response = await createProduct(formData);
  //     }
  //     if (isEdit) {
  //       response = await updateProduct(formData);
  //     }
  //     return { response };
  //   } catch (error) {
  //     return { error };
  //   }
  // };

  // const [state, submitAction, isPending] = useActionState(submitHandler, {
  //   error: null,
  // });

  return (
    <form /*action={submitAction}*/ onSubmit={handleSubmit}>
      <ToastContainer position="top-left" autoClose={2000} theme="light" />

      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <input
          className="hidden"
          name="product_id"
          type="text"
          defaultValue={typeof product === "string" ? "" : product.id}
        ></input>
        <div className="mb-4">
          <label htmlFor="product" className="mb-2 block text-sm font-medium">
            Product name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter product name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={typeof product === "string" ? "" : product.name}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    name: e.target.value,
                  } as InputData)
                }
                value={inputData?.name}
              />
              <Square2StackIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Description field */}
        <div className="mb-4">
          <label htmlFor="product" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Enter description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={
                  typeof product === "string" ? "" : product.description
                }
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    description: e.target.value,
                  } as InputData)
                }
                value={inputData?.description}
              />
              <DocumentChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Cost field */}
        <div className="mb-4">
          <label htmlFor="product" className="mb-2 block text-sm font-medium">
            Cost
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cost"
                name="cost"
                type="text"
                placeholder="Enter cost"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={typeof product === "string" ? "" : product.cost}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    cost: e.target.value,
                  } as InputData)
                }
                value={inputData?.cost}
              />
              <WalletIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Image field */}
        <div className="mb-4">
          <label htmlFor="product" className="mb-2 block text-sm font-medium">
            Image URL
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="imageUrl"
                name="image_url"
                type="text"
                placeholder="Enter image url"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={
                  typeof product === "string" ? "" : product.url_image
                }
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    image_url: e.target.value,
                  } as InputData)
                }
                value={inputData?.image_url}
              />
              <GlobeAltIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/home/product"
          aria-disabled={createPending}
          className="aria-disabled:opacity-30 flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        {isEdit ? (
          <Button isDisable={createPending}>
            {createPending ? "Editting" : "Edit"}
          </Button>
        ) : (
          <Button isDisable={createPending}>
            {createPending ? "Creating" : "Create"}
          </Button>
        )}
      </div>
    </form>
  );
}
