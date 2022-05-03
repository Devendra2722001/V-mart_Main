import React,{useState, useEffect} from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';

const EditAddress = () => {
    const history = useHistory();   
    const[address, setAddress] = useState({
        addressLine1:"",addressLine2:"",cityName:"",district:"",state:"",zipCode:""
    })
     const params = useParams();

    useEffect(() =>{
        getAddress();
    },[])

    const getAddress = async() =>{
        console.log(params);
        let result = await fetch(`https://vmart-api.herokuapp.com/selectedAddress/${params.id}`,{
            method: "get",
            headers: { token : JSON.parse(localStorage.getItem("token")),
          }
        })
        result  = await result.json();
        console.log(result)
        setAddress(result)
    }
    

    

    let name, value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setAddress({ ... address, [name]:value});
    }
    
    const PostData = async (e) => {
        e.preventDefault();
        const { addressLine1, addressLine2, cityName, district, state, zipCode} = address;
        const res = await fetch(`https://vmart-api.herokuapp.com/updateAddress/${params.id}`, {
          method: "post",
          headers: { token : JSON.parse(localStorage.getItem("token")),
            "Content-Type": "application/json"
          },
                  
          body: JSON.stringify({
            addressLine1:addressLine1, addressLine2:addressLine2, cityName:cityName, district:district, state:state, zipCode:zipCode
          })
        });
    
        const data = await res.json();
        console.log(data)
          if (data) {
            window.alert(" address Updated");
            history.push("/user");      
          } else {
            window.alert("-- Something went wrong --")
          }
      }
    

    return (
        <>
        <div className="checkout-main">
            <div className="container my-5">
                <div className="row g-5">
                    <div className="">
                        <h4 className="mb-3">update Address</h4>
                        <form method="post" className="needs-validation" novalidate="">
                            <div className="row g-3">

                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">AddressLine - 1</label>
                                    <input type="text" className="form-control" id="address" placeholder="5678 Main St" required="" name="addressLine1" value={address.addressLine1} onChange={handleInputs}/>
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">AddressLine - 2</label>
                                    <input type="text" className="form-control" id="address" placeholder="1234 Main St" required="" name="addressLine2" value={address.addressLine2} onChange={handleInputs}/>
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>
                                
                                <div className="col-md-3">
                                <label htmlFor="firstName" className="form-label">cityName</label> 
                                    <input type="text" className="form-control" id="cityName" placeholder="cityName" required="" name="cityName" value={address.cityName} onChange={handleInputs}/>
                                    <div className="invalid-feedback">
                                        Valid cityName is required.
                                    </div>
                                </div>

                                <div className="col-md-3">
                                <label htmlFor="firstName" className="form-label">District</label> 
                                    <input type="text" className="form-control" id="district" placeholder="district" required="" name="district" value={address.district} onChange={handleInputs}/>
                                    <div className="invalid-feedback">
                                        Valid cityName is required.
                                    </div>
                                </div>

                                <div className="col-md-3">
                                <label htmlFor="firstName" className="form-label">State</label> 
                                    <input type="text" className="form-control" id="state" placeholder="state" required="" name="state" value={address.state} onChange={handleInputs}/>
                                    <div className="invalid-feedback">
                                        Valid cityName is required.
                                    </div>
                                </div>

                                <div className="col-md-3">
                                <label htmlFor="firstName" className="form-label">ZipCode</label> 
                                    <input type="text" className="form-control" id="zipCode" placeholder="zipCode" required="" name="zipCode" value={address.zipCode} onChange={handleInputs}/>
                                    <div className="invalid-feedback">
                                        Valid cityName is required.
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />                            

                            <button class="btn btn-success profile-button" type="button" onClick={PostData}>save changes</button> &nbsp;
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default EditAddress
