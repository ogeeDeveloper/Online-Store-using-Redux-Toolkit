import { createSlice } from '@reduxjs/toolkit'

const initialToggleCartState={isToggled:false}

const toggleCartSlice = createSlice({
    name: 'toggle_cart',
    initialState: initialToggleCartState,
    reducers:{
        toggle(state){
            state.isToggled = !state.isToggled
        },
    }
})

export const toggleCartActions = toggleCartSlice.actions

export default toggleCartSlice