import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, change }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const isIncrease = parseFloat(change) >= 0;
  const changeColor = isIncrease ? colors.greenAccent[600] : colors.redAccent[600];

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: changeColor }}
        >
          {isIncrease ? `+${change}` : `${change}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
