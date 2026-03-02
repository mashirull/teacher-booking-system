"use client"
import FullScreenLoader from '@/loader/FullScreanLoder'
import { fetchAppointments, updateAppointmentStatus } from '@/redux/slices/AppointmentSlice'
import { AppDispatch, RootState } from '@/redux/store/store'
import { Appointment } from '@/type/type'
import { Alert, Badge, Box, Button, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MessageIcon from '@mui/icons-material/Message';
import { fetchMesages } from '@/redux/slices/messageSlice'
import MessageModal from '@/component/message/messageModal'
import UpdateUI from '@/component/UpdateUI'
import { formatDate } from '@/lib/formatDate'

const page = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { isLoading, error, success, appointmentData } = useSelector((state: RootState) => state.appointment)
    const { messageData } = useSelector((state: RootState) => state.message)
    const [status, setStatus] = useState<string>("select")
    const [isDisable, setIsDisable] = useState<boolean>(false)
    const [open , setOpen] = useState(false)
    const [messages , setMessages] = useState<null|never[]|undefined>(null)

    useEffect(() => {
        if (status === "select") {
            setIsDisable(true)
        } else {
            setIsDisable(false)
        }
    }, [status])
    useEffect(() => {
        dispatch(fetchAppointments())
    }, [dispatch, success])

    useEffect(() => {
        dispatch(fetchMesages())
    }, [])

    console.log(messageData);


    return (
        <Box sx={{ py: 3, px: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant='h6'>All Appointments</Typography>
                {/* <Button variant='gradient' onClick={() => setOpenCreateModal(true)}><span className=' mr-2' ><AddIcon /></span>Add New</Button> */}
            </Box>

            {error && <Alert severity='error' sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity='success' sx={{ mt: 1 }}>{success}</Alert>}

            {isLoading && <FullScreenLoader />}
            {appointmentData?.length === 0 ?  <Typography sx={{mt:3}}>There is not any Appointment Booked</Typography> :
             <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead >
                        <TableRow >
                            <TableCell sx={{ fontWeight: "600" }}>Student Name</TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>Student Email</TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>Time</TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>Message</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {appointmentData?.map((appointment: Appointment) => {
                            return (

                                <TableRow key={appointment._id}>
                                    <TableCell>{appointment.studentId.name}</TableCell>
                                    <TableCell>{appointment.studentId.email}</TableCell>
                                    <TableCell>{formatDate(appointment.date)} </TableCell>
                                    <TableCell>{appointment.time}</TableCell>
                                    
                                    <UpdateUI appointment={appointment}/>
                                    <TableCell sx={{ cursor: "pointer" }} >
                                        <Badge
                                            badgeContent={
                                                messageData?.filter(
                                                    msg => msg.studentId._id === appointment.studentId._id && msg.appointmentId === appointment._id
                                                )?.length
                                            }
                                            color="secondary"
                                            onClick={()=>{setOpen(true), setMessages(messageData?.filter(msg=>( msg.studentId._id === appointment.studentId._id && msg.appointmentId === appointment?._id) ))}}
                                        >
                                            <MessageIcon  />
                                        </Badge>
                                    </TableCell>

                                </TableRow>
                            )
                        })}

                    </TableBody>
                </Table>
            </TableContainer>}

            <MessageModal open = {open} onClose={()=>setOpen(false)} messages={messages}/>
        </Box>
    )
}

export default page