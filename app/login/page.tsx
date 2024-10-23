import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="w-screen flex flex-row">
            <div className="w-1/2 h-screen bg-sky-300">
                <div className="h-full font-bold text-3xl flex justify-center items-center">Project NextJS</div>
            </div>

            <div className="w-1/2 h-creen flex px-10 justify-center items-center">
                <div className="w-full h-creen flex flex-col gap-6 px-10 justify-center text-left">
                    <div className="text-3xl font-bold text-left">Login</div>
                    <input
                        className="peer block w-2/3 rounded-md border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        placeholder="Email"
                    />
                    <input
                        className="peer block w-2/3 rounded-md border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        placeholder="Password"
                    />
                    <div className="content-start text-sm">Forgot your password?</div>
                    <Link className= 'text-center flex h-10 w-2/3 items-center justify-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50' href={"/home"}>Login</Link>
                    <div className="content-start text-sm flex flex-row gap-6">
                        <div>Don't have an account?</div>
                        <Link href={"/"} className="text-red-500">Signup</Link>
                    </div>

                </div>
            </div>
           
        </div>
    );
}

