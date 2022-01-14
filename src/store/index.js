import { configureStore } from '@reduxjs/toolkit'
import toggleCartSlice from './UI_Layout-slice'
import cartSlice from './cart-slice'


const store = configureStore({
    reducer:{
        toggle: toggleCartSlice.reducer,
        cart: cartSlice.reducer,
    }
})

export default store