import React, { use } from 'react';
import Country from '../country/Country';

const Countries = ({ countriesPromise }) => {
    const countriesData = use(countriesPromise);
    const countries = countriesData.countries
    // console.log(countries[0].ccn3.ccn3)

    return (
        <div>
            <p>Total countries: {countries.length}</p>
            {
                countries.map(country => <Country
                key={country.cca3.cca3}
                country = {country}></Country>)
            }
        </div>
    );
};

export default Countries;