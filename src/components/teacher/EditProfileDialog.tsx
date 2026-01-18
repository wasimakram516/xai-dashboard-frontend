"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import { API_BASE_URL } from "@/lib/config";
import { getToken } from "@/lib/auth";
import { useSnackbar } from "@/contexts/SnackbarContext";

export default function EditProfileDialog({
  open,
  onClose,
  teacher,
  onSuccess,
}: any) {
  const { showMessage } = useSnackbar();

  const [fullName, setFullName] = useState(teacher.full_name);
  const [email, setEmail] = useState(teacher.email);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/teachers/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          full_name: fullName,
          email,
        }),
      });

      if (!res.ok) throw new Error();

      onSuccess();
      onClose();
    } catch {
      showMessage("Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={saving}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
