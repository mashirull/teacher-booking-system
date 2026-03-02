"use client"

import { Avatar, Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from 'next/navigation';
import teacher from '@/models/teacher';


const TeacherCard = ({ name, department, subject , id }: { name: string, department: string, subject: string, id ?: string }) => {
    const router = useRouter()
    return (
        <Grid item xs={8} sm={6} md={4} >
            <Card sx={{ textAlign: "center", p: 2 , width:350}} >
                <Avatar
                    sx={{
                        bgcolor: "primary.main",
                        width: 60,
                        height: 60,
                        margin: "0 auto 16px",
                    }}
                >
                    <PersonIcon fontSize="large" />
                </Avatar>

                <CardContent>
                    <Typography variant="h5" sx={{pb:3}}>{name}</Typography>
                    <Box sx={{display:"flex", alignItems:"center", justifyContent : "space-between" , gap:3}}>
                        <Box color="text.secondary" sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography fontWeight={600}>Department</Typography>
                            <Typography fontSize={15}>{department}</Typography>
                        </Box>

                        <Box color="text.secondary" sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography fontWeight={600}>Subject</Typography>
                            <Typography fontSize={15}>{subject}</Typography>
                        </Box>
                    </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                        variant="gradient"
                        sx={{
                            padding: "5px 10px"
                        }}
                        size="small"
                        onClick={() => router.push(`/student-dashboard/book-appointment/teacher/${id}`)}
                    >
                        Book Appointment
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default TeacherCard