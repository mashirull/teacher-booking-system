import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const FullScreenLoader = () => {
  return (
    <Box
          sx={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "rgba(255,255,255,0.6)",
            zIndex: 1300,
          }}
        >
          <CircularProgress />
        </Box>
  )
}

export default FullScreenLoader