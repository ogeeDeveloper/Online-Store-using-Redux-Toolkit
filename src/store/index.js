import { configureStore } from '@reduxjs/toolkit'
import toggleCartSlice from './UI_Layout-slice'


const store = configureStore({
    reducer:{
        toggle: toggleCartSlice.reducer,
    }
})

export default store