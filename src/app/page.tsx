"use client"
import { User } from "@/type/type";
import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router =  useRouter()
  const user:User = JSON.parse(localStorage.getItem("user"))

  const handleClick = ()=> {
    if(user.role === "admin"){
      router.push("/admin-dashboard")
    }
    else if(user.role === "teacher"){
      router.push("/teacher-dashboard")
    }
    else{
      router.push("/student-dashboard")
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 1, display : "flex", justifyContent : "center" , flexDirection : "column" , alignItems : "flex-start", ml : 10, mr : "auto", height: "80dvh" }}>
      <Typography variant="h1" gutterBottom sx={{fontSize : 50}} >
        Student Teacher Booking
      </Typography>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Book appointments with teachers easily.
      </Typography>

      <Button variant="gradient" color="primary" onClick={handleClick}>
        Get Started
      </Button>
    </Container>
  );
}
