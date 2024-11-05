'use client'
import Link from "next/link";
import { useActionState, useState } from "react";
import { loginUser } from "../lib/action";

export default function LoginPage() {

    interface InputData {
        email: string | '',
        password: string | ''
      }
    const [inputData, setInputData] = useState<InputData|null>();

    const loginHandler = async (_previousState: string, formData: FormData) => {
        try {
            const response = await loginUser(formData);
            return response;

        } catch (error) {
            console.log(error);
            return "Đăng nhập thất bại!";
        }
    };
    const [state, loginAction, isPendding] = useActionState(loginHandler, "null");

    return (
        <form action={loginAction}>
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
                        name="email"
                        onChange={(e) => setInputData({...inputData, email: e.target.value} as InputData)}
                        value={(state.message !== "null" ? inputData?.email : '') || ''}
                    />
                    <input
                        className="peer block w-2/3 rounded-md border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={(e) => setInputData({...inputData, password: e.target.value} as InputData)}
                        value={(state.message !== "null" ? inputData?.password : '') || ''}
                    />
                    <div className="content-start text-sm">Forgot your password?</div>

                    {(state != "null") ? <p className="text-red-500">{state as string}</p> : <p></p>}

                    <button disabled={isPendding} className= "text-center flex h-10 w-2/3 items-center justify-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                    >{isPendding ? "Logging" : "Login"}</button>

                    <div className="content-start text-sm flex flex-row gap-6">
                        <div>Don&apos;t have an account?</div>
                        <Link href={"/"} className="text-red-500">Signup</Link>
                    </div>

                </div>
            </div>
        </div>
        </form>
    );
}

