/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import branding from "assets/icons/tickitzyn.svg";
import brandingFill from "assets/icons/Tickitzyn2.svg";
import ticket from "assets/icons/tick.png";
import Title from "utils/wrapper/title";

export default function RegSucces() {
  return (
    <>
      <Title title="Sign-Up Success">
        <main className=" flex w-full h-full ">
          <section className="hero-auth hidden lg:flex w-[58%] flex-col ">
            <section className=" flex flex-col w-full h-full bg-tickitz-primary  px-28 bg-opacity-80">
              <div className=" pt-20  mb-[6rem] ">
                <Image src={branding} width={276} height={104} alt="brand" />
              </div>
              <div className=" flex flex-col gap-5">
                <p className=" text-white font-bold text-5xl lg:text-[2rem] xl:text-4xl leading-[60px]">
                  Account Activated Successfully
                </p>
                <p className=" text-white opacity-70 text-sm xl:text-2xl  xl:leading-[40px]">
                  To be a loyal moviegoer and access all of features,
                  <br /> your details are required.
                </p>
              </div>
              <div className=" flex flex-col mt-14 mb-[17.5rem] ">
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
                          <p>Fill your additional details</p>
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
                        <div className="bg-white border-white border-2 rounded-full w-12 h-12 justify-center items-center flex text-xl ">
                          <i className="bi bi-check text-center text-3xl text-tickitz-label font-bold"></i>
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
          <section className=" flex w-full lg:w-[47%] overflow-hidden xl:w-[42%]  flex-col justify-center items-center pb-60 relative ">
            <div className=" flex flex-col ">
              <div className=" flex lg:hidden px-[10%] mt-[5rem] mb-[4.2rem] lg:inset-0">
                <Image src={brandingFill} width={200} alt="brandd" />
              </div>
              <div className="justify-center items-center  flex flex-col gap-4">
                <i className="bi bi-check-circle-fill text-[5rem] text-tickitz-success "></i>
                <p className="text-tickitz-basic font-bold text-2xl text-center">
                  Congratulations,Your account <br /> has been activated!
                </p>
              </div>
            </div>
            <div className=" w-full px-[10%] mt-7">
              <Link
                href={"/login"}
                type="submit"
                className=" w-full h-16 btn bg-tickitz-primary hover:bg-tickitz-primary rounded-md text-white gap-3 font-bold"
              >
                <p>Go to Login </p>
                <i className="bi bi-arrow-right text-white text-2xl"></i>
              </Link>
            </div>
          </section>
        </main>
      </Title>
    </>
  );
}
