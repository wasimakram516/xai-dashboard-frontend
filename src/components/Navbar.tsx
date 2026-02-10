"use client";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import SchoolIcon from "@mui/icons-material/School";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ConfirmationDialog from "./ConfirmationDialog";

export default function Navbar() {
  const { isAuthenticated, logout, teacher } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const APP_NAME = "GlassLearn";

  const open = Boolean(anchorEl);
  const teacherName = teacher?.full_name ?? "";

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 0.5 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: "rgba(18,129,153,0.14)",
                color: "primary.main",
              }}
            >
              <AutoGraphIcon fontSize="small" />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700} color="text.primary" lineHeight={1.1}>
                {APP_NAME}
              </Typography>
              <Typography variant="caption" color="text.secondary" lineHeight={1.1}>
                Explainable Learning Insights
              </Typography>
            </Box>
          </Stack>
        </Link>

        {!isAuthenticated ? (
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              component={Link}
              href="/login"
              variant="outlined"
              startIcon={<LoginIcon />}
            >
              Login
            </Button>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1} alignItems="center">
            
            <Tooltip title={teacherName}>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                  }}
                >
                  <AccountCircleIcon  sx={{ width:36, height:36,}}/>
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem disabled>
                <AccountCircleIcon sx={{ mr: 1 }} />
                {teacherName}
              </MenuItem>
              <Divider />

              <MenuItem component={Link} href="/profile">
                <AccountCircleIcon sx={{ mr: 1 }} />
                Profile
              </MenuItem>
              <MenuItem component={Link} href="/dashboard">
                <DashboardIcon sx={{ mr: 1 }} />
                Dashboard
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  setConfirmLogout(true);
                }}
                sx={{ color: "error.main" }}
              >
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        )}
      </Toolbar>
      <ConfirmationDialog
        open={confirmLogout}
        onClose={() => setConfirmLogout(false)}
        onConfirm={async () => {
          logout();
          setConfirmLogout(false);
        }}
        title="Confirm Logout"
        message="Are you sure you want to log out of your account?"
        confirmButtonText="Logout"
        confirmButtonIcon={<LogoutIcon />}
      />
    </AppBar>
  );
}
