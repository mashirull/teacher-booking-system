"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Button,
  Grid,
  Paper,
  Chip,
  Alert,
  CircularProgress,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { fetchTeacherById } from "@/redux/slices/TeacherSlice";
import FullScreenLoader from "@/loader/FullScreanLoder";
import { bookAppointment, clearState } from "@/redux/slices/AppointmentSlice";

export default function TeacherDetailPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const params : {teacherId : string} = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { teacherId } = params

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const { isLoading: teachetLoading, singleTeacher } = useSelector((state: RootState) => state.teacher)
  const { isLoading: appointmentLoading, success, error } = useSelector((state: RootState) => state.appointment)


  useEffect(() => {
    dispatch(fetchTeacherById({ teacherId }))
    dispatch(clearState())
  }, [dispatch])



  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time");
      return;
    }
    dispatch(bookAppointment({teacherId, date:selectedDate.toISOString() , time : selectedTime}))
    setSelectedDate(null)
    setSelectedTime("")
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>

      {teachetLoading && <FullScreenLoader />}
     
      <Paper sx={{ p: 4, borderRadius: 3 }} elevation={3}>
        <Box sx={{my:1}}>
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
        {/* Teacher Info */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: "secondary.main" }}>
            {(singleTeacher?.name[0])?.toUpperCase()}
          </Avatar>

          <Box>
            <Typography variant="h5">{singleTeacher?.name}</Typography>
            <Typography color="text.secondary">
              Department: {singleTeacher?.department}
            </Typography>
            <Typography color="text.secondary">
              Subject: {singleTeacher?.subject}
            </Typography>
          </Box>
        </Box>

        {/* Date Picker */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Select Date
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              disablePast
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </Box>

        {/* Time Slots */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Select Time
          </Typography>

          <Grid container spacing={2}>
            {timeSlots.map((time) => (
              <Grid item key={time}>
                <Chip
                  label={time}
                  clickable
                  color={selectedTime === time ? "primary" : "default"}
                  onClick={() => setSelectedTime(time)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* book button */}
        <Box sx={{ mt: 5 }}>
          <Button
            variant="gradient"
            fullWidth
            size="large"
            onClick={handleBooking}
            disabled = {appointmentLoading}
          >
            {appointmentLoading ? <CircularProgress sx={{ color: "white" }} size={26} /> : "Book Now"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}