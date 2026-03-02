"use client"
import { Fullscreen } from '@mui/icons-material'
import { Container, Drawer, List, ListItemButton, ListItemText, Menu, Typography } from '@mui/material'
import { lightBlue, purple, red } from '@mui/material/colors'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import {styled} from '@mui/material/styles'


const StudentSideBar = () => {

    const StyledListItemButton = styled(ListItemButton)(({theme})=>({
        '&.Mui-selected' : {
            backgroundColor : "#240b58",
            '&:hover' : {
                backgroundColor : "#240b58"
            }
        }
    }))

    const pathname = usePathname()
    const router = useRouter()
    return (
        <Drawer variant='permanent'
            sx={{
                minHeight: "90dvh",
                width: "220px",
                "& .MuiDrawer-paper": {
                    width: "220px",
                    boxSizing: "border-box",
                    mt: `64px`,
                    backgroundColor : "primary.main"
                },
               

            }} >
            <Typography variant='h6' mt={2} mb={1} sx={{color:"secondary.main", textAlign:"center"}}>Student Dashboard</Typography>
            <hr/>
            <List sx={{ width: "full",  color : "white"}}>
                <StyledListItemButton selected={pathname === "/student-dashboard" || pathname.startsWith("/student-dashboard/book-appointment")} onClick={()=>router.push("/student-dashboard")}>
                    <ListItemText primary="Book Teacher"  />
                </StyledListItemButton>

                <StyledListItemButton selected={pathname === "/student-dashboard/my-appointment"}  onClick={()=>router.push("/student-dashboard/my-appointment")}>
                    <ListItemText primary="My Appointments"  />
                </StyledListItemButton>

                {/* <StyledListItemButton selected={pathname === "/admin-dashboard/student"} onClick={()=>router.push("/admin-dashboard/student")}>
                    <ListItemText primary="Students"  />
                </StyledListItemButton> */}

                
            </List>
        </Drawer>
    )
}

export default StudentSideBar