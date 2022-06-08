import React from 'react';
import { Link } from "react-router-dom";


const TrendingProducts = () => {
    return (
        <>
            <div className="ShopByCategory">
                <div className="ShopByCategoryText">Trending Products</div>
            </div>
            <div className="TrendingProductsCards"> 

                                <div className="card_Trending">
                                <Link to={`/productlist/628f296dd516b474a4f17f0f`} id="copyright"><div className="Big-card_Trending">                                    
                                    </div></Link>
                                    
                                </div>

                            <div className="gallery">
                                <div className="card_Trending_Small1">
                                <Link to={`/productlist/6284f2578720fb52cc1f18e3`} id="copyright">
                                    <div className="card-inner_Trending1">
                                    
                                    </div>
                                </Link>
                                </div>
                                <div className="card_Trending_Small2">
                                <Link to={`/productlist/628362bc7df7b318cd3b7565`} id="copyright">
                                    <div className="card-inner_Trending2">
                                    
                                    </div>
                                </Link>
                                </div>
                                <div className="card_Trending_Small3" id="MT50">
                                <Link to={`/productlist/62835f1b7df7b318cd3b7553`} id="copyright">
                                    <div className="card-inner_Trending3">
                                    
                                    </div>
                                </Link>
                                </div>
                                <div className="card_Trending_Small4" id="MT50">
                                <Link to={`/productlist/62836838568cb7a3e23f7126`} id="copyright">
                                    <div className="card-inner_Trending4">
                                    
                                    </div>
                                </Link>
                                </div>
                            </div>


                        
                    
                    
            </div>
        </>
    )
}

export default TrendingProducts;
