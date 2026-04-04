import React from 'react';
import "./Country.css";
import { Helmet } from 'react-helmet-async';
import { Link, NavLink, useLoaderData, useNavigate, useNavigation, useParams } from 'react-router';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Loader from '../../utilities/Loader';

const Country = () => {

    const { restApi, countriesApi, cca3Data, gdpWbData } = useLoaderData();

    const navigation = useNavigation();
    const navigate = useNavigate();

    // grab the params
    const idParams = useParams();
    const id = idParams.id;

    const isLoading = navigation.state === "loading";

    if (isLoading) {
        return <Loader></Loader>
    }

    // restCountries API Data:
    const flag = restApi?.flags?.svg;
    const flagMeaning = countriesApi?.data?.government?.flag?.value?.meaning?.string;
    const name = restApi?.name?.common;
    const nameOfficial = restApi?.name?.official;
    const callingCodeRoot = restApi?.idd?.root;
    const callingCodeSuffixes = restApi?.idd?.suffixes ? Object.values(restApi.idd.suffixes).join(", ") : "No data found";

    const borderCountries = restApi?.borders?.map((borderCode) => {
        const match = cca3Data?.find(item => item.code === borderCode);
        return match ? match?.name : borderCode;
    });

    const borderCountryList = borderCountries ? borderCountries.join(", ") : "No data found";

    const languages = restApi?.languages ? Object.values(restApi.languages).join(", ") : "No data found";
    const currencies = restApi?.currencies ? Object.values(restApi.currencies)[0] : "No data found";

    const { capital = "No data found", region = "No data found", subregion = "No data found", population = "No data available", timezones = "No data available", area = "No data available", maps = "No data available", tld = "No data available" } = restApi;

    // CountriesAPI Data:
    const countryDetail = countriesApi?.data?.introduction?.background?.value?.string;
    const pupulation_ranking = countriesApi?.data?.people_and_society?.population?.value?.total?.rank;
    const independenceDay = countriesApi?.data?.government?.independence?.value?.string || "No data found";
    const climate = countriesApi?.data?.geography?.climate?.value?.string;
    const terrain = countriesApi?.data?.geography?.terrain?.value?.string;

    const naturalResources = countriesApi?.data?.geography?.natural_resources?.value?.map(data => data.string).join(", ") || "No data found";

    const religions = countriesApi?.data?.people_and_society?.religions?.value;

    //gdp data
    // const gdpYear = gdpWbData?.[1]?.map(data => parseInt(data?.date)) || [];

    // console.log(gdpYear, gdpValue);

    const chartData = gdpWbData?.[1]?.map(data => ({
        year: data?.date,
        gdp: data?.value ? parseFloat(((data?.value) / 1000000000).toFixed(2)) : 0
    })) || [];

    //legend formatter
    const stylizeLegend = (value) => {
        return <span className='text-sm text-green-700'>{value}</span>
    }

    return (
        <div>

            <div className='flex flex-col gap-6'>

                {/* flag */}
                <div className='relative'>
                    <div className='header rounded-3xl w-full h-120 bg-no-repeat bg-cover bg-center flex justify-center items-center' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${flag})` }}>
                        <div className='w-80 bg-white/30 p-4 rounded-lg sm:w-96 md:w-120 overflow-hidden'>
                            <img src={flag} alt="" className='rounded-lg' />
                        </div>
                    </div>


                    <div className='absolute bottom-10 left-10 text-white flex flex-col gap-3'>
                        <div className='text-xl font-bold uppercase'>Country: {name}</div>
                        <div>Official Name: {nameOfficial}</div>

                    </div>
                </div>

                {/* details */}
                <div className='flex flex-col gap-6 text-gray-600'>
                    <div>
                        <h1>About the Flag:</h1>

                        <div className='first-letter:uppercase'>
                            {flagMeaning || "No description found"}
                        </div>
                    </div>
                    <div>
                        <h1>Overview</h1>
                        <div>{countryDetail}</div>
                    </div>

                    <div>
                        <h1>Key Information</h1>

                        <div className='key-information flex flex-col gap-3'>
                            <div>Capital: {capital}</div>

                            <div>Independence day: {independenceDay}</div>

                            <div>Area: {area} km<span className='align-super text-xs'>2</span> </div>

                            <div>
                                <div>Population: {(population / 1000000).toFixed(2)} Millions</div>
                                <div>Population rank: {pupulation_ranking}</div>
                            </div>

                            <div>
                                <div>Region: {region}</div>
                                <div>Sub region: {subregion}</div>
                            </div>

                            <div>Border country: {borderCountryList}</div>

                            <div>Time zone: {timezones.map((data, index) => (
                                <li key={index} className='list-none'>{data}</li>
                            ))}</div>

                            <div>Language: {languages}</div>

                            <div>Currency : {currencies?.name || null} - {currencies?.symbol || null}</div>

                            <div>Map: <Link className='text-red-700' to={maps?.googleMaps || null} target='_blank'>Google Map</Link></div>

                            <div>Climate: {climate}</div>

                            <div>Terrain: {terrain}</div>

                            <div>Natural resources: {naturalResources}</div>

                            <div>Religion: {religions.map((data, index) => (
                                <li key={index} className='list-none'>
                                    <span>{data.label}: </span>
                                    <span>{data.value.percent}</span>
                                </li>
                            ))}</div>

                            <div>Regional domain (tld): {tld}</div>

                            <div>
                                <div>Calling code root: {callingCodeRoot}</div>
                                <div>Calling code suffixes: {callingCodeSuffixes}</div>
                            </div>

                        </div>
                    </div>
                </div>


                {/* rechart for gdp data */}
                <div className='overflow-x-hidden'>
                    <h1>Historic GDP Data</h1>
                    {
                        (chartData.length !== 0) ?

                            <ResponsiveContainer width="95%" height={400}>

                                <BarChart
                                    data={chartData}
                                    margin={{
                                        top: 10,
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

                            :

                            <span>No GDP Data Found</span>
                    }

                    <div className='text-center'>
                        {
                            (chartData.length !== 0) ? <span>Source: <Link className='text-red-700' to={`https://data.worldbank.org/indicator/NY.GDP.MKTP.CD?locations=${id}`} target='_blank'>World Bank</Link></span> : null
                        }
                    </div>
                </div>

                <button className="btn" onClick={() => navigate(-1)}>Go Back</button>
            </div>


            <Helmet title={name} />

        </div>
    );
};

export default Country;