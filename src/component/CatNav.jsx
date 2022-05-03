import React from 'react'
import { NavLink } from "react-router-dom";

const CatNav = () => {
    return (
        <div>
            <div className="catnavbar" id="Catnav">
                <div className="btn-group">
                    <NavLink to="/"><button className="btn-group__item" id="btn-grp-itm1">Home</button></NavLink>
                    <NavLink to="/mobile"><button className="btn-group__item">Mobile</button></NavLink>
                    <NavLink to="/laptop"><button className="btn-group__item">Laptop</button></NavLink>
                    <NavLink to="/shoes"><button className="btn-group__item" id="btn-grp-itm2">Shoes</button></NavLink>
                </div>
            </div>
        </div>
    )
}

export default CatNav
