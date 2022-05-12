import React from 'react';
import { NavLink , useHistory} from 'react-router-dom';
import Empty from './Empty.gif';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import Skeleton from "react-loading-skeleton";

const Favorits = () => {
    
     const history = useHistory();
     const [favourite , setFavourite] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
         getFavourite();
         ProtectedRoute();
         
         setTimeout(() => {            
            setLoading(false);         
          }, 2000);
     },[])

     const ProtectedRoute = (props) => {
        const token = localStorage.getItem('token');
        if (token == null) {
            CongoAlert();
        }     
    };
 
    const CongoAlert = () => {
        swal({
            title: "Login/Signup!",
            text: "Please Login/Singup first to view your favorites",
            icon: "warning",
            button: "Okay!",
          });
          history.push("/login");
    }

     const getFavourite = async() => {
         let result = await fetch("https://vmart-api.herokuapp.com/myfavouritetItem",{
             method: "GET",
             headers :{ token : JSON.parse(localStorage.getItem("token"))
             }
         });
         result = await result.json();
         setFavourite(result);
         //setLoading(false);
     }
     const removeFromgetFavourite =async (id) => {
         let result = await fetch(`https://vmart-api.herokuapp.com/removeFromFavourite/${id}`,{
             method: "post",
             headers :{ token : JSON.parse(localStorage.getItem("token"))
             }
         });
         result = await result.json();
         setFavourite(result);
     }
 
     //console.log("favorite", favourite )
 
     // favorite api fatching end

     const Cartisempty = () => {
        //if(cartItem === 0){
            return (
                <section className="cart-wrapper-empty">
                    <div className="Empty-Cart">
                        <img src={Empty} className="Empty-Cart-img" alt="Error-Img" />
    
                        <div className="Empty-Text">
                            <h2>Hey You Have nothing in your Favorites</h2>
                            <NavLink to="/"><h6>Contine Shoping</h6></NavLink>
                        </div>
    
                    </div>
                </section>
            )
       //}
    }
    const Loading = () => {
        return (
        <>
        <div className="loading_screen_cart">
            <div>
                <Skeleton height={250} width={400}/>
            </div>
            <div>
                <Skeleton height={250} width={400}/>
            </div>
            <div>
                <Skeleton height={250} width={400}/>
            </div>
            
            <div>
                <Skeleton height={250} width={400}/>
            </div>
            <div>
                <Skeleton height={250} width={400}/>
            </div>
            <div>
                <Skeleton height={250} width={400}/>
            </div>
            
          </div>
        </>
        );
      };

      console.log(favourite)

    const ShowProducts = () => {
        return(
            <>
                <section className="fav-wrapper">
                {
                favourite.map(favObj =>(
                <div className="cart-card-container" key={favObj._id}>
                    <div>
                        <div className="cart-card">
                                <img src={favObj.productImageurl} alt="images" className="cart-card-media" />
                                <div className="cart-card-text">
                                <NavLink to={`/products/${favObj.id}`} id="copyright">                                        
                                    <div className="cart-card-head">{favObj.productName}</div></NavLink> 
                                    <div className="cart-card-price">Price - {favObj.productPrice}₹</div>
                                    <div class="cart-lastrow">
                                        <div className="cart-card-category">Category - {favObj.productCategory}</div>                                                                
                                    </div>
                                   <br></br>
                                    <div className="plus-minus">                                        
                                        <button className="btn btn-danger" onClick={()=>removeFromgetFavourite(favObj.productId)}>
                                            Remove
                                        </button>                                        
                                    </div>                                                     
                                </div>
                                                    
                        </div>
                    </div>
                </div>
                ))
                }
                </section>
                
            </>
        )
    }
    if(loading===true){
        return (
            <div>
                <Loading />
            </div>
          );
    }else if(favourite.length === 0){
        return (
            <div>
                <Cartisempty />
            </div>
          );
    }else{
        return (
            <div>
               <ShowProducts />
            </div>
          );        
    }   
   
}

export default Favorits;
