import { NavLink, useLoaderData } from 'react-router';
import CountryCard from '../country-card/CountryCard';
import { useState } from 'react';

const Featured = () => {

    const loadedData = useLoaderData()
    const [featuredCountries, setFeaturedCountries] = useState(loadedData);
    const [limit, setLimit] = useState(20);
    const featured = [...featuredCountries].slice(0, limit);

    const handleSeeMore = () => {
        setLimit(limit + 20);
    }

    //sorting
    const [sort, setSort] = useState('Default');

    const handleSort = (sortType) => {

        if (sortType === 'Name') {
            setSort(sortType);
            const aToZ = [...featuredCountries].sort((a, b) => (a.name.common).localeCompare(b.name.common));
            setFeaturedCountries(aToZ);
        }

        if (sortType === "Population") {
            setSort(sortType)
            const sortByPopulation = [...featuredCountries].sort((a, b) => (b.population) - (a.population));
            setFeaturedCountries(sortByPopulation)
        }

        if (sortType === 'Area') {
            setSort(sortType)
            const sortByArea = [...featuredCountries].sort((a, b) => (b.area) - (a.area));
            setFeaturedCountries(sortByArea);
        }
    }

    return (
        <div className=''>
            <h1 className='text-center text-xl font-semibold uppercase pb-12'>
                {
                    sort === "Name" ? "Countries Alphabatically" : sort === "Population" ? "Most Populous Countries" : sort === "Area" ? "Biggest Countries" : "Featured Countries"
                }
            </h1>

            <div className='text-end pb-6'>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">Sort by: {sort}</div>
                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li
                            onClick={() => handleSort('Name')}
                        ><a>Name</a></li>
                        <li
                            onClick={() => handleSort("Area")}
                        ><a>Area</a></li>
                        <li
                            onClick={() => handleSort('Population')}
                        ><a>Population</a></li>
                        {/* <li><a>GDP</a></li> */}
                    </ul>
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12'>
                {featured.map((country, index) => <CountryCard
                    country={country}
                    key={index}
                    sort={sort}
                ></CountryCard>)}
            </div>
            <button
                className={`btn w-full flex mx-auto mt-12 bg-red-600 hover:bg-green-800 rounded-lg text-white ${limit <= featuredCountries.length ? 'visible' : 'hidden'}`}
                onClick={handleSeeMore}>See More</button>
        </div>
    );
};

export default Featured;