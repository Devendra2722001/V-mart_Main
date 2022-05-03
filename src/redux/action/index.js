// For Add Item to Cart
export const addCart = (product) => {
    return{
        type : "ADDITEM",
        payload : product
    }
}


// For Delete Item From Cart
export const delCart = (product) => {
    return{
        type : "DELITEM",
        payload : product
    }
}

export const addFav = (favorit) => {
    return{
        type : "ADDFAV",
        payload : favorit
    }
}


export const delFav = (favorit) => {
    return{
        type : "DELFAV",
        payload : favorit
    }
}