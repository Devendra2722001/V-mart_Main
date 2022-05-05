import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

toast.configure();
const Product = () => {

    const { _id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartBtn, setCartBtn] = useState("Add to Cart");
    const [favBtn, setFavBtn] = useState("Add to Favorites");
    const [cartItem, setCartItem] = useState([]);

    

    const addFavorit = (favorit) => {
        if (favBtn === "Add to Favorites") {
            setFavBtn("Remove From Favorites")

        }
        else {

            setFavBtn("Add to Favorites");
        }
    }

    useEffect(() => {
        getProduct();
        getcartItem(); 
        if(cartItem.length!==0){
            console.log("Cart Is not Empty")
        }
    }, []);

    const getProduct = async () => {
        const response = await fetch(`https://vmart-api.herokuapp.com/singleProduct/${_id}`);
        setProduct(await response.json());
        setLoading(false);
    }
    const addToCart = async (_id) => {
        let result = await fetch(`https://vmart-api.herokuapp.com/cart/${_id}`, {
            method: "POST",
            headers: {
                token: JSON.parse(localStorage.getItem("token"))
            }
        });
        result = await result.json();
        setCartItem(result);
        toast(`${product.name} Added To cart`);
        //setCartBtn("Remove From Cart")
    }

    const removeFromCart = async (_id) => {
        let result = await fetch(`https://vmart-api.herokuapp.com/removeFromCart/${_id}`, {
            method: "POST",
            headers: {
                token: JSON.parse(localStorage.getItem("token"))
            }
        });
        result = await result.json();
        setCartItem(result);
    }

    const tryingToadd = (_id) => {
       // if (cartBtn === "Add to Cart") {
            addToCart(_id);
            //changeBtn()
        //}
    }

    const tryingToremove = (_id) => {
        if (cartBtn === "Remove From Cart") {
            console.log("Trying To Remove from cart")
            removeFromCart(_id);
            setCartBtn("Add To Cart")
            //changeBtn();
        }
    }

    //console.log(cartBtn)

    const getcartItem = async () => {
        let result = await fetch("https://vmart-api.herokuapp.com/myCartItem", {
            method: "GET",
            headers: {
                token: JSON.parse(localStorage.getItem("token"))
            }
        });
        result = await result.json();
        console.log("get cart data:-",result);
        //checkProductExist();
        setCartItem(result);
    }

    // let Checking = [];
    //       for (let i = 0; i < cartItem.length; i++) { 
    //         let Checking = cartItem;
    //         let item_ids = Checking[i].productId            
    //         console.log("this item",item_ids)
    //         if(item_ids[i]===_id){
    //              console.log("Found This Item In Cart");
    //              //Checking.push(item_ids[i]);
    //         }
    //         // pricearray.push(priceofitem[i]);
    //         // break;
    //       }                  
    //     console.log("Checking",Checking);

    
          for (let i = 0; i < cartItem.length; i++) {
            let pricearray = []; 
            let allitem = cartItem;
            let priceofitem = allitem[i].productId
            if(priceofitem!==null){
                //console.log("truing to add price");
                pricearray.push(priceofitem);
            }
            // pricearray.push(priceofitem[i]);
            // break;
            console.log("Cart Product Array",pricearray);
            for (let c = 0; c < cartItem.length; c++) { 
                if(_id===pricearray[c]){
                    console.log("Found This Item In Cart")
                    if (cartBtn === "Add to Cart") {
                        setCartBtn("Remove From Cart")        
                    }
                    //setCartBtn("Remove From Cart")
                }           
              }
          }                  
        

        

          


    // const changeBtn = () => {
    //     console.log("hii");
    //     //cartBtn == "Add to Cart";
    //     if (cartBtn === "Add to Cart") {
    //         setCartBtn("Remove From Cart")
    //     } else {
    //         setCartBtn("Add to Cart")
    //     }

    // }

    


// const checkProductExist = () =>{
  
    
// }

// console.log("lenth check",cartItem.length)
//     if(cartItem.length !== 0){
//         console.log("Condition")

//         for (let i = 0; i < cartItem.length; i++) {

//             console.log(i)
//             const matchId = cartItem[i];
    
//             //console.log("matchId",matchId.productId);
    
//             const gotId = matchId.productId;
    
//             console.log("getId", gotId, typeof (gotId))
//             console.log("Id", _id, typeof (_id))

//             if(i===cartItem.length){
//                 console.log("Finished Reading array")
//             }
    
//             console.log("condtion", gotId === _id)
//             if (gotId === _id) {
//                 console.log("Id Matched - This Product is already in cart")
//                 changeBtn()
//                 if(i===cartItem.length){
//                     console.log("Finished Reading array")
//                 }
//             } else {
//                 console.log("Id Did Not Match - This Product is not in cart")
//             }
//             //break;
//         }
        
//     }

    const addTofavorite = async (id) => {
        let result = await fetch(`https://vmart-api.herokuapp.com/favourite/${id}`, {
            method: "post",
            headers: {
                token: JSON.parse(localStorage.getItem("token"))
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
                            <Skeleton height={150} width={150} />
                        </div>
                        <div>
                            <Skeleton height={150} width={150} />
                        </div>
                        <div>
                            <Skeleton height={150} width={150} />
                        </div>

                    </div>
                    <div className="loading_screen_product_img_big">
                        <div>
                            <Skeleton height={500} width={500} />
                        </div>
                    </div>
                </div>
            </>
        );
    };

    //console.log(product.name)

    const ShowProduct = () => {
        return (
            <>

                <h6 className="bread_crum_text"><NavLink to="/" id="copyright">Home</NavLink> / <NavLink to={`/${(product.category)}`} id="copyright">{product.category} </NavLink> / {product.name}</h6>
                <div className="product-page">

                    <div id="grid_1" >
                        <div id="Tproductimg">
                            <div><img className="product-media-mini" src={product.imageurl} alt={product.name} /></div>
                            <div><img className="product-media-mini" src={product.imageurl} alt={product.name} /></div>
                            <div><img className="product-media-mini" src={product.imageurl} alt={product.name} /></div>
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
                            <button className="btn-add-item" onClick={() => { tryingToadd(product._id); tryingToremove(product._id); }}>{cartBtn}</button>
                            <button className="btn-add-item" onClick={() => { removeFromCart(product._id); }}>{favBtn}</button>
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