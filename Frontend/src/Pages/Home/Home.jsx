import Banner from "../../Component/Banner/Banner";
import CategorySection from "../../Component/CategorySection/CategorySection";
import HiringBanner from "../../Component/HiringBanner/HiringBanner";
import Navbar from "../../Component/Navbar/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Banner/>
            <div className="divider"></div>
            <CategorySection/>
            <HiringBanner/>
        </div>
    );
};

export default Home;