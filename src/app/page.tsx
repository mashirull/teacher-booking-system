"use client"
import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router =  useRouter()
  return (
    <Container maxWidth="sm" sx={{ mt: 1, display : "flex", justifyContent : "center" , flexDirection : "column" , alignItems : "flex-start", ml : 10, mr : "auto", height: "80dvh" }}>
      <Typography variant="h1" gutterBottom sx={{fontSize : 50}} >
        Student Teacher Booking
      </Typography>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Book appointments with teachers easily.
      </Typography>

      <Button variant="gradient" color="primary" onClick={()=>router.push("/auth")}>
        Get Started
      </Button>
    </Container>
  );
}
