const cart = [];

const handleCart =(state1 = cart, action) => {
    const product = action.payload;
    switch (action.type) {
        case "ADDITEM":
            // Check if Product is Already Exist
            const exist = state1.find((x)=> x.id === product.id);
            if(exist){
                // Increase the Quantity
                return state1.map((x)=>
                x.id === product.id ? {...x, qty: x.qty + 1} : x
                );
            }else{
                const product = action.payload;
                return[
                    ...state1,
                    {
                        ...product,
                        qty: + 1,
                    }
                ]
            }
            

            case "DELITEM":
                const exist1 = state1.find((x)=> x.id === product.id);
                if(exist1.qty === 0){
                    return state1.filter((x)=> x.id !== exist1.id);
                }else{
                    return state1.map((x)=>
                        x.id === product.id ? {...x, qty: x.qty=0} : x
                    );
                }
                
    
        default:
            return state1;            
    }

}

export default handleCart;