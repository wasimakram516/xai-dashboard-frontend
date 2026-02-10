"use client";

import { Box, Typography, Stack, Button, Chip } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import BadgeIcon from "@mui/icons-material/Badge";

type Props = {
  label: string;
  studentId: string;
  isMobile: boolean;
  onViewProfile: () => void;
  onViewGlobalInsights: () => void;
};

export default function StudentHeader({
  label,
  studentId,
  isMobile,
  onViewProfile,
  onViewGlobalInsights,
}: Props) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      alignItems={{ xs: "stretch", sm: "center" }}
      justifyContent="space-between"
    >
      <Box>
        <Typography variant="h5" fontWeight={700}>
          {label}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" mt={0.5} flexWrap="wrap">
          <Chip size="small" variant="outlined" label={`Student code: ${studentId}`} />
          <Typography variant="caption" color="text.secondary">
            View risk and final outcome with clear reasons.
          </Typography>
        </Stack>
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
        <Button
          variant="outlined"
          size="small"
          fullWidth={isMobile}
          onClick={onViewGlobalInsights}
          startIcon={<PublicIcon />}
        >
          Class-Wide Insights
        </Button>
        <Button
          variant="outlined"
          size="small"
          fullWidth={isMobile}
          onClick={onViewProfile}
          startIcon={<BadgeIcon />}
        >
          Student Background
        </Button>
      </Stack>
    </Stack>
  );
}
