import AdminSideBar from "@/component/admin/AdminSideBar";
import { Box } from "@mui/material";
import React from "react";

export default function AdminLayout({children} : Readonly<{children : React.ReactNode}>){
    return (
        <Box>
            <Box sx={{display:"flex"}}>
                {/* side bar------ */}
                <AdminSideBar/>
                <Box sx={{flexGrow : 1}}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}