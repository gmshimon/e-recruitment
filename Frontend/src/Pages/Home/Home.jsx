import Banner from "../../Component/Banner/Banner";
import CategorySection from "../../Component/CategorySection/CategorySection";
import DetailsBanner from "../../Component/DetailsBanner/DetailsBanner";
import HiringBanner from "../../Component/HiringBanner/HiringBanner";
import LatestJob from "../../Component/LatestJob/LatestJob";
import NewsBlogs from "../../Component/NewsBlogs/NewsBlogs";
import NewsLetter from "../../Component/NewsLetter/NewsLetter";

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
            <NewsLetter/>
        </div>
    );
};

export default Home;