import Header from '../components/header/Header';
import { Outlet } from 'react-router';
import Footer from '../components/footer/Footer';
import { HelmetProvider } from 'react-helmet-async';

const Root = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <HelmetProvider>
                <Header></Header>
                <div className='flex-1 w-11/12 md:w-10/12'>
                    <Outlet></Outlet>
                </div>
                <Footer></Footer>
            </HelmetProvider>
        </div>
    );
};

export default Root;