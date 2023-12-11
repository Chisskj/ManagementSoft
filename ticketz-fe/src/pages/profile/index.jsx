import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PrivateRoute from "utils/wrapper/privateRoute";
import { useDispatch } from "react-redux";
import { profileAction } from "redux/slices/user";
import {
  getProfileData,
  changeProfileData,
  changePassword,
} from "utils/https/user";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";
import Loader from "components/Loader";

function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.data.token);

	const controller = useMemo(() => new AbortController(), []);

	const [visible1, setVisible1] = useState(false);
	const [visible2, setVisible2] = useState(false);
	const [visible3, setVisible3] = useState(false);
	const [profileData, setProfileData] = useState({});
	const [detailsForm, setDetailsForm] = useState({
		first_name: "",
		last_name: "",
		prefix: "",
		phoneNum: "",
	});
	const [passwordForm, setPasswordForm] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const phoneNumber = profileData["phone"];

	useEffect(() => {
		setIsLoading(true);
		getProfileData(token, controller)
			.then((res) => {
				setProfileData(res["data"]["data"][0]);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, [token, controller]);

	const onDetailsFormChange = (e) => {
		const { name, value } = e.target;
		setDetailsForm((prevForm) => ({ ...prevForm, [name]: value }));
	};

	const onPasswordChange = (e) => {
		const { name, value } = e.target;
		setPasswordForm((prevForm) => ({ ...prevForm, [name]: value }));
	};

	const updateProfileHandler = (e) => {
		e.preventDefault();

		const phone = detailsForm.prefix + detailsForm.phoneNum;

		toast.promise(
			changeProfileData(
				detailsForm.first_name || profileData.first_name,
				detailsForm.last_name || profileData.last_name,
				phone || profileData.phone,
				token,
				controller
			),
			{
				pending: "Please wait...",
				success: {
					render({ data }) {
						setTimeout(() => {
							router.reload();
						}, 3000);
              dispatch(profileAction.getProfile({ token, controller }));
						console.log(data["data"]["msg"]);
						return data["data"]["msg"];
					},
				},
				error: {
					render({ data }) {
						console.log(data["data"]);
						return data["data"];
					},
				},
			}
		);
	};

	const updateHandler = (e) => {
		e.preventDefault();

		toast.promise(changePassword(passwordForm, token, controller), {
			pending: "Please wait...",
			success: {
				render({ data }) {
					setTimeout(() => {
						setPasswordForm({
							oldPassword: "",
							newPassword: "",
							confirmPassword: "",
						});
						router.reload();
					}, 3000);
					return data["data"]["msg"];
				},
			},
			error: {
				render({ data }) {
					setTimeout(() => {
						setPasswordForm({
							oldPassword: "",
							newPassword: "",
							confirmPassword: "",
						});
						router.reload();
					}, 3000);
					const errResponse = data["response"]["data"]["msg"];
					return errResponse === "Password old Salah" ? "Wrong old password" : errResponse;
				},
			},
		});
	};

	return (
		<Layout title={"Your Profile"}>
			<div className="">
        {isLoading && <Loader />}
				<Navbar />
				<div className="board-tab lg:hidden gap-x-20 border-b border-b-[#DEDEDE] flex md:justify-between md:px-20 px-5 pt-10">
					<div className="cursor-pointer flex flex-col gap-y-5">
						<p className="text-sm text-tickitz-darkTitle">Details Account</p>
						<span className="border-b-2 border-b-tickitz-primary w-full"></span>
					</div>
					<div className="cursor-pointer flex flex-col gap-y-5">
						<Link href={"/history"} className="text-lg text-[#AAAAAA]">
							Order History
						</Link>
						<span className=""></span>
					</div>
				</div>
				<main className="bg-[#F5F6F8] flex lg:flex-row flex-col gap-x-5 gap-y-5 lg:px-20 px-5 py-10">
					<Sidebar isHistory={false} />
					<p className="lg:hidden font-semibold text-lg text-tickitz-darkTitle">Account Settings</p>
					<section className="bg-white lg:w-2/3 w-full flex flex-col rounded-md shadow-[0px,8px,32px,rgba(186,186,186,0.08)] py-12 gap-y-10">
						<div className="board-tab lg:flex gap-x-20 border-b border-b-[#DEDEDE] hidden px-8">
							<div className="cursor-pointer flex flex-col gap-y-5">
								<p className="text-lg text-tickitz-darkTitle">Account Settings</p>
								<span className="border-b-2 border-b-tickitz-primary w-full"></span>
							</div>
							<div className="cursor-pointer flex flex-col gap-y-5">
								<Link href={"/history"} className="text-lg text-[#AAAAAA]">
									Order History
								</Link>
								<span className=""></span>
							</div>
						</div>
						<div className="details-information flex flex-col gap-y-5 pt-5 md:px-8 px-4">
							<div>
								<p className="text-tickitz-darkTitle">Details Information</p>
								<div className="divider h-[1px] w-full bg-[#DEDEDE]"></div>
							</div>
							<div className="lg:grid lg:grid-cols-2 flex flex-col gap-5">
								<div className="first-name-input flex flex-col gap-y-2">
									<label className="text-tickitz-basic">First Name</label>
									<input
										type="text"
										name="first_name"
										onChange={onDetailsFormChange}
										defaultValue={profileData.first_name && profileData.first_name}
										className="appearance-none focus:outline-none border border-[#DEDEDE] bg-[#FCFDFE] rounded p-4"
									/>
								</div>
								<div className="last-name-input flex flex-col gap-y-2">
									<label className="text-tickitz-basic">Last Name</label>
									<input
										type="text"
										name="last_name"
										onChange={onDetailsFormChange}
										defaultValue={profileData.last_name && profileData.last_name}
										className="appearance-none focus:outline-none border border-[#DEDEDE] bg-[#FCFDFE] rounded p-4"
									/>
								</div>
								<div className="email-input flex flex-col gap-y-2">
									<label className="text-tickitz-basic">E-mail</label>
									<input
										type="email"
										defaultValue={profileData.email && profileData.email}
										className="appearance-none focus:outline-none border border-[#DEDEDE] bg-[#FCFDFE] rounded p-4"
									/>
								</div>
								<div className="phone-input flex flex-col gap-y-2">
									<label className="text-tickitz-basic">Phone Number</label>
									<div className="flex">
										<div className="relative w-1/5">
											<select
												name="prefix"
												onChange={onDetailsFormChange}
												className="appearance-none focus:outline-none dropd text-[#4E4B66] bg-[#FCFDFE] py-4 lg:px-4 px-2 border border-r-transparent rounded-l-md w-full"
											>
												<option
													selected={profileData.phone && phoneNumber.startsWith("+62")}
													value="+62"
												>
													+62
												</option>
												<option
													selected={profileData.phone && phoneNumber.startsWith("+65")}
													value="+65"
												>
													+65
												</option>
												<option
													selected={profileData.phone && phoneNumber.startsWith("+1")}
													value="+1"
												>
													+1
												</option>
											</select>
											<div className="absolute top-[-15px] left-[66px] h-1/2 w-[1px] bg-[#DEDEDE] transform rotate-180 origin-bottom-left"></div>
										</div>
										<input
											type="tel"
											name="phoneNum"
											onChange={onDetailsFormChange}
											defaultValue={
												profileData.phone && profileData.phone.replace(/^\+62|\+65|\+1/, "")
											}
											className="appearance-none focus:outline-none border border-[#DEDEDE] bg-[#FCFDFE] border-l-transparent rounded-r-md p-4 w-4/5"
										/>
									</div>
								</div>
							</div>
							<div className="lg:w-1/2">
								<button
									onClick={(e) => updateProfileHandler(e)}
									className="btn normal-case border-transparent bg-tickitz-primary text-white hover:text-tickitz-primary w-full"
								>
									Update Changes
								</button>
							</div>
						</div>
						<div className="accounts-and-privacy flex flex-col gap-y-5 pt-5 md:px-8 px-4">
							<div>
								<p className="text-tickitz-darkTitle">Accounts and Privacy</p>
								<div className="divider h-[1px] w-full bg-[#DEDEDE]"></div>
							</div>
							<div className="lg:grid flex lg:grid-cols-2 flex-col gap-y-5 gap-x-5">
								<div className="flex flex-col gap-y-2">
									<label className="text-tickitz-basic">Old Password</label>
									<div className="old-password relative">
										<input
											type={visible1 ? "text" : "password"}
											name="oldPassword"
											onChange={onPasswordChange}
											placeholder="Write your old password"
											className="appearance-none focus:outline-none border border-[#DEDEDE] bg-[#FCFDFE] rounded p-4 w-full"
										/>
										{visible1 ? (
											<i
												onClick={() => setVisible1(!visible1)}
												className="bi bi-eye-slash text-xl text-[#A0A3BD] absolute top-[15px] right-[10px] cursor-pointer"
											></i>
										) : (
											<i
												onClick={() => setVisible1(!visible1)}
												className="bi bi-eye text-xl text-[#A0A3BD] absolute top-[15px] right-[10px] cursor-pointer"
											></i>
										)}
									</div>
								</div>
								<div className="flex flex-col gap-y-2">
									<label className="text-tickitz-basic">New Password</label>
									<div className="new-password relative">
										<input
											type={visible2 ? "text" : "password"}
											name="newPassword"
											onChange={onPasswordChange}
											placeholder="Write your new password"
											className="appearance-none focus:outline-none border border-[#DEDEDE] bg-[#FCFDFE] rounded p-4 w-full"
										/>
										{visible2 ? (
											<i
												onClick={() => setVisible2(!visible2)}
												className="bi bi-eye-slash text-xl text-[#A0A3BD] absolute top-[15px] right-[10px] cursor-pointer"
											></i>
										) : (
											<i
												onClick={() => setVisible2(!visible2)}
												className="bi bi-eye text-xl text-[#A0A3BD] absolute top-[15px] right-[10px] cursor-pointer"
											></i>
										)}
									</div>
								</div>
								<div className="flex flex-col gap-y-2">
									<label className="text-tickitz-basic">Confirm Password</label>
									<div className="confirm-password relative">
										<input
											type={visible3 ? "text" : "password"}
											name="confirmPassword"
											onChange={onPasswordChange}
											placeholder="Confirm your new password"
											className="appearance-none focus:outline-none border border-[#DEDEDE] bg-[#FCFDFE] rounded p-4 w-full"
										/>
										{visible3 ? (
											<i
												onClick={() => setVisible3(!visible3)}
												className="bi bi-eye-slash text-xl text-[#A0A3BD] absolute top-[15px] right-[10px] cursor-pointer"
											></i>
										) : (
											<i
												onClick={() => setVisible3(!visible3)}
												className="bi bi-eye text-xl text-[#A0A3BD] absolute top-[15px] right-[10px] cursor-pointer"
											></i>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="lg:w-1/2 md:pl-8 pl-4">
							<button
								onClick={(e) => updateHandler(e)}
								className="btn normal-case border-transparent bg-tickitz-primary text-white hover:text-tickitz-primary w-full"
							>
								Update Changes
							</button>
						</div>
					</section>
				</main>
				<Footer />
			</div>
		</Layout>
	);
}

export default PrivateRoute(Profile);
