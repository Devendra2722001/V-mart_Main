import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { editAddressValidation } from "./validation"
import swal from "sweetalert";

const EditAddress = () => {
    const history = useHistory()  
    const[address, setAddress] = useState({
        addressLine1:"",addressLine2:"",cityName:"",district:"",state:"",zipCode:""
    })
     const params = useParams();
     const [error, setError] = useState({});

    useEffect(() =>{
        window.scrollTo(0, 0);
        getAddress();
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    const getAddress = async() =>{
        console.log(params);
        
        await axios.get(`/selectedAddress/${params.id}`,{
            headers: { token : JSON.parse(localStorage.getItem("token")),
          }
        }).then((res) =>{
            console.log("get address for prefill", res)
            setAddress(res.data)
        })
    }
    let name, value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setAddress({ ...address, [name]:value});
    }

    const CongoAlert = () => {
        swal({
          title: "Updated !",
          text: "Address Updated Successfully....",
          icon: "success",
          button: "Okay!",
        });
        history.go(-1);
      };
    
    const postData = async (e) => {
        e.preventDefault();
        setError(editAddressValidation(address))
        const { addressLine1, addressLine2, cityName, district, state, zipCode} = address;
        if(addressLine1 && addressLine2 && cityName && district && state && zipCode && address.zipCode.length === 6 && !(isNaN(address.zipCode))){
            await axios.put(`/updateAddress/${params.id}`,{
                addressLine1:address.addressLine1, addressLine2:address.addressLine2, cityName:address.cityName, district:address.district, state:address.state, zipCode:address.zipCode
            }, {
            method: "put",
            headers: { token : JSON.parse(localStorage.getItem("token")),
                "Content-Type": "application/json"
            }
            }).then((res) => {
                if (res.status === 201) {
                    CongoAlert();
                  history.push("/user");
                } else {
                  window.alert("-- Something went wrong --");
                }
            })
        } 
      }
    

    return (
        <>
        <div className="checkout-main">
            <div className="container my-5">
                <div className="row g-5">
                    <div className="">
                        <h4 className="mb-3">update Address</h4>
                        <form method="post" className="needs-validation" novalidate="" onSubmit={postData}>
                            <div className="row g-3">

                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">AddressLine - 1</label>
                                    <input type="text" className="form-control" id="address" placeholder="5678 Main St" required name="addressLine1" value={address.addressLine1} onChange={handleInputs}/>
                                    {error.addline1 && <span className='text-danger font-weight-bold' >{error.addline1}</span>}
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">Location</label>
                                    <select type="option" className="form-control" id="address" required="" name="addressLine2" value={address.addressLine2} onChange={handleInputs}>
                                    <option>Home</option>
                                    <option>Office</option>
                                    </select>                                   
                                    <div className="invalid-feedback">
                                        Please Select Location.
                                    </div>
                                </div>
                                
                                <div className="col-md-3">
                                <label htmlFor="firstName" className="form-label">cityName</label> 
                                    <input type="text" className="form-control" id="cityName" placeholder="cityName" required="" name="cityName" value={address.cityName} onChange={handleInputs}/>
                                    {error.city && <span className='text-danger font-weight-bold'>{error.city}</span>}
                                    <div className="invalid-feedback">
                                        Valid cityName is required.
                                    </div>
                                </div>

                                <div className="col-md-3">
                                <label htmlFor="firstName" className="form-label">District</label> 
                                    <input type="text" className="form-control" id="district" placeholder="district" required="" name="district" value={address.district} onChange={handleInputs}/>
                                    {error.district && <span className='text-danger font-weight-bold'>{error.district}</span>}
                                    <div className="invalid-feedback">
                                        Valid cityName is required.
                                    </div>
                                </div>

                                <div className="col-md-3">
                                <label htmlFor="firstName" className="form-label">State</label> 
                                    <input type="text" className="form-control" id="state" placeholder="state" required="" name="state" value={address.state} onChange={handleInputs}/>
                                    {error.state && <span className='text-danger font-weight-bold'>{error.state}</span>}
                                    <div className="invalid-feedback">
                                        Valid cityName is required.
                                    </div>
                                </div>

                                <div className="col-md-3">
                                <label htmlFor="firstName" className="form-label">ZipCode</label> 
                                    <input type="text" className="form-control" id="zipCode" placeholder="zipCode" required="" name="zipCode" value={address.zipCode} onChange={handleInputs}/>
                                    {error.zipCode && <span className='text-danger font-weight-bold'>{error.zipCode}</span>}
                                    <div className="invalid-feedback">
                                        Valid cityName is required.
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />                            

                            <button className="btn btn-success profile-button" type="button" onClick={postData}>save changes</button> &nbsp;
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default EditAddress