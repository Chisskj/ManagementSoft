import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";

import {
  getProfileData,
  changeProfileImage,
  deleteProfileImage,
} from "utils/https/user";

import defaulProfile from "assets/images/profile-placeholder.webp";
import starIcon from "assets/icons/star-icon.png";
import { profileAction } from "redux/slices/user";

export default function Sidebar(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.data.token);

  const controller = useMemo(() => new AbortController(), []);

  const [profileData, setProfileData] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getProfileData(token, controller)
      .then((res) => {
        setProfileData(res["data"]["data"][0]);
      })
      .catch((err) => console.log(err));
  }, [token, controller]);

  const modalOpenHandler = () => setIsModalOpen(true);
  const modalCloseHandler = () => {
    setIsModalOpen(false);
    setImagePreview(null);
  };

  const onImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const profileHandler = () => {
    if (imagePreview) return imagePreview;
    if (profileData.image) return profileData.image;
    return defaulProfile;
  };

  const updateImageHandler = (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append("image", image);

    toast.promise(changeProfileImage(body, token, controller), {
      pending: "Please wait...",
      success: {
        render() {
          dispatch(profileAction.getProfile({ token, controller }));
          setTimeout(() => {
            setIsModalOpen(false);
            router.reload();
          }, 3000);
          return "Image successfully updated";
        },
      },
      error: {
        render({ data }) {
          return data["response"]["data"]["msg"];
        },
      },
    });
  };

  const deleteImageHandler = (e) => {
    e.preventDefault();

    toast.promise(deleteProfileImage(token, controller), {
      pending: "Please wait...",
      success: {
        render() {
          setTimeout(() => {
            setImage(null);
            setImagePreview(null);
            setIsModalOpen(false);
            router.reload();
          }, 3000);
          
          dispatch(profileAction.getProfile({ token, controller }));

          return "Image succesfully deleted";
        },
      },
      error: {
        render({ data }) {
          return data["response"]["data"]["msg"];
        },
      },
    });
  };

  return (
    <section
      className={`bg-white lg:w-1/3 w-full ${
        props.isHistory ? "hidden lg:flex" : "flex"
      } flex-col rounded-md shadow-[0px,8px,32px,rgba(186,186,186,0.08)] md:px-8 px-4 py-12 gap-y-5`}>
      <div className="flex items-center justify-between">
        <p className="text-tickitz-basic">INFO</p>
        <div className="dropdown dropdown-end">
          <label tabIndex={0}>
            <i className="bi bi-three-dots text-tickitz-primary text-[1.75rem] cursor-pointer"></i>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li onClick={modalOpenHandler} className="cursor-pointer">
              Edit image
            </li>
          </ul>
        </div>
      </div>
      <figure className="relative overflow-hidden mx-auto h-[136px] w-[136px] rounded-full shadow-[0px_8px_16px_rgba(73,83,99,0.24)]">
        <Image
          alt="your profile photo"
          src={profileData.image ? profileData.image : defaulProfile}
          fill={true}
          priority={true}
          sizes="136px"
          className="object-cover object-center"
        />
      </figure>
      <div className="flex flex-col items-center gap-y-3">
        <p className="font-semibold text-xl text-tickitz-darkTitle">{`${
          profileData.first_name ? profileData.first_name : "Anonymous"
        } ${profileData.last_name ? profileData.last_name : "Anonymous"}`}</p>
        <p className="text-sm text-tickitz-basic">Moviegoers</p>
      </div>
      <div className="divider h-[1px] bg-[#DEDEDE]"></div>
      <div className="flex flex-col lg:px-20 px-2 gap-y-5">
        <p className="font-semibold text-tickitz-basic">Loyalty Points</p>
        <div className="achievement-card-bg bg-cover bg-center bg-no-repeat relative w-[248px] h-[173px] self-center">
          <div className="flex flex-col gap-y-5">
            <p className="font-bold text-lg text-white ml-4 mt-4">Moviegoers</p>
            <p className="font-semibold text-lg text-white ml-4">
              {profileData.poin ? profileData.poin : 0}{" "}
              <span className="font-normal text-[0.625rem]">points</span>
            </p>
            <Image
              alt="star icon"
              src={starIcon}
              className="absolute top-[10px] right-[10px]"
            />
          </div>
        </div>
        <div>
          <p className="text-tickitz-basic text-center">
            180 points become a master
          </p>
          <progress className="progress" value={40} max={100}></progress>
        </div>
      </div>
      <Dialog
        open={isModalOpen}
        onClose={modalCloseHandler}
        className="fixed z-10 bg-white/70 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white lg:w-1/2 md:w-11/12 lg:p-16 p-3 rounded-lg shadow-lg text-center z-20">
            <p className="text-2xl font-bold mb-6">Edit Image</p>
            <div className="flex flex-col items-center gap-y-10">
              <div className="relative">
                <figure className="relative overflow-hidden mx-auto h-[136px] w-[136px] rounded-full shadow-[0px_8px_16px_rgba(73,83,99,0.24)]">
                  <Image
                    alt="your profile photo"
                    src={
                      // profileData.image
                      //   ? profileData.image
                      //   : imagePreview
                      //   ? imagePreview
                      //   : defaulProfile
                      profileHandler()
                    }
                    fill={true}
                    priority={true}
                    sizes="136px"
                    className="object-cover object-center"
                  />
                </figure>

                <svg
                  viewBox="-3 -3 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => document.querySelector(".input-field").click()}
                  className="absolute top-[100px] right-[10px] stroke-white bg-tickitz-primary rounded-full h-6 w-6 cursor-pointer">
                  <g clipPath="url(#clip0_63_384)">
                    <path
                      d="M7.79199 1.37481C7.91237 1.25443 8.05528 1.15895 8.21256 1.0938C8.36984 1.02865 8.53842 0.995117 8.70866 0.995117C8.8789 0.995117 9.04747 1.02865 9.20475 1.0938C9.36204 1.15895 9.50495 1.25443 9.62533 1.37481C9.7457 1.49519 9.84119 1.6381 9.90634 1.79538C9.97149 1.95267 10.005 2.12124 10.005 2.29148C10.005 2.46172 9.97149 2.63029 9.90634 2.78758C9.84119 2.94486 9.7457 3.08777 9.62533 3.20815L3.43783 9.39565L0.916992 10.0831L1.60449 7.56231L7.79199 1.37481Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_63_384">
                      <rect width="11" height="11" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <input
                  type="file"
                  className="input-field"
                  multiple
                  hidden
                  onChange={(e) => onImageUpload(e)}
                />
              </div>
              <div className="flex gap-x-3 w-full">
                <div className="change-image-button w-1/2">
                  <button
                    disabled={!image}
                    onClick={updateImageHandler}
                    className="btn normal-case w-full border-transparent text-white bg-tickitz-success hover:text-tickitz-success hover:bg-white hover:border-tickitz-success disabled:bg-[#DADADA] disabled:text-[#88888F]">
                    Change Image
                  </button>
                </div>
                <div className="delete-image-button w-1/2">
                  <button
                    onClick={(e) => deleteImageHandler(e)}
                    className="btn normal-case w-full border-transparent text-white bg-tickitz-darkTitle hover:text-tickitz-darkTitle hover:bg-white">
                    Delete Image
                  </button>
                </div>
              </div>
              <div className="cancel-button w-full">
                <button
                  onClick={modalCloseHandler}
                  className="btn normal-case w-full border-transparent text-white bg-tickitz-error hover:text-tickitz-error hover:bg-white hover:border-tickitz-error">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </section>
  );
}
