import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'

const page = () => {
  return (
    <Box sx={{p:4}}>
      <Typography variant='h4' sx={{fontWeight:600, mb:2}}>Welcome Admin 👋</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md = {4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Students</Typography>
              <Typography variant="h4">12</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md = {4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Teachers</Typography>
              <Typography variant="h4">6</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md = {4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Request</Typography>
              <Typography variant="h4">2</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default page