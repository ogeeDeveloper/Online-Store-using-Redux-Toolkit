import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialToggleCartState={isToggled:false}
const toggleCartSlice = createSlice({
    name: 'toggle_cart',
    initialState: initialToggleCartState,
    reducers:{
        showCart(state){
            state.isToggled=true
        },
        hideCart(state){
            state.isToggled=false
        },
    }
})

export const toggleCartActions = toggleCartSlice.actions

const store = configureStore({
    reducer:{
        toggle: toggleCartSlice.reducer,
    }
})

export default store