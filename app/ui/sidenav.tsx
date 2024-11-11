import Link from "next/link";

import { PowerIcon } from "@heroicons/react/24/outline";
import NavLinks from "./nav_link";

export default function SideNav() {
  return (
    <div className="flex h-screen flex flex-col md:px-2">
      <div className="flex h-full flex-col px-3 py-4 md:px-2 gap-3">
        <Link
          className="mb-2 flex h-20 items-center justify-center rounded-md bg-blue-600 p-4 md:h-40 text-3xl text-white"
          href="/"
        >
          NextJS
        </Link>
        <NavLinks />
      </div>
      <form>
        <Link
          href={"/login"}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </Link>
      </form>
    </div>
  );
}
