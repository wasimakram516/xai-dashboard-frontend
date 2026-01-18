"use client";

import { Box, Typography, Stack, Button } from "@mui/material";

type Props = {
  label: string;
  studentId: string;
  isMobile: boolean;
  onViewProfile: () => void;
};

export default function StudentHeader({
  label,
  studentId,
  isMobile,
  onViewProfile,
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
        <Typography color="text.secondary">{studentId}</Typography>
      </Box>

      <Button
        variant="outlined"
        size="small"
        fullWidth={isMobile}
        onClick={onViewProfile}
      >
        View Profile
      </Button>
    </Stack>
  );
}
