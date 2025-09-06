import { Box, Typography } from "@mui/material";

export default function Settings() {
  return (
    <Box
      component="section"
      sx={{
        height: "calc(100vh - 48px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1" component="h2" color="initial">
        Settings
      </Typography>
    </Box>
  );
}
