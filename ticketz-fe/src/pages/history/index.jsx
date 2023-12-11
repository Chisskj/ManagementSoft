import Image from "next/image";
import Link from "next/link";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ebv from "assets/icons/ebv.id.svg";
import cineOne from "assets/icons/CineOne21.svg";
import privateRoute from "utils/wrapper/privateRoute";
import { getHistories } from "utils/https/payment";
import Loader from "components/Loader";

function History() {
  //* temporary
  const historyData = [
    {
      movieTitle: "Spider-Man: Homecoming",
      time: "Tuesday, 07 July 2020 - 04:30pm",
      cinema: cineOne,
      isTicketActive: true,
    },
    {
      movieTitle: "Avengers: End Game",
      time: "Monday, 14 June 2020 - 02:00pm",
      cinema: ebv,
      isTicketActive: false,
    },
  ];
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const token = useSelector((state) => state.auth.data.token);
  const [dataHistory, setDataHistory] = useState([]);
  const fetching = async () => {
    setLoading(true);
    try {
      const result = await getHistories(token, controller);
      //   console.log(result.data);
      //   setLoading(false);
      if (result.status && result.status === 200) {
        setDataHistory(result.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title={"Your Order History"}>
      {loading ? <Loader /> : <></>}
      <div className="">
        <Navbar />
        <div className="board-tab lg:hidden gap-x-20 border-b border-b-[#DEDEDE] flex md:justify-between md:px-20 px-5 pt-10">
          <div className="cursor-pointer flex flex-col gap-y-5">
            <Link href={"/profile"} className="text-lg text-[#AAAAAA]">
              Details Account
            </Link>
            <span className=""></span>
          </div>
          <div className="cursor-pointer flex flex-col gap-y-5">
            <p className="text-sm text-tickitz-darkTitle">Order History</p>
            <span className="border-b-2 border-b-tickitz-primary w-full"></span>
          </div>
        </div>
        <main className="bg-[#F5F6F8] flex lg:flex-row flex-col gap-x-5 gap-y-5 lg:px-20 px-5 lg:py-10 py-5">
          <Sidebar isHistory={true} />
          <section className="lg:bg-white  bg-transparent lg:w-2/3 w-full flex flex-col rounded-md shadow-[0px,8px,32px,rgba(186,186,186,0.08)] py-12 gap-y-10 h-screen overflow-scroll overflow-x-hidden">
            <div className="board-tab lg:flex gap-x-20 border-b border-b-[#DEDEDE] hidden px-8  bg-white">
              <div className="cursor-pointer flex flex-col gap-y-5">
                <Link href={"/profile"} className="text-lg text-[#AAAAAA]">
                  Account Settings
                </Link>
                <span className=""></span>
              </div>
              <div className="cursor-pointer flex flex-col gap-y-5">
                <p className="text-lg text-tickitz-darkTitle">Order History</p>
                <span className="border-b-2 border-b-tickitz-primary w-full"></span>
              </div>
            </div>
            {dataHistory.map((historyDatum, index) => {
              return (
                <div key={index} className="lg:px-8 px-3 ">
                  <div className="lg:border border-[#DEDEDE] bg-white rounded-lg flex flex-col gap-y-5 lg:p-8 p-4 lg:shadow-none shadow-[0px,8px,32px,rgba(186,186,186,0.16)]">
                    <div className="flex lg:flex-row flex-col-reverse gap-y-5 lg:items-center justify-between">
                      <div className="flex flex-col gap-y-3">
                        <p className="text-sm text-[#AAAAAA] gap-3 ">
                          {historyDatum.show_time} - {historyDatum.show_date}
                        </p>
                        <p className="font-semibold lg:text-2xl text-lg">
                          {historyDatum.movie_title}
                        </p>
                      </div>
                      <div>
                        <div
                          className={`relative overflow-hidden w-[122px] h-[auto]`}
                        >
                          <Image
                            alt="cinema logo"
                            src={historyDatum.cinemas_brand_image}
                            width={122}
                            height={22}
                            // fill={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="divider h-[1px] w-full bg-[#DEDEDE]"></div>
                    <div className="flex justify-between">
                      <div
                        className={`rounded p-4 lg:w-1/4 w-full ${
                          historyDatum.transaction_status == "paid"
                            ? "bg-tickitz-success cursor-pointer"
                            : "bg-tickitz-greyBorder"
                        }`}
                      >
                        <p className="font-bold text-sm text-center">
                          {historyDatum.transaction_status == "paid"
                            ? "Ticket in active"
                            : "Unpaid ticket"}
                        </p>
                      </div>
                      <div className="lg:flex hidden items-center gap-x-3">
                        <p className="text-lg text-[#AAAAAA]">Show Details</p>
                        <i className="bi bi-chevron-compact-down text-[#AAAAAA]"></i>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </main>
        <Footer />
      </div>
    </Layout>
  );
}

export default privateRoute(History);
