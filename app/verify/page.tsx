"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Listen for storage events from other tabs
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "emailVerified" && event.newValue === "true") {
        router.push("/home/product");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [router]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-[28rem] p-10 bg-white rounded-2xl shadow-xl border border-indigo-50">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-900">
          Email Verification
        </h2>
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-gray-700 text-lg">
            We have sent a verification email to your inbox.
          </p>
          <p className="text-gray-600">
            Please check your email and click the verification link to complete
            the login process.
          </p>
          <div className="mt-8 text-sm">
            <button className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200">
              Didn&apos;t receive the email? Click to resend
            </button>
            <p className="text-gray-500 mt-2">
              Remember to check your spam folder
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
