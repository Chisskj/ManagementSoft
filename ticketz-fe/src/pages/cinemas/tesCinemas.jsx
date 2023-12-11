import React, { useState } from "react";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Layout from "components/Layout";
// import Link from "next/link";
import axios from "axios";
import Link from "next/link";

export default function Cinemas() {
  // const [JktCinemas, setJktCinemas] = useState(false);

  // const handleClick = () => {
  //     setJktCinemas(!JktCinemas);
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
  // };
  const [cinemas, setCinemas] = useState([]);
  const [showBioskops, setShowBioskops] = useState(false);
  const [selectedBioskop, setSelectedBioskop] = useState("");

  let cityId;

  const handleChange = (event) => {
    cityId = event.target.getAttribute('data-city-id');
    console.log("btn clicked")
    fetchCinemas(cityId);
    console.log(cityId);
  }

  const fetchCinemas = async () => {
    console.log(cinemas);
    const response = await axios.get(`${baseUrl}/cinemas?cityId=${cityId}`);
    setCinemas(response.data.data);
    console.log(response.data);
    console.log(cinemas);
  }
  
  const handleCityClick = (city) => {
    setSelectedCity(city);
    setShowBioskops(true);
  };

  const handleBioskopClick = (bioskop) => {
    setSelectedBioskop(bioskop);
  };


  return (
    <>
      <Layout title={"Cinemas List"}>
        <div>
          <Navbar />
          <div>
      <h1>Daftar Bioskop</h1>
      {!showBioskops && (
        <div>
          <p>Silakan pilih kota:</p>
          <ul>
            {cities.map((city) => (
              <li key={city.id} onClick={() => handleCityClick(city.name)}>
                {city.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {showBioskops && (
        <div>
          <p>Daftar bioskop di {selectedCity}:</p>
          <ul>
            {cities
              .find((city) => city.name === selectedCity)
              .bioskops.map((bioskop) => (
                <li
                  key={bioskop.id}
                  onClick={() => handleBioskopClick(bioskop.name)}
                >
                  <Link href={`/bioskop/${bioskop.id}`}>
                    <a>{bioskop.name}</a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
      {selectedBioskop !== "" && (
        <p>
          Anda memilih bioskop <strong>{selectedBioskop}</strong>.
        </p>
      )}
    </div>
  
          <Footer />
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  try {
    const res = await axios.get(`${baseUrl}/cinemas`);
    const data = await res.json(cities);

    return {
      props: {
        cities: data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        cities: [],
      },
    };
  }
}
