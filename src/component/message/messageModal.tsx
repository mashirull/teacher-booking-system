import { formatDate } from '@/lib/formatDate';
import { Box, Modal, Paper, Typography } from '@mui/material'
import React from 'react'

const MessageModal = ({ open, onClose , messages}: { open: boolean, onClose: () => void , messages : [] | never[]}) => {

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        p: 4,
        borderRadius: 2,
        maxWidth: 500,
        height: 400,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
    };

   

    return (
        <Modal open={open} onClose={onClose}>
            <Paper
                elevation={3}
                sx={style}
                >
                <Typography sx={{textAlign:"center", fontWeight : "600", mb:3}}>Messages</Typography>
                {messages?.map((msg, index) => (
                    <Box
                        key={index}
                        sx={{
                            backgroundColor: "#f5f5f5",
                            p: 1.5,
                            borderRadius: 2,
                        }}
                    >
                        {/* Sender Name */}
                        <Typography variant="subtitle2" fontWeight="bold">
                            {msg.studentId.name}
                        </Typography>

                        {/* Message Text */}
                        <Typography variant="body2">
                            {msg.messageText}
                        </Typography>

                        {/* Date & Time */}
                        <Typography
                            variant="caption"
                            sx={{ display: "block", textAlign: "right", mt: 0.5 }}
                        >
                            {formatDate(msg.createdAt)}
                        </Typography>
                    </Box>
                ))}
            </Paper>


        </Modal>
    )
}

export default MessageModal