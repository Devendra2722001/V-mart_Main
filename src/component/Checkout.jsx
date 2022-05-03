import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams , useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const Checkout = () => {
    const history = useHistory();
    const state = useSelector((state) => state.handleCart)
    const [address, setAddress] = useState([]);
    const [cartItem, setCartItem] = useState([]);
    const [cartId, setCartId] = useState([]);
    const [addId, setaddId] = useState([]);
    const {_id} = useParams();

    const [order, setOrder] = useState({
        address: "",        
      })

    let name, value, key=cartId;

    const handleInputs = (e) => {        
        name = e.target.name;
        value = e.target.value;
        setOrder({[name]: value});
        setaddId(value);
    }

    const PostOrder = async (id,key) => {
        let result = await fetch(`https://vmart-api.herokuapp.com/order/${cartId}/${addId}`,{
            method: "POST",
            headers :{ token : JSON.parse(localStorage.getItem("token"))
            }
        });
        result = await result.json();
        console.log("Data posted")        
      }

    useEffect(() => {
        getAddress();
        getcartItem();
        getcartId();
    }, [])
  

    const CongoAlert = () => {
        swal({
            title: "Success!",
            text: "Congratulations your order has been placed successfully!",
            icon: "success",
            button: "Okay!",
          });
          history.push("/");
          //
    }

    const getAddress = async () => {
        let result = await fetch("https://vmart-api.herokuapp.com/addressListing", {
            method: "GET",
            headers: {
                token: JSON.parse(localStorage.getItem("token"))
            }
        });
        result = await result.json();
        setAddress(result);
    }

    const getcartItem = async () => {
        let cartItem = await fetch("https://vmart-api.herokuapp.com/myCartItem", {
            method: "GET",
            headers: {
                token: JSON.parse(localStorage.getItem("token"))
            }
        });
        cartItem = await cartItem.json();
        setCartItem(cartItem);
    }

    const getcartId = async () => {
        let cartId = await fetch("https://vmart-api.herokuapp.com/myCartId", {
            method: "GET",
            headers: {
                token: JSON.parse(localStorage.getItem("token"))
            }
        });
        cartId = await cartId.json();
        setCartId(cartId);
    }

    const removeProduct = async () => {
        let emptyCart = await fetch("https://vmart-api.herokuapp.com/removeAllProduct", {
            method: "POST",
            headers: {
                token: JSON.parse(localStorage.getItem("token"))
            }
        });
        if(emptyCart.status === 200){
            console.log("cart empty")
            window.location.reload();
        }
    }

    //console.log(JSON.stringify(cartId))
    //console.log(order)
    console.log(addId)
    //console.log(address)

    return (
        <>
            <div className="checkout-main">
                <div className="container my-5">
                    <div className="row g-5">
                        <div className="col-md-5 col-lg-4 order-md-last">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-primary">Your cart</span>                                
                            </h4>
                            <ul className="list-group mb-3">
                                {
                                    cartItem.map(cartObj => (
                                        <li className="list-group-item d-flex justify-content-between lh-sm">
                                            <div>
                                                <h6 className="my-0" name="cart">{cartObj.productName}</h6>
                                            </div>
                                            <span className="text-muted">{cartObj.quantity} X {cartObj.productPrice} = {cartObj.quantity * cartObj.productPrice}</span>
                                        </li>
                                    ))
                                }

                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Total (IND-₹)</span>

                                </li>
                            </ul>
                        </div>

                        <div className="col-md-7 col-lg-8">
                            <form className="needs-validation" novalidate="">

                                <div className="form-outline flex-fill">

                                    <h4 className="d-flex justify-content-between align-items-center">
                                        <span className="text-primary">Select address</span>
                                    </h4>

                                    <div class="p-3">

                                        {
                                            address.map(addressObj => (
                                                <>

                                                    <div class="row mt-2 p-3" id="list-group-item" key={addressObj._id}>
                                                        <div class="col-md-12"><label htmlFor="firstName" className="form-label"><h5><span className="text-primary"><input type="radio" onChange={handleInputs} name="address" value={addressObj._id}/> {addressObj.addressLine2}</span></h5></label>
                                                            <div className="add-card-head mb-2">{addressObj.addressLine1}</div>
                                                            <div className="add-card-head mb-2">{addressObj.addressLine2}</div>
                                                        </div>
                                                        <div className="col-md-12 row mb-2">
                                                            <div class="col-md-3"><label htmlFor="lastName" className="form-label"><b>City</b></label>
                                                                <div className="add-card-head">{addressObj.cityName}</div></div>
                                                            <div class="col-md-3"><label htmlFor="lastName" className="form-label"><b>District</b></label>
                                                                <div className="add-card-head">{addressObj.district}</div></div>
                                                            <div class="col-md-3"><label htmlFor="lastName" className="form-label"><b>State</b></label>
                                                                <div className="add-card-head">{addressObj.state}</div></div>
                                                            <div class="col-md-3"><label htmlFor="lastName" className="form-label"><b>Zip Code</b></label>
                                                                <div className="add-card-head">{addressObj.zipCode}</div></div>
                                                        </div>
                                                    </div>
                                                </>
                                                
                                            ))
                                            
                                        }
                                <div className="mt-5">
                                    <button className="w-100 btn btn-primary btn-lg" onClick={() => {PostOrder(); CongoAlert(); removeProduct();}}>Place Order</button>
                                </div>
                                    </div>
                                </div>
                                
                            </form>
                        </div>

                    </div>
                    

                </div>
            </div >
        </>
    )
}

export default Checkout
