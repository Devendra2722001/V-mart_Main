import React, { useState, useEffect } from "react";

const View = (props) => {
  const updateData = (product) => {
    props?.setUpdateProducts(product);
    props?.setShowForm(true);
  };


  const [productCount ,setproductCount] = useState();
  const [OrderCount ,setOrderCount] = useState();
  const [outOfStockCount ,setoutOfStockCount] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);    
    setInterval(() => {
      setproductCount(sessionStorage.getItem("Myproducts"))   
      setOrderCount(sessionStorage.getItem("MyOrder"))   
      setoutOfStockCount(sessionStorage.getItem("OutOfStock"))  
    }, 500); 
  }, []);

  return (
    <>
    <br/>
      <div>
      <div className="Van_body">

<div className="Van_Card">
  <div>
    <span className="Van_Card_font">
      Total Products : 
    </span> 
  </div>

  <div>
    <span className="Van_Card_font">
      <b>
      {productCount}
      </b>
    </span>
  </div>
  
</div>

<div className="Van_Card">
  <div>
    <span className="Van_Card_font">
    Total Orders : 
    </span> 
  </div>

  <div>
    <span className="Van_Card_font">
      <b>
      {OrderCount}
      </b>
    </span>
  </div>
  
</div>

<div className="Van_Card">
  <div>
    <span className="Van_Card_font">
      Product Out Of Stock : 
    </span> 
  </div>

  <div>
    <span className="Van_Card_font">
      <b>
      {outOfStockCount}
      </b>
    </span>
  </div>
  
</div>

</div>
        <div className="container-scroller">
          <div className="container-fluid page-body-wrapper table-responsive ">
            <div className="table-responsive tbl ">
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Product_Name</th>
                    <th>Product_Description</th>
                    <th>Product_Price</th>
                    <th>Product_Category</th>
                    <th>Product_Brand</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {props?.products.map((product) => (
                    <tr>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <div className="admin_delup">
                          <div id="bloc4">
                            <img
                              src="../images/delete.png"
                              width="30rem;"
                              alt="user order list"
                              title="Delete Product"
                              onClick={() => props?.deleteProduct(product._id)}
                            />
                          </div>
                          <div id="bloc4">
                            <img
                              src="../images/updated.png"
                              width="30rem;"
                              alt="user order list"
                              title="Update Product"
                              onClick={() => updateData(product)}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
