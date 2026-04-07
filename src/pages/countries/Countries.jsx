import { useLoaderData } from "react-router";
import { HashLink as Link } from 'react-router-hash-link';
import CountryCard from "../../components/country-card/CountryCard";
import { Helmet } from "react-helmet-async";
import { FaArrowCircleUp } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

const Countries = () => {

    const allCountries = useLoaderData();
    // console.log(allCountries)

    //search functionality
    const [searchTerm, setSearchTerm] = useState("");

    const searchedCountry = allCountries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className='' id="top">
            <h1 className='text-center text-xl font-semibold uppercase pb-12'>All countries</h1>

            <div className="border border-gray-300 mb-6 rounded-lg flex items-center px-4 py-2">
                <CiSearch /> <span></span>
                <input
                className="ml-4 w-full outline-none"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12'>
                {searchedCountry.map((country, index) => <CountryCard
                    country={country}
                    key={index}
                ></CountryCard>)}
            </div>

            <Link
                className='bottom-10 right-10 p-3 bg-black/70 hover:bg-red-700/70 transition text-white rounded-lg fixed'
                to='#top'
                smooth>
                <FaArrowCircleUp />
            </Link>
            <Helmet title="All Countries"></Helmet>
        </div>
    );
};

export default Countries;