/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import branding from "assets/icons/tickitzyn.svg";
import brandingFill from "assets/icons/Tickitzyn2.svg";
import { useRouter } from "next/router";
import { verify } from "utils/https/auth";
import swal from "sweetalert";
import Title from "utils/wrapper/title";
import publicRoute from "utils/wrapper/publicRoute";
import Loader from "components/Loader";

function Verify() {
  const controller = useMemo(() => new AbortController(), []);
  const router = useRouter();
  const email = router.query.email;
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // console.log(router.query.email);
  const onChangeOtp = (e) => {
    setOtp(e.target.value);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    verify(otp, email, controller)
      .then((res) => {
        setIsLoading(true);
        console.log(res);
        swal("Success", "Activation account success", "success");
        return router.push("/login");
      })
      .catch((err) => {
        setIsLoading(false);
        return swal("Failed", err.response.data.msg, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading ? <Loader /> : <></>}
      <Title title="Verification">
        <main className=" flex w-full h-full ">
          <section className="hero-auth hidden lg:flex w-[58%] flex-col ">
            <section className=" flex flex-col w-full h-full bg-tickitz-primary  px-28 bg-opacity-80">
              <div className=" pt-20  mb-[4rem] ">
                <Image src={branding} width={276} height={104} alt="brand" />
              </div>
              <div className=" flex flex-col gap-5">
                <p className=" text-white font-bold text-5xl lg:text-[1.8rem] xl:text-5xl leading-[60px]">
                  Lets verified your account
                </p>
                <p className=" text-white opacity-70 text-sm xl:text-2xl  xl:leading-[40px]">
                  To be able to use your account again, please <br /> complete
                  the following steps.
                </p>
              </div>
              <div className=" flex flex-col mt-[2rem] mb-[17.5rem] ">
                <div className=" flex flex-col">
                  <div className=" flex">
                    <div className="flex flex-col justify-center">
                      <div className=" flex gap-12">
                        <div className="bg-white rounded-full w-12 h-12 justify-center items-center flex text-xl ">
                          <p className=" text-center text-tickitz-label font-bold">
                            1
                          </p>
                        </div>
                        <div className=" text-white font-medium xl:text-2xl flex items-center lg:text-base">
                          <p>Fill your complete email</p>
                        </div>
                      </div>

                      <div className=" w-12 h-12 justify-center border-l-2 flex border-white ml-[1.438rem] "></div>
                    </div>
                  </div>
                </div>
                <div className=" flex flex-col">
                  <div className=" flex">
                    <div className="flex flex-col justify-center">
                      <div className=" flex gap-12">
                        <div className="bg-white border-white border-2 rounded-full w-12 h-12 justify-center items-center flex text-xl ">
                          <p className=" text-center text-tickitz-label font-bold">
                            2
                          </p>
                        </div>
                        <div className=" text-white font-medium xl:text-2xl flex items-center lg:text-base">
                          <p>Activate your account</p>
                        </div>
                      </div>
                      <div className=" w-12 h-12 justify-center border-l-2 flex border-white ml-[1.438rem] "></div>
                    </div>
                  </div>
                </div>
                <div className=" flex flex-col">
                  <div className=" flex">
                    <div className="flex flex-col justify-center">
                      <div className=" flex gap-12">
                        <div className="bg-transparent border-white border-2 rounded-full w-12 h-12 justify-center items-center flex text-xl ">
                          <p className=" text-center text-white font-bold">3</p>
                        </div>
                        <div className=" text-white font-medium xl:text-2xl flex items-center lg:text-base">
                          <p>Done</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
          <section className=" flex w-full lg:w-[47%] xl:w-[42%]  flex-col ">
            <div className=" flex lg:hidden px-[10%] mt-[5rem] mb-[4.2rem] lg:inset-0">
              <Image src={brandingFill} width={200} alt="brandd" />
            </div>
            <form
              action=""
              className=" w-full  flex flex-col px-[10%]"
              onSubmit={handleVerify}
            >
              <h1 className=" text-[1.7rem] font-semibold lg:mt-[9.5rem] flex text-tickitz-basic">
                Fill in the OTP that was sent to your email
              </h1>
              <p className=" text-lg opacity-70 text-tickitz-label mt-4 flex">
                we have sent an OTP to your email
              </p>
              <div className=" flex flex-col gap-7">
                <div className=" flex flex-col justify-center  w-full mt-5 lg:mt-12 ">
                  <label
                    htmlFor=""
                    className=" mb-3 text-base text-tickitz-basic"
                  >
                    OTP
                  </label>
                  <input
                    name="otp"
                    onChange={onChangeOtp}
                    value={otp}
                    type="text"
                    className=" h-16 rounded-md border border-tickitz-label flex w-full p-5"
                    placeholder="Input Your OTP"
                  />
                </div>

                <div className=" w-full mt-3">
                  <button
                    type="submit"
                    className="w-full h-16 btn bg-tickitz-primary hover:bg-tickitz-primary rounded-md text-white font-bold"
                  >
                    Activate Now
                  </button>
                </div>
              </div>
            </form>
          </section>
        </main>
      </Title>
    </>
  );
}

export default publicRoute(Verify);

