import TeacherSideBar from "@/component/teacher/TeacherSideBar";
import { Box } from "@mui/material";
import React from "react";

export default function TeacherLayout({children} : Readonly<{children : React.ReactNode}>){
    return (
        <Box>
            <Box sx={{display:"flex"}}>
                {/* side bar------ */}
                <TeacherSideBar/>
                <Box sx={{flexGrow : 1}}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}