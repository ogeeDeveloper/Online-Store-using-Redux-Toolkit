import { createSlice} from '@reduxjs/toolkit'

const cartSlice =createSlice({
    name:'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        isChange: true,
    },
    reducers:{
        replaceCart(state, action){
            state.totalQuantity = action.payload.totalQuantity
            state.items = action.payload.items
        },
        addItemsToCart(state, action){
            // Extract the item, and the action will be ay extra data that is extracted from payload
            const newItem = action.payload // Paloads will be used to identify the item that will be added to cart
            
            // Check if the item already exist in cart, annd compare it against item already in cart
            const existingItem = state.items.find(item=>item.id===newItem.id)

            // Increase total Quantity b 1
            state.totalQuantity++

            // Set isChange to true
            state.isChange=true

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
                // Increase total Quantity by 1
                state.totalQuantity--

                // If the Item already exists in the items array the update the Existing item
                existingItem.quantity++
                existingItem.totalPrice = existingItem.totalPrice + newItem.price
            }
        },
        removeItemsToCart(state, action){
            const id = action.payload
            const existingItem = state.items.find(item=>item.id === id)

            state.isChange=true

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

export const cartActions = cartSlice.actions

export default cartSlice