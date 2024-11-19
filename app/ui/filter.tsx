"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProducts } from "../database/data";

interface Color {
  id: string;
  color: string;
}

export default function Filter({ colors }: { colors: Color[] }) {
  // colors parameter here is all list colors from database.
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Initialize selected colors from URL params when component mounts
  useEffect(() => {
    const colorParams =
      searchParams.get("colors")?.split(",").filter(Boolean) || [];
    setSelectedColors(colorParams);
  }, [searchParams]);

  useEffect(() => {
    if (selectedColors.length > 0) {
      handleFilterSubmit(colors);
    }
  }, [selectedColors]);

  async function handleFilterSubmit(colors: Color[]) {
    const selectedIds = selectedColors
      .map((colorName) => {
        const colorObj = colors.find((c) => c.color === colorName);
        return colorObj?.id;
      })
      .filter(Boolean);
    console.log("Test selectedIds: ", selectedIds);
    // Fetch products by id of colors instead get all products.
    return fetchProducts();
  }

  function handleFilter(term: string, checked: boolean) {
    const params = new URLSearchParams(searchParams);
    const existingColors = params.get("colors")?.split(",") || [];

    let newColors = [...existingColors];
    if (checked) {
      if (!newColors.includes(term)) {
        newColors.push(term);
      }
    } else {
      newColors = newColors.filter((color) => color !== term);
    }

    if (newColors.length > 0) {
      params.set("colors", newColors.join(","));
      setSelectedColors(newColors);
    } else {
      params.delete("colors");
      setSelectedColors([]);
    }

    replace(`${pathname}?${params}`);
  }

  return (
    <div className="flex gap-4 mb-4">
      {colors.map((color: Color) => (
        <label key={color.id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className={"form-checkbox h-4 w-4"}
            checked={selectedColors.includes(color.color.toLowerCase())}
            onChange={(e) =>
              handleFilter(color.color.toLowerCase(), e.target.checked)
            }
          />
          <span>{color.color}</span>
        </label>
      ))}

      <button
        className="w-[100px] flex h-10 ml-5 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        onClick={() => handleFilterSubmit(colors)}
      >
        Filter
      </button>
    </div>
  );
}
