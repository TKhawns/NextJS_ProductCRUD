export default function ExpireLink() {
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
