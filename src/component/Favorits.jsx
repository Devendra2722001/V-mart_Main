import React from 'react';
import { NavLink , useHistory} from 'react-router-dom';
import Empty from './Empty.gif';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

const Favorits = () => {
    
     const history = useHistory();
     const [favourite , setFavourite] = useState([]);

     useEffect(() => {
         getFavourite();
         setTimeout(() => {
            ProtectedRoute();         
          }, 1);
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
 
     console.log("favorite", favourite )
 
     // favorite api fatching end

    const emptyFav = () => {
        return(
            <section className="cart-wrapper-empty">
                <div className="Empty-Cart">
                    <img src={Empty} className="Empty-Cart-img" alt ="Error-Img"/>

                    <div className="Empty-Text">                    
                        <h2>Hey There's Noting In your Favorites list</h2>
                        <NavLink to="/"><h6>Contine Shoping</h6></NavLink>
                    </div>
                    
                </div>
            </section>
        )
    }


   // const favoritItems = (favorit) => {
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

   // }
    
    // return (
    //     <div className="fullsizedisplay">
    //         {state2.length === 0 && emptyFav()}
    //         <section className="fav-wrapper">
    //             {state2.length !== 0 && state2.map(favoritItems)}
    //         </section>            
    //     </div>
    // );
}

export default Favorits;
