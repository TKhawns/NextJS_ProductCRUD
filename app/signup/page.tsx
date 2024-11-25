"use client";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { SingupSchema, SingupSchemaType } from "../validate_schema/user_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer } from "react-toastify";
import React from "react";

const listOfCountry = ["City", "Hà Nội", "TP HCM", "Bắc Ninh"];
const defaultCity = "City";
const listOfDistrict = [
  {
    city: "Hà Nội",
    district: ["Select District", "Hà Nội 1", "Hà Nội 2", "Hà Nội 3"],
  },
  {
    city: "TP HCM",
    district: ["Select District", "TP HCM 1", "TP HCM 2", "TP HCM 3"],
  },
  {
    city: "Bắc Ninh",
    district: ["Select District", "Bắc Ninh 1", "Bắc Ninh 2", "Bắc Ninh 3"],
  },
];

export default function Page() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SingupSchemaType>({
    resolver: zodResolver(SingupSchema),
    mode: "all",
  });

  const selectedCity = watch("city") || defaultCity;

  const onSubmit: SubmitHandler<SingupSchemaType> = async () => {
    console.log(selectedCity);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer position="top-left" autoClose={2000} theme="light" />
      <div className="w-screen flex flex-row">
        <div className="w-1/2 h-screen bg-sky-300">
          <div className="h-full font-bold text-3xl flex justify-center items-center">
            Project NextJS
          </div>
        </div>

        <div className="w-1/2 h-creen flex px-10 justify-center items-center">
          <div className="w-full h-creen flex flex-col gap-6 px-10 justify-center text-left">
            <div className="text-3xl font-bold text-left">Signup</div>
            <input
              className="peer block w-2/3 rounded-md border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-[14px]">
                {errors.email.message}
              </span>
            )}
            <input
              className="peer block w-2/3 rounded-md border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-500 text-[14px]">
                {errors.password.message}
              </span>
            )}
            <input
              className="peer block w-2/3 rounded-md border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Confirm password"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-[14px]">
                {errors.confirmPassword.message}
              </span>
            )}

            <div className="w-2/3 flex flex-row justify-between items-center">
              <select
                className="w-1/3 rounded-md border border-black py-1 pl-1"
                defaultValue={defaultCity}
                {...register("city")}
              >
                {listOfCountry.map((item, index) => (
                  <option value={item} key={index} disabled={index === 0}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                className="w-1/3 rounded-md border border-black py-1 pl-1"
                disabled={selectedCity === defaultCity}
                {...register("district")}
              >
                {selectedCity !== defaultCity &&
                  listOfDistrict
                    .filter((item) => item.city === selectedCity)
                    .map((filter_item) =>
                      filter_item.district.map((result, index) => (
                        <option
                          value={result}
                          key={index}
                          disabled={index === 0}
                          selected={index === 0}
                        >
                          {result}
                        </option>
                      ))
                    )}
              </select>
              {errors.district && (
                <span className="text-red-500 text-[14px]">
                  {errors.district.message}
                </span>
              )}
            </div>
            {errors.city && (
              <span className="text-red-500 text-[14px]">
                {errors.city.message}
              </span>
            )}

            <button className="text-center flex h-10 w-2/3 items-center justify-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
              {isSubmitting ? "Signing" : "Sign up"}
            </button>

            <div className="content-start text-sm flex flex-row gap-6">
              <div>Have an account?</div>
              <Link href={"/login"} className="text-red-500">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
