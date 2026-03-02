import StudentSideBar from "@/component/student/StudentSideBar";
import { Box } from "@mui/material";
import React from "react";

export default function StudentLayout({children} : Readonly<{children : React.ReactNode}>){
    return (
        <Box>
            <Box sx={{display:"flex"}}>
                {/* side bar------ */}
                <StudentSideBar/>
                <Box sx={{flexGrow : 1}}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}