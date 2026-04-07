import React from 'react';
import { NavLink } from 'react-router';
// import missingData from "./missingInformation.json"

const CountryCard = ({ country, sort }) => {

    const { capital, region, population, cca2, area } = country;

    const flag = country?.flags?.png;
    const flagAlt = country.flags.alt;
    const map = country.maps.googleMaps;
    const name = country.name.common;

    const handleMapClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(map, "_blank")
    }


    const displayPopulation = (population > 1000000) ? ((population / 1000000).toFixed(2) + "M") : ((population > 1000) ? ((population / 1000).toFixed(2) + "K") : population);

    return (
        <div className='bg-white'>
            <div className='border flex flex-col h-full rounded-xl overflow-hidden'>
                <NavLink to={`/countrydetails/${cca2}`}>
                    <div className='hover:bg-blue-50 transition'>
                        <div className='flex-1 mx-auto bg-amber-50 hover:bg-amber-100 w-full transition p-4'>
                            <img
                                className='h-36 object-contain mx-auto rounded-lg'
                                src={flag}
                                alt={flagAlt}
                                onError={(e) => {
                                    e.target.src = `https://www.worldometers.info/images/flags/original/${cca2.toLowerCase()}.webp`;
                                }}
                                loading='lazy'
                            ></img>
                        </div>
                        <div className='p-4 space-y-2 text-sm'>
                            <div className='flex justify-between'>
                                <h2 className='font-semibold'>{name}</h2>
                                <span title='Capital'>{capital}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span title='Region'>{region}</span>
                                <span title='Population'>
                                    {sort === 'Population' ? `P: ${displayPopulation}` : <>
                                        A: {area} km<span className='align-super text-xs'>2</span>
                                    </>}
                                </span>
                            </div>
                        </div>
                    </div>
                </NavLink>
                <div onClick={handleMapClick} className='btn flex justify-center w-full bg-green-50 hover:bg-green-200'>
                    Find in Map
                </div>
            </div>
        </div>
    );
};

export default CountryCard;