"use client";
import { useSearchParams } from "next/navigation";
import ExpireLink from "./expire_link";
import { useTransition } from "react";
import { loginUserGoogle } from "../lib/action";

export default function Page() {
  const searchParams = useSearchParams();
  const expires = searchParams.get("expires");
  const email = searchParams.get("email");

  console.log("Expires:", expires);
  console.log("Email:", email);

  const expirationTime = parseInt(expires ?? "0");

  const [pending, startTransition] = useTransition();

  const handleLoginByGoogle = () => {
    if (Date.now() > expirationTime) {
      return <ExpireLink />;
    }
    console.log("Start login by Google");
    startTransition(async () => {
      await loginUserGoogle({
        email: email ?? "",
        password: "loginbygoogle",
      });
    });
  };

  if (Date.now() > expirationTime) {
    return <ExpireLink />;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-[28rem] p-10 bg-white rounded-2xl shadow-xl border border-indigo-50">
        <h2 className="text-2xl font-bold text-center mb-8 text-indigo-900">
          Email Verification for {email}
        </h2>
        <div className="flex justify-center mb-8">
          <svg
            className="w-16 h-16 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleLoginByGoogle}
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-xl flex justify-center items-center font-semibold hover:bg-indigo-700 transform transition-all duration-200 hover:scale-[1.02] shadow-md hover:shadow-lg"
          >
            {pending ? "Logging in" : "Verify Email"}
          </button>
          <button className="w-full py-3 px-4 bg-white text-indigo-600 rounded-xl font-semibold border-2 border-indigo-100 hover:bg-indigo-50 transform transition-all duration-200 hover:border-indigo-200">
            Cancel Verification
          </button>
        </div>
      </div>
    </div>
  );
}
