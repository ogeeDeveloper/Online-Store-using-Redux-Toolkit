import { createSlice} from '@reduxjs/toolkit'
import {toggleCartActions} from './UI_Layout-slice'

const cartSlice =createSlice({
    name:'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers:{
        addItemsToCart(state, action){
            // Extract the item, and the action will be ay extra data that is extracted from payload
            const newItem = action.payload // Paloads will be used to identify the item that will be added to cart
            
            // Check if the item already exist in cart, annd compare it against item already in cart
            const existingItem = state.items.find(item=>item.id===newItem.id)

            // Increase total Quantity b 1
            state.totalQuantity++

            // If the item does ot exist the add it to the cart else increase the quantity of the existing item in cart
            if(!existingItem){
                // Push item in the items array
                state.items.push({
                    id: newItem.id, 
                    price: newItem.price, 
                    quantity: 1, 
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            }else{
                // Increase total Quantity b 1
                state.totalQuantity--

                // If the Item already exists in the items array the update the Existing item
                existingItem.quantity++
                existingItem.totalPrice = existingItem.totalPrice + newItem.price
            }
        },
        removeItemsToCart(state, action){
            const id = action.payload
            const existingItem = state.items.find(item=>item.id===id)

            // Checks if the quanity is 1, if its 1 then remove that item from cart
            if(existingItem.quantity===1){
                // Remove the item entirely
                // Filter through the items and remove the item wich is ot equal to te rest of te items id
                state.items= state.items.filter(item=>item.id !== id)
            }else{
                // Reduce the item quantity by 1
                existingItem.quantity--
                // Update the total price
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price
            }
        },
    },
})

//Action Creator Thunk
// Dispatching a fuction that takes in another fuction
export const sendCartData=cart=>{
    return async(dispatch) =>{
        dispatch(toggleCartActions.showNotification({
            status:"pending",
            tittle:"Sending...",
            message: "Sending cart data"
          }))
        
        const sendResponse= async() => {
            // Sends http request to firebase database
            const response = await fetch('https://fir-react-tutorial-2b75e-default-rtdb.firebaseio.com/cart.json',{method: "PUT", body: JSON.stringify(cart)})

            if(!response.ok){
                throw new Error("Their was a error adding to cart")
            }
         }

         try{
             // Send Response
            await sendResponse()

            // Show a success notification
            dispatch(toggleCartActions.showNotification({
                status:"success",
                tittle:"Success!",
                message: "Send cart data succesfull"
              }))
         }catch(error){
            dispatch(toggleCartActions.showNotification({
                status:"error",
                tittle:"Error!",
                message: "Thier was an error adding item to cart"
              }))
         }
    }
}

export const cartActions = cartSlice.actions

export default cartSlice