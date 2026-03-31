import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLoaderData } from 'react-router';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Country = () => {

    const { restApi, countriesApi, cca3Data, gdpWbData } = useLoaderData();

    // restCountries API Data:
    const flag = restApi.flags.svg;
    const flagMeaning = countriesApi?.data?.government?.flag?.value?.meaning?.string;
    const name = restApi.name.common;
    const nameOfficial = restApi.name.official;
    const callingCode = Object.values(restApi.idd);

    const borderCountries = restApi.borders?.map((borderCode, index) => {
        const match = cca3Data?.find(item => item.code === borderCode);
        return match ? <li key={index} className='list-none'>{match.name}</li> : borderCode;
    });

    const languages = Object.values(restApi.languages).join(", ")
    const currencies = Object.values(restApi.currencies)[0];

    const { capital, region, subregion, population, timezones, area, maps, tld } = restApi;

    // CountriesAPI Data:
    const countryDetail = countriesApi?.data?.introduction?.background?.value?.string;
    const pupulation_ranking = countriesApi?.data?.people_and_society?.population?.value?.total?.rank;
    const independenceDay = countriesApi.data.government.independence.value.string;
    const climate = countriesApi.data.geography.climate.value.string;
    const terrain = countriesApi.data.geography.terrain.value.string;

    const naturalResources = countriesApi.data.geography.natural_resources.value.map(data => data.string).join(", ");

    const religions = countriesApi.data.people_and_society.religions.value;

    console.log(`RestCountries API for ${name}: `, restApi, `Countries API for ${name}: `, countriesApi, `cca3 data of all countries: `, cca3Data, `GDP data for ${name}: `, gdpWbData[1]);

    //gdp data
    const gdpYear = gdpWbData[1].map(data => parseInt(data.date));
    const gdpValue = gdpWbData[1].map(data => parseFloat(((data.value) / 1000000000).toFixed(2)));

    const chartData = gdpWbData[1].map(data => ({
        year: data.date,
        gdp: data.value ? parseFloat(((data.value) / 1000000000).toFixed(2)) : 0
    }))
    console.log(gdpYear, typeof gdpYear[0], gdpValue, typeof gdpValue[1], chartData);

    //legend formatter
    const stylizeLegend = (value) => {
        return <span className='text-sm text-green-700'>{value}</span>
    }

    return (
        <div>
            <img src={flag} alt="" />
            <div>flag meaning: {flagMeaning}</div>
            {countryDetail}
            <div>Name: {name}</div>
            <div>Official Name: {nameOfficial}</div>
            <div>Population: {population}</div>

            <div>population rank: {pupulation_ranking}</div>
            <div>Region: {region}</div>
            <div>Sub region: {subregion}</div>
            <div>time zone: {timezones}</div>
            <div>Language: {languages}</div>
            <div>Border country: {borderCountries}</div>
            <div>capital: {capital}</div>
            <div>Currency : {currencies.name} - {currencies.symbol}</div>
            <div>area: {area}</div>
            <div>map: <Link to={maps.googleMaps} target='_blank'>Google Map</Link></div>
            <div>climate: {climate}</div>
            <div>terrain: {terrain}</div>
            <div>natural resources: {naturalResources}</div>

            <div>religion: {religions.map((data, index) => (
                <li key={index} className='list-none'>
                    <span>{data.label}: </span>
                    <span>{data.value.percent}</span>
                </li>
            ))}</div>

            <div>independence day: {independenceDay}</div>
            <div>Regional domain (tld): {tld}</div>
            <div>Calling code: {callingCode}</div>

            {/* rechart for gdp data */}

            <div className='overflow-x-hidden'>
                <ResponsiveContainer width="95%" height={400}>
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 50,
                            right: 0,
                            left: 0,
                            bottom: 10,
                        }}
                    >
                        <XAxis dataKey={"year"} />
                        <YAxis />
                        <Tooltip />
                        <Legend formatter={stylizeLegend} height={30} verticalAlign='top' align='right' />
                        {/* <Tooltip cursor={false} /> */}
                        <Bar dataKey={"gdp"} name="Annual GDP (Billion USD)" fill='red' activeBar={{ fill: "green" }} radius={[5, 5, 0, 0]} />

                    </BarChart>
                </ResponsiveContainer>
            </div>

            <Helmet title={name} />

        </div>
    );
};

export default Country;