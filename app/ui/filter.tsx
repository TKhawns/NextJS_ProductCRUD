"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProducts } from "../database/data";

interface Color {
  id: string;
  color: string;
}

export default function Filter({ colors }: { colors: Color[] }) {
  console.log("Test colors 1: ", colors);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Initialize selected colors from URL params when component mounts
  useEffect(() => {
    const colorParams = searchParams.get("colors")?.split(",") || [];
    setSelectedColors(colorParams);

    // If there are colors in URL, trigger initial filter
    if (colorParams.length > 0) {
      handleFilterSubmit(colors);
    }
  }, [colors]);

  async function handleFilterSubmit(colors: Color[]) {
    console.log("Test colors 2: ", colors);
    const selectedIds = selectedColors
      .map((colorName) => {
        const colorObj = colors.find(
          (c) => c.color.toLowerCase() === colorName
        );
        return colorObj?.id;
      })
      .filter(Boolean);
    console.log("Test selectedIds: ", selectedIds);
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
            className={`form-checkbox h-4 w-4 text-${color.color.toLowerCase()}-600`}
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
