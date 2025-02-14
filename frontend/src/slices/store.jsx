import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import bookReducer from "./bookSlice"

import basketReducer from "./basketSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        books: bookReducer,  
        basket: basketReducer,
    }
})

export default store
