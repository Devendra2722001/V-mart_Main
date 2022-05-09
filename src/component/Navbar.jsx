import React, { useState , useEffect} from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import login from "./login.png";
import logout from "./logout.png";
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const Navbar = () => {
   

    const history = useHistory();
    const [logBtn, setlogBtn] = useState(login);
    const [cartItem , setCartItem] = useState([]);

    useEffect(() => {
        //getcartItem();
        
        setInterval(() => {   
            
            
            // ^^^ Comment this getcartItem if you wanna get rid of all the getCart request errors in console  
            const token = localStorage.getItem('token');        
                if (token != null) {
                    setlogBtn(logout); 
                    getcartItem();
                }
        }, 1000);       
    },[])

    const CongoAlert = () => {

        swal({
            title: "Cya Later!",
            text: "Logout Successfull....",
            icon: "success",
            button: "Okay!",
          });
          history.push("/");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        
    }
    

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        if (token != null) {
            setlogBtn(logout);
            getcartItem();
            //console.log("Hello Hii");
        }else{
            console.log("no token found");            
        }
    },[])

    // const Loginout = () => {
    //     const token = localStorage.getItem('token');
    //     if (token === null) {            
    //         setlogBtn(login)            
    //     }
    //     else{  
                        
    //     }
    // }

    const getcartItem = async() => {
        let result = await fetch("https://vmart-api.herokuapp.com/myCartItem",{
            method: "GET",
            headers :{ token : JSON.parse(localStorage.getItem("token"))
            }
        });
        result = await result.json();
        if(result.status === 404){
            console.log("cart is Empty (Navbar)")
            //window.location.reload();
        }
        setCartItem(result);
        
    }


    
    const ProtectedRoute = (props) => {
        const token = localStorage.getItem('token');        
        if (token === null) {
            setlogBtn(logout);
        }
        else{            
            setlogBtn(logout);           
        }       
    };

    const Dologout =async () => {
        localStorage.removeItem('token')        
        //window.alert("-- Logout Successfuly  --");
        CongoAlert();        
        setlogBtn(login);
    }

    const DoLoginout = () => { 
        const token = localStorage.getItem('token');
            if (logBtn === login) {
                if (token === null) {
                    setlogBtn(login);
                }else{            
                    setlogBtn(logout);
                }                 
                history.push("/login");
            }
            else{            
                setlogBtn(logout); 
                Dologout();          
            }     
    }
    
    
    return (
        <div>
            <nav class="navbar" id="Navbar">
                <div class="container-fluid">
                    <NavLink class="navbar-brand" to="/">
                        <img src="../images/logo_gold.png" alt="Logo" class="navbar-brand"></img>
                    </NavLink>

                    {/* <div id="searchbar">

                        <form class="d-flex">
                            <input class="form-control" type="search" placeholder="Search Here..." aria-label="Search" />
                        </form>
                    </div> */}
                    <div class="Nav-menu-options">

                        

                        <div id="bloc3" class="push">                            
                            <NavLink to="/cart">
                                <div className="text_cart">{cartItem.length}</div>
                                <img src="../images/cart.png" width="30rem;" title="Your Cart" alt="cart"></img>
                            </NavLink>
                        </div>
                        
                        <div id="bloc4" class="push">
                            <NavLink to="/favorites">
                                <img src="../images/heart.png" width="30rem;" title="Favorites" alt="favorits"></img>
                            </NavLink>
                        </div>

                        <div id="bloc5" class="push">
                            <NavLink to="/user"><img src="../images/user.png" title="Your Profile" width="30rem;" alt="profile"></img>
                            </NavLink>
                        </div>  
                        
                        <div id="bloclog" class="push" >                            
                            
                                <img src={logBtn} width="30rem;" alt="Login/Logout" title="Login/Logout" onClick={() => {DoLoginout()}}/>
                            
                        </div>                      
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
