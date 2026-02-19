"use client"
import FullScreenLoader from '@/loader/FullScreanLoder'
import { approvedRegistration, fetchStudent } from '@/redux/slices/studentSlice'
import { AppDispatch, RootState } from '@/redux/store/store'
import { Student } from '@/type/type'
import { Alert, Box, Button, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { studentData, isLoading, error, success } = useSelector((state: RootState) => state.student)
    const [status, setStatus] = useState<string>("select")
    const [isDisable, setIsDisable] = useState<boolean>(false)
    const [studentId, setStudentId] = useState<string>('')

    const handleUpdate = () => {
        dispatch(approvedRegistration({ studentId, status }))

    }

    useEffect(() => {
        if (status === "select") {
            setIsDisable(true)
        } else {
            setIsDisable(false)
        }
    }, [status])

    useEffect(() => {
        dispatch(fetchStudent())
    }, [dispatch, success])


    return (
        <Box sx={{ py: 3, px: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant='h6'>All Student</Typography>
                {/* <Button variant='gradient' onClick={() => setOpenCreateModal(true)}><span className=' mr-2' ><AddIcon /></span>Add New</Button> */}
            </Box>

            {error && <Alert severity='error' sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity='success' sx={{ mt: 1 }}>{success}</Alert>}

            {isLoading && <FullScreenLoader />}
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
                                    <TableCell sx={student.status === "pending" ? { color: "#9b8401" } : student.status === "approved" ? { color: "green" } : { color: "red" }}>
                                        {student.status}
                                        <Select sx={{
                                            ml: 2, p: 0, border: "none",
                                            "& .MuiSelect-select": {
                                                padding: "6px 4px",
                                            },
                                        }} value={status} onChange={(e) => { setStatus(e.target.value), setStudentId(student._id) }}>
                                            <MenuItem value="select" disabled>
                                                Select
                                            </MenuItem>
                                            <MenuItem value="pending" >pending</MenuItem>
                                            <MenuItem value="approved" >approved</MenuItem>
                                            <MenuItem value="rejected" >rejected</MenuItem>
                                        </Select>
                                        <Button variant='gradient' sx={{ ml: 2 }} disabled={isDisable} onClick={() => { handleUpdate() }}>Update</Button>
                                    </TableCell>

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