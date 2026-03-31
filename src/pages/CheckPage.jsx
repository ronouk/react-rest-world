import React from 'react';
import { useLoaderData } from 'react-router';

const CheckPage = () => {

    const { api1Data, api2Data } = useLoaderData()
    const api2DataArray = api2Data?.countries ? Object.values(api2Data.countries) : [];
    console.log("restCountries: ", api1Data, "countriesApi: ", api2DataArray)
    return (
        <div>
            <span className='font-bold text-green-700 uppercase'>Index : Country name : CCA2 : <span title='is available in countriesApi(api2)?'>Status</span></span>
            {api1Data.map((country, index) => {
                const match = api2DataArray.find(data => data.code.iso2 === country.cca2);

                return (
                    <p key={index}>{index} : {country.name.common} : {country.cca2} - {match ? "Found" : <span className='text-red-600'>Not found</span>}</p>
                )
            })}
        </div>
    );
};

export default CheckPage;