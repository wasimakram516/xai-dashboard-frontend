"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

type ConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title: string;
  message: string;
  confirmButtonText?: string;
  confirmButtonIcon?: React.ReactNode;
  confirmButtonColor?: "error" | "primary" | "warning";
};

export default function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText = "Confirm",
  confirmButtonIcon,
  confirmButtonColor = "error",
}: ConfirmationDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 2,
          maxWidth: 480,
          width: "100%",
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }}>
        {title}
      </DialogTitle>

      <DialogContent>
        <Box sx={{ textAlign: "center", mt: 1 }}>
          <DialogContentText>{message}</DialogContentText>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 2 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color={confirmButtonColor}
          onClick={handleConfirm}
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={18} color="inherit" /> : confirmButtonIcon
          }
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
