"use client";

import {
  Box,
  Typography,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Stack,
  IconButton,
  Chip,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/config";
import { getToken } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ChipProps } from "@mui/material";
import StudentDetails from "@/components/student/StudentDetails";


/* -----------------------------------
   Types
----------------------------------- */
type Student = {
  student_id: string;
};

type PredictionResponse = {
  stage: "early" | "final";
  prediction: {
    probability: number; // EARLY: P(At Risk), FINAL: P(Fail)
    threshold: number;
    at_risk?: number;
    final_prediction?: number; // 1 = Fail, 0 = Pass
  };
  explanation: {
    top_factors: {
      feature: string;
      impact: number;
      meaning: string;
    }[];
  };
};

/* -----------------------------------
   Helpers
----------------------------------- */
function getStudentLabel(studentId: string) {
  const num = parseInt(studentId.replace("STU_", ""), 10);
  return `Student ${num + 1}`;
}

/**
 * Used ONLY for EARLY risk
 */
function getRiskLevel(prob: number): {
  label: string;
  color: ChipProps["color"];
} {
  if (prob >= 0.7) return { label: "High Risk", color: "error" };
  if (prob >= 0.4) return { label: "Medium Risk", color: "warning" };
  return { label: "Low Risk", color: "success" };
}

/**
 * Used ONLY for FINAL confidence
 */
function getConfidenceLevel(prob: number): {
  label: string;
  color: ChipProps["color"];
} {
  if (prob >= 0.7) return { label: "High Confidence", color: "success" };
  if (prob >= 0.4) return { label: "Moderate Confidence", color: "warning" };
  return { label: "Low Confidence", color: "error" };
}

function generateExplanation(
  label: string,
  factors: { feature: string; impact: number }[],
) {
  const top = factors[0];
  return `The student is predicted as ${label.toLowerCase()}, primarily influenced by ${top.feature.replace(
    /_/g,
    " ",
  )}, which had the strongest impact on the model’s decision.`;
}

/* -----------------------------------
   Page
----------------------------------- */
export default function DashboardPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetch(`${API_BASE_URL}/students`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((r) => r.json())
      .then(setStudents);
  }, []);

  return (
    <ProtectedRoute>
      <Box sx={{ p: { xs: 2, md: 4 }, height: "100%" }}>
        <Typography variant="h4" fontWeight={700} mb={1}>
          Student Performance Dashboard
        </Typography>
        <Typography color="text.secondary" mb={3}>
          Explore predictive analytics and explainable AI insights for
          individual students.
        </Typography>

        <Paper sx={{ borderRadius: 3, height: "75vh", overflow: "hidden" }}>
          {!isMobile ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "320px 1fr",
                height: "100%",
              }}
            >
              <StudentList
                students={students}
                selected={selectedStudent}
                onSelect={setSelectedStudent}
              />
              <StudentDetails student={selectedStudent} isMobile={isMobile} />
            </Box>
          ) : (
            <Box sx={{ height: "100%" }}>
              {!selectedStudent ? (
                <Box sx={{ height: "100%", overflowY: "auto" }}>
                  <StudentList
                    students={students}
                    selected={null}
                    onSelect={setSelectedStudent}
                  />
                </Box>
              ) : (
                <Box sx={{ height: "100%", overflowY: "auto", p: 2 }}>
                  <IconButton onClick={() => setSelectedStudent(null)}>
                    <ArrowBackIcon />
                  </IconButton>
                  <StudentDetails student={selectedStudent} isMobile={isMobile} />
                </Box>
              )}
            </Box>
          )}
        </Paper>
      </Box>
    </ProtectedRoute>
  );
}

/* -----------------------------------
   Student List
----------------------------------- */
function StudentList({ students, selected, onSelect }: any) {
  return (
    <Box
      sx={{
        borderRight: "1px solid",
        borderColor: "divider",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <List disablePadding>
        {students.map((student: Student) => (
          <ListItemButton
            key={student.student_id}
            selected={selected?.student_id === student.student_id}
            onClick={() => onSelect(student)}
          >
            <ListItemText
              primary={getStudentLabel(student.student_id)}
              secondary={student.student_id}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
