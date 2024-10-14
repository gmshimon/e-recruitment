import Banner from "../../Component/Banner/Banner";
import CategorySection from "../../Component/CategorySection/CategorySection";
import Navbar from "../../Component/Navbar/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Banner/>
            <div className="divider"></div>
            <CategorySection/>
        </div>
    );
};

export default Home;