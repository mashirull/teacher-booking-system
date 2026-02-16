"use client"
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

const StudentRegister = () => {

    const router =  useRouter()

  return (
        <Container maxWidth="xs" sx={{ border: "2px solid", borderColor: "primary.main", borderRadius: 5, mt: 10, textAlign: "center", p: 4 }}>
            <Typography variant='h5' sx={{ pb: 3, fontWeight: '500' }}>
                Register  as <span className=' text-2xl font-bold text-[#E43131]'>Student</span>
            </Typography>
            
             <TextField
                label='Name'
                name='name'
                fullWidth
                margin='normal'
            />

            <TextField
                label='Email'
                name='email'
                fullWidth
                margin='normal'
            />

            <TextField
                label='Password'
                name='password'
                fullWidth
                margin='normal'
                type='password'
            />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 2 }}>
                <Button variant='gradient'>Register</Button>
            </Box>
            { <Typography variant='h6' sx={{ fontSize: 15, mt: 2 }}>
                Already have an account, click <span className=' hover:text-[#E43131] hover:underline cursor-pointer' onClick={()=>router.push("/auth/login?user=student")}>here</span> to Login
            </Typography>}
        </Container>
    )
}

export default StudentRegister