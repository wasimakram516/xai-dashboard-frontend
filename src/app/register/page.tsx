"use client";

import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SchoolIcon from "@mui/icons-material/School";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useState } from "react";

import { useSnackbar } from "@/contexts/SnackbarContext";
import { API_BASE_URL } from "@/lib/config";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { showMessage } = useSnackbar();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!fullName || !email || !password) {
      showMessage("All fields are required", "warning");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
        }),
      });

      if (!res.ok) {
        showMessage("Registration failed", "error");
        return;
      }

      showMessage("Account created successfully", "success");
      router.push("/login");
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
              Educator Registration
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Create an account to access the XAI Learning Dashboard
            </Typography>
          </Stack>

          {/* FORM */}
          <TextField
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
          />

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
            startIcon={<PersonAddIcon />}
            onClick={handleSubmit}
            disabled={loading}
          >
            Register
          </Button>

          {/* FOOTER */}
          <Link
            href="/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <ArrowBackIcon fontSize="small" />
            <Typography variant="body2" color="primary">
              Back to Login
            </Typography>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
}
