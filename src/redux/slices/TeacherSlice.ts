
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getToken } from "@/lib/getToken";
import { Teacher } from "@/type/type";



interface InitialState {
    teacherData: [] | null
    isLoading: Boolean
    error: String | null
    success: String | null
}

const initialState: InitialState = {
    teacherData: null,
    isLoading: false,
    error: null,
    success: null
}

const base_url = process.env.NEXT_PUBLIC_BASE_URL

export const fetchTeachers = createAsyncThunk("teacher/all", async () => {
    const responce = await fetch(base_url + "/api/teacher/list", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: getToken()
        },

    })

    const data = await responce.json()
    if (!responce.ok) {
        throw new Error(data.message)
    }

    return data
})

export const addNewTeacher = createAsyncThunk("teacher/create-new", async ({ name, email, department, subject, password }: Teacher) => {
    const responce = await fetch(base_url + "/api/teacher/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            token: getToken()
        },
        body: JSON.stringify({ name, email, subject, department, password })

    })

    const data = await responce.json()
    if (!responce.ok) {
        throw new Error(data.message)
    }

    return data
})

export const deleteTeacher = createAsyncThunk("teacher/delete", async ({ teacherId }: { teacherId: string }) => {
    const responce = await fetch(base_url + "/api/teacher/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            token: getToken()
        },
        body: JSON.stringify({ teacherId })

    })

    const data = await responce.json()
    if (!responce.ok) {
        throw new Error(data.message)
    }

    return data
})

export const updateTeacher = createAsyncThunk("teacher/update", async ({ name, email, subject, department, teacherId }: Teacher) => {
    const responce = await fetch(base_url + "/api/teacher/update", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            token: getToken()
        },
        body: JSON.stringify({ teacherId, name, email, department, subject })

    })

    const data = await responce.json()
    if (!responce.ok) {
        throw new Error(data.message)
    }

    return data
})

export const teacherSlice = createSlice({
    name: "teacher-slice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchTeachers.pending, (state) => {
            state.isLoading = true
            state.error = null
            // state.success = null
        })
            .addCase(fetchTeachers.fulfilled, (state, action: PayloadAction<{ teachers: Teacher }>) => {
                state.isLoading = false
                state.teacherData = action.payload.teachers
            })
            .addCase(fetchTeachers.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })

        // for adding new teacher
        builder.addCase(addNewTeacher.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.success = null
        })
            .addCase(addNewTeacher.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
                state.isLoading = false
                state.success = action.payload.message
            })
            .addCase(addNewTeacher.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })

        // deleting teacher
        builder.addCase(deleteTeacher.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.success = null
        })
            .addCase(deleteTeacher.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
                state.isLoading = false
                state.success = action.payload.message
            })
            .addCase(deleteTeacher.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
        
        // for update teacher
        builder.addCase(updateTeacher.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.success = null
        })
            .addCase(updateTeacher.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
                state.isLoading = false
                state.success = action.payload.message
            })
            .addCase(updateTeacher.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    },
    reducers: {

    }
})

export default teacherSlice.reducer
