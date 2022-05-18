import React, { useState } from "react";
import "./testing_css.css";






const Testing = () => {

    const [open , setOpen] = useState(false);

    const handleClick = () => {
      if (open===true) {
        setOpen(false)
      } else {
        setOpen(true)
      }
    };

  
    return (
      <div
        className={"container " + (open ? "expand" : "")}
        onClick={handleClick}
      >
        <div className="upper">
          <p>June 10</p>
          <h3>
            Hiii            
          </h3>
        </div>
        <div className="lower">
            <p>June 10</p>
            <h3>
              Hello
            </h3>
        </div>
      </div>   
    );
  }


export default Testing;
