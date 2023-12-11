/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "utils/https/auth";
import { authAction } from "redux/slices/auth";
import { profileAction } from "redux/slices/user";
import Loader from "components/Loader";

function Logout({ isOpen, setIsOpen }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const token = useSelector((state) => state.auth.data.token);
  const [isLoading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const result = await logout(token, controller);
      // console.log(result);
      if (result.status && result.status === 200) {
        dispatch(authAction.logoutRedux());
        dispatch(profileAction.filter());

        setIsOpen(false);
        setLoading(false);
        router.push("/login");
      }

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickChild = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      {isLoading ? <Loader /> : <></>}
      <section className=" w-full h-full bg-black  bg-opacity-60  fixed z-50  inset-0">
        <section className="">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="p-6 bg-white rounded-lg shadow w- h-[20rem] w-[30rem] px-11 ">
              <div className="  flex justify-end ">
                <button
                  type="button"
                  className="  text-[32px] font-bold text-tickitz-error cursor-pointer"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  &times;
                </button>
              </div>

              <h2 className="text-4xl font-bold leading-tight tracking-tight text-dark md:text-2xl flex justify-start items-center">
                Are you sure want to Log Out?
              </h2>

              <div
                className="mt-4  lg:mt-5 "
                // onSubmit={handleSave}
              >
                <div className="flex w-full justify-between items-center">
                  <button
                    onClick={handleLogout}
                    type="submit"
                    className="w-[10.625rem] mt-28 h-14  text-white bg-tickitz-primary focus:ring-4 focus:outline-none  font-bold rounded-lg text-lg px-5 py-2.5 text-center "
                  >
                    Logout
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className="text-tickitz-basic border-r-tickitz-primary font-bold hover:bg-white hover:text-tickitz-basic border-2 w-[10.625rem] mt-28 h-14 btn-outline focus:ring-4 focus:outline-none  rounded-lg text-lg px-5 py-2.5 text-center "
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Logout;
