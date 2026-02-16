"use client"
import { AppBar, Avatar, Button, Container, Toolbar, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'

export const Navbar = () => {
    const {userData, success} =  useSelector((state:RootState)=>state.auth)
    const [user, setUser] =  useState(null)
    const [myToken , setMyToken] =  useState<string|null>(null)
    
    
    const router =  useRouter()
    
    useEffect(()=>{
        const token =  localStorage.getItem("token")
        setMyToken(token) 
    },[router, success])

    useEffect(()=>{
        const Curnt_user =  JSON.parse(localStorage.getItem("user"))
        setUser(Curnt_user)
    },[success, router])

    console.log(user)


    return (
        <AppBar position='static'>
            <Toolbar sx={{ display: "flex" , justifyContent : "space-between" , alignItems : "center"}}>
                <Typography variant='h6'>
                    Teacher Booking System
                </Typography>
                <Typography>

                </Typography>

                {myToken ? <Dropdown user={user} setToken = {()=>setMyToken(null)}/> :  <Button variant='outlinedWhite' onClick={()=>router.push("/auth")}>login</Button>}
            </Toolbar>
        </AppBar>
    )
}



