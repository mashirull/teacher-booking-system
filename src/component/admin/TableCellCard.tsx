"use client"
import { updateAppointmentStatus } from '@/redux/slices/AppointmentSlice'
import { approvedRegistration } from '@/redux/slices/studentSlice'
import { AppDispatch } from '@/redux/store/store'
import { Student } from '@/type/type'
import { Button, MenuItem, Select, TableCell } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const TableCellCard = ({ student } : {student:Student}) => {
    const dispatch = useDispatch<AppDispatch>()
    const [status, setStatus] = useState<string>("select")
    const [isDisable, setIsDisable] = useState<boolean>(false)

    useEffect(() => {
        if (status === "select") {
            setIsDisable(true)
        }
        else if(student.status === status){
            setIsDisable(true)
        }
        else {
            setIsDisable(false)
        }
    }, [status,student])

    return (
        <TableCell sx={student.status === "pending" ? { color: "#9b8401" } : student.status === "approved" ? { color: "green" } : { color: "red" }}>
            {student.status}

            <Select sx={{
                ml: 2, p: 0, border: "none",
                "& .MuiSelect-select": {
                    padding: "2px 4px",
                    fontSize: "12px"
                },
            }} value={status} onChange={(e) => setStatus(e.target.value)}>
                <MenuItem value="select" disabled>
                    Select
                </MenuItem>
                <MenuItem value="pending" >pending</MenuItem>
                <MenuItem value="approved" >approved</MenuItem>
                <MenuItem value="canceled" >canceled</MenuItem>
            </Select>
            <Button
                variant='gradient'
                sx={{
                    padding: "2px",
                    fontSize: "14px",
                    ml: 2
                }}
                disabled={isDisable}
                onClick={() => dispatch(approvedRegistration({ studentId : student._id , status }))}
            >
                update
            </Button>
        </TableCell>
    )
}

export default TableCellCard