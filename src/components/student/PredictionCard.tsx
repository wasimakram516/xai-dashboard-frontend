"use client";

import { Paper, Typography, Stack, Box, Chip } from "@mui/material";
import { useTheme } from "@mui/material";
import { motion } from "framer-motion";

/* -----------------------------------
   Types
----------------------------------- */
type Props = {
  title: string;
  result: string;
  probability: number;
  probabilityLabel: string;
  explanation: string;
  threshold?: number;
  confidenceLabel?: string;
  tone?: "positive" | "negative";
  headerChipLabel?: string;
  headerChipColor?: "success" | "warning" | "error" | "primary" | "default";
  decisionRuleLabel?: string;
  embedded?: boolean;
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
  threshold,
  confidenceLabel,
  tone = "positive",
  headerChipLabel,
  headerChipColor = "default",
  decisionRuleLabel,
  embedded = false,
}: Props) {
  const theme = useTheme();

  const percent = Math.round(probability * 100);
  const strokeColor =
    tone === "positive" ? theme.palette.success.main : theme.palette.error.main;
  const dashOffset = CIRCUMFERENCE * (1 - probability);
  const confidenceChipColor =
    confidenceLabel === "high"
      ? "success"
      : confidenceLabel === "medium"
        ? "warning"
        : confidenceLabel === "low"
          ? "error"
          : "default";
  const readableConfidence =
    confidenceLabel ? `${confidenceLabel[0].toUpperCase()}${confidenceLabel.slice(1)}` : undefined;
  const fallbackDecisionRule =
    threshold !== undefined
      ? title.includes("Early")
        ? `Alert level: student is flagged as At Risk when risk chance is ${Math.round(threshold * 100)}% or higher.`
        : `Decision level: student is marked as Pass when pass chance is ${Math.round(threshold * 100)}% or higher.`
      : undefined;

  const content = (
    <Box>
      {/* Header */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography fontWeight={600}>{title}</Typography>
        {headerChipLabel && (
          <Chip label={headerChipLabel} color={headerChipColor} size="small" />
        )}
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
            {title.includes("Early")
              ? "Based on early-course behaviour"
              : "Based on full course engagement"}
          </Typography>

          <Typography variant="body2">
            {explanation}
          </Typography>
          <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
            {confidenceLabel && (
              <Chip
                size="small"
                color={confidenceChipColor}
                label={`Model certainty: ${readableConfidence}`}
              />
            )}
          </Stack>
          {(decisionRuleLabel || fallbackDecisionRule) && (
            <Typography variant="caption" color="text.secondary" display="block" mt={1}>
              {decisionRuleLabel || fallbackDecisionRule}
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
            Probability = chance of this result. Model certainty = how sure the model is.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );

  if (embedded) {
    return <Box sx={{ p: 0 }}>{content}</Box>;
  }

  return (
    <Paper variant="outlined" sx={{ p: 3, boxShadow: "none" }}>
      {content}
    </Paper>
  );
}
