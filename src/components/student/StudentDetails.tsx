"use client";

import {
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/config";
import { getToken } from "@/lib/auth";
import StudentHeader from "./StudentHeader";
import PredictionCard from "./PredictionCard";
import ShapExplanationCard from "./ShapExplanationCard";
import StudentProfileDialog from "@/components/student/StudentProfileDialog";

type Student = {
  student_id: string;
};

type PredictionResponse = {
  prediction: {
    probability: number;
    at_risk?: number;
    final_prediction?: number;
  };
  explanation: {
    top_factors: { feature: string; impact: number }[];
  };
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
  const [profile, setProfile] = useState<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if (!student) return;

    const headers = { Authorization: `Bearer ${getToken()}` };

    async function load() {
      const [p, e, f] = await Promise.all([
        fetch(`${API_BASE_URL}/students/${student?.student_id}`, { headers }),
        fetch(`${API_BASE_URL}/students/${student?.student_id}/early`, { headers }),
        fetch(`${API_BASE_URL}/students/${student?.student_id}/final`, { headers }),
      ]);

      setProfile(await p.json());
      setEarly(await e.json());
      setFinalData(await f.json());
    }

    load();
  }, [student]);

  if (!student) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="text.secondary">
          Select a student to view analytics.
        </Typography>
      </Box>
    );
  }

  const isFail = finalData?.prediction.final_prediction === 1;
  const finalConfidence = finalData
    ? isFail
      ? finalData.prediction.probability
      : 1 - finalData.prediction.probability
    : 0;

  return (
    <Box sx={{ p: 4, overflowY: "auto", height: "100%" }}>
      <Stack spacing={3}>
        <StudentHeader
          label={profile?.label ?? student.student_id}
          studentId={student.student_id}
          isMobile={isMobile}
          onViewProfile={() => setProfileOpen(true)}
        />

        <Divider />

        {early && (
          <PredictionCard
            title="Early Risk Prediction"
            result={early.prediction.at_risk ? "At Risk" : "Not At Risk"}
            probability={early.prediction.probability}
            probabilityLabel="Risk probability"
            explanation={`The student is predicted as ${
              early.prediction.at_risk ? "at risk" : "not at risk"
            }, primarily influenced by ${
              early.explanation.top_factors[0].feature
            }.`}
          />
        )}

        {finalData && (
          <PredictionCard
            title="Final Outcome Prediction"
            result={isFail ? "Fail" : "Pass"}
            probability={finalConfidence}
            probabilityLabel="Model confidence"
            confidenceMode
            explanation={`The student is predicted to ${
              isFail ? "fail" : "pass"
            }, primarily influenced by ${
              finalData.explanation.top_factors[0].feature
            }.`}
          />
        )}

        {early && (
          <Paper sx={{ p: 3 }}>
            <Typography fontWeight={600} mb={1}>
              Key Influencing Factors (SHAP)
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Green bars reduce risk, red bars increase risk.
            </Typography>
            <ShapExplanationCard factors={early.explanation.top_factors} />
          </Paper>
        )}
      </Stack>

      <StudentProfileDialog
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        student={profile}
      />
    </Box>
  );
}
