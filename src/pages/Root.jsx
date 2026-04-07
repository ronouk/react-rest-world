// Root.jsx - Updated to prevent the global spinner from blocking view
import Header from '../components/header/Header';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../components/footer/Footer';
import { HelmetProvider } from 'react-helmet-async';
import Loader from '../utilities/Loader';
import ScrollToTop from '../utilities/ScrollToTop';

const Root = () => {
    const navigation = useNavigation();

    // Logic: Only show the global loader if we are on the initial app load.
    // For navigation between countries, we want the page to stay visible.
    const isInitialLoad = navigation.state === 'loading' && navigation.location === undefined;

    return (
        <div className='flex flex-col min-h-screen'>
            <HelmetProvider>
                {isInitialLoad && <Loader />}

                <ScrollToTop />

                <Header />
                <div className='flex flex-1 justify-center items-center w-11/12 md:w-10/12 mx-auto'>
                    <Outlet />
                </div>
                <Footer />
            </HelmetProvider>
        </div>
    );
};

export default Root;