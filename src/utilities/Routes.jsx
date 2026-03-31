import { createBrowserRouter } from "react-router";
import Root from "../pages/Root";
import Home from "../pages/home/Home"
import Countries from "../pages/countries/Countries";
import Country from "../components/country/Country";
import Wishlist from "../pages/wishlist/Wishlist";
import CheckPage from "../pages/CheckPage";

const urlRestCountries = "https://restcountries.com/v3.1/all?fields=name,capital,cca2,flags,languages,maps,region,population,area";

const urlCCA3 = "https://gist.githubusercontent.com/bensquire/1ba2037079b69e38bb0d6aea4c4a0229/raw/8609a1a86683bbd6d0e4a7e9456eabf6e7b65b7f/countries.json";

const restCountriesLoader = async () => {
    const response = await fetch(urlRestCountries)

    if (!response.ok) {
        throw new Error("Error in loading rescountries data")
    }

    return response.json()
}

// loader to use
export const combinedLoader = async ({ params }) => {

    const { id } = params;
    // if (!countryName) return null;

    // const cleanName = countryName.replaceAll("-", " ")

    const urlRestCountry = `https://restcountries.com/v3.1/alpha/${id}`
    const urlGdpWb = `https://api.worldbank.org/v2/country/${id}/indicator/NY.GDP.MKTP.CD?format=json&date=1971:2024`

    try {

        // api1 - restcountries
        const resRestCountry = await fetch(urlRestCountry);

        if (!resRestCountry.ok) throw new Error(`Country with cca2 ${id} not found`)

        const restCountryArray = await resRestCountry.json();
        const restCountryData = restCountryArray[0];

        //prepare slug for api2
        const slug = restCountryData.name.common.toLowerCase().replaceAll(" ", "-");
        const urlCountriesApi = `https://countries.altoal.com/api/v1/name/${slug}.json`;

        // api2-countriesapi
        const resCountriesApi = await fetch(urlCountriesApi);
        const countriesApiData = resCountriesApi.ok ? await resCountriesApi.json() : null;

        // api3-cca3 data
        const cca3Promise = await fetch(urlCCA3);
        const cca3Data = await cca3Promise.json();

        // api4 - GDP data
        const resGdpWb = await fetch(urlGdpWb);
        if (!resGdpWb.ok) throw new Error(`Wordbank GDP data for ${id} not loading`);

        const gdpWbData = await resGdpWb.json();

        return {
            restApi: restCountryData, countriesApi: countriesApiData, cca3Data, gdpWbData
        }
    }

    catch (err) {
        console.log("Loader data error: ", err)
    }

}


// loader for cca3 checking only - /check-api-data
export const combinedLoader1 = async () => {

    const urlCountriesApi = `https://countries.altoal.com/api/v1/metadata.json`;

    try {
        const [res1, res2] = await Promise.all([
            fetch(urlRestCountries),
            fetch(urlCountriesApi)
        ])

        if (!res1.ok || !res2.ok) throw new Error("Data not found");

        const [api1Data, api2Data] = await Promise.all([
            res1.json(),
            res2.json()
        ])

        return { api1Data, api2Data }
    }

    catch (error) {
        console.error("Loader Error", error);

        return {
            api1Data: null,
            api2Data: null
        }
    }

}



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        hydrateFallbackElement: <span>Data Loading...</span>,
        children: [
            {
                index: true,
                Component: Home,
                loader: restCountriesLoader,
            },
            {
                path: "/allcountries",
                Component: Countries,
                loader: restCountriesLoader,
            },
            {
                path: "/countrydetails/:id",
                Component: Country,
                loader: combinedLoader
            },
            {
                path: '/wishlist',
                Component: Wishlist
            },
            {
                path: "/check-api-data",
                Component: CheckPage,
                loader: combinedLoader1
            }
        ]
    },
]);