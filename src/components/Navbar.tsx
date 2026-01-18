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
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ConfirmationDialog from "./ConfirmationDialog";

export default function Navbar() {
  const { isAuthenticated, logout, teacher } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [confirmLogout, setConfirmLogout] = useState(false);

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
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            XAI Learning Dashboard
          </Typography>
        </Link>

        {!isAuthenticated ? (
          <Button
            component={Link}
            href="/login"
            variant="outlined"
            startIcon={<LoginIcon />}
          >
            Login
          </Button>
        ) : (
          <>
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

              <MenuItem component={Link} href="/profile">
                Profile
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
          </>
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
