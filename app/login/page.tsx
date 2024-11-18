"use client";
import Link from "next/link";
import { loginUser } from "../lib/action";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "../validate_schema/user_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: "all",
  });

  const mutation = useMutation({
    mutationFn: (data: LoginSchemaType) => loginUser(data),
    onSuccess: (response) => {
      toast.success("Login successful!");
      // Optionally redirect after successful login
      router.push("/home/product");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Login failed");
    },
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    mutation.mutate(data);
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
            <div className="text-3xl font-bold text-left">Login</div>
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

            <div className="content-start text-sm">Forgot your password?</div>

            <button
              disabled={mutation.isPending}
              className="text-center flex h-10 w-2/3 items-center justify-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            >
              {mutation.isPending ? "Logging in..." : "Login"}
            </button>

            <div className="content-start text-sm flex flex-row gap-6">
              <div>Don&apos;t have an account?</div>
              <Link href={"/signup"} className="text-red-500">
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
