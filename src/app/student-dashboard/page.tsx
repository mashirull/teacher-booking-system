"use client"
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import TeacherCard from "@/component/teacher/TeacherCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { fetchTeachers } from "@/redux/slices/TeacherSlice";
import { Teacher } from "@/type/type";
import FullScreenLoader from "@/loader/FullScreanLoder";

const Page = () => {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const dispatch =  useDispatch<AppDispatch>()

 const {isLoading, teacherData , error} = useSelector((state:RootState)=>state.teacher)

  const filteredTeachers = teacherData?.filter((teacher:Teacher) => {
    return (
      teacher.name.toLowerCase().includes(search.toLowerCase()) &&
      (departmentFilter ? teacher.department === departmentFilter : true) &&
      (subjectFilter ? teacher.subject === subjectFilter : true)
    );
  });

  const handleClear = () => {
    setSearch("")
    setDepartmentFilter("")
    setSubjectFilter("")
  }

  useEffect(() => {
    if (search || subjectFilter || departmentFilter) {
      setIsDisabled(false)
    }
    else {
      setIsDisabled(true)
    }
  }, [search, subjectFilter, departmentFilter])

  useEffect(()=>{
    dispatch(fetchTeachers())
  },[dispatch])



  return (
    <Container sx={{ mt: 4 , mb:4}}>
      {isLoading && <FullScreenLoader/>}
      {/* Search and Filter Section */}
      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        <TextField
          label="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 500 }}
        />

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Department</InputLabel>
          <Select
            value={departmentFilter}
            label="Department"
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="BCA">BCA</MenuItem>
            <MenuItem value="MCA">MCA</MenuItem>
            <MenuItem value="MBA">MBA</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Subject</InputLabel>
          <Select
            value={subjectFilter}
            label="Subject"
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="DBMS">DBMS</MenuItem>
            <MenuItem value="java">Java</MenuItem>
            <MenuItem value="python">Python</MenuItem>
            <MenuItem value="Operating System">Operating System</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlinedWhite" sx={
          {
            color: "black",
            borderRadius: 2,
            fontSize: 16,
            backgroundColor: "secondary.main",
            border: "none",
            "&:hover": {
              border: "none"
            }
          }
        }
          onClick={handleClear}
          disabled={isDisabled}
        >
          Clear
        </Button>
      </Box>

      {/* Cards Section */}
      <Grid container spacing={2}>
        {filteredTeachers?.map((teacher:Teacher) => (
          <TeacherCard
            key={teacher._id}
            name={teacher.name}
            department={teacher.department}
            subject={teacher.subject}
            id= {teacher._id}
          />

        ))}

        {filteredTeachers?.length === 0 && (
          <Typography sx={{ m: 3 }}>No Teachers Found</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Page;