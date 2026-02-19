import { addNewTeacher, updateTeacher } from '@/redux/slices/TeacherSlice';
import { AppDispatch, RootState } from '@/redux/store/store';
import { Teacher } from '@/type/type';
import { Alert, Box, Button, CircularProgress, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const UpdateTeacherModal = ({ open, onclose, teacherUpdateData }: { open: boolean, onclose: () => void, teacherUpdateData: Teacher  }) => {

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        p: 4,
        borderRadius: 2,
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        department: "",
    })

    console.log(formData);


    const dispatch = useDispatch<AppDispatch>()
    const { isLoading, error, success } = useSelector((state: RootState) => state.teacher)

    const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(updateTeacher({ ...formData, teacherId: teacherUpdateData?._id }))
    }

    useEffect(() => {
        if (success) {
            onclose()
        }
        setFormData({
            name: teacherUpdateData?.name,
            email: teacherUpdateData?.email,
            subject: teacherUpdateData?.subject,
            department: teacherUpdateData?.department
        })

    }, [success, teacherUpdateData])

    return (
        <Modal open={open} onClose={onclose}>
            <Box sx={style}>
                <Typography variant='h6' mb={1}>Update Teacher</Typography>
                {error && <Alert severity='error' sx={{ mb: 1 }}>{error}</Alert>}

                <form onSubmit={submitHandler}>
                    <TextField
                        label='Name'
                        name='name'
                        fullWidth
                        margin='normal'
                        type='text'
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        required
                    />
                    <TextField
                        label='Email'
                        name='email'
                        fullWidth
                        margin='normal'
                        type='email'
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        required
                    />

                    <TextField
                        label='Department'
                        name='department'
                        fullWidth
                        margin='normal'
                        type='text'
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        required
                    />

                    <TextField
                        label='Subject'
                        name='subject'
                        fullWidth
                        margin='normal'
                        type='text'
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        required
                    />


                    <Box sx={{ textAlign: "center" }}>
                        <Button type='submit' variant='gradient' sx={{ mt: 1 }}>{isLoading ? <CircularProgress sx={{ color: "white" }} size={26} /> : "Update"}</Button>
                    </Box>
                </form>

            </Box>
        </Modal>
    )
}

export default UpdateTeacherModal;