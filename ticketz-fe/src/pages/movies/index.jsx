import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";

import { getAllMovies } from "utils/https/movies";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Layout from "components/Layout";
import Loader from "components/Loader";

export default function MovieList() {
	const router = useRouter();

	const controller = useMemo(() => new AbortController(), []);

	const [movieData, setMovieData] = useState([]);
	const [sort, setSort] = useState("");
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [pagination, setPagination] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetching = async () => {
		router.replace({
			pathname: "/movies",
			query: {
				sort,
				page,
				search,
			},
		});

		setIsLoading(true);

		try {
			const result = await getAllMovies(10, sort, page, search, controller);
			setMovieData(result["data"]["data"]);
			setPagination(result["data"]["meta"]);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetching();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, sort, page, controller]);

	const handleSort = (e) => {
		let value = e.target.value;
		setSort(value);
	};

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const debouncedSearch = useMemo(() => debounce(handleSearch, 1000), []);

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	return (
		<Layout title={"Movies List"}>
			<div className="">
				{isLoading && <Loader />}
				<Navbar />
				<main className="flex flex-col">
					<section className="flex lg:flex-row flex-col gap-y-5 justify-between md:px-20 px-5 py-10 bg-[#F5F6F8]">
						<div>
							<p className="font-bold text-2xl text-tickitz-primary">Movies List</p>
						</div>
						<div className="flex lg:flex-row flex-col gap-y-3 gap-x-3">
							<div className="relative w-full">
								<i className="bi bi-search absolute top-[7px] left-2 text-xl text-tickitz-primary"></i>
								<input
									type="text"
									onChange={debouncedSearch}
									placeholder="Search here..."
									className="appearance-none focus:outline-none border-transparent pl-10 w-full pr-4 py-2 rounded-md"
								/>
							</div>
							<div className="relative w-full">
								<i className="bi bi-caret-down absolute top-[10px] right-[10px] pointer-events-none"></i>
								<select
									onChange={handleSort}
									name="sort"
									className="border border-gray-300 rounded-md text-gray-600 h-10 pl-5 w-full bg-white hover:border-gray-400 focus:outline-none appearance-none"
									id="filter"
								>
									<option value="">Sort by</option>
									<option value="name_asc">Name Ascending</option>
									<option value="name_desc">Name Descending</option>
									<option value="release_asc">Release Asc</option>
									<option value="release_desc">Release Desc</option>
									<option value="duration_asc">Duration Asc</option>
									<option value="duration_desc">Duration Desc</option>
								</select>
							</div>
						</div>
					</section>
					<section className="py-10">
						<div className="md:px-20 px-5">
							<div className="carousel gap-x-10">
								{months.map((month, index) => {
									return (
										<div key={index} className="carousel-item">
											<button className="btn normal-case bg-white text-tickitz-primary hover:text-white hover:bg-tickitz-primary hover:shadow-[0px_8px_30px_rgba(61,64,91,0.3)]">
												{month}
											</button>
										</div>
									);
								})}
							</div>
						</div>
					</section>
					<section className="py-10 min-h-screen">
						<div className="md:px-20 px-5">
							<div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 md:gap-10 gap-5">
								{movieData.map((movie) => {
									return (
										<div
											key={movieData && movie.id}
											onClick={() => router.push(`/movies/${movie.id}`)}
											className="flex flex-col items-center gap-y-7 bg-white border-[0.5px] border-[#DEDEDE] rounded-md p-5 justify-between"
										>
											<figure className="relative overflow-hidden md:h-[14rem] h-[11rem] md:w-[9.938rem] w-[7rem]">
												<Image
													alt="movie-poster"
													src={movieData && movie.movies_image}
													fill={true}
													priority={true}
													sizes="159px"
													className="rounded-md"
												/>
											</figure>
											<div className="flex flex-col">
												<p className="font-bold text-lg text-tickitz-darkTitle text-center">
													{movieData && movie.title}
												</p>
												<p className="text-xs text-[#A0A3BD] text-center">
													{movieData && movie.category}
												</p>
											</div>
											<div className="flex flex-col gap-y-3">
												<button className="btn normal-case text-tickitz-primary border-tickitz-primary bg-white hover:text-white hover:bg-tickitz-primary">
													Details
												</button>
												<button className="btn normal-case text-white border-tickitz-primary bg-tickitz-primary hover:text-tickitz-primary">
													Book Now
												</button>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</section>
					<section className="py-10">
						<div className="flex flex-col items-center gap-y-3">
							<div className="btn-group">
								<button
									disabled={pagination.page === 1}
									onClick={() => setPage(page - 1)}
									className="btn normal-case border-[0.5px] bg-tickitz-primary text-white hover:bg-white hover:text-tickitz-primary"
								>
									Prev
								</button>
								<button
									disabled={pagination.page === pagination.totalPage || pagination.totalPage === 0}
									onClick={() => setPage(page + 1)}
									className="btn normal-case border-[0.5px] bg-tickitz-primary text-white hover:bg-white hover:text-tickitz-primary"
								>
									Next
								</button>
							</div>
							<div>
								<p className="text-tickitz-label">
									Page {pagination.totalPage === 0 ? 0 : pagination.page} of {pagination.totalPage}
								</p>
							</div>
						</div>
					</section>
				</main>
				<Footer />
			</div>
		</Layout>
	);
}
