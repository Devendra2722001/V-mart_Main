import React from 'react'
import { NavLink } from "react-router-dom";

const LandingCatNav = () => {
    return (
        <div>
            <div className="catnavbar_Black" id="Catnav">
                <div className="btn-group">
                    <NavLink to="/"><button className="btn-group__item_Black" id="btn-grp-itm1">Home</button></NavLink>
                    <NavLink to="/mobile"><button className="btn-group__item_Black">Mobile</button></NavLink>
                    <NavLink to="/laptop"><button className="btn-group__item_Black">Laptop</button></NavLink>
                    <NavLink to="/shoes"><button className="btn-group__item_Black" id="btn-grp-itm2">Shoes</button></NavLink>
                </div>
            </div>
        </div>
    )
}

export default LandingCatNav;
