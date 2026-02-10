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
  Paper,
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
              Dataset student ID: {student.oulad_id}
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
        <Paper variant="outlined" sx={{ p: 1.5, mb: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <InfoOutlinedIcon fontSize="small" />
            <Typography variant="subtitle2" color="text.secondary">
              This profile helps explain the prediction context for this student.
            </Typography>
          </Stack>
          <Typography variant="caption" color="text.secondary" display="block" mt={0.75}>
            Source: Open University Learning Analytics Dataset (OULAD). Names are anonymized.
          </Typography>
        </Paper>

        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <InfoOutlinedIcon fontSize="small" />
          <Typography variant="subtitle2" color="text.secondary">
            Use this information as context. Predictions are based mostly on behaviour and assessment patterns.
          </Typography>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* DEMOGRAPHICS */}
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <SchoolIcon color="action" />
          <Typography variant="h5">Student Background</Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary" display="block" mb={1.5}>
          Basic profile details from the dataset.
        </Typography>

        <Stack spacing={1.5} mb={2}>
          <ProfileRow label="Gender" value={friendlyGender(demographics.gender)} />
          <ProfileRow label="Age Band" value={demographics.age_band} />
          <ProfileRow
            label="Education Level"
            value={demographics.highest_education}
          />
          <ProfileRow label="Region" value={demographics.region} />
          <ProfileRow
            label="Disability Support Flag"
            value={demographics.disability === "Y" ? "Yes" : "No"}
          />
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* ENGAGEMENT STATS */}
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <BarChartIcon color="action" />
          <Typography variant="h5">Learning Activity Summary</Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary" display="block" mb={1.5}>
          These values summarize coursework activity used by the model.
        </Typography>

        <Stack spacing={1.5}>
          <ProfileRow
            label="Assessments Submitted"
            value={stats.num_assessments}
          />
          <ProfileRow label="Average Assessment Score" value={formatNumber(stats.avg_score)} />
          <ProfileRow label="Total Platform Clicks" value={formatNumber(stats.total_clicks)} />
          <ProfileRow
            label="Activity Consistency"
            value={describeConsistency(stats.engagement_variance)}
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

function friendlyGender(value: string): string {
  if (value === "M") return "Male";
  if (value === "F") return "Female";
  return value;
}

function formatNumber(value: number): string {
  if (Number.isInteger(value)) return value.toString();
  return value.toFixed(2);
}

function describeConsistency(variance: number): string {
  if (!Number.isFinite(variance)) return "Unknown";
  if (variance < 200) return "Very consistent activity";
  if (variance < 600) return "Moderately consistent activity";
  return "Highly variable activity";
}
