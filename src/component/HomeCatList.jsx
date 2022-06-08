import React from 'react';
import { NavLink } from 'react-router-dom';

const HomeCatList = () => {
    return (
        <>
            <div className="ShopByCategory">
                <div className="ShopByCategoryText">Shop By Category</div>
            </div>
            <div className="MyCatCards"> 
                    
                    <div className="card-row_New">
                
                        <div className="card_New">
                        <NavLink to="/mobile">
                            <div className="card-inner_New">
                            
                            </div>
                        </NavLink>
                        </div>
                        <div className="card_New">
                        <NavLink to="/laptop">
                            <div className="card-inner_New2">
                            
                            </div>
                        </NavLink>
                        </div>
                        <div className="card_New">
                        <NavLink to="/shoes">
                            <div className="card-inner_New3">
                            
                            </div>
                        </NavLink>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default HomeCatList;
