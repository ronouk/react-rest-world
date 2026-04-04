import { NavLink, useLoaderData } from "react-router";
import CountryCard from "../../components/country-card/CountryCard";
import { Helmet } from "react-helmet-async";

const Countries = () => {

    const allCountries = useLoaderData();
    // console.log(allCountries)

    return (
        <div className='[content-visibility:auto]'>
            <h1 className='text-center text-xl font-semibold uppercase pb-12'>All countries</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12'>
                {allCountries.map((country, index) => <CountryCard
                    country={country}
                    key={index}
                ></CountryCard>)}
            </div>
            <Helmet title="All Countries"></Helmet>
        </div>
    );
};

export default Countries;