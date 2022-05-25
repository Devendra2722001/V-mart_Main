import "./App.css";
import home from "./component/Home";
import Navbar from "./component/Navbar";
import AdminNavbar from "./component/component/AdminNavbar";
//import { BrowserRouter as Switch, Router, Route} from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import productlist from "./component/Cart";
import product from "./component/Product";
import cart from "./component/Cart";
import Footer from "./component/Footer";
import user from "./component/User";
import checkout from "./component/Checkout";
import favorites from "./component/Favorits";
import mobile from "./component/Mobile";
import laptop from "./component/Laptop";
import shoes from "./component/Shoes";
import login from "./component/Login";
import signUp from "./component/SignUp";
import addaddress from "./component/AddAddress";
import editaddress from "./component/EditAddress";
import changePassword from "./component/ChangePassword";
import email from "./component/Email";
import resetpassword from "./component/ResetPassword";
import Dashbord from "./component/component/productDash";
import VendorDashbord from "./component/component/productDashVendor";
import Userorder from "./component/component/userOrder";
import VendorOrderuser from "./component/component/VendorOrderuser";
//import VendorOrderlist from "../src/component/component/VendorOrderlist";
import Orderlist from "../src/component/component/orderList";
import vendorsignup from "../src/component/vendorsignup";
import VendorNavbar from "./component/component/VendorNavbar";
import EditProfile from "./component/EditProfile";
import EmailVerification from "./component/EmailVerification";
import VendororderHistory from "./component/component/VendororderHistory";
import Testing from "./testing";







function App() {

     
  if(localStorage.getItem("ImAdmin") === "true"){
    console.log("Hello Admin")
    return (
      <>
      <div>
          <section className="home-section">
            <>
            <div>
                    <div className="topfixednav">
                    <AdminNavbar />
                    </div>
                    <Switch>
                        <Route exact path="/" component={Dashbord} />
                        <Route exact path="/userorder" component={Userorder} />
                        <Route exact path="/specificorder/:id" component={Orderlist} />
                    </Switch>
              </div>
            </>
          </section>
      </div>
      </>
    );
  }
  
  else if(localStorage.getItem("ImVendor") === "true"){
    console.log("Hello Vendor")
    return (
      <>
      <div>
          <section className="home-section">
            <>
              <div>
                  <div className="topfixednav">
                    <VendorNavbar />
                  </div> 
                  <Switch>
                        <Route exact path="/" component={VendorDashbord} />
                        <Route exact path="/VendorOrderuser" component={VendorOrderuser} />     
                        <Route exact path="/VendororderHistory" component={VendororderHistory} />                     
                  </Switch>
              </div>
            </>
          </section>
      </div>
      </>
    );
  }
  
  else{
      return (
        <>
        <div className="Mainapp">
          <div className="topfixednav">
            <Navbar />
          </div>
          <Switch>

            <Route exact path="/" component={home} />
            <Route exact path="/productlist" component={productlist} />        
            <Route exact path="/productlist/:_id" component={product} />           
            <Route exact path="/cart" component={cart} />
            <Route exact path="/checkout" component={checkout} />
            <Route exact path="/favorites" component={favorites} />
            <Route exact path="/user" component={user} />
            <Route exact path="/EditProfile" component={EditProfile} />
            <Route exact path="/Mobile" component={mobile} />
            <Route exact path="/Laptop" component={laptop} />
            <Route exact path="/Shoes" component={shoes} />
            <Route exact path="/Login" component={login} />
            <Route exact path="/SignUp" component={signUp} />
            <Route exact path="/vendorsignup" component={vendorsignup} />
            <Route exact path="/AddAddress" component={addaddress} />
            <Route exact path="/EditAddress/:id" component={editaddress} />
            <Route exact path="/ChangePassword" component={changePassword} />
            <Route exact path="/Email" component={email} />
            <Route exact path="/ResetPassword" component={resetpassword} />
            <Route exact path="/Testing" component={Testing} />
            <Route exact path="/EmailVerification" component={EmailVerification} />

            
          </Switch>
          
          <Footer/>
          
        </div>
        </>
       );
  }
}

export default App;
