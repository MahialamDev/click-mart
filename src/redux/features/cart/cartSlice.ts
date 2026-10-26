import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: () => { 
            
        }
    }
})

export default cartSlice.reducer;