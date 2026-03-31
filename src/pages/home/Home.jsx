import { Helmet } from "react-helmet-async";
import Featured from "../../components/featured/Featured";

const Home = () => {
    
    return (
        <div>
            <Featured></Featured>
            <Helmet title="Home"></Helmet>
        </div>
    );
};

export default Home;