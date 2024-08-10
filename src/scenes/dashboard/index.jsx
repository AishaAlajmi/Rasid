import React from 'react';
import { Box, Typography, Paper, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FactoryIcon from "@mui/icons-material/Factory";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { tokens } from "../../theme";
import { studentData, statusColors } from "../../data/mockData";
import { useTheme } from "@mui/material/styles";

const Dashboard = () => {
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
            Dashboard
          </Typography>
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        {["80%", "20%", "$500", "1200 units"].map((item, index) => (
          <Box
            key={index}
            gridColumn="span 3"
            sx={{
              backgroundColor: colors.primary[400],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px `,
              borderRadius: theme.shape.borderRadius,
            }}
          >
            <StatBox
              title={item}
              subtitle={["Completed", "Needs Maintenance", "Saved Cost", "Production Unit"][index]}
              progress={[0.75, 0.20, 0.60, 0.90][index]}
              change={["14%", "-10%", "15%", "5%"][index]}
              icon={[
                <CheckCircleIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />,
                <CancelIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />,
                <AttachMoneyIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />,
                <FactoryIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />,
              ][index]}
            />
          </Box>
        ))}

        {/* TABLE ROW */}
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          sx={{
            backgroundColor: colors.primary[400],
            overflow: "auto",
          }}
        >
          <TableContainer component={Paper} sx={{ backgroundColor: colors.primary[400] }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Equipment</TableCell>
                  <TableCell>Employee</TableCell>
                  <TableCell>Manufacturing Date</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Progress</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentData.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.Equipment}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.date}</TableCell>
                    <TableCell>{student.duration}</TableCell>
                    <TableCell>
                      <Chip
                        label={student.status}
                        sx={{
                          backgroundColor: statusColors[student.status],
                          color: "#fff",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ minWidth: 35 }}
                        >
                          {`${student.progress}%`}
                        </Typography>
                        <ProgressCircle
                          variant="determinate"
                          value={student.progress}
                          sx={{ width: "100%", marginLeft: 1 }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
