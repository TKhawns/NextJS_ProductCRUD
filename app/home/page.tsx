import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default async function Homepage() {
  return (
    <h1 className={"mb-4 text-xl md:text-2xl"}>
      <div className="py-10">NextJS App router</div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center gap-10">
          <CheckCircleIcon className="pointer-events-none h-[20px] w-[20px] text-green-900 peer-focus:text-gray-900" />
          <div className="text-xl">Login, logout</div>
        </div>
        <div className="flex flex-row items-center gap-10">
          <CheckCircleIcon className="pointer-events-none h-[20px] w-[20px] text-green-900 peer-focus:text-gray-900" />
          <div className="text-xl">Hiển thị danh sách sản phẩm</div>
        </div>
        <div className="flex flex-row items-center gap-10">
          <CheckCircleIcon className="pointer-events-none h-[20px] w-[20px] text-green-900 peer-focus:text-gray-900" />
          <div className="text-xl">Thêm, sửa, xoá sản phẩm</div>
        </div>
      </div>
    </h1>
  );
}
