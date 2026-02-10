"use client";

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Stack,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Divider,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GroupsIcon from "@mui/icons-material/Groups";
import DatasetIcon from "@mui/icons-material/Dataset";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InsightsIcon from "@mui/icons-material/Insights";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/config";
import { getToken } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import StudentDetails from "@/components/student/StudentDetails";
import AppLoadingState from "@/components/AppLoadingState";

type Student = {
  student_id: string;
};

function getStudentLabel(studentId: string) {
  const num = parseInt(studentId.replace("STU_", ""), 10);
  return `Student ${num + 1}`;
}

export default function DashboardPage() {
  const [students, setStudents] = useState<Student[] | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLoadingStudents = students === null;
  const safeStudents = students ?? [];

  useEffect(() => {
    fetch(`${API_BASE_URL}/students`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((r) => r.json())
      .then(setStudents)
      .catch(() => setStudents([]));
  }, []);

  return (
    <ProtectedRoute>
      <Box sx={{ p: { xs: 2, md: 3 }, height: "calc(100dvh - 72px)" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 2.5,
            px: { xs: 0.5, md: 1 },
            py: 0.5,
          }}
        >
          <Box sx={{ maxWidth: 760 }}>
            <Typography variant="h4" fontWeight={700} mb={0.25} lineHeight={1.2}>
              Student Performance Dashboard
            </Typography>
            <Typography color="text.secondary" variant="body1">
              Track student risk and outcome predictions with clear explanations.
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            flexWrap="wrap"
            sx={{ rowGap: 1, justifyContent: { xs: "flex-start", md: "flex-end" } }}
          >
            <Chip
              label={`${safeStudents.length} students`}
              color="primary"
              variant="outlined"
              size="small"
              icon={<GroupsIcon />}
              sx={{ backgroundColor: "rgba(18,129,153,0.06)" }}
            />
            <Chip
              label="Random sample from OULAD"
              color="default"
              size="small"
              icon={<DatasetIcon />}
              sx={{ backgroundColor: "rgba(3,54,73,0.06)" }}
            />
          </Stack>
        </Box>

        <Box
          sx={{
            mt: 2,
            height: { xs: "calc(100dvh - 220px)", md: "calc(100dvh - 200px)" },
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "background.paper",
          }}
        >
          {!isMobile ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "320px 1fr",
                height: "100%",
              }}
            >
              <StudentList
                students={safeStudents}
                selected={selectedStudent}
                onSelect={setSelectedStudent}
                isLoading={isLoadingStudents}
              />
              {isLoadingStudents ? (
                <AppLoadingState
                  title="Loading student list..."
                  subtitle="Fetching records from the service"
                />
              ) : (
                <StudentDetails student={selectedStudent} isMobile={isMobile} />
              )}
            </Box>
          ) : (
            <Box sx={{ height: "100%" }}>
              {!selectedStudent ? (
                <Box sx={{ height: "100%", overflowY: "auto" }}>
                  <StudentList
                    students={safeStudents}
                    selected={null}
                    onSelect={setSelectedStudent}
                    isLoading={isLoadingStudents}
                  />
                </Box>
              ) : (
                <Box sx={{ height: "100%", overflowY: "auto", p: 2 }}>
                  <Button
                    onClick={() => setSelectedStudent(null)}
                    startIcon={<ArrowBackIcon />}
                    variant="text"
                    size="small"
                    sx={{ mb: 1 }}
                  >
                    Back to student list
                  </Button>
                  <StudentDetails student={selectedStudent} isMobile={isMobile} />
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </ProtectedRoute>
  );
}

type StudentListProps = {
  students: Student[];
  selected: Student | null;
  onSelect: (student: Student) => void;
  isLoading: boolean;
};

function StudentList({ students, selected, onSelect, isLoading }: StudentListProps) {
  const [query, setQuery] = useState("");

  if (isLoading) {
    return (
      <Box sx={{ p: 2 }}>
        <AppLoadingState
          compact
          title="Loading students..."
          subtitle="Please wait while we fetch class records"
        />
      </Box>
    );
  }

  if (students.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="text.secondary">No students found.</Typography>
      </Box>
    );
  }

  const normalizedQuery = query.trim().toLowerCase();
  const filteredStudents = students.filter((student) => {
    const label = getStudentLabel(student.student_id).toLowerCase();
    const code = student.student_id.toLowerCase();
    return label.includes(normalizedQuery) || code.includes(normalizedQuery);
  });

  return (
    <Box
      sx={{
        borderRight: "1px solid",
        borderColor: "divider",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 1.5, pb: 1, bgcolor: "background.paper" }}>
        <TextField
          fullWidth
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or code"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          helperText='Example: "Student 22" or "STU_0021"'
        />
        <Typography variant="caption" color="text.secondary" display="block" mt={0.75}>
          Select a student to view predictions and explanations.
        </Typography>
      </Box>
      <Divider />
      <List disablePadding sx={{ overflowY: "auto", px: 1, py: 1 }}>
        {filteredStudents.map((student) => (
          <ListItemButton
            key={student.student_id}
            selected={selected?.student_id === student.student_id}
            onClick={() => onSelect(student)}
            sx={{
              mb: 0.5,
              py: 1,
              px: 1.25,
              borderRadius: 2,
              minHeight: 58,
              alignItems: "center",
              border: "1px solid",
              borderColor:
                selected?.student_id === student.student_id
                  ? "primary.main"
                  : "transparent",
              backgroundColor:
                selected?.student_id === student.student_id
                  ? "rgba(18,129,153,0.08)"
                  : "transparent",
              "&:hover": {
                backgroundColor:
                  selected?.student_id === student.student_id
                    ? "rgba(18,129,153,0.12)"
                    : "rgba(18,129,153,0.05)",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              {selected?.student_id === student.student_id ? (
                <InsightsIcon color="primary" fontSize="small" />
              ) : (
                <PersonOutlineIcon fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText
              primary={getStudentLabel(student.student_id)}
              secondary={student.student_id}
              primaryTypographyProps={{
                fontSize: "0.98rem",
                fontWeight: 600,
                lineHeight: 1.25,
              }}
              secondaryTypographyProps={{
                fontSize: "0.85rem",
                lineHeight: 1.25,
              }}
            />
          </ListItemButton>
        ))}
        {filteredStudents.length === 0 && (
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              No students matched your search.
            </Typography>
          </Box>
        )}
      </List>
    </Box>
  );
}
