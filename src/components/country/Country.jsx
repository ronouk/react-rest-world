import React, { useState } from 'react';
import "./Country.css"

const Country = ({ country, handleVisitedCountries, handleVisitedFlags }) => {
    // console.log(handleVisitedCountries)

    const [visited, setVisited] = useState(false);

    const handleVisited = () => {
        // using if else

        // if (visited) {
        //     setVisited(false)
        // }
        // else {
        //     setVisited(true)
        // }

        // using ternary operator

        // setVisited(visited ? false : true)

        // using bang operator

        setVisited(!visited)
        handleVisitedCountries(country)
    }

    return (
        <div className={`country ${visited && 'country-visited'}`}>
            <img src={country?.flags?.flags?.png} alt={country.flags.flags.alt}></img>

            <div>
                <h3>Name: {country.name.common}</h3>
                <p>Population: {country.population.population}</p>
                <p>Area: {country.area.area} - {country.area.area > 300000 ? "Big Country" : "Small Country"}</p>
            </div>

            <button onClick={handleVisited}>
                {
                    visited ? "Visited" : "Not visited"
                }
            </button>
            <button onClick={() => {
                handleVisitedFlags(country?.flags?.flags?.png)
            }}>Add visited flag</button>
        </div>
    );
};

export default Country;