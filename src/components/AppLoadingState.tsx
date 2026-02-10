"use client";

import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { motion } from "framer-motion";

type Props = {
  title?: string;
  subtitle?: string;
  compact?: boolean;
};

export default function AppLoadingState({
  title = "Loading student insights...",
  subtitle = "Preparing predictions and clear explanations",
  compact = false,
}: Props) {
  return (
    <Box
      sx={{
        minHeight: compact ? 180 : 300,
        width: "100%",
        display: "grid",
        placeItems: "center",
        px: 2,
      }}
    >
      <Stack spacing={1.5} alignItems="center">
        <Box sx={{ position: "relative", width: 72, height: 72 }}>
          <CircularProgress size={72} thickness={3.2} />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
            }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <AutoGraphIcon color="primary" />
            </motion.div>
          </Box>
        </Box>
        <Typography variant="subtitle1" fontWeight={600} textAlign="center">
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary" textAlign="center">
          {subtitle}
        </Typography>
      </Stack>
    </Box>
  );
}

