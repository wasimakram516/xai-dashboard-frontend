"use client";

import {
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import { createContext, useContext, useState } from "react";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: AlertColor;
};

type SnackbarContextType = {
  showMessage: (message: string, severity?: AlertColor) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export function SnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });

  const showMessage = (
    message: string,
    severity: AlertColor = "info"
  ) => {
    setState({ open: true, message, severity });
  };

  const handleClose = () => {
    setState((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}

      {/* Global Snackbar */}
      <Snackbar
        open={state.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={state.severity}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const ctx = useContext(SnackbarContext);
  if (!ctx) {
    throw new Error("useSnackbar must be used inside SnackbarProvider");
  }
  return ctx;
}
