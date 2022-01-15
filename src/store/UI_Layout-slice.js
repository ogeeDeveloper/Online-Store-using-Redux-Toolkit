import { createSlice } from '@reduxjs/toolkit'

const initialToggleCartState={isToggled:false, notification: null}

const toggleCartSlice = createSlice({
    name: 'toggle_cart',
    initialState: initialToggleCartState,
    reducers:{
        toggle(state){
            state.isToggled = !state.isToggled
        },
        showNotification(state,action){
            state.notification = {
                status:  action.payload.status,
                tittle: action.payload.tittle,
                message: action.payload.message
            } // Status could be pending or error
        }
    }
})

export const toggleCartActions = toggleCartSlice.actions

export default toggleCartSlice