import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar(props) {
  const showForm = () => {
    props?.setShowForm(true);
    props?.setUpdateProducts();
  };
  return (
    <div>
      <div className="container-fluid_btn" id="form_margin">
        <button onClick={showForm} type="button" className="btn btn-primary">
          Add Product
        </button>
      </div>
    </div>
  );
}
