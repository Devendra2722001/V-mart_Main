import React, { useState , useEffect} from 'react';
import { NavLink } from "react-router-dom";
import login from "./login.png";
import logout from "./logout.png";


function AdminNavbar (props){

      
    

    const [logBtn, setlogBtn] = useState(login);
    
    useEffect(() => {

        
        setInterval(() => {
            
                    
                if (localStorage.getItem("ImAdmin") === "true") {
                    setlogBtn(logout); 
                    ProtectedRoute();                   
                }
        }, 2000);       
    },[])
    
    const removeAdmin = () =>{
        localStorage.removeItem('ImAdmin');
        localStorage.removeItem('token');
        window.location.reload();
        window.location.href = "/";
      }
    
    const ProtectedRoute = (props) => {
                
        if (localStorage.getItem("ImAdmin") === "true") {
            setlogBtn(logout);
        }
        else{            
            setlogBtn(logout);           
        }       
    };

        
    
    return (
        <div>
            <nav className="navbar" id="Navbar">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <img src="../images/logo_gold.png" alt="Logo" className="navbar-brand"></img>
                    </NavLink>

                   
                    <div className="Nav-menu-options">

                        <div className="blocspace">                            
                            <NavLink to="/">                                
                                <img src="../images/checklist.png" width="30rem;" alt="product list" title="Product List"/>                                
                            </NavLink>
                        </div>
                        
                        

                        
                        <div id="bloc4" className="push">
                            <NavLink to="/userOrder">
                                <img src="../images/team.png" width="30rem;" alt="user order list"  title="User Orders List"></img>
                            </NavLink>
                        </div>                        
                        
                        <div id="bloclog" className="push">                            
                            
                                <img src={logBtn} width="30rem;" alt="Login/Logout" title="Logout" onClick={() => {removeAdmin();}}/>
                            
                        </div>                      
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default AdminNavbar;
