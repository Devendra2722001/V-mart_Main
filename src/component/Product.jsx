import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import { useDispatch } from 'react-redux';
import { addCart, delCart } from '../redux/action';
import { addFav, delFav } from '../redux/action';


const Product = () => {

    const { _id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartBtn, setCartBtn] = useState("Add to Cart");
    const [favBtn, setFavBtn] = useState("Add to Favorites");
    const [favorit] = useState([]);

    const dispatch = useDispatch();

    const addProduct = (product) => {
        if (cartBtn === "Add to Cart") {            
            setCartBtn("Remove from Cart")
            dispatch(addCart(product));
        }
        else{     
            dispatch(delCart(product))       
            setCartBtn("Add to Cart")
        }
    }

    const addFavorit = (favorit) => {
        if (favBtn === "Add to Favorites") {            
            setFavBtn("Remove From Favorites")
            dispatch(addFav(product));
        }
        else{
            dispatch(delFav(product))            
            setFavBtn("Add to Favorites");            
        }
    }

    useEffect(() => {
        const getProduct = async () => {
            const response = await fetch(`https://vmart-api.herokuapp.com/singleProduct/${_id}`);
            setProduct(await response.json());
            setLoading(false); 
                     
        }
        getProduct();
    }, []);

    const addToCart =async (id) => {
        let result = await fetch(`https://vmart-api.herokuapp.com/cart/${id}`,{
            method: "POST",
            headers :{ token : JSON.parse(localStorage.getItem("token"))
            }
        });
        result = await result.json();
        if (cartBtn === "Add to Cart") {            
            setCartBtn("Remove from Cart")                
        }
        else{
            setCartBtn("Add to Cart")
        }  
      }
      
      const addTofavorite =async (id) => {
        let result = await fetch(`https://vmart-api.herokuapp.com/favourite/${id}`,{
            method: "post",
            headers :{ token : JSON.parse(localStorage.getItem("token"))
            }
        });
        result = await result.json();
      }


    const Loading = () => {
        return (
        <>
        <div className="loading_screen_product">

            <div className="loading_screen_product_img">
                <div>
                    <Skeleton height={150} width={150}/>
                </div>
                <div>
                    <Skeleton height={150} width={150}/>
                </div>
                <div>
                    <Skeleton height={150} width={150}/>
                </div>

            </div>
            <div className="loading_screen_product_img_big">
                <div>
                    <Skeleton height={500} width={500}/>
                </div>
            </div>
          </div>
        </>
        );
      };

    
    const ShowProduct = () => {
        return (
            <>           

                <h6 className="bread_crum_text"><NavLink to="/"  id="copyright">Home</NavLink> / <NavLink to={`/${(product.category)}`} id="copyright">{product.category} </NavLink> / {product.name}</h6>
                        <div className="product-page">

                        <div id="grid_1" >
                            <div id="Tproductimg">
                                <div><img className="product-media-mini" src={product.imageurl} alt={product.name}/></div>
                                <div><img className="product-media-mini" src={product.imageurl} alt={product.name}/></div>
                                <div><img className="product-media-mini" src={product.imageurl} alt={product.name}/></div>
                            </div>
                            <div className="product-media" >
                                <img className="product_img" src={product.imageurl} alt={product.name} />
                            </div>
                        </div>

                        <div id="grid_2">
                            
                                <div className="product-head"> {product.name} </div>
                                <div className="product-price"> Price - {product.price}₹</div>                                
                                <div className="product-category">Category - {product.category}</div>
                                
                                
                                <div className="addcartgocartBTN">
                                    <button className="btn-add-item" onClick={() => {addToCart(product._id);}}>{cartBtn}</button>
                                    <button className="btn-add-item" onClick={() => {addTofavorite(product._id);}}>{favBtn}</button>
                                </div>

                            
                            </div>

                        </div>
                    
                
            </>
        )
    }

    return (
        <div>
            <div>
                <div>
                {loading ? <Loading /> : <ShowProduct />}
                </div>
            </div>
        </div>
    );
}

export default Product;
