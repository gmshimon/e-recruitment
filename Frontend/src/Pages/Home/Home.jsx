import Banner from "../../Component/Banner/Banner";
import CategorySection from "../../Component/CategorySection/CategorySection";
import DetailsBanner from "../../Component/DetailsBanner/DetailsBanner";
import HiringBanner from "../../Component/HiringBanner/HiringBanner";
import LatestJob from "../../Component/LatestJob/LatestJob";
import Navbar from "../../Component/Navbar/Navbar";
import NewsBlogs from "../../Component/NewsBlogs/NewsBlogs";

const Home = () => {
    return (
        <div>
            <Banner/>
            <div className="divider"></div>
            <CategorySection/>
            <HiringBanner/>
            <LatestJob/>
            <DetailsBanner/>
            <NewsBlogs/>
        </div>
    );
};

export default Home;