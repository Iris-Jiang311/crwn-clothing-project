import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd)=>{
    // 1. find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === productToAdd.id)
    // 2. if found, increment quantity
    if(existingCartItem){
        return cartItems.map((cartItem)=> cartItem.id === productToAdd.id ? {...cartItem,quantity:cartItem.quantity+1} : cartItem)
    }
    // 3. return a new array with modified cartItem / new cart item
    return [...cartItems, {...productToAdd, quantity:1}]
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart:()=>{},
    cartItemCount:0
})

export const CartProvider = ({children})=>{
    const [isCartOpen,setIsCartOpen]=useState(false)
    const [cartItems, setCartItems]= useState([])
    const [cartItemCount,setCartItemCount] = useState(0)

    useEffect(
        ()=>{
            const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
            setCartItemCount(newCartCount)
        },
        [cartItems]
    )

    const addItemToCart =(productToAdd)=>{
        setCartItems(addCartItem(cartItems,productToAdd))
    }
    const value = {isCartOpen,setIsCartOpen, addItemToCart, cartItems, cartItemCount}

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}