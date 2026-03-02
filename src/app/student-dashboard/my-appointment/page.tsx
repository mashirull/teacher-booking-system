"use client"
import SendMessageModal from '@/component/message/SendMessageModal'
import { formatDate } from '@/lib/formatDate'
import FullScreenLoader from '@/loader/FullScreanLoder'
import { fetchMyAppointments } from '@/redux/slices/studentSlice'
import { AppDispatch, RootState } from '@/redux/store/store'
import { Appointment } from '@/type/type'
import { Alert, Box, Button, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {

  const dispatch =  useDispatch<AppDispatch>()
  const [open , setOpen] = useState<boolean>(false)
  const [appointment , setAppointment] =  useState< Appointment | null>(null)

  const {myAppointments, isLoading, error} = useSelector((state:RootState)=>state.student)

  useEffect(()=>{
    dispatch(fetchMyAppointments())
  },[dispatch])

  return (
    <Box sx={{py:3, px:4}}>
      {isLoading && <FullScreenLoader/>}
      <Typography sx={{fontSize:17, fontWeight:600}}>My Appointment</Typography>

      {error && <Alert severity='error'>{error}</Alert>}

      {myAppointments?.length === 0 ?  <Typography sx={{mt:3}}>You haven't book any appointment yet</Typography> :
      <TableContainer component={Paper} sx={{mt:2}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight:600}}>Teacher Name</TableCell>
                <TableCell sx={{fontWeight:600}}>Date</TableCell>
                <TableCell sx={{fontWeight:600}}>Time</TableCell>
                <TableCell sx={{fontWeight:600}}>Status</TableCell>
                <TableCell sx={{fontWeight:600}}>send Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {myAppointments.map((appointment:Appointment)=> (
                  <TableRow key={appointment._id}>
                    <TableCell>{appointment.teacherId.name}</TableCell>
                    <TableCell>{formatDate(appointment.date)}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell style={{fontWeight:600}} sx={appointment.status === "pending" ? { color: "#9b8401" } : appointment.status === "approved" ? { color: "green" } : { color: "red" }}>{appointment.status}</TableCell>
                    <TableCell>
                      <Button variant='outlinedWhite' 
                      sx={{color:"black" }}
                      onClick={()=>{setOpen(true), setAppointment(appointment)}}
                      >Send
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
      </TableContainer>}

      <SendMessageModal open = {open} onClose={()=>setOpen(false)} appointment={appointment} />

    </Box>
  )
}

export default page