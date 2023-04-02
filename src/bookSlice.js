import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    books: [],
}

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        saveBooks: (state, { payload }) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.books = payload.books;
        },
        decrement: (state) => {
            state.value -= 1
        },
    },
})

// Action creators are generated for each case reducer function
export const { saveBooks, decrement } = bookSlice.actions

export default bookSlice.reducer