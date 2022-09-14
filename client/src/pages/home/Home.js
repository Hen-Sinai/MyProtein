import Navigation from "../../components/Navigation";
import categories from "../../config/categories";
import CategoryGrid from "./categoryGrid/CategoryGrid";
import "./Home.css";
import { useSelector } from 'react-redux'

const Home = () => {
    const token = useSelector((state) => state.auth.token)
    return (
        <div>
            {token ? (
                <>
                <Navigation />
                <h2 className="welcome-header"> Welcome To Your Home </h2>
                <img
                    className="home-banner"
                    alt="gym"
                    src=" https://images.squarespace-cdn.com/content/v1/582173226b8f5b121612ca03/1606694697258-VOMH5ODP86FWUBHIAT9J/New+space+same+vibe.png"
                />
                <h2 className="categories-header">Categories</h2>
                <CategoryGrid options={categories} />
                </>
            ) : (
                <>
                <div className='welcome_layout'>
                    <h1>Join Our World!</h1>
                    <h2>Set Up Your Workout Plan</h2>
                    <h2>Buy And Sell Products</h2>
                    <h2>THRIVE FOR MORE!</h2>
                </div>
                </>
            )}
            
        </div>
    );
};

export default Home;
