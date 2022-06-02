import { useEffect, useState } from "react";

export default function Testing() {

   useEffect(() => {    
      setdata(Api);
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    

   let [data, setdata] = useState([]);
   const [isChecked, setIsChecked] = useState(false);
   const [isChecked1, setIsChecked1] = useState(false);
   let newData = [];
 
   const handleOnChange = () => {
      if(isChecked===false){
        for (let i = 0; i < Api.length; i++) {
          newData.push(Api[i]);
          console.log("bothData",newData);
      }
        setdata(newData)
        setIsChecked(true);
      }else{
        setIsChecked(false);
          for (let i = 0; i < Api.length; i++) {
            newData.pop(Api[i]);
            console.log("bothData",newData);
        }
          setdata(newData)
          
      }
   };

   console.log("Data",data);
   

   //console.log("Value",value);
   const handleOnChange1 = () => {      
      if(isChecked1===false){
         newData = data.filter((x) => x.price <50000)
         setdata(newData);
         console.log("newData",newData);
         setIsChecked1(true);
      }else{
         if(isChecked===true && isChecked1===true){
         newData = Api.filter((x) => x.category === "Mobile")
         setdata(newData);
         console.log(newData);
         }else{
            setdata(Api);
         }
         //setdata(Api);
         setIsChecked1(false);
      }
    };

   let Api = [
      {
        "id": 1,
        "sku": 1,
        "image": "images/product-img/iphone-13a.webp",
        "title": "Iphone 13",
        "category": "Mobile",
        "price": 70000,
        "ram": "4"
      },
      {
        "id": 2,
        "sku": 2,
        "image": "images/product-img/Nike1a.webp",
        "title": "Air Force 1 '07",
        "category": "Shoes",
        "price": 2000
      },
      {
        "id": 3,
        "sku": 3,
        "image": "images/product-img/SamsungS21a.webp",
        "title": "Samsung S21",
        "category": "Mobile",
        "price": 50000
      },
      {
        "id": 4,
        "sku": 4,
        "image": "images/product-img/mac2022a.jpg",
        "title": "Mac 2022",
        "category": "Laptop",
        "price": 50000,
        "ram": "16",
        "Gender" : "Male"
      },
      {
        "id": 5,
        "sku": 5,
        "image": "images/product-img/puma-5-a.webp",
        "title": "Puma 5",
        "category": "Shoes",
        "price": 8001
      },
      {
        "id": 6,
        "sku": 6,
        "image": "images/product-img/msi-Master-a.webp",
        "title": "Msi Master 15",
        "category": "Laptop",
        "price": 60000,
        "ram": "32"
      },
      {
        "id": 7,
        "sku": 7,
        "image": "images/product-img/adidas-ultra-a.jpg",
        "title": "Adidas 131",
        "category": "Shoes",
        "price": 1000
      },
      {
        "id": 8,
        "sku": 8,
        "image": "images/product-img/Reebooka.webp",
        "title": "Reebok Ultra",
        "category": "Shoes",
        "price": 1000
      },
      {
        "id": 9,
        "sku": 9,
        "image": "images/product-img/oppof19s-a.jpg",
        "title": "Oppo f19s",
        "category": "Mobile",
        "price": 20000,
        "ram": "6"
      },
      {
        "id": 10,
        "sku": 10,
        "image": "images/product-img/10.jpg",
        "title": "Pixel 6 Pro",
        "category": "Mobile",
        "price": 40000,
        "ram": "8"
      },
      {
        "id": 11,
        "sku": 11,
        "image": "images/product-img/11.jpg",
        "title": "HP 15s",
        "category": "Laptop",
        "price": 51000,
        "ram": "8"
      },
      {
        "id": 12,
        "sku": 12,
        "image": "images/product-img/12.jpg",
        "title": "ZEPHYRUS G15",
        "category": "Laptop",
        "price": 130000,
        "ram": "32"
      }
    ];

    //console.log(newData);
 
   return (
     <div className="App">
       Select your pizza topping:
       <div className="topping">
         <input
           type="checkbox"
           id="topping"
           name="topping"
           value="1"
           //onClick={ () => setValue("category")}
           checked={isChecked}
           onClick={handleOnChange}
         />
         Mobile
         <br/>
         <input
           type="checkbox"
           id="topping"
           name="topping"
           value="2"
           checked={isChecked1}
           onChange={handleOnChange1}
         />
         Price
       </div>
       <div>

         {data.map((product) => {
            return (
               <>

                  <h4>{product.id}</h4>                  
                  <h4>{product.category}</h4>
                  <h4>{product.price}</h4>

               </>
            )
         })}

       </div>
       <div className="result">
         Above checkbox 1 is {isChecked ? "checked" : "un-checked"}.
       </div>
       <div className="result">
         Above checkbox 2 is {isChecked1 ? "checked" : "un-checked"}.
       </div>
     </div>
   );
 }