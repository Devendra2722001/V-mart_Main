import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";


const Product = () => {

    const { _id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartBtn, setCartBtn] = useState("Add to Cart");
    const [favBtn, setFavBtn] = useState("Add to Favorites");
    const [cartItem , setCartItem] = useState([]);
  
    const addFavorit = (favorit) => {
        if (favBtn === "Add to Favorites") {            
            setFavBtn("Remove From Favorites")
            
        }
        else{
             
            setFavBtn("Add to Favorites");            
        }
    }

    useEffect(() => {
        const getProduct = async () => {
            const response = await fetch(`https://vmart-api.herokuapp.com/singleProduct/${_id}`);
            setProduct(await response.json());
            setLoading(false); 
            getcartItem()         
        }
        getProduct();
    }, []);

     const addToCart =async (_id) => {
        let result = await fetch(`https://vmart-api.herokuapp.com/cart/${_id}`,{
            method: "POST",
            headers :{ token : JSON.parse(localStorage.getItem("token"))
            }
        });
        result = await result.json();
        setCartItem(result);          
      }

    const removeFromCart =async (_id) => {
        let result = await fetch(`https://vmart-api.herokuapp.com/removeFromCart/${_id}`,{
            method: "POST",
            headers :{ token : JSON.parse(localStorage.getItem("token"))
            }
        });
        result = await result.json();
        setCartItem(result);
    }

    const tryingToadd = (_id) =>{     
        if(cartBtn === "Add to Cart"){
            addToCart(_id);
            changeBtn()
        }       
    }

    const tryingToremove = (_id) =>{
        if(cartBtn === "Remove From Cart"){
            console.log("Trying To Remove from cart")
           removeFromCart(_id);
           changeBtn();
        }
    }

    console.log(cartBtn)

      const getcartItem = async() => {
        let result = await fetch("https://vmart-api.herokuapp.com/myCartItem",{
            method: "GET",
            headers :{ token : JSON.parse(localStorage.getItem("token"))
            }
        });
        result = await result.json();
        setCartItem(result);
        
    }

    const changeBtn = () =>{
        console.log("hii");
        //cartBtn == "Add to Cart";
        if (cartBtn === "Add to Cart") {            
            setCartBtn("Remove From Cart")            
        }else{
            setCartBtn("Add to Cart")
        }
        
    }
   
          for (let i = 0; i < cartItem.length; i++) {       

                const matchId = cartItem[i];

                console.log("matchId",matchId.productId);

                const gotId = matchId.productId;

                console.log("gotId",gotId);

                if(gotId===_id){
                    console.log("Id Matched - This Product is already in cart")
                    changeBtn()
                    {break;}                                        
                }else{
                    console.log("Id Did Not Match - This Product is not in cart")
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
                                    <button className="btn-add-item" onClick={() => {tryingToadd(product._id);tryingToremove(product._id);}}>{cartBtn}</button>
                                    <button className="btn-add-item" onClick={() => {removeFromCart(product._id);}}>{favBtn}</button>
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
