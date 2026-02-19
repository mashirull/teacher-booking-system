"use client"
import { Avatar, Box, Button, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store/store';
import { logout } from '@/redux/slices/authSlice';
import { User } from '@/type/type';

const Dropdown = ({user, setToken}:{user:User, setToken : ()=>void}) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter()

    const open = Boolean(anchorEl)

    const dispatch = useDispatch<AppDispatch>()

    const logoutHandler = () => {
        dispatch(logout())
        router.push("/auth")
        setToken()
        setAnchorEl(null)
    }


    return (
        <>
            <Button onClick={(e) => setAnchorEl(e.currentTarget)} endIcon={<ArrowDropDownIcon sx={{ transition: "0.3s", transform: open ? "rotate(180deg)" : "rotate(0deg)", color: "white" }} />}>
                <Avatar sx={{ bgcolor: "secondary.main", cursor: "pointer" }} >{(user?.name)[0].toLocaleUpperCase()}</Avatar>
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} >
                <Box sx={{padding :2}}>
                    <Typography sx={{textAlign:"center", mb: 2}}>{user?.role}</Typography>
                    <Typography sx={{fontSize:14}}>{user?.email}</Typography>
                </Box>
                {user?.role === "admin" && <MenuItem sx={{ fontSize: 14 }} onClick={()=>{router.push("/admin-dashboard"), setAnchorEl(null)}} >Dashboard</MenuItem>}
                {/* <MenuItem sx={{ fontSize: 14 }} >My application</MenuItem> */}
                <Button onClick={logoutHandler}>Logout<LogoutIcon/></Button>
            </Menu>
        </>
    )
}

export default Dropdown