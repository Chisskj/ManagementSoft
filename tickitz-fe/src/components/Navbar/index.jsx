/* eslint-disable react/jsx-no-undef */
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import pp from "assets/images/place00.jpg";
import Logout from "components/Logout";

export default function Navbar() {
  const [isSearch, setIsSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setDropdown(!dropdown);
  };
  const handleLogout = () => {
    setIsOpen(true);
  };
  const dataUser = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.profile);
  // console.log(userData.data);

  const profileUser = userData.data;
  // console.log(profileUser.image);

  console.log(dataUser);

  return (
    <>
      {isOpen && <Logout isOpen={isOpen} setIsOpen={setIsOpen} />}
      <header className="navbar md:px-20 px-5 py-5">
        <section className="navbar-start flex gap-x-20">
          <div>
            <svg
              width="130"
              height="51"
              viewBox="0 0 130 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.3997 40.5807H8.79648V17.546H0.352539V11.7823H22.824V17.546H14.3997V40.5807ZM31.5423 13.2282C31.5423 13.737 31.4444 14.2123 31.2483 14.6541C31.0656 15.0959 30.811 15.4842 30.4844 15.8189C30.1578 16.1402 29.7726 16.4013 29.3285 16.6021C28.8973 16.7895 28.4338 16.8833 27.9373 16.8833C27.4411 16.8833 26.9709 16.7895 26.5268 16.6021C26.0958 16.4013 25.717 16.1402 25.3905 15.8189C25.0771 15.4842 24.8224 15.0959 24.6264 14.6541C24.4436 14.2123 24.3522 13.737 24.3522 13.2282C24.3522 12.7329 24.4436 12.2643 24.6264 11.8225C24.8224 11.3673 25.0771 10.979 25.3905 10.6577C25.717 10.323 26.0958 10.0619 26.5268 9.87447C26.9709 9.67365 27.4411 9.57324 27.9373 9.57324C28.4338 9.57324 28.8973 9.67365 29.3285 9.87447C29.7726 10.0619 30.1578 10.323 30.4844 10.6577C30.811 10.979 31.0656 11.3673 31.2483 11.8225C31.4444 12.2643 31.5423 12.7329 31.5423 13.2282ZM30.6216 40.5807H25.2338V19.0723H30.6216V40.5807ZM53.0538 23.3498L49.1353 27.3864C48.9395 26.8241 48.6718 26.3221 48.3321 25.8802C47.9926 25.4251 47.6074 25.0435 47.1763 24.7355C46.7584 24.4276 46.3013 24.1933 45.8048 24.0326C45.3086 23.872 44.7991 23.7917 44.2767 23.7917C43.5453 23.7917 42.8531 23.9456 42.2001 24.2536C41.56 24.5615 40.9983 24.9966 40.5152 25.5589C40.045 26.1078 39.6726 26.7639 39.3985 27.5271C39.1243 28.2902 38.9871 29.1336 38.9871 30.0574C38.9871 30.807 39.1243 31.5101 39.3985 32.1662C39.6726 32.8221 40.045 33.3979 40.5152 33.8931C40.9983 34.3885 41.56 34.7768 42.2001 35.0579C42.8531 35.3392 43.5453 35.4796 44.2767 35.4796C44.7991 35.4796 45.302 35.4061 45.7853 35.2588C46.2687 35.1116 46.7191 34.904 47.1372 34.6361C47.5681 34.3551 47.9469 34.0203 48.2735 33.632C48.6129 33.2304 48.8874 32.7886 49.0963 32.3066L53.0145 36.3433C52.5183 37.0663 51.9435 37.7156 51.2905 38.2911C50.6504 38.8669 49.9517 39.3556 49.1942 39.7573C48.4498 40.1589 47.6596 40.4603 46.8237 40.661C46.0009 40.8751 45.1519 40.9823 44.2767 40.9823C42.8009 40.9823 41.41 40.701 40.1038 40.1389C38.8108 39.5631 37.6745 38.78 36.6949 37.7891C35.7282 36.7984 34.9643 35.6402 34.4025 34.3148C33.8411 32.9893 33.5602 31.5704 33.5602 30.0574C33.5602 28.4106 33.8411 26.871 34.4025 25.4384C34.9643 24.0059 35.7282 22.7608 36.6949 21.7031C37.6745 20.632 38.8108 19.7885 40.1038 19.1727C41.41 18.5568 42.8009 18.2489 44.2767 18.2489C45.1519 18.2489 46.0073 18.3627 46.8432 18.5903C47.6922 18.8179 48.4955 19.1526 49.253 19.5944C50.0237 20.0228 50.7288 20.5517 51.3689 21.1809C52.0218 21.8102 52.5836 22.5332 53.0538 23.3498ZM61.0667 40.5807H55.679V10.5171H61.0667V29.475L69.0403 19.1124H75.1923L68.2373 28.0692L75.1923 40.5807H69.0403L64.7891 32.7686L61.0667 37.8294V40.5807ZM83.6166 13.2282C83.6166 13.737 83.5185 14.2123 83.3227 14.6541C83.1397 15.0959 82.8851 15.4842 82.5587 15.8189C82.2321 16.1402 81.8467 16.4013 81.4026 16.6021C80.9717 16.7895 80.5081 16.8833 80.0117 16.8833C79.5155 16.8833 79.0452 16.7895 78.6012 16.6021C78.17 16.4013 77.7913 16.1402 77.4649 15.8189C77.1514 15.4842 76.8968 15.0959 76.7007 14.6541C76.518 14.2123 76.4265 13.737 76.4265 13.2282C76.4265 12.7329 76.518 12.2643 76.7007 11.8225C76.8968 11.3673 77.1514 10.979 77.4649 10.6577C77.7913 10.323 78.17 10.0619 78.6012 9.87447C79.0452 9.67365 79.5155 9.57324 80.0117 9.57324C80.5081 9.57324 80.9717 9.67365 81.4026 9.87447C81.8467 10.0619 82.2321 10.323 82.5587 10.6577C82.8851 10.979 83.1397 11.3673 83.3227 11.8225C83.5185 12.2643 83.6166 12.7329 83.6166 13.2282ZM82.6957 40.5807H77.3082V19.0723H82.6957V40.5807ZM97.3111 40.5807C96.018 40.5807 94.8033 40.3331 93.667 39.8376C92.5307 39.329 91.5317 38.6394 90.6695 37.7691C89.8205 36.8854 89.1478 35.8612 88.6516 34.6965C88.1683 33.5317 87.9267 32.2866 87.9267 30.9611V24.5749H85.3211V19.1124H87.9267V10.5171H93.2556V19.1124H101.366V24.5749H93.2556V30.9611C93.2556 31.5369 93.36 32.079 93.5691 32.5879C93.778 33.0831 94.0653 33.5183 94.431 33.8931C94.7969 34.2682 95.2278 34.5692 95.724 34.7968C96.2205 35.0112 96.7493 35.1182 97.3111 35.1182H101.366V40.5807H97.3111ZM120.762 40.5807H103.267L112.103 24.5749H103.267V19.1124H120.762L111.926 35.1182H120.762V40.5807Z"
                fill="#3D405B"
              />
              <path
                d="M127.795 23.9223C127.79 23.9198 127.786 23.9184 127.782 23.9163L126.032 22.8801C125.923 23.0074 125.774 23.0919 125.611 23.1195C125.448 23.147 125.281 23.1158 125.138 23.0311C124.995 22.9464 124.885 22.8134 124.826 22.6548C124.768 22.4963 124.765 22.3219 124.819 22.1614L123.057 21.1181C123.009 21.0902 122.953 21.0827 122.9 21.0972C122.848 21.1116 122.803 21.147 122.775 21.1954L117.545 30.4829L117.544 30.4834C117.531 30.5073 117.522 30.5339 117.518 30.5613C117.515 30.589 117.517 30.6167 117.524 30.6436C117.531 30.6704 117.543 30.6954 117.559 30.7176C117.576 30.7395 117.596 30.7579 117.62 30.7719L119.382 31.8138C119.491 31.6869 119.64 31.6024 119.803 31.5747C119.966 31.5473 120.133 31.5786 120.276 31.663C120.419 31.7478 120.529 31.8805 120.587 32.0387C120.646 32.1969 120.649 32.371 120.596 32.5314L122.336 33.5599C122.343 33.5654 122.35 33.5711 122.357 33.5758C122.381 33.5898 122.407 33.5986 122.434 33.6024C122.46 33.606 122.488 33.604 122.514 33.5969C122.54 33.5898 122.564 33.5775 122.586 33.5605C122.607 33.5437 122.625 33.5226 122.639 33.4985V33.4988L127.87 24.2107C127.884 24.1866 127.892 24.1602 127.896 24.1327C127.899 24.1052 127.898 24.0772 127.89 24.0505C127.884 24.0237 127.871 23.9986 127.855 23.9766C127.839 23.9546 127.818 23.9361 127.795 23.9223ZM126.295 24.6432L122.217 31.8835C122.203 31.9076 122.185 31.9287 122.164 31.9455C122.142 31.9625 122.118 31.9748 122.092 31.9819C122.066 31.989 122.038 31.991 122.012 31.9874C121.985 31.9838 121.959 31.9748 121.935 31.9608L119.195 30.3389C119.172 30.325 119.151 30.3066 119.135 30.2847C119.118 30.2627 119.106 30.2375 119.099 30.2109C119.092 30.184 119.09 30.1561 119.094 30.1286C119.098 30.1012 119.106 30.0746 119.12 30.0508L123.198 22.8104C123.225 22.762 123.27 22.7266 123.323 22.7122C123.375 22.6977 123.431 22.7052 123.479 22.7332L126.219 24.3552C126.243 24.369 126.263 24.3874 126.28 24.4094C126.296 24.4314 126.308 24.4564 126.315 24.4832C126.322 24.51 126.324 24.5379 126.321 24.5653C126.317 24.5928 126.308 24.6193 126.295 24.6432Z"
                fill="#3D405B"
              />
              <path
                d="M124.098 27.1534L123.23 26.9879L123.108 26.1373C123.106 26.1247 123.101 26.113 123.092 26.1039C123.084 26.0947 123.072 26.0885 123.06 26.0862C123.048 26.0838 123.035 26.0853 123.024 26.0906C123.013 26.0959 123.004 26.1046 122.997 26.1155L122.576 26.863L121.73 26.7016C121.718 26.6993 121.705 26.7009 121.694 26.7062C121.683 26.7115 121.673 26.7202 121.667 26.7312C121.661 26.7421 121.658 26.7547 121.659 26.7674C121.66 26.7799 121.665 26.7919 121.673 26.8015L122.233 27.4725L121.812 28.2197C121.806 28.2309 121.803 28.2435 121.804 28.2561C121.805 28.269 121.811 28.2811 121.819 28.2907C121.827 28.3003 121.838 28.3069 121.85 28.3099C121.862 28.3129 121.874 28.3121 121.886 28.3074L122.665 27.9905L123.239 28.6784C123.247 28.6877 123.258 28.6946 123.27 28.6976C123.282 28.7006 123.294 28.6998 123.306 28.6954C123.317 28.691 123.327 28.6831 123.334 28.6726C123.341 28.6622 123.345 28.6499 123.344 28.6373L123.329 27.7149L124.116 27.2669C124.127 27.2606 124.136 27.2512 124.141 27.2399C124.146 27.2285 124.148 27.2158 124.147 27.2033C124.144 27.1909 124.138 27.1795 124.13 27.1706C124.121 27.1616 124.11 27.1556 124.098 27.1534Z"
                fill="#3D405B"
              />
            </svg>
          </div>
          <div className="lg:flex hidden gap-14 font-semibold text-[#414141]">
            <Link href={"/movies"}>Movies</Link>
            <Link href={"/cinemas"}>Cinemas</Link>
            <p>Buy Ticket</p>
          </div>
        </section>
        <section className="navbar-end lg:flex lg:gap-x-10">
          <div className="dropdown lg:inline-block hidden dropdown-hover dropdown-end">
            <label
              tabIndex={0}
              className="flex items-center gap-x-5 cursor-pointer"
            >
              <p className="font-semibold text-[#414141]">Location</p>
              <svg
                className="w-2 h-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 412 232"
              >
                <path
                  d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                  fill="#414141"
                  fillRule="nonzero"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-8 shadow bg-white rounded-box w-52 gap-y-5 cursor-pointer"
            >
              <li>
                  <p>Hanoi</p>
               </li>
                <li>
                  <p>BacGiang</p>
                </li>
                <li>
                  <p>SaiGon</p>
                </li>
            </ul>
          </div>
          <div className="lg:flex hidden cursor-pointer">
            <i
              className="bi bi-search text-[#414141] text-xl before:h-6 before:w-6"
              onClick={() => setIsSearch(!isSearch)}
            ></i>
            <div
              className={`nav-search ${isSearch ? "top-16" : "top-[-7rem]"}`}
            >
              <button className="btn bg-tickitz-primary border-tickitz-primary">
                <i className="bi bi-search text-white"></i>
              </button>
              <input
                type="text"
                name="search"
                placeholder="Search..."
                className="input input-bordered border-tickitz-primary input-secondary w-full bg-white rounded-l-none rounded-r-md"
              />
            </div>
          </div>
          {dataUser.isFulfilled ? (
            <>
              <div
                onClick={handleMenuToggle}
                className=" w-14 h-14 rounded-full overflow-hidden lg:block hidden cursor-pointer"
              >
                <Image
                  src={!profileUser.image ? pp : profileUser.image}
                  width={56}
                  height={56}
                  alt="photoProfile"
                  className=" w-full h-full object-cover items-center"
                />
              </div>
              <div
                className={`${
                  dropdown
                    ? "dropdown transition duration-300 ease-in-out opacity-100 transform translate-y-2"
                    : "dropdown transition duration-200 ease-in-out opacity-0 transform -translate-y-0 invisible"
                }  absolute right-0 z-10 mt-12 mr-10 top-8 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
              >
                <div class="py-1" role="none">
                  <Link
                    href="/profile"
                    class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-0"
                  >
                    Profile
                  </Link>
                  <button
                    // type="submit"
                    class="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="w-1/5 lg:block hidden">
              <Link
                href={"/sign-up"}
                className="btn normal-case w-full font-bold border-transparent bg-tickitz-primary text-white hover:bg-white hover:text-tickitz-primary"
              >
                Sign Up
              </Link>
            </div>
          )}
          <div
            className="lg:hidden block"
            onClick={() => setIsMobile(!isMobile)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
            >
              <path
                d="M4 6C4 5.73478 4.10536 5.48043 4.29289 5.29289C4.48043 5.10536 4.73478 5 5 5H19C19.2652 5 19.5196 5.10536 19.7071 5.29289C19.8946 5.48043 20 5.73478 20 6C20 6.26522 19.8946 6.51957 19.7071 6.70711C19.5196 6.89464 19.2652 7 19 7H5C4.73478 7 4.48043 6.89464 4.29289 6.70711C4.10536 6.51957 4 6.26522 4 6Z"
                fill="black"
              />
              <path
                d="M4 18C4 17.7348 4.10536 17.4804 4.29289 17.2929C4.48043 17.1054 4.73478 17 5 17H19C19.2652 17 19.5196 17.1054 19.7071 17.2929C19.8946 17.4804 20 17.7348 20 18C20 18.2652 19.8946 18.5196 19.7071 18.7071C19.5196 18.8946 19.2652 19 19 19H5C4.73478 19 4.48043 18.8946 4.29289 18.7071C4.10536 18.5196 4 18.2652 4 18Z"
                fill="black"
              />
              <path
                d="M11 11C10.7348 11 10.4804 11.1054 10.2929 11.2929C10.1054 11.4804 10 11.7348 10 12C10 12.2652 10.1054 12.5196 10.2929 12.7071C10.4804 12.8946 10.7348 13 11 13H19C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11H11Z"
                fill="black"
              />
            </svg>
          </div>
          <div
            className={`lg:hidden fixed top-16 left-0 right-0 bottom-0 z-40 ${
              isMobile
                ? "opacity-70 bg-black h-screen"
                : "pointer-events-none opacity-0"
            }`}
          />
          <div
            className={`nav-mobile lg:hidden ${
              isMobile ? "-right-0" : "right-full"
            }`}
          >
            <div className="relative px-10">
              <i className="bi bi-search text-xl text-tickitz-label absolute top-[11px] left-14"></i>
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered border-[#DEDEDE] input-secondary w-full bg-transparent rounded pl-14"
              />
            </div>
            <div className="flex flex-col">
              <div className="dropdown dropdown-hover dropdown-start">
                <label
                  tabIndex={0}
                  className="flex py-10 border items-center justify-center gap-x-5 cursor-pointer"
                >
                  <p className="font-semibold text-[#414141]">Location</p>
                  <svg
                    className="w-2 h-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 412 232"
                  >
                    <path
                      d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                      fill="#414141"
                      fillRule="nonzero"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-8 shadow bg-white rounded-box w-full gap-y-5 cursor-pointer"
                >
                  <li>
                  <p>Hanoi</p>
                </li>
                <li>
                  <p>SaiGon</p>
                </li>
                <li>
                  <p>BacGiang</p>
                </li>
                </ul>
              </div>
              <div className="flex flex-col items-center font-semibold text-[#414141]">
                <p className="py-10 border w-full text-center">Movies</p>
                <p className="py-10 border w-full text-center">Cinemas</p>
                <p className="py-10 border w-full text-center">Buy Ticket</p>
              </div>
              <p className="text-tickitz-label text-center pt-20">
                © 2020 Tickitz. All Rights Reserved.
              </p>
            </div>
          </div>
        </section>
      </header>
    </>
  );
}
