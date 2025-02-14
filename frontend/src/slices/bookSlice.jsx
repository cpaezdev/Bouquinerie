import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    books: []
    
}

export const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        loadBooks: (state, action) => {
            state.books = action.payload
        }
    }
})

export const { loadBooks } = bookSlice.actions
export const selectBooks = (state) => state.books
export default bookSlice.reducer
