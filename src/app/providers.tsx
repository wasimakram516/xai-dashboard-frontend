"use client";

import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { theme } from "@/styles/theme";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import { SnackbarProvider } from "@/contexts/SnackbarContext";
import { Poppins, Comfortaa } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-comfortaa",
});

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${poppins.variable} ${comfortaa.variable}`}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <SnackbarProvider>
            <Navbar />
            <Box component="main" sx={{ pt: "64px", minHeight: "100vh" }}>
              {children}
            </Box>
          </SnackbarProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}
