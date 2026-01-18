"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
  Divider,
  Box,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import BarChartIcon from "@mui/icons-material/BarChart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

/* -----------------------------------
   Types
----------------------------------- */
type StudentProfile = {
  student_id: string;
  label: string;
  oulad_id: number;
  demographics: {
    gender: string;
    age_band: string;
    highest_education: string;
    region: string;
    disability: string;
  };
  stats: {
    num_assessments: number;
    avg_score: number;
    total_clicks: number;
    engagement_variance: number;
  };
};

type Props = {
  open: boolean;
  onClose: () => void;
  student: StudentProfile | null;
};

/* -----------------------------------
   Component
----------------------------------- */
export default function StudentProfileDialog({
  open,
  onClose,
  student,
}: Props) {
  if (!student) return null;

  const { demographics, stats } = student;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* HEADER */}
      <DialogTitle sx={{ pr: 6 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <PersonIcon />
          <Box>
            <Typography variant="h4">{student.label}</Typography>
            <Typography variant="caption" color="text.secondary">
              OULAD Student ID: {student.oulad_id}
            </Typography>
          </Box>
        </Stack>

        {/* CLOSE ICON */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* DATA SOURCE */}
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <InfoOutlinedIcon fontSize="small" />
          <Typography variant="subtitle2" color="text.secondary">
            Data sourced from the Open University Learning Analytics Dataset
            (OULAD). Student identifiers are anonymised; numeric OULAD IDs are
            retained for dataset traceability.
          </Typography>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* DEMOGRAPHICS */}
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <SchoolIcon color="action" />
          <Typography variant="h5">Demographics</Typography>
        </Stack>

        <Stack spacing={1.5} mb={2}>
          <ProfileRow label="Gender" value={demographics.gender} />
          <ProfileRow label="Age Band" value={demographics.age_band} />
          <ProfileRow
            label="Highest Education"
            value={demographics.highest_education}
          />
          <ProfileRow label="Region" value={demographics.region} />
          <ProfileRow
            label="Disability"
            value={demographics.disability === "Y" ? "Yes" : "No"}
          />
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* ENGAGEMENT STATS */}
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <BarChartIcon color="action" />
          <Typography variant="h5">Engagement Statistics</Typography>
        </Stack>

        <Stack spacing={1.5}>
          <ProfileRow
            label="Assessments Attempted"
            value={stats.num_assessments}
          />
          <ProfileRow label="Average Score" value={stats.avg_score} />
          <ProfileRow label="Total VLE Clicks" value={stats.total_clicks} />
          <ProfileRow
            label="Engagement Variance"
            value={stats.engagement_variance.toFixed(2)}
          />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

/* -----------------------------------
   Helper Row
----------------------------------- */
function ProfileRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="body1" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  );
}
