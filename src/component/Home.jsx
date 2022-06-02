import React from 'react';
import HomeProductList from './HomeProductList';
import Banner from './Banner';
import CatNav from './CatNav';
const Home = () => {
    return (
        <div>
            <CatNav />            
            <Banner />
            <HomeProductList />
        </div>
    )
}

export default Home
