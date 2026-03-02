"use client"
import FullScreenLoader from '@/loader/FullScreanLoder'
import { fetchAppointments } from '@/redux/slices/AppointmentSlice'
import { AppDispatch, RootState } from '@/redux/store/store'
import { Appointment } from '@/type/type'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TeacherDashboard = () => {

  const dispatch =  useDispatch<AppDispatch>();
  const {isLoading, appointmentData} =  useSelector((state:RootState)=>state.appointment)

  useEffect(()=>{
    dispatch(fetchAppointments())
  },[dispatch])

  return (
   <Box sx={{p:4}}>
      <Typography variant='h4' sx={{fontWeight:600, mb:2}}>Welcome Teacher 👋</Typography>
      {isLoading && <FullScreenLoader/>}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md = {4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Appointments</Typography>
              <Typography variant="h4">{appointmentData?.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        

        <Grid item xs={12} md = {4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Request</Typography>
              <Typography variant="h4">{appointmentData?.filter((appoint:Appointment)=>appoint.status==="pending").length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TeacherDashboard