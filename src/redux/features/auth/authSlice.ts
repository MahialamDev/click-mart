import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  imageUrl: string | null;
  createdAt: string;
};

type AuthState = {
    user: User | null,
    loading: boolean
}

const initialState:AuthState = {
    user: null,
    loading: true
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction <User | null >) => { 
            state.user = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => { 
            state.loading = action.payload
        },
        logout: (state) => { 
            state.user = null
        }
    }
})

export const { setUser, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;