"use client"
import { Alert, Box, Button, Container, TextField, Typography, CircularProgress } from '@mui/material'
// import CircularProgress from '@mui/material';
import React, { use, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store/store';
import { login } from '@/redux/slices/authSlice';
import { logout } from '@/redux/slices/authSlice';
import { User } from '@/type/type';



const Login = () => {

    const searchParams = useSearchParams();
    const user = searchParams.get("user");
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)

    const { error, success, isLoading } = useSelector((state: RootState) => state.auth)



    const handleSubmit = () => {
        dispatch(login({ user, email, password }))
    }

    useEffect(() => {
        const user: User = JSON.parse( localStorage.getItem("user") || null) 
        if (success) {
            if (user?.role === "admin") {
                router.push("/admin-dashboard")
            }
            else if (user?.role === "teacher") {
                router.push("/teacher-dashboard")
            } else {
                router.push("/")
            }
        }
    }, [success])


    return (
        <Container maxWidth="xs" sx={{ border: "2px solid", borderColor: "primary.main", borderRadius: 5, mt: 10, textAlign: "center", p: 4 }}>
            <Typography variant='h5' sx={{ pb: 3, fontWeight: '500' }}>
                Login  as <span className=' text-2xl font-bold text-[#E43131]'>{user === "student" ? "Student" : user === "teacher" ? "Teacher" : "Admin"}</span>
            </Typography>
            {success && <Alert severity='success'>{success}</Alert>}
            {error && <Alert severity='error'>{error}</Alert>}
            <TextField
                label='Email'
                name='email'
                fullWidth
                margin='normal'
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
                label='Password'
                name='password'
                fullWidth
                margin='normal'
                type='password'
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 2 }}>
                <Button variant='gradient' disabled={isLoading} onClick={handleSubmit}>{isLoading ? <CircularProgress sx={{ color: "white" }} size={26} /> : "Login"}</Button>
            </Box>
            {user === "student" && <Typography variant='h6' sx={{ fontSize: 15, mt: 2 }}>
                Don't have an account, click <span className=' hover:text-[#E43131] hover:underline cursor-pointer' onClick={() => router.push("/auth/student-register")}>here</span> to Register
            </Typography>}
        </Container>
    )
}

export default Login