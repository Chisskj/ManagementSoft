import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import branding from "assets/icons/tickitzyn.svg";
import brandingFill from "assets/icons/Tickitzyn2.svg";
import google from "assets/icons/google.svg";
import facebook from "assets/icons/fb.svg";
import { login } from "utils/https/auth";
import { profileAction } from "redux/slices/user";
import { authAction } from "redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import Loader from "components/Loader";
import Title from "utils/wrapper/title";
import { useRouter } from "next/router";
import publicRoute from "utils/wrapper/publicRoute";

function Login() {
  const [iconEye, setIconEye] = useState(false);
  const toggleIcon = () => {
    iconEye ? setIconEye(false) : setIconEye(true);
  };
  const controller = useMemo(() => new AbortController(), []);

  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth);

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const onChangeForm = (e) =>
    setFormLogin((form) => {
      // setInput(true);
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });

  const router = useRouter();

  const handleLogin = (event) => {
    event.preventDefault();
    if (formLogin.email == "") {
      setIsLoading(false),
        swal("Failed formLogin.", "Email is required", "error");
      return;
    }
    if (!formLogin.password) {
      setIsLoading(false);
      swal("Failed", "Password is required", "error");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formLogin.email)) {
      setIsLoading(false);
      swal("Failed", "Invalid Email", "error");
      return;
    }
    if (formLogin.password.length < 4) {
      setIsLoading(false);

      swal("Failed", "Password of at least 4 characters!", "error");
      return;
    }
    dispatch(
      authAction.doLogin({
        email: formLogin.email,
        password: formLogin.password,
      })
    )
      .unwrap()
      .then((res) => {
        console.log(res);
        dispatch(
          profileAction.getProfile({
            token: res.token,
            controller,
          })
        );
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        swal("Failed", error.response.data.msg, "error");
      });
  };

  return (
    <>
      <Title title="Login">
        {(users.isLoading || isLoading) && <Loader />}

        <main className=" flex w-full h-full ">
          <section className=" hero-auth hidden lg:flex w-[53%] xl:w-[58%] flex-col ">
            <section className=" flex flex-col w-full  bg-tickitz-primary justify-center items-center  px-28 bg-opacity-80  h-[67rem] pb-60">
              <div className=" pt-20  ">
                <Image src={branding} width={500} alt="brand" />
              </div>
              <div className=" flex flex-col mt-2 opacity-80">
                <p className=" text-white  text-5xl leading-[60px]">
                  Wait,Watch,Wow!
                </p>
              </div>
            </section>
          </section>
          <section className=" flex w-full lg:w-[47%] xl:w-[42%]  flex-col ">
            <div className=" flex lg:hidden px-[10%] mt-[5rem] mb-[4.2rem] lg:inset-0">
              <Image src={brandingFill} width={200} alt="brandd" />
            </div>
            <form
              onSubmit={handleLogin}
              action=""
              className=" w-full  flex flex-col px-[10%]"
            >
              <h1 className=" text-[1.7rem] md:text-5xl font-semibold text-tickitz-basic md:mt-16 lg:mt-[9.5rem] flex">
                Sign In
              </h1>
              <p className=" text-lg opacity-70 text-tickitz-label mt-4 flex">
                Sign in with your data that you entered during your registration
              </p>
              <div className=" flex flex-col gap-7">
                <div className=" flex flex-col justify-center  w-full mt-5 lg:mt-12 ">
                  <label
                    htmlFor="email"
                    className=" mb-3 text-base text-tickitz-basic"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    onChange={onChangeForm}
                    // value={email}
                    type="text"
                    className=" h-16 rounded-md border border-tickitz-label flex w-full p-5 outline-none"
                    placeholder="Input Your Email"
                  />
                </div>
                <div className=" flex flex-col justify-center relative">
                  <label
                    htmlFor="password"
                    className=" mb-3 text-base text-tickitz-basic"
                  >
                    Password
                  </label>
                  <input
                    name="password"
                    onChange={onChangeForm}
                    // value={password}
                    type={`${iconEye ? "text" : "password"}`}
                    className=" h-16 rounded-md border border-tickitz-label flex w-full p-5 outline-none"
                    placeholder="Input Your Password"
                  />
                  <i
                    className={` text-[#A9A9A9] absolute text-2xl cursor-pointer top-[50%] right-[1.5rem]  ${
                      iconEye ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"
                    }`}
                    onClick={toggleIcon}
                  ></i>
                </div>

                <div className=" w-full">
                  <button
                    type="submit"
                    className=" w-full h-16 btn bg-tickitz-primary hover:bg-tickitz-primary rounded-md text-white font-bold"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>
            <div className=" flex gap-1 text-lg px-[10%] w-full mt-8 text-center justify-center items-center">
              <p className=" text-tickitz-label ">
                Forgot your password?{" "}
                <Link
                  href={"/reset-password"}
                  className=" text-tickitz-basic font-semibold underline"
                >
                  Reset now
                </Link>
              </p>
            </div>
            <div className=" flex gap-9 justify-center items-center text-center opacity-70 my-11 ">
              <div className="w-36 h-[0.13rem] bg-tickitz-label flex justify-center items-center"></div>
              <div className=" flex text-tickitz-label font-medium ">
                <p>Or</p>
              </div>
              <div className="w-36 h-[0.13rem] bg-tickitz-label flex justify-center items-center"></div>
            </div>
            <div className=" flex justify-center items-center px-[10%] gap-9 pb-20">
              <button className="bg-white shadow-md rounded-xl w-[11.375rem] h-16 flex justify-center items-center gap-3">
                <div className="flex">
                  <Image src={google} width={24} height={24} alt="google" />
                </div>
                <p className=" flex text-tickitz-label font-semibold">Google</p>
              </button>
              <button className="bg-white shadow-md rounded-xl w-[11.375rem] h-16 flex justify-center items-center gap-3">
                <div className="flex">
                  <Image src={facebook} width={24} height={24} alt="google" />
                </div>
                <p className=" flex text-tickitz-label font-semibold">
                  Facebook
                </p>
              </button>
            </div>
          </section>
        </main>
      </Title>
    </>
  );
}

export default publicRoute(Login);
