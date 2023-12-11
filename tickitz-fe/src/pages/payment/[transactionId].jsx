import Footer from "components/Footer";
import Navbar from "components/Navbar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import dana from "assets/icons/dana.svg";
import bri from "assets/icons/bri.svg";
import ovo from "assets/icons/ovo.svg";
import paypal from "assets/icons/paypal.svg";
import gopay from "assets/icons/gopay.svg";
import bca from "assets/icons/bca.svg";
import gpay from "assets/icons/gpay.svg";
import visa from "assets/icons/visa.svg";
import Link from "next/link";
import Title from "utils/wrapper/title";
import privateRoute from "utils/wrapper/privateRoute";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "components/Loader";

function Payment() {
  const { email, first_name, last_name, phone } = useSelector(
    (state) => state.profile.data
  );
  const [transactionData, setTransactionData] = useState([]);
  const [payment, setPayment] = useState(null);
  const [emailGet, setEmailGet] = useState(email);
  const [fullName, setFullName] = useState(
    first_name === null && last_name === null
      ? "-"
      : `${first_name} ${last_name}`
  );
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const transactionId = router.query.transactionId;
  const token = useSelector((state) => state.auth.data.token);

  useEffect(() => {
    let getData = true;
    if (getData) {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/transaction/${transactionId}`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setTransactionData(res.data.data))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }

    return () => {
      getData = false;
    };
  }, [transactionId, token]);

  const payOrder = async () => {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/transaction`;
      const body = {
        transaction_id: transactionId,
        payment_id: payment,
      };
      const result = await axios.patch(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
      router.push(`/ticket-result/${transactionId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // if (isLoading) {return <Loader />}
  return (
    <>
      <Title title="Payment">
        <Navbar />
        <main className=" bg-tickitz-bgDetail w-full h-full px-6 md:pr-12 md:pl-[4.5rem] py-14 flex gap-6 flex-col lg:flex-row">
          <section className=" flex flex-col gap-6 w-full lg:w-[60%]">
            <section className=" flex flex-col gap-6 w-full ">
              <h2 className=" font-bold text-tickitz-darkTitle text-2xl flex">
                Payment Info
              </h2>
              {transactionData.map((data, i) => {
                return (
                  <div
                    key={i}
                    className=" flex flex-col w-full bg-white px-6 md:px-10 py-6 rounded-md"
                  >
                    <div className=" flex justify-between py-6 border-b border-tickitz-greyBorder">
                      <p className=" text-[#6B6B6B] text-base md:text-xl">
                        Date & time
                      </p>
                      <p className=" text-base md:text-xl text-right">
                        {data.show_date} at {data.show_time}
                      </p>
                    </div>
                    <div className=" flex justify-between pt-0 md:pt-6 pb-6 border-b border-tickitz-greyBorder">
                      <p className=" text-[#6B6B6B] text-base md:text-xl">
                        Movie title
                      </p>
                      <p className=" text-base md:text-xl">
                        {data.movie_title}
                      </p>
                    </div>
                    <div className=" flex justify-between py-6 border-b border-tickitz-greyBorder">
                      <p className=" text-[#6B6B6B] text-base md:text-xl">
                        Cinema name
                      </p>
                      <p className=" text-base md:text-xl">
                        {data.cinemas_name}
                      </p>
                    </div>
                    <div className=" flex justify-between py-6 border-b border-tickitz-greyBorder">
                      <p className=" text-[#6B6B6B] text-base md:text-xl">
                        Number of tickets
                      </p>
                      <p className=" text-base md:text-xl">
                        {data.seats.length} pieces
                      </p>
                    </div>
                    <div className=" flex justify-between py-6 ">
                      <p className=" text-[#6B6B6B] text-base md:text-xl">
                        Total payment
                      </p>
                      <p className=" text-base md:text-xl font-semibold">
                        Rp.
                        {data.seats
                          .map((d, i) => d.price)
                          .reduce((a, b) => a + b)
                          .toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </section>
            <section className=" flex flex-col gap-6 w-full ">
              <h2 className=" font-bold text-tickitz-darkTitle text-2xl">
                Choose a Payment Method
              </h2>
              <div className="flex flex-col w-full bg-white px-4 lg:px-12 py-14 rounded-md">
                <div className=" flex flex-wrap gap-x-6 gap-y-8 items-center justify-center lg:justify-between">
                  <div
                    className={` ${
                      payment === 1 &&
                      "shadow-lg border-[5px] border-tickitz-success shadow-tickitz-success"
                    } cursor-pointer flex w-[4.15rem] md:w-[8.13rem] lg:w-[9.13rem] h-[2.5rem] md:h-14 border-2 border-tickitz-greyBorder rounded-lg md:rounded-[1rem] justify-center items-center`}
                    onClick={() => setPayment(1)}
                  >
                    <Image src={gpay} alt="gpay" className=" w-9 md:w-auto" />
                  </div>
                  <div
                    className={` ${
                      payment === 2 &&
                      "shadow-lg border-[5px] border-tickitz-success shadow-tickitz-success"
                    } cursor-pointer flex w-[4.15rem] md:w-[8.13rem] lg:w-[9.13rem] h-[2.5rem] md:h-14 border-2 border-tickitz-greyBorder rounded-lg md:rounded-[1rem] justify-center items-center`}
                    onClick={() => setPayment(2)}
                  >
                    <Image src={visa} alt="gpay" className=" w-9 md:w-auto" />
                  </div>
                  <div
                    className={` ${
                      payment === 3 &&
                      "shadow-lg border-[5px] border-tickitz-success shadow-tickitz-success"
                    } cursor-pointer flex w-[4.15rem] md:w-[8.13rem] lg:w-[9.13rem] h-[2.5rem] md:h-14 border-2 border-tickitz-greyBorder rounded-lg md:rounded-[1rem] justify-center items-center`}
                    onClick={() => setPayment(3)}
                  >
                    <Image src={gopay} alt="gpay" className=" w-9 md:w-auto" />
                  </div>
                  <div
                    className={` ${
                      payment === 4 &&
                      "shadow-lg border-[5px] border-tickitz-success shadow-tickitz-success"
                    } cursor-pointer flex w-[4.15rem] md:w-[8.13rem] lg:w-[9.13rem] h-[2.5rem] md:h-14 border-2 border-tickitz-greyBorder rounded-lg md:rounded-[1rem] justify-center items-center`}
                    onClick={() => setPayment(4)}
                  >
                    <Image src={paypal} alt="gpay" className=" w-5 md:w-auto" />
                  </div>
                  <div
                    className={` ${
                      payment === 5 &&
                      "shadow-lg border-[5px] border-tickitz-success shadow-tickitz-success"
                    } cursor-pointer flex w-[4.15rem] md:w-[8.13rem] lg:w-[9.13rem] h-[2.5rem] md:h-14 border-2 border-tickitz-greyBorder rounded-lg md:rounded-[1rem] justify-center items-center`}
                    onClick={() => setPayment(5)}
                  >
                    <Image src={dana} alt="gpay" className=" w-9 md:w-auto" />
                  </div>
                  <div
                    className={` ${
                      payment === 6 &&
                      "shadow-lg border-[5px] border-tickitz-success shadow-tickitz-success"
                    } cursor-pointer flex w-[4.15rem] md:w-[8.13rem] lg:w-[9.13rem] h-[2.5rem] md:h-14 border-2 border-tickitz-greyBorder rounded-lg md:rounded-[1rem] justify-center items-center`}
                    onClick={() => setPayment(6)}
                  >
                    <Image src={bca} alt="gpay" className=" w-9 md:w-auto" />
                  </div>
                  <div
                    className={` ${
                      payment === 7 &&
                      "shadow-lg border-[5px] border-tickitz-success shadow-tickitz-success"
                    } cursor-pointer flex w-[4.15rem] md:w-[8.13rem] lg:w-[9.13rem] h-[2.5rem] md:h-14 border-2 border-tickitz-greyBorder rounded-lg md:rounded-[1rem] justify-center items-center`}
                    onClick={() => setPayment(7)}
                  >
                    <Image src={bri} alt="gpay" className=" w-7 md:w-auto" />
                  </div>
                  <div
                    className={` ${
                      payment === 8 &&
                      "shadow-lg border-[5px] border-tickitz-success shadow-tickitz-success"
                    } cursor-pointer flex w-[4.15rem] md:w-[8.13rem] lg:w-[9.13rem] h-[2.5rem] md:h-14 border-2 border-tickitz-greyBorder rounded-lg md:rounded-[1rem] justify-center items-center`}
                    onClick={() => setPayment(8)}
                  >
                    <Image src={ovo} alt="gpay" className=" w-9 md:w-auto" />
                  </div>
                </div>
                <div className=" flex gap-9 justify-center items-center text-center opacity-70 my-11 ">
                  <div className="w-full h-[1px] bg-tickitz-label flex justify-center items-center"></div>
                  <div className=" flex text-tickitz-label font-medium ">
                    <p>Or</p>
                  </div>
                  <div className="w-full h-[1px] bg-tickitz-label flex justify-center items-center"></div>
                </div>
                <div className="text-base text-tickitz-label text-center">
                  <p>
                    Pay via cash.{" "}
                    <span className=" text-tickitz-primary font-semibold cursor-pointer">
                      See how it work
                    </span>
                  </p>
                </div>
              </div>
              <div className=" w-full justify-between lg:flex hidden ">
                <button className=" btn shadow-md shadow-tickitz-label bg-white text-tickitz-primary  text-base hover:bg-white hover:text-tickitz-primary w-max md:w-[18.8rem] h-14 justify-center items-center font-bold border-2 border-tickitz-basic  rounded-[4px]">
                  Previous step
                </button>
                <button
                  onClick={payOrder}
                  className=" btn shadow-md shadow-tickitz-label bg-tickitz-primary text-white  text-base hover:bg-tickitz-primary hover:text-white w-max md:w-[18.8rem] h-14 justify-center items-center font-bold border-none  rounded-[4px]"
                >
                  Pay your order
                </button>
              </div>
            </section>
          </section>
          {/* <section className=" flex flex-col gap-6 w-full lg:w-[60%]">
          <h2 className=" font-bold text-tickitz-darkTitle text-2xl">
            Choose a Payment Method
          </h2>
          <div className="flex flex-col w-full bg-white px-12 py-14 rounded-md">
            <div className=" flex flex-wrap gap-x-6 gap-y-8 items-center justify-center lg:justify-between">
              <div className=" flex w-[9.13rem] h-14 border-2 border-tickitz-greyBorder rounded-[1rem] justify-center items-center">
                <Image src={gpay} alt="gpay" />
              </div>
              <div className=" flex w-[9.13rem] h-14 border-2 border-tickitz-greyBorder rounded-[1rem] justify-center items-center">
                <Image src={visa} alt="gpay" />
              </div>
              <div className=" flex w-[9.13rem] h-14 border-2 border-tickitz-greyBorder rounded-[1rem] justify-center items-center">
                <Image src={gopay} alt="gpay" />
              </div>
              <div className=" flex w-[9.13rem] h-14 border-2 border-tickitz-greyBorder rounded-[1rem] justify-center items-center">
                <Image src={paypal} alt="gpay" />
              </div>
              <div className=" flex w-[9.13rem] h-14 border-2 border-tickitz-greyBorder rounded-[1rem] justify-center items-center">
                <Image src={dana} alt="gpay" />
              </div>
              <div className=" flex w-[9.13rem] h-14 border-2 border-tickitz-greyBorder rounded-[1rem] justify-center items-center">
                <Image src={bca} alt="gpay" />
              </div>
              <div className=" flex w-[9.13rem] h-14 border-2 border-tickitz-greyBorder rounded-[1rem] justify-center items-center">
                <Image src={bri} alt="gpay" />
              </div>
              <div className=" flex w-[9.13rem] h-14 border-2 border-tickitz-greyBorder rounded-[1rem] justify-center items-center">
                <Image src={ovo} alt="gpay" />
              </div>
            </div>
          </div>
        </section> */}
          <section className=" flex flex-col gap-6 w-full lg:w-[40%] ">
            <h2 className=" font-bold text-tickitz-darkTitle text-2xl">
              Personal Info
            </h2>
            <section className=" flex flex-col bg-white px-6 md:px-10 py-6 rounded-md w-full">
              <form action="" className=" gap-8 flex flex-col">
                <div className=" flex flex-col gap-3">
                  <label htmlFor="" className=" text-[#696F79] text-base">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className=" w-full py-5 px-8 border border-tickitz-greyBorder rounded-md outline-none text-lg text-tickitz-basic"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className=" flex flex-col gap-3">
                  <label htmlFor="" className=" text-[#696F79] text-base">
                    Email
                  </label>
                  <input
                    type="text"
                    className=" w-full px-6 py-3 py md:py-5 md:px-8 border border-tickitz-greyBorder rounded-md outline-none text-lg text-tickitz-basic"
                    value={emailGet}
                    onChange={(e) => setEmailGet(e.target.value)}
                  />
                </div>
                <div className=" flex flex-col gap-3">
                  <label htmlFor="" className=" text-[#696F79] text-base">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className=" w-full px-6 py-3 py md:py-5 md:px-8 border border-tickitz-greyBorder rounded-md outline-none text-lg text-tickitz-basic"
                    value={phoneNumber ? phoneNumber : "-"}
                    onChange={(e) => phoneNumber(e.target.value)}
                  />
                </div>
                <div className=" flex w-full px-6 py-3 py md:py-5 md:px-8 h-14 md:h-[69.6px] bg-tickitz-warning bg-opacity-30 rounded-md gap-6 items-center">
                  <i class="bi bi-exclamation-triangle-fill text-[#F4B740] text-2xl"></i>
                  <p className=" text-base text-tickitz-basic ">
                    Fill your data correctly.
                  </p>
                </div>
              </form>
            </section>
            <div className=" w-full justify-between flex lg:hidden mt-5 ">
              <button
                type="button"
                className=" btn shadow-md shadow-tickitz-label bg-tickitz-primary text-white  text-base hover:bg-tickitz-primary hover:text-white w-full h-14 md:h-16 justify-center items-center font-bold border-2 border-tickitz-primary  rounded-[4px]"
                onClick={payOrder}
              >
                Pay your order
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </Title>
      {isLoading && <Loader />}
    </>
  );
}

export default privateRoute(Payment);
