import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import { DateTime } from "luxon";

import { getSingleMovie, getAllShow } from "utils/https/movies";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import CardBrand from "components/CardBrand";
import Layout from "components/Layout";
import Loader from "components/Loader";

import cover from "assets/images/spiderman.png";

import ebv from "assets/icons/ebv.id.svg";
import hiflix from "assets/icons/hiflix.svg";
import cineone from "assets/icons/CineOne21.svg";
import privateRoute from "utils/wrapper/privateRoute";

function Details() {
  const router = useRouter();

  const id = router.query.id;

  const controller = useMemo(() => new AbortController(), []);

  const [movieData, setMovieData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [location, setLocation] = useState("HaNoi");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      getSingleMovie(id, controller)
        .then((res) => {
          setMovieData(res["data"]["data"][0]);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));

      getAllShow(location, id, controller)
        .then((res) => {
          setCardData(res["data"]["data"]);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data);
          setCardData(err.response.data.data);
        });
    }
  }, [id, location, controller]);

  const releaseDate = DateTime.fromISO(movieData["release_date"]).toFormat(
    "MMMM dd, yyyy"
  );

  const durationString = movieData["duration"];
  const [hours, minutes] =
    (durationString &&
      durationString
        .match(/(\d{2}):(\d{2}):(\d{2})/)
        ?.slice(1)
        .map(Number)) ||
    [];
  const formattedDuration = `${
    hours ? hours + " hour" + (hours > 1 ? "s" : "") : ""
  } ${minutes ? minutes + " minute" + (minutes > 1 ? "s" : "") : ""}`.trim();

  // const cardData = [
  // 	{
  // 		name: "Ebv",
  // 		address: "Whatever street No.12, South Purwokerto",
  // 		image: ebv,
  // 		price: 30000,
  // 		showtime: ["08.10am", "09.20am", "10.00am", "11.10am", "12.40am", "14.10am", "14.50am"],
  // 	},
  // 	{
  // 		name: "Hiflix",
  // 		address: "Whatever street No.12, South Purwokerto",
  // 		image: hiflix,
  // 		price: 30000,
  // 		showtime: ["08.10am", "09.20am", "10.00am", "11.10am", "12.40am", "14.10am", "14.50am"],
  // 	},
  // 	{
  // 		name: "Ebv",
  // 		address: "Whatever street No.12, South Purwokerto",
  // 		image: ebv,
  // 		price: 30000,
  // 		showtime: ["08.10am", "09.20am", "10.00am", "11.10am", "12.40am", "14.10am", "14.50am"],
  // 	},
  // 	{
  // 		name: "Hiflix",
  // 		address: "Whatever street No.12, South Purwokerto",
  // 		image: hiflix,
  // 		price: 30000,
  // 		showtime: ["08.10am", "09.20am", "10.00am", "11.10am", "12.40am", "14.10am", "14.50am"],
  // 	},
  // 	{
  // 		name: "Ebv",
  // 		address: "Whatever street No.12, South Purwokerto",
  // 		image: ebv,
  // 		price: 30000,
  // 		showtime: ["08.10am", "09.20am", "10.00am", "11.10am", "12.40am", "14.10am", "14.50am"],
  // 	},
  // 	{
  // 		name: "Hiflix",
  // 		address: "Whatever street No.12, South Purwokerto",
  // 		image: hiflix,
  // 		price: 30000,
  // 		showtime: ["08.10am", "09.20am", "10.00am", "11.10am", "12.40am", "14.10am", "14.50am"],
  // 	},
  // 	{
  // 		name: "Ebv",
  // 		address: "Whatever street No.12, South Purwokerto",
  // 		image: ebv,
  // 		price: 30000,
  // 		showtime: ["08.10am", "09.20am", "10.00am", "11.10am", "12.40am", "14.10am", "14.50am"],
  // 	},
  // 	{
  // 		name: "CineOne21",
  // 		address: "Whatever street No.12, South Purwokerto",
  // 		image: cineone,
  // 		price: 30000,
  // 		showtime: ["08.10am", "09.20am", "10.00am", "11.10am", "12.40am", "14.10am", "14.50am"],
  // 	},
  // ];
  console.log(cardData);
  return (
    <Layout title={movieData["title"] ? movieData["title"] : "Movie detail"}>
      {isLoading && <Loader />}
      <Navbar />
      <main className=" flex flex-col mt-[3.5rem]">
        <section className="flex flex-col lg:flex-row gap-14 justify-center lg:justify-normal items-center lg:items-start p-8 md:px-[4.4rem]">
          <div className=" border-2 border-solid border-tickitz-greyBorder rounded-3xl p-12 justify-center items-center flex w-fit">
            <div className=" w-[14.75rem] h-[22.625rem] rounded-[0.68rem] relative overflow-hidden">
              <Image
                src={movieData["image"] ? movieData["image"] : cover}
                alt="pp"
                className=" w-full h-full object-cover"
                priority={true}
                fill={true}
                sizes="236px"
                as="image"
              />
            </div>
          </div>
          <div className=" flex flex-col  flex-wrap justify-center items-center pb-20 lg:justify-normal lg:items-start">
            <div className=" flex flex-col gap-2 text-center lg:text-left mb-4">
              <p className=" text-[1.7rem] md:text-3xl lg:text-[2rem] font-bold leading-9">
                {movieData["title"] ? movieData["title"] : "No title available"}
              </p>
              <p className=" text-lg text-tickitz-basic pl-1">
                {movieData["category"]
                  ? movieData["category"]
                  : "No category available"}
              </p>
              <p></p>
            </div>
            <div className=" grid mt-8 grid-cols-2 gap-y-8 w-full flex-wrap xl:w-[50%]">
              <div className=" flex flex-col w-max">
                <h3 className=" text-tickitz-detail">Release Date</h3>
                <p className=" text-[#121212] text-lg">
                  {movieData["release_date"]
                    ? releaseDate
                    : "No release date available"}
                </p>
              </div>
              <div className=" flex flex-col w-max">
                <h3 className=" text-tickitz-detail">Duration</h3>
                <p className=" text-[#121212] text-lg">
                  {movieData["duration"]
                    ? formattedDuration
                    : "No duration available"}
                </p>
              </div>
              <div className=" flex flex-col w-max">
                <h3 className=" text-tickitz-detail">Directed by</h3>
                <p className=" text-[#121212] text-lg">
                  {movieData["director"]
                    ? movieData["director"]
                    : "No director available"}
                </p>
              </div>
              <div className=" flex flex-col w-[11.8rem] md:w-[18.8rem] xl:w-[25.875rem] flex-wrap">
                <h3 className=" text-tickitz-detail">Cast</h3>
                <p className=" text-[#121212] text-lg">
                  {movieData["casts"]
                    ? movieData["casts"]
                    : "No casts available"}
                </p>
              </div>
            </div>
            <hr className=" bg-tickitz-label w-full my-6" />
            <div className=" flex gap-2 flex-col">
              <h3 className=" text-xl text-black font-bold">Synopsis</h3>
              <p className=" text-lg leading-8 text-tickitz-basic">
                {movieData["synopsis"]
                  ? movieData["synopsis"]
                  : "No synopsis available"}
              </p>
            </div>
          </div>
        </section>
        <section className=" bg-tickitz-bgDetail w-full py-[4.5rem]  px-8 md:px-[4.4rem]">
          <h1 className=" text-2xl text-tickitz-darkTitle font-bold text-center">
            Showtimes and Tickets
          </h1>
          <div className=" flex gap-7 mt-10 justify-center cursor-pointer px-3">
            <div className=" flex justify-center items-center gap-3 bg-[#EFF0F6] w-72 h-14 rounded-md px-6">
              <i className="bi bi-calendar4 text-[1.5rem]"></i>
              <input
                name="date"
                type="date"
                className=" outline-none bg-[#EFF0F6] cursor-pointer"
              />
            </div>
            <div className="dropdown flex bg-[#EFF0F6] w-72 h-14 rounded-md px-6 cursor-pointer">
              <label
                tabIndex={0}
                className="flex justify-between items-center gap-x-3 w-full cursor-pointer"
              >
                <div className="flex gap-1 justify-center items-center">
                  <i className="bi bi-geo-alt-fill text-[1.2rem]"></i>
                  <p className="text-[1rem]">
                    {location === "" ? "Hanoi" : location}
                  </p>
                </div>
                <div>
                  <i className="bi bi-chevron-compact-down"></i>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-lg w-60"
              >
                <li onClick={() => setLocation("Hanoi")}>
                  <p>Hanoi</p>
                </li>
                <li onClick={() => setLocation("BacGiang")}>
                  <p>BacGiang</p>
                </li>
                <li onClick={() => setLocation("SaiGon")}>
                  <p>SaiGon</p>
                </li>
              </ul>
            </div>
          </div>
          <section className=" flex mt-[4.6rem] justify-center gap-8 flex-wrap w-full">
            {cardData.map((data, idx) => {
              return (
                <CardBrand
                  key={idx}
                  id={data.id}
                  name={data.cinema_title}
                  address={data.address}
                  image={data.cinema_brand_image}
                  price={data.price}
                  showtime={data.cinema_showtime}
                />
              );
            })}
          </section>
          {cardData.length > 10 && (
            <div className=" flex gap-12 py-12 w-full items-center">
              <div className=" w-full h-[1px] bg-tickitz-label"></div>
              <div className=" w-max">
                <p className=" text-tickitz-primary font-bold w-max">
                  View More
                </p>
              </div>
              <div className=" w-full h-[1px] bg-tickitz-label"></div>
            </div>
          )}
          {/* <div className=" flex gap-12 py-12 w-full items-center">
            <div className=" w-full h-[1px] bg-tickitz-label"></div>
            <div className=" w-max">
              <p className=" text-tickitz-primary font-bold w-max">View More</p>
            </div>
            <div className=" w-full h-[1px] bg-tickitz-label"></div>
          </div> */}
        </section>
      </main>
      <Footer />
    </Layout>
  );
}

export default privateRoute(Details);
