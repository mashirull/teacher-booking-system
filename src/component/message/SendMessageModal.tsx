import { sendMessage } from '@/redux/slices/messageSlice';
import { AppDispatch, RootState } from '@/redux/store/store';
import { Appointment } from '@/type/type';
import { Alert, Box, Button, CircularProgress, FormControl, Modal, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const SendMessageModal = ({ open, onClose, appointment }: { open: boolean, onClose: () => void , appointment : Appointment | null }) => {

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        p: 4,
        borderRadius: 2,


        display: "flex",
        flexDirection: "column",
        gap: 2,
    };

    const [message, setMessage] = useState('')
    const dispatch =  useDispatch<AppDispatch>()
    const {isLoading, success, error} = useSelector((state:RootState)=>state.message)

    const sendMessageHandler = () => {
        dispatch(sendMessage({
            teacherId : appointment?.teacherId._id as string ,
            appointmentId : appointment?._id as string,
            messageText : message
        }))
        setMessage("")
        
    }

    useEffect(()=>{
        if(success){
            onClose()
        }
    },[success])


    

    return (

        <Modal open={open} onClose={onClose} >
            <Paper sx={style} elevation={3} >
                <Typography sx={{ textAlign: "center", fontWeight: 600 }}>Send Message</Typography>
                {success && <Alert severity='success' sx={{my:1}}>{success}</Alert>}
                 {error && <Alert severity='error' sx={{my:1}}>{error}</Alert>}
                <FormControl fullWidth>
                    <TextField
                        label="Type message..."
                        multiline
                        minRows={4}
                        onChange={(e) => setMessage(e.target.value)}
                   
                    />

                    <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
                        <Button variant='gradient'
                            type='submit'
                            sx={{ mt: 2, padding: "3px 1px" }}
                            disabled={!message.trim() || isLoading}
                            onClick={sendMessageHandler}
                        >{isLoading ? <CircularProgress sx={{ color: "white" }} size={26} /> : "Send"}
                        </Button>
                    </Box>
                </FormControl>
            </Paper>
        </Modal>
    )
}

export default SendMessageModal