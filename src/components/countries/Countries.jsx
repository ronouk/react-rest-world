import React, { use, useState } from 'react';
import Country from '../country/Country';
import "./Countries.css"

const Countries = ({ countriesPromise }) => {

    const [visitedCountries, setVisitedCountries] = useState([]);
    const [visitedFlags, setVisitedFlags] = useState([])

    const handleVisitedCountries = (country) => {
        console.log("Handle visited clicked", country);
        const newVisitedCountries = [...visitedCountries, country];
        setVisitedCountries(newVisitedCountries)
    }

    const handleVisitedFlags = (flag) => {
        const newVisitedFlags = [...visitedFlags, flag];
        setVisitedFlags(newVisitedFlags);
    }

    const countriesData = use(countriesPromise);
    const countries = countriesData.countries
    // console.log(countries[0].ccn3.ccn3)

    return (
        <div>
            <p>Total countries: {countries.length}</p>
            <p>Total visited countries: {visitedCountries.length}</p>
            <p>Total visited flags: {visitedFlags.length}</p>
            <ol>
                {
                    visitedCountries.map(country => <li
                        key={country.cca3.cca3}
                    >{country.name.common}
                    </li>)
                }
            </ol>
            <div className='visited-flags'>
                {
                    visitedFlags.map((flag, index) => <img
                        key={index}
                        src={flag}
                    ></img>)
                }
            </div>
            <div id='countries'>
                {
                    countries.map(country => <Country
                        key={country.cca3.cca3}
                        handleVisitedCountries={handleVisitedCountries}
                        handleVisitedFlags={handleVisitedFlags}
                        country={country}></Country>)
                }
            </div>
        </div>
    );
};

export default Countries;