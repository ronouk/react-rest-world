import React, { useEffect, useState } from 'react';
import "./Country.css";
import { Helmet } from 'react-helmet-async';
import { HashLink as Link } from 'react-router-hash-link';
import { useLoaderData, useNavigate } from 'react-router';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Loader from '../../utilities/Loader';
import { FaArrowCircleUp } from 'react-icons/fa';

const Country = () => {
    const { restApi, cca3Data, id } = useLoaderData();
    const navigate = useNavigate();

    const [gdpWbData, setGdpWbData] = useState(null);
    const [countriesApi, setCountriesApi] = useState(null);
    const [isGdpLoading, setIsGdpLoading] = useState(true);

    useEffect(() => {
        // Reset states when ID changes to show loaders for the new country
        setGdpWbData(null);
        setCountriesApi(null);
        setIsGdpLoading(true);

        // 1. Fetch GDP Data independently
        const fetchGdp = async () => {
            const urlGdpWb = `https://api.worldbank.org/v2/country/${id}/indicator/NY.GDP.MKTP.CD?format=json&date=1971:2024`;
            try {
                const resGdp = await fetch(urlGdpWb);
                if (resGdp.ok) {
                    const gdpJson = await resGdp.json();
                    setGdpWbData(gdpJson);
                }
            } catch (error) {
                console.log("GDP fetch failed", error);
            } finally {
                setIsGdpLoading(false);
            }
        };

        // 2. Fetch Countries API Data independently
        const fetchExtraDetails = async () => {
            const urlCountriesApiMetaData = "https://countries.altoal.com/api/v1/metadata.json";
            try {
                const resMetaData = await fetch(urlCountriesApiMetaData);
                if (resMetaData.ok) {
                    const metaData = await resMetaData.json();
                    const slug = Object.keys(metaData.countries).find(key => 
                        metaData.countries[key]?.code?.iso2?.toUpperCase() === id.toUpperCase()
                    );

                    if (slug) {
                        const resDetail = await fetch(`https://countries.altoal.com/api/v1/name/${slug}.json`);
                        const detailsJson = await resDetail.json();
                        setCountriesApi(detailsJson);
                    }
                }
            } catch (error) {
                console.log("Countries API fetch failed", error);
            }
        };

        fetchGdp();
        fetchExtraDetails();
    }, [id]);

    // restCountries API Data (Available Immediately)
    const name = restApi?.name?.common;
    const nameOfficial = restApi?.name?.official;
    const flag = restApi?.flags?.svg;
    const callingCodeRoot = restApi?.idd?.root;
    const callingCodeSuffixes = restApi?.idd?.suffixes ? Object.values(restApi.idd.suffixes).join(", ") : "No data found";

    const borderCountries = restApi?.borders?.map((borderCode) => {
        const match = cca3Data?.find(item => item.code === borderCode);
        return match ? match?.name : borderCode;
    });

    const borderCountryList = borderCountries ? borderCountries.join(", ") : "No data found";
    const languages = restApi?.languages ? Object.values(restApi.languages).join(", ") : "No data found";
    const currencies = restApi?.currencies ? Object.values(restApi.currencies)[0] : "No data found";

    const { 
        capital = "No data found", 
        region = "No data found", 
        subregion = "No data found", 
        population = 0, 
        timezones = [], 
        area = "No data available", 
        maps = "No data available", 
        tld = "No data available" 
    } = restApi;

    // CountriesAPI Data (Async variables)
    const flagMeaning = countriesApi?.data?.government?.flag?.value?.meaning?.string;
    const countryDetail = countriesApi?.data?.introduction?.background?.value?.string;
    const pupulation_ranking = countriesApi?.data?.people_and_society?.population?.value?.total?.rank;
    const independenceDay = countriesApi?.data?.government?.independence?.value?.string;
    const climate = countriesApi?.data?.geography?.climate?.value?.string;
    const terrain = countriesApi?.data?.geography?.terrain?.value?.string;
    const naturalResources = countriesApi?.data?.geography?.natural_resources?.value?.map(data => data.string).join(", ");
    const religions = countriesApi?.data?.people_and_society?.religions?.value || [];

    // GDP Chart Data
    const chartData = gdpWbData?.[1]?.map(data => ({
        year: data?.date,
        gdp: data?.value ? parseFloat(((data?.value) / 1000000000).toFixed(2)) : 0
    })) || [];

    const stylizeLegend = (value) => <span className='text-sm text-green-700'>{value}</span>;

    const renderAsyncValue = (value, fallback = "No data found") => {
        return value ? value : (countriesApi ? fallback : <span className="animate-pulse text-gray-400 italic">Loading...</span>);
    };

    return (
        <div>
            <Helmet title={name} />

            <div className='flex flex-col gap-6'>
                {/* banner - uses restApi (Immediate) */}
                <div className='relative' id='banner'>
                    <div className='header rounded-3xl w-full h-120 bg-no-repeat bg-cover bg-center flex justify-center items-center' 
                         style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${flag})` }}>
                        <div className='w-4/5 md:w-3/5 lg:w-2/5 h-2/5 sm:h-3/5 bg-white/30 p-4 rounded-lg overflow-hidden flex justify-center items-center'>
                            <img src={flag} alt="" className='rounded-lg max-h-full max-w-full object-contain' />
                        </div>
                    </div>
                    <div className='absolute bottom-10 left-10 text-white flex flex-col gap-3'>
                        <div className='text-xl font-bold uppercase'>Country: {name}</div>
                        <div>Official Name: {nameOfficial}</div>
                    </div>
                </div>

                <div className='flex flex-col gap-6 text-gray-600'>
                    {/* Mixed Detail Section */}
                    <div>
                        <h1>About the Flag:</h1>
                        <div className='first-letter:uppercase'>
                            {renderAsyncValue(flagMeaning)}
                        </div>
                    </div>
                    <div>
                        <h1>Overview</h1>
                        <div>{renderAsyncValue(countryDetail)}</div>
                    </div>

                    <div>
                        <h1>Key Information</h1>
                        <div className='key-information flex flex-col gap-3'>
                            <div>Capital: {capital}</div>
                            <div>Independence day: {renderAsyncValue(independenceDay)}</div>
                            <div>Area: {area} km<span className='align-super text-xs'>2</span></div>
                            <div>
                                <div>Population: {(population / 1000000).toFixed(2)} Millions</div>
                                <div>Population rank: {renderAsyncValue(pupulation_ranking)}</div>
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
                            <div>Currency : {currencies?.name || "N/A"} - {currencies?.symbol || ""}</div>
                            <div>Map: <Link className='text-red-700' to={maps?.googleMaps || null} target='_blank'>Google Map</Link></div>
                            
                            <div>Climate: {renderAsyncValue(climate)}</div>
                            <div>Terrain: {renderAsyncValue(terrain)}</div>
                            <div>Natural resources: {renderAsyncValue(naturalResources)}</div>
                            
                            <div>Religion: 
                                {countriesApi ? (religions.length > 0 ? religions.map((data, index) => (
                                    <li key={index} className='list-none'>
                                        <span>{data.label}: </span>
                                        <span>{data.value.percent}</span>
                                    </li>
                                )) : " No data found") : <span className="animate-pulse text-gray-400 italic ml-2">Loading...</span>}
                            </div>

                            <div>Regional domain (tld): {tld}</div>
                            <div>
                                <div>Calling code root: {callingCodeRoot}</div>
                                <div>Calling code suffixes: {callingCodeSuffixes}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* rechart section */}
                <div className='overflow-x-hidden'>
                    <h1>Historic GDP Data</h1>
                    {isGdpLoading ? (
                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
                            <span className="animate-bounce text-red-700">Loading Chart Data...</span>
                        </div>
                    ) : (
                        chartData.length !== 0 ? (
                            <ResponsiveContainer width="95%" height={400}>
                                <BarChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
                                    <XAxis dataKey={"year"} />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend formatter={stylizeLegend} height={30} verticalAlign='top' align='right' />
                                    <Bar dataKey={"gdp"} name="Annual GDP (Billion USD)" fill='red' activeBar={{ fill: "green" }} radius={[5, 5, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : <span>No GDP Data Found</span>
                    )}
                    <div className='text-center'>
                        {!isGdpLoading && chartData.length !== 0 && (
                            <span>Source: <Link className='text-red-700' to={`https://data.worldbank.org/indicator/NY.GDP.MKTP.CD?locations=${id}`} target='_blank'>World Bank</Link></span>
                        )}
                    </div>
                </div>

                <button className="btn" onClick={() => navigate(-1)}>Go Back</button>
                <Link className='bottom-10 right-10 p-3 bg-black/70 hover:bg-red-700/70 transition text-white rounded-lg fixed' to='#banner' smooth><FaArrowCircleUp /></Link>
            </div>
        </div>
    );
};

export default Country;