"use client"
import FullScreenLoader from '@/loader/FullScreanLoder'
import { fetchStudent } from '@/redux/slices/studentSlice'
import { AppDispatch, RootState } from '@/redux/store/store'
import { Student } from '@/type/type'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {

    const dispatch = useDispatch<AppDispatch>();
    const {studentData, isLoading, error, success} =  useSelector((state:RootState)=>state.student)

    useEffect(()=>{
        dispatch(fetchStudent())
    },[dispatch])


    return (
        <Box sx={{ py: 3, px: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant='h6'>All Student</Typography>
                {/* <Button variant='gradient' onClick={() => setOpenCreateModal(true)}><span className=' mr-2' ><AddIcon /></span>Add New</Button> */}
            </Box>

            {/* {!openCreateModal && !openUpdateModal && error && <Alert severity='error' sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity='success' sx={{ mt: 1 }}>{success}</Alert>}
            {!openCreateModal && !openUpdateModal && isLoading && <FullScreenLoader />} */}
            {isLoading && <FullScreenLoader/>}
            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead sx={{ fontWeight: "600" }}>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Registration Status</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {studentData?.map((student: Student) => {
                            return (

                                <TableRow key={student._id}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.status}</TableCell>
                                    
                                    {/* <TableCell>
                                        <Button sx={{ color: "green" }} onClick={() => { setOpenUpdateModal(true), setTeacherUpdateData(teacher) }}>
                                            <EditIcon />
                                        </Button>
                                        <Button sx={{ color: "red" }} onClick={() => dispatch(deleteTeacher({ teacherId: teacher._id }))}>
                                            <DeleteForeverIcon />
                                        </Button>
                                    </TableCell> */}
                                </TableRow>
                            )
                        })}



                    </TableBody>
                </Table>
            </TableContainer>

            {/* <CreateTeacherModal open={openCreateModal} onclose={() => setOpenCreateModal(false)} />
            <UpdateTeacherModal open={openUpdateModal} onclose={() => setOpenUpdateModal(false)} teacherUpdateData={teacherUpdateData} /> */}
        </Box>
    )
}

export default page