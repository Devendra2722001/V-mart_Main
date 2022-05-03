import React, { useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Main(props) {
  
  const { updateProducts } = props;
  const [name, setProductName] = useState(updateProducts?.name || "");
  const [description, setProductDescription] = useState(
    updateProducts?.description || ""
  );
  const [price, setProductPrice] = useState(updateProducts?.price || "");
  
  const [image, setImage] = useState(updateProducts?.image || "");
  const [category, setProductcategory] = useState(
    updateProducts?.category || ""
  );

  const [RAM, setRam] = useState(updateProducts?.RAM || "");
  const [batteryCapacity, setBatteryCapacity] = useState(
    updateProducts?.batteryCapacity || ""
  );
  const [screenSize, setScreensize] = useState(
    updateProducts?.screenSize || ""
  );
  const [networkType, setNetworktype] = useState(
    updateProducts?.networkType || ""
  );
  const [resolutionType, setResolutiontype] = useState(
    updateProducts?.resolutionType || ""
  );
  const [camera, setPrimarycamera] = useState(updateProducts?.camera || "");

  const [processor, setProcessor] = useState(updateProducts?.processor || "");
  const [hardDisk, setHard_disk_capacity] = useState(
    updateProducts?.hardDisk || ""
  );
  const [touchScreen, setTouch_screen] = useState(
    updateProducts?.touchScreen || ""
  );

  const [gender, setGender] = useState(updateProducts?.gender || "");
  const [size, setSize] = useState(updateProducts?.size || "");
  const [colour, setColour] = useState(updateProducts?.colour || "");
  const [brand, setBrand] = useState(updateProducts?.brand || "");
  const [imageurl, setImageurl] = useState();

  const postDetails = () => {

    const imgdata = new FormData()        
    imgdata.append("file",image)        
    imgdata.append("upload_preset","V-mart_images")        
    imgdata.append("cloud_name","Volansys")   

    fetch("https://api.cloudinary.com/v1_1/Volansys/image/upload",{        
      method:"post",        
      body:imgdata        
    })
    
    
    .then(res=>res.json())        
    .then(imgdata=>{                
      console.log(imgdata);      
      setImageurl(imgdata.url);
      addproduct();
      
      
      //console.log(data)   
    })
    
    

    .catch(err=>{        
    console.log(err)        
    })
    
}


console.log("Got Image Url - ",imageurl);

  const addproduct = async (e) => {
    //e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("RAM", RAM);
    formData.append("batteryCapacity", batteryCapacity);
    formData.append("screenSize", screenSize);
    formData.append("networkType", networkType);
    formData.append("resolutionType", resolutionType);
    formData.append("camera", camera);
    formData.append("processor", processor);
    formData.append("hardDisk", hardDisk);
    formData.append("touchScreen", touchScreen);
    formData.append("gender", gender);
    formData.append("size", size);
    formData.append("colour", colour);
    formData.append("brand", brand);
    formData.append("imageurl", imageurl);
    
    console.log(imageurl);
    console.log(formData);

    if (!updateProducts && imageurl !== undefined) {
      
      await Axios.post("https://vmart-api.herokuapp.com/product", formData)
        .then(() => {
          toast("Successfully Inserted");
          props.getProductsData();
          props?.setShowForm(false);
        })
        .catch((error) => window.alert("Please Enter Valid Data"));
      
    } else if(imageurl === undefined){
      document.getElementById("clickme").click();
    }else{
      let Product = {
        name,
        description,
        price,
        image,
        category,
        RAM,
        batteryCapacity,
        screenSize,
        networkType,
        resolutionType,
        camera,
        processor,
        hardDisk,
        touchScreen,
        gender,
        size,
        colour,
        brand,
        imageurl,
      };

      fetch(`https://vmart-api.herokuapp.com/updateProduct/${updateProducts._id}`, {
        method: "put",
        formData,
        headers: {
          accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify(Product),
      }).then(() => {
        toast("Successfully Updated");
        props?.setShowForm(false);

        props.getProductsData();
      });
    }
  };

 

  
  const handleChange = (e) => {
    setProductcategory(e.target.value);
  };
  
  return (
    <>
      <div>
        <div className="container-scroller" id="form_margin">
          <div className="container-fluid page-body-wrapper">
            <div className="main-panel">
              <div className="content-wrapper">
                <form className="mx-1 mx-md-4">
                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label">Product Name</label>
                      <input
                        type="text"
                        value={name}
                        className="form-control"
                        placeholder="Product Name"
                        onChange={(e) => {
                          setProductName(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label">Product Description</label>
                      <textarea
                        type="text"
                        value={description}
                        rows={3}
                        className="form-control"
                        placeholder="Product Description"
                        onChange={(e) => {
                          setProductDescription(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label">Product Price</label>
                      <input
                        type="text"
                        value={price}
                        className="form-control"
                        placeholder="Product Price"
                        onChange={(e) => {
                          setProductPrice(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label">Product Image</label>
                      <input
                        type="file"
                        className="form-control"
                        placeholder="Product Image"
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                          
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" for="category">
                        Product category
                      </label>
                      <select
                        className="form-control"
                        defaultValue={category || "select"}
                        name="category"
                        id="category"
                        onChange={handleChange}
                      >
                        <option value="select" disabled selected hidden>
                          Select product category
                        </option>
                        <option value="mobile">Mobile</option>
                        <option value="laptop">Laptop</option>
                        <option value="shoes">Shoes</option>
                      </select>
                    </div>
                  </div>

                  {category === "mobile" ? (
                    <div>
                      <div className="row mt-2">
                        <div className="d-flex flex-row align-items-center mb-4 col-md-4">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">RAM</label>
                            <input
                              type="text"
                              value={RAM}
                              className="form-control"
                              placeholder="RAM"
                              onChange={(e) => {
                                setRam(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4 col-md-4 ">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">
                              Battery Capacity
                            </label>
                            <input
                              type="text"
                              value={batteryCapacity}
                              className="form-control"
                              placeholder="Battery Capacity"
                              onChange={(e) => {
                                setBatteryCapacity(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4 col-md-4">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Screen size</label>
                            <input
                              type="text"
                              value={screenSize}
                              className="form-control"
                              placeholder="Screen size"
                              onChange={(e) => {
                                setScreensize(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row mt-2">
                        <div className="d-flex flex-row align-items-center mb-4 col-md-4">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Network type</label>
                            <input
                              type="text"
                              value={networkType}
                              className="form-control"
                              placeholder="Network type"
                              onChange={(e) => {
                                setNetworktype(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4 col-md-4">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">
                              Resolution type
                            </label>
                            <input
                              type="text"
                              value={resolutionType}
                              className="form-control"
                              placeholder="Resolution type"
                              onChange={(e) => {
                                setResolutiontype(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4 col-md-4 ">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Primary camera</label>
                            <input
                              type="text"
                              value={camera}
                              className="form-control"
                              placeholder="Primary camera"
                              onChange={(e) => {
                                setPrimarycamera(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : category === "laptop" ? (
                    <div>
                      <div className="row mt-2">
                        <div className="d-flex flex-row align-items-center mb-4 col-md-4 ">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Processor</label>
                            <input
                              type="text"
                              value={processor}
                              className="form-control"
                              placeholder="Processor"
                              onChange={(e) => {
                                setProcessor(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4 col-md-4 ">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">
                              Hard disk capacity
                            </label>
                            <input
                              type="text"
                              value={hardDisk}
                              className="form-control"
                              placeholder="Hard disk capacity"
                              onChange={(e) => {
                                setHard_disk_capacity(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4 col-md-4 ">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Touch screen</label>
                            <input
                              type="text"
                              value={touchScreen}
                              className="form-control"
                              placeholder="Touch screen"
                              onChange={(e) => {
                                setTouch_screen(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    category === "shoes" && (
                      <div>
                        <div className="row mt-2">
                          <div className="d-flex flex-row align-items-center mb-4 col-md-3">
                            <div className="form-outline flex-fill mb-0">
                              <label className="form-label">Gender</label>
                              <input
                                type="text"
                                value={gender}
                                className="form-control"
                                placeholder="Gender"
                                onChange={(e) => {
                                  setGender(e.target.value);
                                }}
                                required
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4 col-md-3">
                            <div className="form-outline flex-fill mb-0">
                              <label className="form-label">Size</label>
                              <input
                                type="text"
                                value={size}
                                className="form-control"
                                placeholder="Size"
                                onChange={(e) => {
                                  setSize(e.target.value);
                                }}
                                required
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4 col-md-3">
                            <div className="form-outline flex-fill mb-0">
                              <label className="form-label">Color</label>
                              <input
                                type="text"
                                value={colour}
                                className="form-control"
                                placeholder="Color"
                                onChange={(e) => {
                                  setColour(e.target.value);
                                }}
                                required
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4 col-md-3">
                            <div className="form-outline flex-fill mb-0">
                              <label className="form-label"> Brand</label>
                              <input
                                type="text"
                                value={brand}
                                className="form-control"
                                placeholder="Brand"
                                onChange={(e) => {
                                  setBrand(e.target.value);
                                }}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button
                      id="clickme"
                      type="button"
                      className="btn btn-primary btn-lg"
                      onClick={()=>{
                        postDetails(); 
                        
                        // setTimeout(() => {
                        //   addproduct(); 
                                                  
                        // }, 2000);
                        
                        }}
                    >
                      {updateProducts ? "Update Product" : "Add Product"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-cancle btn-lg"
                      onClick={() => props?.setShowForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;