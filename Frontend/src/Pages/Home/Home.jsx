import Banner from "../../Component/Banner/Banner";
import CategorySection from "../../Component/CategorySection/CategorySection";
import HiringBanner from "../../Component/HiringBanner/HiringBanner";
import LatestJob from "../../Component/LatestJob/LatestJob";
import Navbar from "../../Component/Navbar/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar/>
             <Banner/>
            <div className="divider"></div>
            <CategorySection/>
            <HiringBanner/>
            <LatestJob/>
        </div>
    );
};

export default Home;