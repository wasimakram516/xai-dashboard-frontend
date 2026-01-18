"use client";

import {
  Box,
  Paper,
  Typography,
  Avatar,
  Divider,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import EditProfileDialog from "@/components/teacher/EditProfileDialog";
import ChangePasswordDialog from "@/components/teacher/ChangePasswordDialog";
import { API_BASE_URL } from "@/lib/config";
import { getToken, clearToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProfilePage() {
  const { teacher, refreshProfile } = useAuth();
  const { showMessage } = useSnackbar();
  const router = useRouter();

  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (!teacher) router.replace("/login");
  }, [teacher, router]);

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/teachers/me`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (!res.ok) throw new Error();

      clearToken();
      router.push("/login");
      showMessage("Account deleted successfully", "success");
    } catch {
      showMessage("Failed to delete account", "error");
    } finally {
      setConfirmDelete(false);
    }
  };

  return (
    <ProtectedRoute>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "background.default",
          px: 2,
        }}
      >
        <Paper sx={{ width: "100%", maxWidth: 640, p: 4, borderRadius: 3 }}>
          {/* HEADER */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ width: 72, height: 72, bgcolor: "primary.main" }}>
                <AccountCircleIcon sx={{ fontSize: 52 }} />
              </Avatar>

              <Box>
                <Typography variant="h5" fontWeight={600}>
                  {teacher?.full_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Educator Account
                </Typography>
              </Box>
            </Stack>

            <Tooltip title="Delete Account">
              <IconButton color="error" onClick={() => setConfirmDelete(true)}>
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          <Divider sx={{ my: 4 }} />

          {/* DETAILS */}
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={2} alignItems="center">
                <PersonIcon color="action" />
                <Typography>{teacher?.full_name}</Typography>
              </Stack>
              <IconButton onClick={() => setEditProfileOpen(true)}>
                <EditIcon />
              </IconButton>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <EmailIcon color="action" />
              <Typography>{teacher?.email}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={2} alignItems="center">
                <LockResetIcon color="action" />
                <Typography>Password</Typography>
              </Stack>
              <IconButton onClick={() => setChangePasswordOpen(true)}>
                <EditIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Paper>

        {/* MODALS */}
        <EditProfileDialog
          open={editProfileOpen}
          onClose={() => setEditProfileOpen(false)}
          teacher={teacher}
          onSuccess={async () => {
            await refreshProfile();
            showMessage("Profile updated successfully", "success");
          }}
        />

        <ChangePasswordDialog
          open={changePasswordOpen}
          onClose={() => setChangePasswordOpen(false)}
          onSuccess={() =>
            showMessage("Password updated successfully", "success")
          }
        />

        <ConfirmationDialog
          open={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          onConfirm={handleDeleteAccount}
          title="Delete Account"
          message="This action is irreversible."
          confirmButtonText="Delete"
          confirmButtonColor="error"
          confirmButtonIcon={<DeleteForeverIcon />}
        />
      </Box>
    </ProtectedRoute>
  );
}
