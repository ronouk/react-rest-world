import Header from '../components/header/Header';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../components/footer/Footer';
import { HelmetProvider } from 'react-helmet-async';
import Loader from '../utilities/Loader';

const Root = () => {

    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';

    return (
        <div className='flex flex-col min-h-screen'>
            <HelmetProvider>

                {
                    isLoading && <Loader></Loader>
                }
                
                <Header></Header>
                <div className='flex flex-1 justify-center items-center w-11/12 md:w-10/12 mx-auto'>
                    <Outlet></Outlet>
                </div>
                <Footer></Footer>
            </HelmetProvider>
        </div>
    );
};

export default Root;