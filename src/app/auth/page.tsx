"use client"
import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
    const router =  useRouter()
  return (
    
    <Container maxWidth = "md" sx={{ mt : 5, textAlign : "center"}}  >
        <Typography variant='h3' sx={{p : 5}}>
            Welcome to Student Teacher Booking System
        </Typography>
        <Box sx={{display:"flex" , flexDirection : "column" , gap: 3, alignItems : "center", justifyContent : "center" , padding: "20px"}}>
            <Button variant='gradient' onClick={()=>{router.push("/auth/login?user=student")}}>Login as Student</Button>
            <Button variant='gradient' onClick={()=>{router.push("/auth/login?user=teacher")}}>Login as Teacher</Button>
            <Button variant='gradient' onClick={()=>{router.push("/auth/login?user=admin")}}>Login as Admin</Button>
        </Box>
    </Container>
  )
}

export default page