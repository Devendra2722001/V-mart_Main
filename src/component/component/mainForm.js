import React, { useEffect, useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProductValidation} from "../validation"
import { updateProductValidation} from "../validation"
import axios from "axios";

//import ReactLoading from "react-loading";

toast.configure();

function Main(props) {
  const { updateProducts } = props;
  const [name, setProductName] = useState(updateProducts?.name || "");
  const [description, setProductDescription] = useState(
    updateProducts?.description || ""
  );
  const [price, setProductPrice] = useState(updateProducts?.price || "");

  const [image1, setImage1] = useState(updateProducts?.image1 || "");
  const [image2, setImage2] = useState(updateProducts?.image2 || "");
  const [image3, setImage3] = useState(updateProducts?.image3 || "");
  const [image4, setImage4] = useState(updateProducts?.image4 || "");

  const [brand, setBrand] = useState(updateProducts?.brand || "");
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

  const [imageurl1, setImageurl1] = useState(updateProducts?.imageurl1 || "");
  const [imageurl2, setImageurl2] = useState(updateProducts?.imageurl2 || "");
  const [imageurl3, setImageurl3] = useState(updateProducts?.imageurl3 || "");
  const [imageurl4, setImageurl4] = useState(updateProducts?.imageurl4 || "");
  const [stock, setStock] = useState(updateProducts?.stock || "");


  const [error, setError] = useState({});

  

  
  const postImages = async () => {
    //const postDetails1 = () => {
    setError(addProductValidation(name, description, price, stock, brand, image1, image2, image3, image4, category, RAM, batteryCapacity, screenSize, networkType, resolutionType, camera, processor, hardDisk, touchScreen, gender, size, colour));
    if(name && description && !(isNaN(price)) && !(isNaN(stock)) && brand && category && image1 && image2 && image3 && image4 && ((RAM && batteryCapacity && screenSize &&networkType &&resolutionType &&camera) || (processor &&hardDisk &&touchScreen) || (gender &&size &&colour))){
    const imgdata1 = new FormData();
    imgdata1.append("file", image1);
    imgdata1.append("upload_preset", "V-mart_images");
    imgdata1.append("cloud_name", "Volansys");

      axios.post("https://api.cloudinary.com/v1_1/Volansys/image/upload", imgdata1, {
    })
    // .then((res) => res.json())
      .then((imgdata1) => {
        console.log("******1", imgdata1);
        setImageurl1(imgdata1.data.url);

        const imgdata2 = new FormData();
        imgdata2.append("file", image2);
        imgdata2.append("upload_preset", "V-mart_images");
        imgdata2.append("cloud_name", "Volansys");

        axios.post("https://api.cloudinary.com/v1_1/Volansys/image/upload", imgdata2, {
        })
        //.then((res1) => res1.json())
          .then((imgdata2) => {
            console.log("******2", imgdata2);
            setImageurl2(imgdata2.data.url);

            const imgdata3 = new FormData();
            imgdata3.append("file", image3);
            imgdata3.append("upload_preset", "V-mart_images");
            imgdata3.append("cloud_name", "Volansys");

            axios.post("https://api.cloudinary.com/v1_1/Volansys/image/upload", imgdata3, {
            })
            //.then((res2) => res2.json())
              .then((imgdata3) => {
                console.log("******3", imgdata3);
                setImageurl3(imgdata3.data.url);

                const imgdata4 = new FormData();
                imgdata4.append("file", image4);
                imgdata4.append("upload_preset", "V-mart_images");
                imgdata4.append("cloud_name", "Volansys");

                axios.post("https://api.cloudinary.com/v1_1/Volansys/image/upload", imgdata4, {
                })
                //.then((res3) => res3.json())
                  .then((imgdata4) => {

                    console.log("******4", imgdata4);
                    setImageurl4(imgdata4.data.url);
                      addproduct(imgdata1.data.url,imgdata2.data.url,imgdata3.data.url,imgdata4.data.url);
                                })


              })
          })
      })
      .catch((err) => {
        console.log(err);
      });
    }    
  };

  
  const tryingtodosomething = () => {
    if (updateProducts) {
      console.log("Time To Update");
      UpdateForme();
    } else {
      postImages();
    }
  };

  const formData = new FormData();
  //console.log("Got Image Url - ", imageurl1);


  const addproduct = async (img1,img2,img3,img4) => {
    console.log("In add product")
    //e.preventDefault();
    setError(addProductValidation(name, description, price, stock, brand, image1, image2, image3, image4, category, RAM, batteryCapacity, screenSize, networkType, resolutionType, camera, processor, hardDisk, touchScreen, gender, size, colour));
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    //formData.append("image", image1);
    formData.append("brand", brand);
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
    formData.append("imageUrl1", img1);
    formData.append("imageUrl2", img2);
    formData.append("imageUrl3", img3);
    formData.append("imageUrl4", img4);
    formData.append("stock", stock);


    console.log("asasas",img1,img2,img3,img4)
    // console.log("name:::",name);
    // console.log("description:::",description);
    // console.log("description:::",description);
    //console.log("condition 1::::", (name && description && price && stock && brand && category && image2 && image3 && image4 && imageurl1 && imageurl2 && imageurl3 && imageurl4));

      console.log("122333 now add product");
      await Axios.post("https://vmart-api.herokuapp.com/product", formData, {
      //formData,
      headers: { token: JSON.parse(localStorage.getItem("token")) },
    })

    .then(() => {
      toast("Successfully Inserted");
      props.getProductsData();
      props?.setShowForm(false);
    })
    .catch((error) => window.alert("unable To Post"));
  };
  //console.log(networkType);

  const handleChange = (e) => {
    setProductcategory(e.target.value);
    console.log(networkType);
  };

  const UpdateForme = async () => {
    //e.preventDefault();
    setError(updateProductValidation(name, description, price, stock, brand, image1, image2, image3, image4, category, RAM, batteryCapacity, screenSize, networkType, resolutionType, camera, processor, hardDisk, touchScreen, gender, size, colour))
    let Product = {
      name,
      description,
      price,
      image1,
      brand,
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
      imageurl1,
      imageurl2,
      imageurl3,
      imageurl4,
      stock,
    };
    
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image1);
    formData.append("brand", brand);
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
    formData.append("imageUrl1", imageurl1);
    formData.append("imageUrl2", imageurl2);
    formData.append("imageUrl3", imageurl3);
    formData.append("imageUrl4", imageurl4);
    formData.append("stock", stock);

    if(name && description && price && stock && brand && category && ((RAM && batteryCapacity && screenSize && networkType && resolutionType && camera)|| (processor && hardDisk && touchScreen) || (gender && size && colour))){
      let res = await axios.put(
        `https://vmart-api.herokuapp.com/updateProduct/${updateProducts._id}`, Product, {

          headers: {
            accept: "application/json",
            "content-Type": "application/json",
          }
        });
      console.log(">>>>>>>>>>>>>>", res);
      if (res.status === 201) {
        toast("Successfully Updated");
        props.getProductsData();
        props?.setShowForm(false);
      } else {
        window.alert("unable To Post");
      }

    }

    
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
                      {error.name && (
                      <span className="text-danger font-weight-bold">
                        {error.name}
                      </span>
                    )}
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
                      {error.description && (
                      <span className="text-danger font-weight-bold">
                        {error.description}
                      </span>
                    )}
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label">Product Price (in RS)</label>
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
                      {error.price && (
                      <span className="text-danger font-weight-bold">
                        {error.price}
                      </span>
                    )}
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label">Avaliable Stock</label>
                      <input
                        type="text"
                        value={stock}
                        className="form-control"
                        placeholder="Avaliable stock"
                        onChange={(e) => {
                          setStock(e.target.value);
                        }}
                        required
                      />
                      {error.stock && (
                      <span className="text-danger font-weight-bold">
                        {error.stock}
                      </span>
                    )}
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label"> Product Brand</label>
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
                      {error.brand && (
                      <span className="text-danger font-weight-bold">
                        {error.brand}
                      </span>
                    )}
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
                          setImage1(e.target.files[0]);
                        }}
                        required
                      />
                      {error.image1 && (
                      <span className="text-danger font-weight-bold">
                        {error.image1}
                      </span>
                    )}
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
                          setImage2(e.target.files[0]);
                        }}
                        required
                      />
                      {error.image2 && (
                      <span className="text-danger font-weight-bold">
                        {error.image2}
                      </span>
                    )}
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
                          setImage3(e.target.files[0]);
                        }}
                        required
                      />
                      {error.image3 && (
                      <span className="text-danger font-weight-bold">
                        {error.image3}
                      </span>
                    )}
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
                          setImage4(e.target.files[0]);
                        }}
                        required
                      />
                      {error.image4 && (
                      <span className="text-danger font-weight-bold">
                        {error.image4}
                      </span>
                    )}
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
                      {error.category && (
                        <span className="text-danger font-weight-bold">
                          {error.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {category === "mobile" ? (
                    <div>
                      <div className="row mt-2">
                        <div className="d-flex flex-row align-items-center mb-4 col-md-4">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">RAM (in GB)</label>
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
                            {error.RAM && (
                              <span className="text-danger font-weight-bold">
                                {error.RAM}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4 col-md-4 ">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">
                              Battery Capacity (in mAh)
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
                            {error.batteryCapacity && (
                              <span className="text-danger font-weight-bold">
                                {error.batteryCapacity}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4 col-md-4">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Screen size (in inch)</label>
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
                            {error.screenSize && (
                              <span className="text-danger font-weight-bold">
                                {error.screenSize}
                              </span>
                            )}
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
                            {error.networkType && (
                              <span className="text-danger font-weight-bold">
                                {error.networkType}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4 col-md-4">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">
                              Resolution type (in pixel )
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
                            {error.resolutionType && (
                              <span className="text-danger font-weight-bold">
                                {error.resolutionType}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4 col-md-4 ">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Primary camera (in megapixel)</label>
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
                            {error.camera && (
                              <span className="text-danger font-weight-bold">
                                {error.camera}
                              </span>
                            )}
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
                            {error.processor && (
                              <span className="text-danger font-weight-bold">
                                {error.processor}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4 col-md-4 ">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">
                              Harddisk capacity (in GB)
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
                            {error.hardDisk && (
                              <span className="text-danger font-weight-bold">
                                {error.hardDisk}
                              </span>
                            )}
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
                            {error.touchScreen && (
                              <span className="text-danger font-weight-bold">
                                {error.touchScreen}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    category === "shoes" && (
                      <div>
                        <div className="row mt-2">
                          <div className="d-flex flex-row align-items-center mb-4 col-md-4">
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
                              {error.gender && (
                                <span className="text-danger font-weight-bold">
                                  {error.gender}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4 col-md-4">
                            <div className="form-outline flex-fill mb-0">
                              <label className="form-label">Size (in UK/india)</label>
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
                              {error.size && (
                              <span className="text-danger font-weight-bold">
                                {error.size}
                              </span>
                            )}
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4 col-md-4">
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
                              {error.colour && (
                              <span className="text-danger font-weight-bold">
                                {error.colour}
                              </span>
                            )}
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
                      onClick={() => {
                        tryingtodosomething();
                        
                        //postImages();
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