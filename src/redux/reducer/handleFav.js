const favorit = [];

const handleFav =(state2 = favorit, action,product) => {
    const favorit = action.payload;
    switch (action.type) {
        case "ADDFAV":
            // Check if Product is Already Exist
            const exist = state2.find((x)=> x.id === favorit.id);
            if(exist){
                // Increase the Quantity
                return state2.map((x)=>
                x.id === favorit.id ? {...x, qty: x.qty = 1} : x
                );
            }else{
                const favorit = action.payload;
                return[
                    ...state2,
                    {
                        ...favorit,product,
                        qty: 1,
                    }
                ]
            }
            

            case "DELFAV":
                const exist1 = state2.find((x)=> x.id === favorit.id);
                if(exist1.qty === 1){
                    return state2.filter((x)=> x.id !== exist1.id);
                }else{
                    return state2.map((x)=>
                        x.id === favorit.id ? {...x, qty: x.qty-1} : x
                    );
                }
                
    
        default:
            return state2         
    }

}

export default handleFav;