"use client";

import {
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  Chip,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import TimelineIcon from "@mui/icons-material/Timeline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "@/lib/config";
import { getToken } from "@/lib/auth";
import StudentHeader from "./StudentHeader";
import PredictionCard from "./PredictionCard";
import ShapExplanationCard from "./ShapExplanationCard";
import StudentProfileDialog from "@/components/student/StudentProfileDialog";
import GlobalInsightsDialog from "@/components/student/GlobalInsightsDialog";
import AppLoadingState from "@/components/AppLoadingState";

type Student = {
  student_id: string;
};

type StudentProfile = {
  student_id: string;
  label?: string;
  oulad_id?: number;
  demographics?: Record<string, unknown>;
  stats?: Record<string, unknown>;
};

type PredictionResponse = {
  prediction: {
    probability: number;
    threshold: number;
    confidence?: string;
    at_risk?: number;
    final_prediction?: number;
  };
  local_explanation: {
    top_factors: {
      feature: string;
      impact: number;
      meaning?: string;
      contribution_share?: number;
      global_rank?: number | null;
    }[];
    top_increasing_factors?: {
      feature: string;
      impact: number;
      meaning?: string;
      contribution_share?: number;
      global_rank?: number | null;
    }[];
    top_decreasing_factors?: {
      feature: string;
      impact: number;
      meaning?: string;
      contribution_share?: number;
      global_rank?: number | null;
    }[];
  };
  global_context: {
    top_features: {
      feature: string;
      mean_abs_shap: number;
      dominant_direction: string;
    }[];
  };
};

type CachedStudentPayload = {
  profile: StudentProfile;
  early: PredictionResponse;
  finalData: PredictionResponse;
};

export default function StudentDetails({
  student,
  isMobile,
}: {
  student: Student | null;
  isMobile: boolean;
}) {
  const [early, setEarly] = useState<PredictionResponse | null>(null);
  const [finalData, setFinalData] = useState<PredictionResponse | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [globalOpen, setGlobalOpen] = useState(false);
  const [loadedStudentId, setLoadedStudentId] = useState<string | null>(null);
  const [predictionTab, setPredictionTab] = useState<"early" | "final">("early");
  const [showAllEarlyFactors, setShowAllEarlyFactors] = useState(false);
  const [showAllFinalFactors, setShowAllFinalFactors] = useState(false);
  const studentCacheRef = useRef<Map<string, CachedStudentPayload>>(new Map());
  const isLoading = !!student && loadedStudentId !== student.student_id;

  useEffect(() => {
    if (!student) return;
    let cancelled = false;
    const cached = studentCacheRef.current.get(student.student_id);

    if (cached) {
      setProfile(cached.profile);
      setEarly(cached.early);
      setFinalData(cached.finalData);
      setLoadedStudentId(student.student_id);
      return;
    }

    const headers = { Authorization: `Bearer ${getToken()}` };
    const controller = new AbortController();

    async function load() {
      const [p, e, f] = await Promise.all([
        fetch(`${API_BASE_URL}/students/${student.student_id}`, {
          headers,
          signal: controller.signal,
        }),
        fetch(`${API_BASE_URL}/students/${student.student_id}/insights?stage=early&top_k=8`, {
          headers,
          signal: controller.signal,
        }),
        fetch(`${API_BASE_URL}/students/${student.student_id}/insights?stage=final&top_k=8`, {
          headers,
          signal: controller.signal,
        }),
      ]);

      if (cancelled) return;

      const [profileJson, earlyJson, finalJson] = await Promise.all([
        p.json() as Promise<StudentProfile>,
        e.json() as Promise<PredictionResponse>,
        f.json() as Promise<PredictionResponse>,
      ]);

      setProfile(profileJson);
      setEarly(earlyJson);
      setFinalData(finalJson);
      setLoadedStudentId(student.student_id);
      studentCacheRef.current.set(student.student_id, {
        profile: profileJson,
        early: earlyJson,
        finalData: finalJson,
      });
    }

    load().catch(() => {
      if (!cancelled) setLoadedStudentId(student.student_id);
    });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [student]);

  if (!student) {
    return (
      <Box sx={{ p: 4 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <PersonSearchIcon color="action" />
          <Typography color="text.secondary">
            Select a student to view analytics.
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ p: 4 }}>
        <AppLoadingState />
      </Box>
    );
  }

  const isPass = finalData?.prediction.final_prediction === 1;
  const passProbability = finalData?.prediction.probability ?? 0;
  const earlyProb = early?.prediction.probability ?? 0;
  const earlyAtRisk = early?.prediction.at_risk === 1;
  const finalFail = finalData ? !isPass : false;
  const earlyRiskLabel =
    earlyProb >= 0.7 ? "High Risk" : earlyProb >= 0.4 ? "Medium Risk" : "Low Risk";
  const earlyRiskColor =
    earlyProb >= 0.7 ? "error" : earlyProb >= 0.4 ? "warning" : "success";
  const trajectory = buildTrajectoryInsight({
    earlyAtRisk,
    finalFail,
    earlyConfidence: early?.prediction.confidence,
    finalConfidence: finalData?.prediction.confidence,
  });
  const earlyFactors = early?.local_explanation.top_factors ?? [];
  const finalFactors = finalData?.local_explanation.top_factors ?? [];
  const earlyFactorsToShow = showAllEarlyFactors ? earlyFactors : earlyFactors.slice(0, 3);
  const finalFactorsToShow = showAllFinalFactors ? finalFactors : finalFactors.slice(0, 3);

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, overflowY: "auto", height: "100%" }}>
      <Stack spacing={3}>
        <StudentHeader
          label={profile?.label ?? student.student_id}
          studentId={student.student_id}
          isMobile={isMobile}
          onViewGlobalInsights={() => setGlobalOpen(true)}
          onViewProfile={() => setProfileOpen(true)}
        />

        <Divider />

        {early && finalData && (
          <Paper variant="outlined" sx={{ p: 2.5, boxShadow: "none" }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <TimelineIcon color="primary" fontSize="small" />
              <Typography fontWeight={700}>Trajectory Insight</Typography>
              <Chip
                size="small"
                color={trajectory.color}
                label={trajectory.label}
                variant={trajectory.color === "default" ? "outlined" : "filled"}
              />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {trajectory.message}
            </Typography>
            <Typography variant="body2" mt={1}>
              <strong>Suggested action:</strong> {trajectory.action}
            </Typography>
          </Paper>
        )}

        {early && finalData && (
          <Paper variant="outlined" sx={{ p: 2, boxShadow: "none" }}>
            <Tabs
              value={predictionTab}
              onChange={(_, value: "early" | "final") => setPredictionTab(value)}
              sx={{ mb: 2 }}
            >
              <Tab value="early" label="Early Stage View" />
              <Tab value="final" label="Final Stage View" />
            </Tabs>

            {predictionTab === "early" ? (
              <PredictionCard
                title="Early Risk Prediction"
                result={early.prediction.at_risk ? "At Risk" : "Not At Risk"}
                probability={early.prediction.probability}
                probabilityLabel="Risk chance"
                threshold={early.prediction.threshold}
                confidenceLabel={early.prediction.confidence}
                tone={early.prediction.at_risk ? "negative" : "positive"}
                headerChipLabel={earlyRiskLabel}
                headerChipColor={earlyRiskColor}
                embedded
                decisionRuleLabel={
                  early.prediction.threshold !== undefined
                    ? `Alert level: At Risk when risk chance reaches ${Math.round(early.prediction.threshold * 100)}% or more.`
                    : undefined
                }
                explanation={`The student is predicted as ${
                  early.prediction.at_risk ? "at risk" : "not at risk"
                }. Main reason right now: ${
                  (early.local_explanation.top_factors[0]?.feature ?? "multiple factors").replace(/_/g, " ")
                }.`}
              />
            ) : (
              <PredictionCard
                title="Final Outcome Prediction"
                result={isPass ? "Pass" : "Fail"}
                probability={passProbability}
                probabilityLabel="Pass chance"
                threshold={finalData.prediction.threshold}
                confidenceLabel={finalData.prediction.confidence}
                tone={isPass ? "positive" : "negative"}
                headerChipLabel={isPass ? "Predicted Pass" : "Predicted Fail"}
                headerChipColor={isPass ? "success" : "error"}
                embedded
                decisionRuleLabel={
                  finalData.prediction.threshold !== undefined
                    ? `Decision level: Pass when pass chance reaches ${Math.round(finalData.prediction.threshold * 100)}% or more.`
                    : undefined
                }
                explanation={`The student is predicted to ${
                  isPass ? "pass" : "fail"
                }. Main reason right now: ${
                  (finalData.local_explanation.top_factors[0]?.feature ?? "multiple factors").replace(/_/g, " ")
                }.`}
              />
            )}
          </Paper>
        )}

        {early && (
          <Paper variant="outlined" sx={{ p: 2.5, boxShadow: "none" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography fontWeight={600}>
                Why Early Risk Result Was Given
              </Typography>
              {earlyFactors.length > 3 && (
                <Button
                  size="small"
                  onClick={() => setShowAllEarlyFactors((v) => !v)}
                  endIcon={showAllEarlyFactors ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                >
                  {showAllEarlyFactors ? "Show less" : "Show all factors"}
                </Button>
              )}
            </Stack>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Top reasons are shown first for quick review.
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" mb={2}>
              Influence on this student = how much this reason affected this student&apos;s result.
              How common this factor is overall = how often this reason matters across all students.
            </Typography>
            <ShapExplanationCard
              factors={earlyFactorsToShow}
              classOneLabel="At Risk"
              classZeroLabel="Not At Risk"
            />
          </Paper>
        )}

        {finalData && (
          <Paper variant="outlined" sx={{ p: 2.5, boxShadow: "none" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography fontWeight={600}>
                Why Final Outcome Result Was Given
              </Typography>
              {finalFactors.length > 3 && (
                <Button
                  size="small"
                  onClick={() => setShowAllFinalFactors((v) => !v)}
                  endIcon={showAllFinalFactors ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                >
                  {showAllFinalFactors ? "Show less" : "Show all factors"}
                </Button>
              )}
            </Stack>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Top reasons are shown first for quick review.
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" mb={2}>
              Influence on this student = how much this reason affected this student&apos;s result.
              How common this factor is overall = how often this reason matters across all students.
            </Typography>
            <ShapExplanationCard
              factors={finalFactorsToShow}
              classOneLabel="Pass"
              classZeroLabel="Fail"
            />
          </Paper>
        )}

      </Stack>

      <StudentProfileDialog
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        student={profile}
      />
      <GlobalInsightsDialog
        open={globalOpen}
        onClose={() => setGlobalOpen(false)}
      />
    </Box>
  );
}

function buildTrajectoryInsight({
  earlyAtRisk,
  finalFail,
  earlyConfidence,
  finalConfidence,
}: {
  earlyAtRisk: boolean;
  finalFail: boolean;
  earlyConfidence?: string;
  finalConfidence?: string;
}): {
  label: string;
  message: string;
  action: string;
  color: "success" | "warning" | "error" | "default";
} {
  const earlyConf = (earlyConfidence ?? "").toLowerCase();
  const finalConf = (finalConfidence ?? "").toLowerCase();

  if (!earlyAtRisk && finalFail) {
    return {
      label: "Declined Later",
      color: "warning",
      message:
        "Early signs looked acceptable, but the student moved toward fail later in the course. This suggests disengagement or performance drop after the early weeks.",
      action: "Schedule an immediate check-in and monitor weekly activity completion.",
    };
  }

  if (earlyAtRisk && !finalFail) {
    return {
      label: "Improved",
      color: "success",
      message:
        "The student was flagged as at risk early, but improved enough to move toward pass by the end. This pattern often reflects successful support or better engagement later.",
      action: "Maintain current support and reinforce the practices that improved performance.",
    };
  }

  if (earlyAtRisk && finalFail) {
    return {
      label: "Consistently At Risk",
      color: "error",
      message:
        "Risk signs were present early and remained through the final stage. This student likely needs sustained support rather than one-time intervention.",
      action: "Create a sustained intervention plan with frequent follow-up points.",
    };
  }

  if (!earlyAtRisk && !finalFail) {
    return {
      label: "Consistently On Track",
      color: "success",
      message:
        "The student stayed on a healthy trajectory from early stage to final stage, with no major warning shift.",
      action: "Keep routine monitoring and continue normal instructional support.",
    };
  }

  return {
    label: "Mixed Pattern",
    color: "default",
    message:
      earlyConf === "low" || finalConf === "low"
        ? "This student has mixed signals and at least one low-certainty prediction. Monitor closely and check upcoming assessments."
        : "This student has mixed signals across stages. Review activity and assessment trends before deciding intervention.",
    action:
      earlyConf === "low" || finalConf === "low"
        ? "Collect one more week of evidence before making a major intervention decision."
        : "Review attendance, assessment timing, and recent platform activity to refine support.",
  };
}
