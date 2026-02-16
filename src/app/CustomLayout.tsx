"use client"
import theme from "@/theme/theme"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";

export default function CustomLayout({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </Provider>
    )
}