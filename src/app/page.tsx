"use client";

import { Box, Button, Container, Typography, Divider } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  const ctaHref = isAuthenticated ? "/dashboard" : "/login";
  const ctaLabel = isAuthenticated
    ? "Go to Educator Dashboard"
    : "Access Educator Dashboard";
  const ctaIcon = isAuthenticated ? <DashboardIcon /> : <LoginIcon />;

  return (
    <Container maxWidth="md">
      <Box
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        py={8}
        gap={6}
      >
        {/* =====================================================
            HERO
        ====================================================== */}
        <Box textAlign="center">
          <Typography variant="h3" gutterBottom>
            From Black-Box to Glass-Box
          </Typography>

          <Typography variant="h4" color="primary" gutterBottom>
            An Explainable AI Dashboard for Adaptive Learning Systems
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mt: 3 }}>
            A research-driven, educator-oriented decision-support system designed
            to assist in understanding, predicting, and interpreting student
            academic performance through transparent and explainable machine
            learning models.
          </Typography>
        </Box>

        <Divider />

        {/* =====================================================
            PROBLEM STATEMENT
        ====================================================== */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Problem Context
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Online and blended learning environments generate large volumes of
            student interaction data. However, educators often lack actionable
            and interpretable insights to identify students who may be at risk of
            poor academic outcomes.
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Traditional predictive models frequently operate as black boxes,
            limiting trust, hindering pedagogical decision-making, and reducing
            the effectiveness of early intervention strategies in educational
            settings.
          </Typography>
        </Box>

        {/* =====================================================
            SYSTEM OVERVIEW
        ====================================================== */}
        <Box>
          <Typography variant="h5" gutterBottom>
            System Overview
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            The Explainable AI Dashboard for Adaptive Learning Systems integrates
            supervised machine learning with explainable artificial intelligence
            (XAI) techniques to provide both predictive outcomes and
            human-interpretable explanations.
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Using real-world educational data, the system supports two core
            analytical tasks: early identification of students at risk of failure
            or withdrawal, and prediction of final academic outcomes. Each
            prediction is accompanied by feature-level explanations, enabling
            transparent and informed educational decision-making.
          </Typography>
        </Box>

        {/* =====================================================
            KEY CAPABILITIES
        ====================================================== */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Key Capabilities
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            • Early risk detection based on initial engagement and early
            assessment behaviour
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            • Transparent, SHAP-based explanations of model predictions
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            • Educator-focused visualisation of student-level predictive insights
          </Typography>

          <Typography variant="body1" color="text.secondary">
            • Clear separation between predictive modelling and user interface
            layers to ensure robustness, scalability, and deployment feasibility
          </Typography>
        </Box>

        {/* =====================================================
            TARGET USERS
        ====================================================== */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Intended Users
          </Typography>

          <Typography variant="body1" color="text.secondary">
            This prototype is designed exclusively for educators and academic
            staff, enabling exploration of predictive insights and explanations
            for enrolled students. Future extensions may include administrative
            or student-facing views, subject to ethical, institutional, and data
            governance considerations.
          </Typography>
        </Box>

        <Divider />

        {/* =====================================================
            CTA (AUTH-AWARE)
        ====================================================== */}
        <Box textAlign="center" mt={4}>
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

        {/* =====================================================
            FOOTER / DISCLOSURE
        ====================================================== */}
        <Box textAlign="center">
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
            Dataset: Open University Learning Analytics Dataset (OULAD) • Models:
            XGBoost • Explainability: SHAP • MSCS Research Project
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
