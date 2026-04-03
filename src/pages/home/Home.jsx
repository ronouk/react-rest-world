import { Helmet } from "react-helmet-async";
import Featured from "../../components/featured/Featured";
import Banner from "../../components/banner/Banner";

const Home = () => {
    
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <Helmet title="Home"></Helmet>
        </div>
    );
};

export default Home;