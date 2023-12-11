import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function ShowTime({ time }) {
  return (
    <div className=" w-max text-tickitz-label font-semibold text-xs ">
      <p>{time}</p>
    </div>
  );
}

export default function CardBrand({
  id,
  name,
  address,
  image,
  price,
  showtime,
}) {
  const router = useRouter();
  const handleRoute = () => {
    router.push(`/order/${id}`);
  };
  return (
    <>
      <div className=" bg-white w-[23.813rem] h-[21.875rem] rounded-lg py-6">
        <div className=" flex flex-col pb-6 px-8">
          <div className=" flex justify-between items-center ">
            <div className=" flex w-[6.68rem]">
              <Image
                src={image}
                alt="ebv.id"
                width={106}
                height={106}
                className=" object-cover "
              />
            </div>
            <div className="flex flex-col gap-1 w-[10.125rem] flex-wrap">
              <div className=" font-semibold text-2xl leading-8">
                <p>{name}</p>
              </div>
              <div className=" text-sm text-tickitz-label leading-5">
                <p>{address}</p>
              </div>
            </div>
          </div>
        </div>
        <hr className=" bg-tickitz-label mb-4" />
        <div className=" flex px-8 flex-wrap gap-8 justify-start text-tickitz-label font-semibold text-xs cursor-pointer">
          {showtime}
        </div>
        <div className=" flex justify-between px-8 pt-6 pb-8">
          <div className=" text-base text-[#6B6B6B]">
            <p>Price</p>
          </div>
          <div className=" font-semibold text-base">
            <p>Rp.{price}/seat</p>
          </div>
        </div>
        <div className=" flex px-8 justify-between items-center">
          <button
            className="w-[8.375rem] h-10 shadow-sm shadow-tickitz-primary bg-tickitz-primary text-sm text-white font-bold rounded-md hover:bg-tickitz-primary"
            onClick={handleRoute}>
            Book now
          </button>
          <p className=" font-bold text-tickitz-primary text-base">
            Add to cart
          </p>
        </div>
      </div>
    </>
  );
}
