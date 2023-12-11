import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

export const getCinemas = (controller, cityId) => {
	const url = `${baseUrl}/cinemas?cityId:${cityId}`;
	const config = {signal: controller.signal}
	return axios.get(url, config);
}