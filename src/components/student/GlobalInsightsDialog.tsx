"use client";

import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "@/lib/config";
import { getToken } from "@/lib/auth";
import PublicIcon from "@mui/icons-material/Public";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SchoolIcon from "@mui/icons-material/School";
import AppLoadingState from "@/components/AppLoadingState";

type GlobalFeature = {
  feature: string;
  mean_abs_shap: number;
  mean_shap: number;
  dominant_direction: string;
};

type GlobalResponse = {
  stage: "early" | "final";
  top_features: GlobalFeature[];
  n_features: number;
};

function prettyFeature(name: string) {
  return name.replace(/_/g, " ");
}

function stageClass1Meaning(stage: "early" | "final") {
  return stage === "early" ? "At Risk" : "Pass";
}

function class0Meaning(stage: "early" | "final") {
  return stage === "early" ? "Not At Risk" : "Fail";
}

function directionMeaning(stage: "early" | "final", direction: string) {
  return direction === "towards_class_1"
    ? `Usually increases ${stageClass1Meaning(stage)} likelihood`
    : `Usually increases ${class0Meaning(stage)} likelihood`;
}

const RADIUS = 15.9155;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function GlobalStageChart({
  title,
  data,
  stage,
  color,
}: {
  title: string;
  data: GlobalResponse | null;
  stage: "early" | "final";
  color: "error" | "primary";
}) {
  const maxVal = useMemo(() => {
    if (!data || data.top_features.length === 0) return 1;
    return Math.max(...data.top_features.map((x) => x.mean_abs_shap), 1e-9);
  }, [data]);

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={1}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        These donuts show which factors usually matter most for this model overall.
        They are not student percentages. 100% means the strongest overall factor.
      </Typography>
      <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
        <Chip size="small" color={color} label={`Class 1 means: ${stageClass1Meaning(stage)}`} />
        <Chip size="small" variant="outlined" label={`Class 0 means: ${class0Meaning(stage)}`} />
        <Chip size="small" variant="outlined" label="These are model influence scores, not risk percentages." />
      </Stack>

      <Stack spacing={1.5}>
        {(data?.top_features ?? []).slice(0, 10).map((f, i) => {
          const pct = (f.mean_abs_shap / maxVal) * 100;
          const dashOffset = CIRCUMFERENCE * (1 - pct / 100);
          return (
            <Paper key={`${title}-${f.feature}-${i}`} variant="outlined" sx={{ p: 1.5 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box position="relative" width={56} height={56}>
                  <svg viewBox="0 0 36 36" width="56" height="56">
                    <circle
                      cx="18"
                      cy="18"
                      r={RADIUS}
                      fill="none"
                      stroke="#e0e0e0"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r={RADIUS}
                      fill="none"
                      stroke={color === "error" ? "#d32f2f" : "#1976d2"}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE}
                      strokeDashoffset={dashOffset}
                      transform="rotate(-90 18 18)"
                    />
                  </svg>
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    sx={{ transform: "translate(-50%, -50%)" }}
                  >
                    <Typography variant="caption" fontWeight={700}>
                      {pct.toFixed(0)}%
                    </Typography>
                  </Box>
                </Box>

                <Box flex={1}>
                  <Typography variant="body2" fontWeight={600}>
                    {i + 1}. {prettyFeature(f.feature)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {directionMeaning(stage, f.dominant_direction)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Overall strength: {pct.toFixed(1)}% of the strongest factor
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
}

export default function GlobalInsightsDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [earlyGlobal, setEarlyGlobal] = useState<GlobalResponse | null>(null);
  const [finalGlobal, setFinalGlobal] = useState<GlobalResponse | null>(null);
  const isLoading = open && (!earlyGlobal || !finalGlobal);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const headers = { Authorization: `Bearer ${getToken()}` };

    async function load() {
      const [e, f] = await Promise.all([
        fetch(`${API_BASE_URL}/students/global/early?top_k=15`, { headers }),
        fetch(`${API_BASE_URL}/students/global/final?top_k=15`, { headers }),
      ]);
      if (cancelled) return;
      setEarlyGlobal(await e.json());
      setFinalGlobal(await f.json());
    }

    load().catch(() => null);

    return () => {
      cancelled = true;
    };
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Stack direction="row" spacing={1} alignItems="center">
          <PublicIcon color="primary" />
          <Typography variant="h6" fontWeight={700}>
            Global Insights (All Students)
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Use this view to understand what generally drives model decisions across all students.
        </Typography>
        <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
          <Chip size="small" icon={<WarningAmberIcon />} label="Early model: At Risk vs Not At Risk" />
          <Chip size="small" icon={<SchoolIcon />} label="Final model: Pass vs Fail" />
        </Stack>
        {isLoading ? (
          <AppLoadingState
            compact
            title="Loading class-wide insights..."
            subtitle="Building the most important factors across all students"
          />
        ) : (
        <Stack spacing={3}>
          <GlobalStageChart title="Early Risk Model" data={earlyGlobal} stage="early" color="error" />
          <Divider />
          <GlobalStageChart title="Final Outcome Model" data={finalGlobal} stage="final" color="primary" />
        </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}
