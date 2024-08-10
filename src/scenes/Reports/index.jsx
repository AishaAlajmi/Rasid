import React from "react";
import { Box, Typography, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

// Data for weeks
const reportData = [
  { week: "Week 1 - Aug 2024" },
  { week: "Week 2 - Aug 2024" },
  { week: "Week 3 - Aug 2024" },
  { week: "Week 4 - Aug 2024" },
  { week: "Week 1 - Sep 2024" },
  { week: "Week 2 - Sep 2024" },
  { week: "Week 3 - Sep 2024" },
  { week: "Week 4 - Sep 2024" },
  { week: "Week 1 - Aug 2024" },
  { week: "Week 2 - Aug 2024" },
  { week: "Week 3 - Aug 2024" },
  { week: "Week 4 - Aug 2024" },
  // Add more weeks as needed
];

const ReportsPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box mb="20px">
        <Box display="flex" flexDirection="column" alignItems="start" mb="10px">
          <Typography
            variant="h2"
            sx={{ color: "white", fontWeight: "bold", mb: "5px" }}
          >
            Reports
          </Typography>
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="120px" // Adjusted height of each row
        gap="20px"
        justifyContent="center"
      >
        {/* Render boxes from data */}
        {reportData.map((report, index) => (
          <Box
            key={index}
            gridColumn="span 6" // Each box takes half of the row
            backgroundColor={colors.primary[400]}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={2}
          >
            <Typography
              variant="h1"
              sx={{ mb: 2, fontWeight: "bold", fontSize: "1.75rem" }}
            >
              {report.week}
            </Typography>
            <Box display="flex" flexDirection="row" gap="10px">
              <Button
                variant="contained"
                color="secondary"
                startIcon={<VisibilityIcon />}
              >
                View Report
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<GetAppIcon />}
              >
                Download PDF
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ReportsPage;
