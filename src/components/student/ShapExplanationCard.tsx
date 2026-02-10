"use client";

import { Box, Typography, Stack, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

/* -----------------------------------
   Types
----------------------------------- */
type Factor = {
  feature: string;
  impact: number;
  meaning?: string;
  direction?: string;
  contribution_share?: number;
  global_rank?: number | null;
};

/* -----------------------------------
   Constants
----------------------------------- */
const RADIUS = 16;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/* -----------------------------------
   Component
----------------------------------- */
export default function ShapExplanationCard({
  factors,
  classOneLabel,
  classZeroLabel,
}: {
  factors: Factor[];
  classOneLabel: string;
  classZeroLabel: string;
}) {
  const theme = useTheme();
  const maxImpact = Math.max(...factors.map((f) => Math.abs(f.impact)), 1e-9);

  return (
    <Stack spacing={2}>
      {factors.map((f) => {
        const normalized = Math.abs(f.impact) / maxImpact;
        const dashOffset = CIRCUMFERENCE * (1 - normalized);

        const color =
          f.impact > 0
            ? theme.palette.error.main   // increases risk
            : theme.palette.success.main; // reduces risk

        return (
          <Paper
            key={f.feature}
            variant="outlined"
            sx={{ p: 2, borderRadius: 2 }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              {/* Donut */}
              <Box position="relative" width={48} height={48}>
                <svg viewBox="0 0 36 36" width="48" height="48">
                  {/* Background */}
                  <circle
                    cx="18"
                    cy="18"
                    r={RADIUS}
                    fill="none"
                    stroke={theme.palette.divider}
                    strokeWidth="3"
                  />

                  {/* Animated arc */}
                  <motion.circle
                    cx="18"
                    cy="18"
                    r={RADIUS}
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={CIRCUMFERENCE}
                    strokeLinecap="round"
                    animate={{ strokeDashoffset: dashOffset }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </svg>

                {/* Percentage label */}
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  sx={{ transform: "translate(-50%, -50%)" }}
                >
                  <Typography variant="caption" fontWeight={600}>
                    {(normalized * 100).toFixed(0)}%
                  </Typography>
                </Box>
              </Box>

              {/* Feature text */}
              <Box flex={1}>
                <Typography variant="body2" fontWeight={600}>
                  {f.feature.replace(/_/g, " ")}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {f.meaning ?? "Feature influencing prediction"}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  {f.impact > 0
                    ? `For this student: increases ${classOneLabel} likelihood`
                    : `For this student: increases ${classZeroLabel} likelihood`}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Influence on this student: {((f.contribution_share ?? normalized) * 100).toFixed(1)}%
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  {f.global_rank
                    ? `How common this factor is overall: rank ${f.global_rank} (1 = most common)`
                    : "How common this factor is overall: not in top global list"}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
}
