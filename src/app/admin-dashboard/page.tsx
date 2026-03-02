"use client"
import FullScreenLoader from '@/loader/FullScreanLoder'
import { fetchStudent } from '@/redux/slices/studentSlice'
import { fetchTeachers } from '@/redux/slices/TeacherSlice'
import { AppDispatch, RootState } from '@/redux/store/store'
import { Student } from '@/type/type'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {isLoading : studentLoading, studentData} = useSelector((state:RootState)=>state.student)
  const {isLoading:teacherLoading, teacherData} = useSelector((state:RootState)=>state.teacher)

  useEffect(()=>{
    dispatch(fetchStudent())
    dispatch(fetchTeachers())
  }, [dispatch])

  return (
    <Box sx={{p:4}}>
      <Typography variant='h4' sx={{fontWeight:600, mb:2}}>Welcome Admin 👋</Typography>
      {(studentLoading || teacherLoading) && <FullScreenLoader/>}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md = {4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Students</Typography>
              <Typography variant="h4">{studentData?.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md = {4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Teachers</Typography>
              <Typography variant="h4">{teacherData?.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md = {4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Request</Typography>
              <Typography variant="h4">{studentData?.filter((student:Student) => student.status==="pending").length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default page