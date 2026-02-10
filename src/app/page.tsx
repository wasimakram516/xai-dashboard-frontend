"use client";

import {
  Box,
  Button,
  Container,
  Typography,
  Divider,
  Chip,
  Stack,
  Paper,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import InsightsIcon from "@mui/icons-material/Insights";
import HubIcon from "@mui/icons-material/Hub";
import TimelineIcon from "@mui/icons-material/Timeline";
import PublicIcon from "@mui/icons-material/Public";
import SchoolIcon from "@mui/icons-material/School";
import PsychologyIcon from "@mui/icons-material/Psychology";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import GppGoodIcon from "@mui/icons-material/GppGood";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ReactNode } from "react";

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  const ctaHref = isAuthenticated ? "/dashboard" : "/login";
  const ctaLabel = isAuthenticated
    ? "Go to Educator Dashboard"
    : "Access Educator Dashboard";
  const ctaIcon = isAuthenticated ? <DashboardIcon /> : <LoginIcon />;

  return (
    <Container maxWidth="lg">
      <Box
        minHeight="calc(100dvh - 72px)"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        py={{ xs: 5, md: 8 }}
        gap={4.5}
      >
        <Box
          textAlign="center"
          sx={{
            maxWidth: 980,
            mx: "auto",
            px: { xs: 2, md: 4 },
            py: { xs: 3, md: 4 },
            borderRadius: 4,
            background:
              "linear-gradient(180deg, rgba(18,129,153,0.08) 0%, rgba(18,129,153,0.02) 55%, rgba(255,255,255,0) 100%)",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            flexWrap="wrap"
            mb={2}
          >
            <Chip
              icon={<PsychologyIcon />}
              label="Explainable AI"
              color="primary"
              variant="outlined"
              sx={{ backgroundColor: "rgba(255,255,255,0.7)" }}
            />
            <Chip
              icon={<SchoolIcon />}
              label="Teacher Decision Support"
              variant="outlined"
              sx={{ backgroundColor: "rgba(255,255,255,0.7)" }}
            />
            <Chip
              icon={<PublicIcon />}
              label="OULAD Dataset"
              variant="outlined"
              sx={{ backgroundColor: "rgba(255,255,255,0.7)" }}
            />
          </Stack>

          <Typography variant="h3" gutterBottom>
            From Black-Box to Glass-Box
          </Typography>

          <Typography variant="h4" color="primary" gutterBottom>
            An Explainable AI Dashboard for Adaptive Learning Systems
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            This platform gives teachers two-stage predictions, plain-language explanations,
            and class-wide insight charts so intervention decisions can be fast and trustworthy.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
          }}
        >
          <InfoBlock
            icon={<VisibilityIcon color="primary" />}
            title="Why We Built This"
            content="Many education ML tools give predictions but not usable reasoning. We built this dashboard so teachers can understand what is happening, why it is happening, and what to do next."
          />
          <InfoBlock
            icon={<WarningAmberIcon color="primary" />}
            title="Problem It Solves"
            content="Teachers often see student issues late, after performance has already dropped. This system supports earlier, evidence-based intervention using both student-level and class-wide explanations."
          />
        </Box>

        <Divider />

        <Box>
          <Typography variant="h5" gutterBottom>
            What This Dashboard Provides
          </Typography>

          <Box
            sx={{
              mt: 1.5,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 2,
            }}
          >
            <FeatureCard
              icon={<TrackChangesIcon color="primary" />}
              title="Two-Stage Prediction"
              desc="Predict early risk and final outcome separately to support both early alerts and end-of-course review."
            />
            <FeatureCard
              icon={<InsightsIcon color="primary" />}
              title="Local Explanations Per Student"
              desc="See the top factors that increased or reduced risk for each student in plain language."
            />
            <FeatureCard
              icon={<HubIcon color="primary" />}
              title="Global Explanations"
              desc="Open class-wide insights to understand which factors matter most across all students, not just one case."
            />
            <FeatureCard
              icon={<TimelineIcon color="primary" />}
              title="Trajectory Insight"
              desc="Understand whether a student improved, declined, or stayed stable from early stage to final stage."
            />
          </Box>
        </Box>

        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            p: { xs: 2, md: 3 },
            backgroundColor: "background.paper",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
            <GppGoodIcon color="primary" />
            <Typography variant="h5">Teacher Workflow</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" mb={1.2}>
            Designed for quick, trusted decisions in real teaching time.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            1. Search and select a student from the list.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            2. Review trajectory summary and one-stage prediction at a time.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            3. Open local explanations to see key student-specific factors.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            4. Open class-wide insights for global factor context.
          </Typography>
        </Box>

        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            p: { xs: 2, md: 2.5 },
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Research Contribution
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This work moves from black-box prediction to glass-box decision support by combining
            predictive performance with local and global explainability in a teacher-focused interface.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            The focus is not only model output, but actionable trust: a teacher should understand
            the reason behind each prediction before making an intervention choice.
          </Typography>
        </Box>

        <Divider />

        <Box textAlign="center" mt={0.5}>
          <Button
            component={Link}
            href={ctaHref}
            variant="contained"
            size="large"
            startIcon={ctaIcon}
          >
            {ctaLabel}
          </Button>
        </Box>

        <Box textAlign="center" sx={{ maxWidth: 920, mx: "auto" }}>
          <Typography variant="body2" color="text.secondary">
            Research Prototype by <strong>Wasim Akram</strong> <br />
            Department of Computer Science and Information Technology, Superior
            University Lahore (Sargodha Campus), Pakistan
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mt: 1 }}
          >
            Dataset: Open University Learning Analytics Dataset (OULAD) | Models:
            XGBoost | Explainability: SHAP | MSCS Research Project
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

function InfoBlock({
  icon,
  title,
  content,
}: {
  icon: ReactNode;
  title: string;
  content: string;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.25,
        borderRadius: 2.5,
        backgroundColor: "rgba(255,255,255,0.9)",
        boxShadow: "none",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" mb={0.75}>
        {icon}
        <Typography fontWeight={700}>{title}</Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        {content}
      </Typography>
    </Paper>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Paper
      variant="elevation"
      sx={{
        p: 2.25,
        boxShadow: "none",
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: "rgba(3,54,73,0.14)",
        backgroundColor: "rgba(255,255,255,0.9)",
        transition: "transform 0.2s ease, border-color 0.2s ease",
        "&:hover": {
          transform: "translateY(-1px)",
          borderColor: "rgba(18,129,153,0.45)",
        },
      }}
    >
      <Stack direction="row" spacing={1.25} alignItems="flex-start">
        <Box sx={{ mt: 0.25 }}>{icon}</Box>
        <Box>
          <Typography fontWeight={700}>{title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {desc}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
