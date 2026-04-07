import {createBrowserRouter} from "react-router";
import Root from "../pages/Root";
import Home from "../pages/home/Home"
import Countries from "../pages/countries/Countries";
import Country from "../components/country/Country";
import Wishlist from "../pages/wishlist/Wishlist";
import CheckPage from "../pages/CheckPage";
import Loader from "./Loader";
import ErrorPage from "../components/error-page/ErrorPage";

const urlRestCountries = "https://restcountries.com/v3.1/all?fields=name,capital,cca2,flags,languages,maps,region,population,area";

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

    // rest api url
    const urlRestCountry = `https://restcountries.com/v3.1/alpha/${id}`;

    //cca3 api url
    const urlCCA3 = "https://gist.githubusercontent.com/bensquire/1ba2037079b69e38bb0d6aea4c4a0229/raw/8609a1a86683bbd6d0e4a7e9456eabf6e7b65b7f/countries.json";


    try {
        // STAGE 1: Fetch everything that only needs the 'id' in parallel
        const [resRest, resCca3] = await Promise.all([
            fetch(urlRestCountry).catch(() => ({ ok: false, status: "Failed" })),
            fetch(urlCCA3).catch(() => ({ ok: false, status: "Failed" })),
        ]);

        // Validate essential data
        if (!resRest.ok) throw new Error(`Country ${id} not found`);

        // Parse JSON in parallel
        const restCountryArray = await resRest.json();
        const restCountryData = restCountryArray[0];
        const cca3Data = resCca3.ok ? await resCca3.json() : [];

        console.log("ID from Params:", id);

        return {
            restApi: restCountryData,
            cca3Data,
            id
        };
    } catch (err) {
        console.error("Loader data error: ", err);
        throw err; // Allow the UI to catch the error if needed
    }
};


// loader for cca3 checking only - /check-api-data
export const combinedLoader1 = async () => {
    const urlCountriesApi = `https://countries.altoal.com/api/v1/metadata.json`;

    try {
        // 1. Parallel Fetching with individual error handling
        const [res1, res2] = await Promise.all([
            fetch(urlRestCountries).catch(err => ({ ok: false, error: err })),
            fetch(urlCountriesApi).catch(err => ({ ok: false, error: err }))
        ]);

        // 2. Individual validation so one failing API doesn't kill the whole page
        const api1Promise = res1.ok ? res1.json() : Promise.resolve(null);
        const api2Promise = res2.ok ? res2.json() : Promise.resolve(null);

        // 3. Parallel JSON parsing
        const [api1Data, api2Data] = await Promise.all([api1Promise, api2Promise]);

        // 4. Return data even if partially successful
        return {
            api1Data,
            api2Data,
            isPartial: !res1.ok || !res2.ok
        };
    } catch (error) {
        console.error("Critical Loader Error:", error);
        return {
            api1Data: null,
            api2Data: null
        };
    }
};



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        hydrateFallbackElement: <Loader></Loader>,
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
                loader: combinedLoader,
                errorElement: <ErrorPage></ErrorPage>
            },
            {
                path: '/wishlist',
                Component: Wishlist
            },
            {
                path: "/check-api-data",
                Component: CheckPage,
                loader: combinedLoader1
            },
            {
                path: "*",
                Component: ErrorPage
            }
        ]
    },
]);