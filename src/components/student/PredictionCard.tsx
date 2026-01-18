"use client";

import { Paper, Typography, Stack, Box, Chip } from "@mui/material";
import { ChipProps, useTheme } from "@mui/material";
import { motion } from "framer-motion";

/* -----------------------------------
   Risk / Confidence helpers
----------------------------------- */
type PaletteColorKey =
  | "error"
  | "warning"
  | "success";

  
function getRiskLevel(prob: number): {
  label: string;
  color: PaletteColorKey;
} {
  if (prob >= 0.7) return { label: "High Risk", color: "error" };
  if (prob >= 0.4) return { label: "Medium Risk", color: "warning" };
  return { label: "Low Risk", color: "success" };
}

function getConfidenceLevel(prob: number): {
  label: string;
  color: PaletteColorKey;
} {
  if (prob >= 0.7) return { label: "High Confidence", color: "success" };
  if (prob >= 0.4) return { label: "Moderate Confidence", color: "warning" };
  return { label: "Low Confidence", color: "error" };
}


/* -----------------------------------
   Types
----------------------------------- */
type Props = {
  title: string;
  result: string;
  probability: number;
  probabilityLabel: string;
  explanation: string;
  confidenceMode?: boolean;
};

/* -----------------------------------
   Constants
----------------------------------- */
const RADIUS = 15.9155;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/* -----------------------------------
   Component
----------------------------------- */
export default function PredictionCard({
  title,
  result,
  probability,
  probabilityLabel,
  explanation,
  confidenceMode = false,
}: Props) {
  const theme = useTheme();

  const level = confidenceMode
    ? getConfidenceLevel(probability)
    : getRiskLevel(probability);

  const percent = Math.round(probability * 100);
  const strokeColor = theme.palette[level.color].main;
  const dashOffset = CIRCUMFERENCE * (1 - probability);

  return (
    <Paper sx={{ p: 3 }}>
      {/* Header */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography fontWeight={600}>{title}</Typography>
        <Chip label={level.label} color={level.color} size="small" />
      </Stack>

      {/* Main Content */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        alignItems="center"
        mt={2}
      >
        {/* Animated Donut */}
        <Box position="relative" width={120} height={120}>
          <svg viewBox="0 0 36 36" width="120" height="120">
            {/* Background */}
            <circle
              cx="18"
              cy="18"
              r={RADIUS}
              fill="none"
              stroke={theme.palette.divider}
              strokeWidth="3"
            />

            {/* Animated Foreground */}
            <motion.circle
              cx="18"
              cy="18"
              r={RADIUS}
              fill="none"
              stroke={strokeColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              transform="rotate(-90 18 18)"
            />
          </svg>

          {/* Animated Percentage */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            sx={{ transform: "translate(-50%, -50%)" }}
            textAlign="center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Typography fontWeight={700}>{percent}%</Typography>
              <Typography variant="caption" color="text.secondary">
                {probabilityLabel}
              </Typography>
            </motion.div>
          </Box>
        </Box>

        {/* Textual Explanation */}
        <Box flex={1}>
          <Typography
            variant="h4"
            fontWeight={700}
            color={strokeColor}
          >
            {result}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            mb={1}
          >
            {confidenceMode
              ? "Based on full course engagement"
              : "Based on early-course behaviour"}
          </Typography>

          <Typography variant="body2">
            {explanation}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
