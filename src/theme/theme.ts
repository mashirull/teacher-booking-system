import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    palette: {
        primary: {
            main: "#1A0A3D"
        },
        secondary: {
            main: "#E43131"
        },
        background: {
            default: "#fafaf2"
        },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
        h1: {
            fontSize: "2rem",
            fontWeight: 600,
        },
        button: {
            textTransform: "none",
        },
    },

    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: "outlinedWhite" },
                    style: {
                        backgroundColor: "transparent",
                        color: "#fff",
                        border: "1px solid #E43131",
                        borderRadius: 10,
                        padding: "5px 22px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            backgroundColor: "#E43131",
                            color: "#000",
                            border: "1px solid black",
                        },
                    }
                },
                {
                    props: { variant: "gradient" },
                    style: {
                        background: "linear-gradient(45deg, #1A0A3D, #E43131)",
                        color: "#fff",
                        borderRadius: 8,
                        padding: "8px 28px",
                        boxShadow: "0 4px 10px rgba(25, 118, 210)",
                        "&:hover": {
                            background: "linear-gradient(45deg, #E43131, #1A0A3D)",
                        },
                    }
                }
            ],

            styleOverrides: {
                root: {
                    "&.Mui-disabled": {
                        backgroundColor: "#bdbdbd",   // your disabled bg
                        color: "#fff",             // text color
                        // opacity: 0.7,                 // optional
                    },
                }
            }
        }
    }
})

export default theme
