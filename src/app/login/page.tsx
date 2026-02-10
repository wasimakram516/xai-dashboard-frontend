"use client";

import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import SchoolIcon from "@mui/icons-material/School";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { API_BASE_URL } from "@/lib/config";

export default function LoginPage() {
  const { login } = useAuth();
  const { showMessage } = useSnackbar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      showMessage("Please enter email and password", "warning");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        showMessage("Invalid credentials", "error");
        return;
      }

      const data = await res.json();
      await login(data.access_token);
      showMessage("Login successful", "success");
    } catch {
      showMessage("Server unreachable", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Stack spacing={3}>
          {/* HEADER */}
          <Stack alignItems="center" spacing={1}>
            <SchoolIcon color="primary" sx={{ fontSize: 48 }} />
            <Typography variant="h5" fontWeight={600}>
              Educator Login
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Sign in to access GlassLearn
            </Typography>
          </Stack>

          {/* FORM */}
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            size="large"
            startIcon={<LoginIcon />}
            onClick={handleSubmit}
            disabled={loading}
          >
            Login
          </Button>

          {/* FOOTER */}
          <Stack direction="row" justifyContent="center" spacing={1}>
            <Typography variant="body2">Don&apos;t have an account?</Typography>
            <Link
              href="/register"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Typography variant="body2" color="primary">
                Register
              </Typography>
              <ArrowForwardIcon fontSize="small" />
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
