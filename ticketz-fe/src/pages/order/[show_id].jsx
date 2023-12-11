/* eslint-disable react-hooks/exhaustive-deps */
import { data } from "autoprefixer";
import Footer from "components/Footer";
import Layout from "components/Layout";
import Loader from "components/Loader";
import Navbar from "components/Navbar";
import Seat from "components/Seat/Seat";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { getOrderPage, orderSeat } from "utils/https/seat";

function Order() {
  const controller = useMemo(() => new AbortController(), []);
  const router = useRouter();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState();
  const [seat, setSeat] = useState([]);
  const token = useSelector((state) => state.auth.data.token);
  // console.log(router.query);
  const show_id = router.query.show_id;
  // console.log(idSeat);
  // console.log(seat);
  // console.log(datas);
  let seatIds = "";
  if (datas.length !== 0 && seat.length !== 0) {
    seatIds = datas.details
      .filter((datas) => seat.includes(datas.seat))
      .map((seat) => seat.seat_id);
    // console.log(seatIds);
  }
  // console.log(seatIds);
  const handleCheckout = (e) => {
    e.preventDefault();
    setLoading(true);
    orderSeat(seatIds, token, controller)
      .then((res) => {
        // console.log(res.data.data[0].transaction_id);
        swal("Success", "Order successful", "success");
        setTimeout(() => {
          router.push(`/payment/${res.data.data[0].transaction_id}`);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    getOrderPage(show_id, controller)
      .then(({ data }) => {
        setDatas(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // console.log(datas);
  return (
    <>
      <Layout title={"Order"}>
        {loading && <Loader />}
        <Navbar />
        {datas.length === 0 ? (
          <Loader />
        ) : (
          <main className="global-px py-[3.75rem] mt-16 select-none bg-slate-300/20 px-20">
            <section className="flex flex-col-reverse lg:flex-row w-full gap-6 justify-between">
              <div className="lg:flex-[2]">
                <h1 className="font-bold mb-6 text-2xl text-[#14142B]">
                  Movie Selected
                </h1>
                <div className="flex bg-white justify-between px-4 items-center lg:px-12 py-9 rounded-md">
                  <p className="w-[50%] font-semibold md:text-2xl text-black">
                    {datas.cinema_brand_name}
                  </p>
                  <button
                    onClick={() => router.push("/movies")}
                    className="btn btn-secondary">
                    Change movie
                  </button>
                </div>
                <h1 className="font-bold text-[#14142B] mt-12 mb-6 text-2xl">
                  Choose Your Seat
                </h1>
                <div className=" items-center px-4 lg:px-[7.313rem] py-4 lg:py-[6.625rem] bg-white text-[#4E4B66] rounded-md">
                  <p className="mb-2 text-center font-semibold">Screen</p>

                  <div className="w-full flex flex-col gap-2 mt-6">
                    <Seat
                      setSeat={setSeat}
                      seat={seat}
                      seatHistory={datas.details}
                    />
                  </div>

                  <div className="mt-8">
                    <p className="mb-5 font-semibold text-lg">Seating key</p>
                    <div className="flex justify-between flex-wrap gap-y-4">
                      <div className="flex gap-1 md:gap-4">
                        <div className="w-4 h-4 md:w-6 md:h-6 rounded-md bg-secondary"></div>
                        <p className="text-xs md:text-base">Available</p>
                      </div>
                      <div className="flex gap-1 md:gap-4">
                        <div className="w-4 h-4 md:w-6 md:h-6 rounded-md bg-primary"></div>
                        <p className="text-xs md:text-base">Selected</p>
                      </div>
                      <div className="flex gap-1 md:gap-4">
                        <div className="w-4 h-4 md:w-6 md:h-6 rounded-md bg-info"></div>
                        <p className="text-xs md:text-base">Love nest</p>
                      </div>
                      <div className="flex gap-1 md:gap-4">
                        <div className="w-4 h-4 md:w-6 md:h-6 rounded-md bg-success"></div>
                        <p className="text-xs md:text-base">Sold</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 md:gap-64 md:flex-row justify-between mt-10">
                  <button
                    onClick={() => router.push("/movies")}
                    className="btn btn-primary btn-outline flex-1">
                    Change your movie
                  </button>

                  <button
                    onClick={handleCheckout}
                    disabled={seat.length < 1}
                    className="btn btn-primary flex-1">
                    Checkout now
                  </button>
                </div>
              </div>
              <div className="lg:flex-1">
                <h1 className="font-bold mb-6 text-2xl text-[#14142B]">
                  Order Info
                </h1>
                <div className="flex flex-col items-center px-6 pt-10 bg-white rounded-md">
                  <Image
                    // src={orderRedux.image}
                    src={datas.cinema_image}
                    alt="cineone21"
                    width={100}
                    height={80}
                  />
                  <p className="text-2xl font-semibold text-[#14142B] mt-3 mb-8">
                    {/* {orderRedux.cinemaName} */}
                    {datas.cinema_brand_name}
                  </p>
                  <div className="flex flex-col gap-4 w-full border-b pb-10">
                    <div className="flex justify-between text-sm">
                      <p className="text-[#6B6B6B] w-[6.563rem] ">
                        Movie selected
                      </p>
                      <p className="font-semibold text-end text-[#14142B] w-[10.8rem]">
                        {/* {orderRedux.movieName} */}
                        {datas.title}
                      </p>
                    </div>

                    <div className="flex justify-between text-sm">
                      <p className="text-[#6B6B6B] ">29-09-09</p>
                      <p className="font-semibold text-[#14142B]">
                        {/* {orderRedux.time} */}
                        {datas.show_date} {datas.show_time}
                      </p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-[#6B6B6B] ">One ticket price</p>
                      <p className="font-semibold text-[#14142B]">
                        {/* ${orderRedux.price} */}
                        {datas.details[0].price}
                      </p>
                    </div>
                    <div className="flex justify-between  text-sm">
                      <p className="text-[#6B6B6B] w-[6rem] ">Seat choosed</p>
                      <div className="flex flex-wrap max-w-[10.8rem] font-semibold text-[#14142B] justify-end">
                        {/* {orderRedux.datasSeat.map((item, idx) => (
                        <p key={idx}>{idx >= 1 ? ", " + item : item}</p>
                      ))} */}
                        {seat.length !== 0 ? (
                          seat.map((data, idx) => {
                            return <p key={idx}>{data}, </p>;
                          })
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between w-full py-6">
                    <p className="font-semibold text-lg text-black">
                      Total Payment
                    </p>
                    <p className="font-bold text-2xl text-font-primary ">
                      {/* ${orderRedux.price * orderRedux.datasSeat.length} */}
                      {/* {datas.details[0].price} */}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        )}
        <Footer />
      </Layout>
    </>
  );
}

export default Order;
