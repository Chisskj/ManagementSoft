/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import Image from "next/image";
import placeholder from "assets/images/placeholder.jpg";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import hiflix from "assets/icons/hiflix.svg";
import cineone from "assets/icons/CineOne21.svg";
import ebv from "assets/icons/ebv.id.svg";
import Title from "utils/wrapper/title";
import privateRoute from "utils/wrapper/privateRoute";
function ListCategory({ name, listCategory, handleClick }) {
  const isCategory = listCategory && listCategory.includes(name);

  return (
    <li>
      <a
        // onClick={() => handleClick(name)}
        className={"text-tickitz-primary font-bold"}
      >
        {name}
      </a>
    </li>
  );
}

function Admin() {
  const [image, setImage] = useState();

  const showSetImage = () => {
    if (image) {
      return URL.createObjectURL(image);
    }
    return placeholder;
  };
  const onChangeFile = (event) => {
    setImage(event.target.files[0]);
  };
  const [location, setLocation] = useState("Select Location");
  return (
    <>
      <Title title="Admin Page">
        <NavSubLogin />
        <main className="px-[1.8rem] lg:px-[2.8rem] py-14 select-none bg-[#F5F6F8]">
          <section className="w-full flex flex-col lg:flex-row gap-4 px-0 lg:px-10">
            <section className="w-full lg:w-[70%]  flex flex-col">
              <h1 className="font-bold text-xl mb-6">Movie Description</h1>
              <div className="w-full flex flex-col bg-white rounded-lg px-10 pt-14 pb-20 gap-5">
                <div className="flex flex-col lg:flex-row gap-8 justify-center items-center lg:justify-normal lg:items-start">
                  <div className="p-5 border w-full border-tickitz-greyBorder rounded relative md:w-max justify-center items-center flex ">
                    {/* IMG */}
                    <label htmlFor="image" className="cursor-pointer">
                      <span className="w-full md:w-[250px] h-[344px] flex bg-slate-500">
                        <Image
                          src={showSetImage()}
                          alt="img-movie"
                          width={177}
                          height={272}
                          className="w-full h-full object-cover"
                        />
                      </span>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        hidden
                        onChange={onChangeFile}
                      />
                    </label>
                  </div>
                  <div className="  flex flex-col justify-between w-full gap-7">
                    {/* MOVIE NAME */}
                    <div className="form-control w-full">
                      <label className="label" htmlFor="movie-name">
                        <span className="label-text">Movie Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Type movie name"
                        id="movie-name"
                        name="movie_name"
                        // value={form.movie_name}
                        // onChange={onChangeForm}
                        className=" p-5 border-tickitz-greyBorder outline-none rounded-md border"
                      />
                    </div>
                    {/* CATEGORY */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Category</span>
                      </label>
                      <div className="dropdown dropdown-end">
                        <label
                          tabIndex={0}
                          className="btn border-tickitz-greyBorder border bg-white outline-none hover:bg-tickitz-greyBorder rounded justify-start px-4 font-normal w-full"
                        >
                          {/* {category.length > 0 ? (
      category.map((item, idx) => (
        <p key={idx} className="text-black">
          {idx >= 1 ? `, ${item}` : item}
        </p>
      )) */}
                          {/* ) : ( */}
                          <p className="text-tickitz-basic text-base">
                            Set Category
                          </p>
                          {/* )} */}
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded w-[99%] max-h-96 overflow-y-auto"
                        >
                          {/* {dataCategory.length > 0 &&
      dataCategory.map((item) => (
        <ListCategory
          key={item.id}
          name={item.genre_name}
          listCategory={category}
          handleClick={handleSetCategory}
        /> */}
                          {/* ))} */}
                        </ul>
                      </div>
                    </div>
                    {/* TIME GROUP */}
                    <div className="w-full flex gap-3 flex-col lg:flex-row justify-between">
                      {/* RELEASE DATE */}
                      <div className="form-control w-1/2 ">
                        <label className="label" htmlFor="release-date">
                          <span className="label-text">Release Date</span>
                        </label>
                        <input
                          type="date"
                          id="release-date"
                          name="release_date"
                          //   value={form.release_date}
                          //   onChange={onChangeForm}
                          className="p-5 border-tickitz-greyBorder outline-none rounded-md border"
                        />
                      </div>
                      {/* DURATION-H */}
                      <div className="form-control w-1/2  ">
                        <label className="label">
                          <span className="label-text">
                            {"Duration ( hour / minute )"}
                          </span>
                        </label>
                        <div className="w-full flex gap-5 flex-col md:flex-row">
                          <input
                            type="text"
                            name="duration_hour"
                            // value={form.duration_hour}
                            // onChange={onChangeForm}
                            placeholder="HH"
                            className="p-5 border-tickitz-greyBorder outline-none rounded-md border w-1/2"
                          />
                          <input
                            type="text"
                            name="duration_minute"
                            // value={form.duration_minute}
                            // onChange={onChangeForm}
                            placeholder="MM"
                            className="p-5 border-tickitz-greyBorder outline-none rounded-md border w-1/2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="w-full flex flex-col">
                  <div className="w-full flex gap-4 flex-col md:flex-row">
                    <div className="w-[201.6px] flex gap-4 ">
                      <div className="form-control w-full">
                        <label className="label" htmlFor="director">
                          <span className="label-text">Director</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Type director"
                          id="director"
                          name="director"
                          //   value={form.director}
                          //   onChange={onChangeForm}
                          className="p-5 border-tickitz-greyBorder outline-none rounded-md border"
                        />
                      </div>
                    </div>
                    <div className="  w-full flex gap-4">
                      <div className="form-control w-full">
                        <label className="label" htmlFor="casts">
                          <span className="label-text">Casts</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Type casts"
                          id="casts"
                          name="aktors"
                          //   value={form.aktors}
                          //   onChange={onChangeForm}
                          className="p-5 border-tickitz-greyBorder outline-none rounded-md border"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex gap-4">
                    <div className="form-control w-full">
                      <label className="label" htmlFor="sinopsis">
                        <span className="label-text">Synopsis</span>
                      </label>
                      <textarea
                        name="sinopsis"
                        // onChange={onChangeForm}
                        className="p-5 border-tickitz-greyBorder outline-none rounded-md border"
                        placeholder="Type synopsis movie"
                      >
                        {/* {form.sinopsis} */}
                      </textarea>
                    </div>
                  </div>
                </span>
              </div>
            </section>
            <section className="w-full lg:w-[30%]  flex flex-col">
              <h1 className="font-bold text-xl mb-6">Premiere Location</h1>
              <div className="w-full flex flex-col gap-5 p-8 bg-base-100 rounded-lg">
                <div className="dropdown z-0 mb-8">
                  <label
                    tabIndex={0}
                    className="btn flex gap-2 btn-sm bg-tickitz-secondary border-none text-tickitz-darkTitle  hover:bg-tickitz-secondary w-full h-auto p-5 justify-center items-center"
                  >
                    <i className="bi bi-geo-alt-fill text-[1.2rem]"></i>
                    <p>{location}</p>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu menu-compact p-5 shadow bg-base-100 rounded-lg lg:w-[16.375rem] gap-y-4"
                  >
                    {/* <li onClick={() => setLocation("CGV HaNoi Selatan")}>
                    <a>CGV HaNoi Selatan</a>
                  </li>
                  <li onClick={() => setLocation("CGV Paris Van Java Bandung")}>
                    <a>CGV Paris Van Java Bandung</a>
                  </li> */}
                    <li
                      onClick={() => setLocation("Purwokerto")}
                      className=" cursor-pointer hover:bg-tickitz-secondary p-2"
                    >
                      Purwokerto
                    </li>
                    <li
                      onClick={() => setLocation("Padang")}
                      className=" cursor-pointer hover:bg-tickitz-secondary p-2"
                    >
                      Padang
                    </li>

                    <li
                      onClick={() => setLocation("Malang")}
                      className=" cursor-pointer  hover:bg-tickitz-secondary p-2"
                    >
                      Malang
                    </li>

                    <li
                      onClick={() => setLocation("Tuban")}
                      className=" cursor-pointer hover:bg-tickitz-secondary p-2"
                    >
                      Tuban
                    </li>
                  </ul>
                </div>
                <div className="w-full flex flex-wrap justify-between ">
                  <div
                    // onClick={() => setTeather(1)}
                    className={`w-fit flex items-center px-3 py-2 hover:shadow-lg cursor-pointer border-2  rounded-lg`}
                  >
                    <div className="w-20">
                      <Image
                        src={ebv}
                        alt="ebuid"
                        width={50}
                        height={31}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div
                    // onClick={() => setTeather(2)}
                    className={`w-fit flex items-center px-3 py-2 hover:shadow-lg cursor-pointer border-2  rounded-lg`}
                  >
                    <div className="w-20">
                      <Image
                        src={hiflix}
                        alt="ebuid"
                        width={50}
                        height={27}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div
                    // onClick={() => setTeather(3)}
                    className={`w-fit flex items-center px-3 py-2 hover:shadow-lg cursor-pointer border-2  rounded-lg`}
                  >
                    <div className="w-20">
                      <Image
                        src={cineone}
                        alt="ebuid"
                        width={50}
                        height={15}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="font-bold text-2xl mt-8 lg:mt-10 mb-6">
                Showtimes
              </h1>
              <div className="w-full flex flex-col gap-5 py-8 px-8 bg-base-100 rounded-lg">
                {/* OPEN DATE */}
                <div className="form-control  ">
                  <label className="label" htmlFor="open-date"></label>
                  <input
                    type="date"
                    id="open-date"
                    name="open_date"
                    // value={form.open_date}
                    // onChange={onChangeForm}
                    className="input input-bordered input-tickitz-primary rounded"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <input
                    type="text"
                    // value={addTime}
                    // onChange={(e) => setAddTime(e.target.value)}
                    className="  border border-tickitz-primary-focus outline-none w-full rounded-md px-4"
                    placeholder="ex 08:30"
                  />

                  <button className="btn btn-tickitz-primary btn-outline w-fit px-3 ">
                    <i className="bi bi-plus text-2xl"></i>
                  </button>
                </div>
                <div className="w-full flex flex-wrap justify-center transition-all gap-4">
                  {/* {dataTime.map((item, idx) => (
      <p key={idx} className="font-bold transition-all">
        {item}
      </p>
    ))} */}
                </div>
              </div>
              <button className="btn bg-tickitz-primary hover:bg-tickitz-primary text-white mt-10">
                Save
              </button>
            </section>
          </section>
        </main>
        <Footer />
      </Title>
    </>
  );
}

export default privateRoute(Admin);
