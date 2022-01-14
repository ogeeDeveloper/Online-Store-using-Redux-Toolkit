import { createSlice} from '@reduxjs/toolkit'

createSlice({
    name:'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers:{
        addItemsToCart(state, action){
            // Extract the item, and the action will be ay extra data that is extracted from payload
            const newItem = action.payload
            // Check if the item already exist in cart, annd compare it against item already in cart
            const existingItem = state.items.find(item=>item.id===newItem.id)
            // If the item does ot exist the add it to the cart else increase the quantity of the existing item in cart
            if(!existingItem){
                // Push item in the items array
                state.items.push({
                    itemId: newItem.id, 
                    price: newItem.price, 
                    quantity: 1, 
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            }else{
                // If the Item already exists in the items array the update the Existing item
                existingItem.quantity++
                existingItem.totalPrice = existingItem.totalPrice + newItem.price
            }
        },
        removeItemsToCart(state){},
    },
})