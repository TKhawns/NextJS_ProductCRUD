"use client";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const expires = searchParams.get("expires");
  const email = searchParams.get("email");

  console.log("Expires:", expires);
  console.log("Email:", email);

  const expirationTime = parseInt(expires ?? "0");
  if (Date.now() > expirationTime) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="w-[28rem] p-10 bg-white rounded-2xl shadow-xl border border-indigo-50">
          <h2 className="text-2xl font-bold text-center mb-6 text-indigo-900">
            Link Expired
          </h2>
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <svg
                className="w-16 h-16 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-gray-700 text-lg">
              This verification link has expired.
            </p>
            <p className="text-gray-600">
              Please request a new verification link to complete the process.
            </p>
            <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Request New Link
            </button>
          </div>
        </div>
      </div>
    );
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
          <a
            href="http://localhost:3000/home"
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-xl flex justify-center items-center font-semibold hover:bg-indigo-700 transform transition-all duration-200 hover:scale-[1.02] shadow-md hover:shadow-lg"
          >
            Verify Email
          </a>
          <button className="w-full py-3 px-4 bg-white text-indigo-600 rounded-xl font-semibold border-2 border-indigo-100 hover:bg-indigo-50 transform transition-all duration-200 hover:border-indigo-200">
            Cancel Verification
          </button>
        </div>
      </div>
    </div>
  );
}
