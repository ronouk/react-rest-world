import { NavLink, useLoaderData } from 'react-router';
import CountryCard from '../country-card/CountryCard';
import { useState } from 'react';

const Featured = () => {

    const featuredCountries = useLoaderData();
    const [limit, setLimit] = useState(20);

    const highToLow = [...featuredCountries].sort((a, b) => b.population - a.population).slice(0, limit);

    const handleSeeMore = () => {
        setLimit(limit + 20);
    }


    return (
        <div className=''>
            <h1 className='text-center text-xl font-semibold uppercase mb-12'>Most populous countries</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12'>
                {highToLow.map((country, index) => <CountryCard
                    country={country}
                    key={index}
                ></CountryCard>)}
            </div>
            <button
            className={`btn w-full flex mx-auto mt-12 bg-red-600 hover:bg-green-800 rounded-lg text-white ${limit <= featuredCountries.length ? 'visible' : 'hidden'}`}
            onClick={handleSeeMore}>See More</button>
        </div>
    );
};

export default Featured;