import React from 'react';
import NewBanner from './NewBanner';
import HomeCatList from './HomeCatList';
import TrendingProducts from './TrendingProducts'
import HomeProductList from './HomeProductList';
import LandingCatNav from './LandingCatNav';
import Usp from './Usp';
import Newsletter from './NewsLetter';
import { useState } from "react";



const LandingPage = () => {

    const [catNavClass , setcatNavClass] = useState("Cat__navbar0")

    var prevScrollpos = window.pageYOffset;
        window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            console.log("Time To show Cat Nav");
            setcatNavClass("Cat__navbar0");
        } else {
            console.log("Time To Hide Cat Nav");
            setcatNavClass("Cat__navbar60");
        }
        prevScrollpos = currentScrollPos;
        }

    return (
        <div>
            <div className='HomeScreen'>
                <div id={catNavClass}>
                   <LandingCatNav />
                </div>
                <div><NewBanner  id="BannerMargin"/></div>
                <div><HomeCatList /></div>
                <div><TrendingProducts/></div>
                <div><HomeProductList /></div>
                <div><Usp /></div>
                <div><Newsletter /></div>
                
            </div>
        </div>
    )
}

export default LandingPage;
