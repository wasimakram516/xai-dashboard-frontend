"use client";

import { Box, Button, Container, Typography, Divider } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";

export default function LandingPage() {
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
            Explainable AI Dashboard for
          </Typography>

          <Typography variant="h4" color="primary" gutterBottom>
            Adaptive Learning Systems
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mt: 3 }}>
            A research-driven decision-support system designed to assist
            educators in understanding, predicting, and interpreting student
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
            student interaction data, yet instructors often lack actionable and
            interpretable insights to identify students who are at risk of poor
            academic outcomes. Traditional predictive models typically operate
            as black boxes, limiting their practical adoption in educational
            settings.
          </Typography>

          <Typography variant="body1" color="text.secondary">
            This lack of transparency reduces trust, hinders pedagogical
            decision-making, and restricts early intervention strategies that
            could otherwise support student success.
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
            The Explainable AI Dashboard for Adaptive Learning Systems
            integrates supervised machine learning with explainable artificial
            intelligence (XAI) techniques to provide educators with both
            predictive outcomes and human-interpretable explanations.
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Using real-world educational datasets, the system supports two core
            analytical tasks: early identification of students at risk of
            failure or withdrawal, and prediction of final academic outcomes.
            Model predictions are accompanied by feature-level explanations,
            enabling educators to understand the underlying factors influencing
            each prediction.
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
            • Early risk detection based on initial engagement and assessment
            behaviour
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            • Transparent prediction explanations using SHAP-based
            interpretability
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            • Educator-focused visualisation of student-level and cohort-level
            insights
          </Typography>

          <Typography variant="body1" color="text.secondary">
            • Separation of predictive modelling and user interface layers to
            ensure scalability and deployment feasibility
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
            The current prototype is designed exclusively for educators and
            academic staff, enabling them to explore predictive insights and
            explanations for enrolled students. Future extensions may include
            administrative and student-facing views, subject to ethical and
            institutional considerations.
          </Typography>
        </Box>

        <Divider />

        {/* =====================================================
            CTA
        ====================================================== */}
        <Box textAlign="center" mt={4}>
          <Button
            component={Link}
            href="/login"
            variant="contained"
            size="large"
            startIcon={<LoginIcon />}
          >
            Access Educator Dashboard
          </Button>
        </Box>
        <Box textAlign="center" >
        <Typography variant="body2" color="text.secondary">
          An educator-oriented decision-support system integrating machine
          learning and explainable AI (XAI) to predict and interpret student
          performance.
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Dataset: Open University Learning Analytics Dataset (OULAD) • Models:
          XGBoost • Explainability: SHAP • MSCS Research Prototype
        </Typography>
        </Box>
      </Box>
    </Container>
  );
}
