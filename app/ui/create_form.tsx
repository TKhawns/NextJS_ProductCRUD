"use client";
import {DocumentChartBarIcon, GlobeAltIcon, Square2StackIcon, WalletIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "./button";
import { FormattedProduct } from "../lib/mapping";
import { createProduct, updateProduct } from "../lib/action";
import { useState } from "react";
import Circleloading from "./circle_loading";

export default function Form({isEdit, product} : {isEdit: boolean, product: FormattedProduct | string}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Bắt đầu loading khi submit form

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      if (isEdit) {
        await updateProduct(formData); // Gọi hàm updateProduct khi isEdit là true
      } else {
        await createProduct(formData); // Gọi hàm createProduct khi isEdit là false
      }
    } catch (error) {
      console.error("Error during product operation:", error);
    } finally {
      setLoading(false); // Kết thúc loading sau khi thực hiện xong
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <input className="hidden" name="product_id" type="text" defaultValue={typeof product === "string" ? "" : product.product_id}></input>
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
                defaultValue={typeof product === "string" ? "" : product.description}
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
                defaultValue={typeof product === "string" ? "" : product.image_url}
              />
              <GlobeAltIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/home/product"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">
            {isEdit ? <>Edit product</> : <>Create product</>} </Button>
      </div>
      {loading && <div className='fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-25 flex justify-center items-center'>
            <Circleloading/>
            </div>
          }
    </form>
  );
}
