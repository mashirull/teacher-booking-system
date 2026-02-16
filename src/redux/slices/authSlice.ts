
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import getUser from "@/lib/getUserFromLocalStorage"
import { getUser } from "@/lib/getUserFromLocalStorage";


interface InitialState {
    userData: null
    isLoading: Boolean
    error: String | null
    success: String | null
}

const initialState: InitialState = {
    userData: getUser(),
    isLoading: false,
    error: null,
    success: null
}

const base_url = process.env.NEXT_PUBLIC_BASE_URL

export const login = createAsyncThunk("user-login", async ({ user, email, password }: { user: string | null, email: string | null, password: string | null }) => {
    const responce = await fetch(`${base_url}/api/${user}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })

    const data = await responce.json()
    if (!responce.ok) {
        throw new Error(data.message)
    }

    return data
})

export const authSlice = createSlice({
    name: "auth-slice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.success = null
        })
            .addCase(login.fulfilled, (state, action: PayloadAction<{ user: {}, message: string | null, token: string }>) => {
                state.isLoading = false
                state.success = action.payload.message
                localStorage.setItem("user", JSON.stringify(action.payload.user))
                localStorage.setItem("token", action.payload.token)
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            state.success = null
            state.error = null
            state.userData = null
        }
    }
})

export default authSlice.reducer
export const {logout} = authSlice.actions