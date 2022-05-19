import React, { useState } from "react";
import "./testing_css.css";






const Testing = () => {

    const [open , setOpen] = useState(false);

    const handleClick = () => {

      var movies = ["Reservoir Dogs", "Pulp Fiction", "Jackie Brown", 
              "Kill Bill", "Death Proof", "Inglourious Basterds"];

      localStorage.setItem("quentinTarantino", JSON.stringify(movies));

      // if (open===true) {
      //   setOpen(false)
      // } else {
      //   setOpen(true)
      // }
    };


    const handleClick2 = () => {

      var retrievedData = localStorage.getItem("Mycart");
      var Mycart = JSON.parse(retrievedData);
      console.log(Mycart);

      // if (open===true) {
      //   setOpen(false)
      // } else {
      //   setOpen(true)
      // }
    };
    
 
   

  
    return (
      <div
        className={"container " + (open ? "expand" : "")}
        
      >
        <div className="upper">
          <p>June 10</p>
          <h3 onClick={handleClick}>
            Hiii            
          </h3>
        </div>
        <div className="lower">
            <p>June 10</p>
            <h3 onClick={handleClick2}>
              Hello
            </h3>
        </div>
      </div>   
    );
  }


export default Testing;
