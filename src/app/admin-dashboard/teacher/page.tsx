"use client"
import { Alert, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store/store';
import { deleteTeacher, fetchTeachers } from '@/redux/slices/TeacherSlice';
import { Teacher } from '@/type/type';
import FullScreenLoader from '@/loader/FullScreanLoder';
import { useRouter } from 'next/navigation';
import CreateTeacherModal from '@/component/admin/CreateTeacherModal';
import UpdateTeacherModal from '@/component/admin/UpdateTeacherModal';



const page = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { teacherData, isLoading, error, success } = useSelector((state: RootState) => state.teacher)
    const router = useRouter()
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)
    const [teacherUpdateData, setTeacherUpdateData] =  useState<Teacher|null>(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(!token){
            router.push("/auth")
        }else{
            dispatch(fetchTeachers())
        }

    }, [dispatch, router, success])

    return (
        <Box sx={{ py: 3, px: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant='h6'>All Teachers</Typography>
                <Button variant='gradient' onClick={()=>setOpenCreateModal(true)}><span className=' mr-2' ><AddIcon /></span>Add New</Button>
            </Box>

            {!openCreateModal && !openUpdateModal &&  error && <Alert severity='error' sx={{mt:2}}>{error}</Alert>}
            {success && <Alert severity='success' sx={{mt:1}}>{success}</Alert>}
            {!openCreateModal && !openUpdateModal && isLoading && <FullScreenLoader/>}

            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead sx={{ fontWeight: "600" }}>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {teacherData?.map((teacher: Teacher) => {
                            return (

                                <TableRow key={teacher._id}>
                                    <TableCell>{teacher.name}</TableCell>
                                    <TableCell>{teacher.email}</TableCell>
                                    <TableCell>{teacher.department}</TableCell>
                                    <TableCell>{teacher.subject}</TableCell>
                                    <TableCell>
                                        <Button sx={{ color: "green" }} onClick={()=>{setOpenUpdateModal(true), setTeacherUpdateData(teacher)}}>
                                            <EditIcon />
                                        </Button>
                                        <Button sx={{ color: "red" }}  onClick={()=>dispatch(deleteTeacher({teacherId:teacher._id}))}>
                                            <DeleteForeverIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}



                    </TableBody>
                </Table>
            </TableContainer>

            <CreateTeacherModal open = {openCreateModal} onclose={()=>setOpenCreateModal(false)} />
            <UpdateTeacherModal open= {openUpdateModal} onclose={()=>setOpenUpdateModal(false)} teacherUpdateData = {teacherUpdateData} />
        </Box>
    )
}

export default page