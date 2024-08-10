import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  BarChart,
  Bar,
} from "recharts";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";
import Stack from "@mui/material/Stack";
import { Gauge } from "@mui/x-charts/Gauge";

const noiseData = [
  { day: "Sunday", db: 50 },
  { day: "Monday", db: 60 },
  { day: "Tuesday", db: 55 },
  { day: "Wednesday", db: 70 },
  { day: "Thursday", db: 65 },
  { day: "Friday", db: 60 },
  { day: "Saturday", db: 50 },
];

const temperatureData = [
  { time: "6:00 AM", temperature: 20 },
  { time: "10:00 AM", temperature: 25 },
  { time: "2:00 PM", temperature: 30 },
  { time: "6:00 PM", temperature: 35 },
  { time: "10:00 PM", temperature: 40 },
];

// Mock data for the line chart
const data = [
  { day: 1, value: 35 },
  { day: 2, value: 40 },
  { day: 3, value: 42 },
  { day: 4, value: 48 },
  { day: 5, value: 50 },
  { day: 6, value: 55 },
  { day: 7, value: 60 },
];

function GaugeValueRangeNoSnap() {
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 1, md: 3 }}>
      <Gauge width={150} height={150} value={20} valueMin={10} valueMax={60} />
    </Stack>
  );
}

// Define the GaugePointer component
function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
      />
    </g>
  );
}

// TrackingPage component
const TrackingPage = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 5, color: "white" }}>
      <Typography variant="h4" gutterBottom>
        Equipment Tracking
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{ p: 2, borderRadius: 2, bgcolor: "#1F2A40", height: "100%" }}
          >
            <Typography variant="h5" sx={{ color: "white" }} gutterBottom>
              Summary
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">
                Equipment condition:{" "}
                <strong style={{ color: "#00C853" }}>Good</strong>
              </Typography>
              <Typography variant="subtitle1">
                Alerts and Warnings: <strong>0</strong>
              </Typography>
              <Typography variant="subtitle1">
                Last maintenance: <strong>05 Mar 2024</strong>
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "#1F2A40",
              color: "white",
              height: "100%",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Noise Tracking
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BarChart
                width={500}
                height={200}
                data={noiseData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
                <XAxis dataKey="day" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip />
                <Bar dataKey="db" fill="#8884d8" barSize={20} />
              </BarChart>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{ p: 2, borderRadius: 2, bgcolor: "#1F2A40", height: "100%" }}
          >
            <Typography variant="h5" sx={{ color: "white" }} gutterBottom>
              Air Quality
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GaugeContainer
                width={200}
                height={200}
                startAngle={-110}
                endAngle={110}
                value={30}
              >
                <GaugeReferenceArc />
                <GaugeValueArc />
                <GaugePointer />
              </GaugeContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{ p: 2, borderRadius: 2, bgcolor: "#1F2A40", height: "100%" }}
          >
            <Typography variant="h5" gutterBottom>
              Equipment Vibration and Oscillation
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LineChart
                width={600}
                height={250}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
                <XAxis dataKey="day" stroke="white" />
                <YAxis domain={[35, 65]} stroke="white" />
                <Tooltip />
                <ReferenceArea
                  y1={60}
                  y2={65}
                  strokeOpacity={0.3}
                  fill="#C75050"
                />
                <ReferenceArea
                  y1={55}
                  y2={60}
                  strokeOpacity={0.3}
                  fill="#C75050"
                />
                <ReferenceArea
                  y1={45}
                  y2={55}
                  strokeOpacity={0.3}
                  fill="#A8AA44"
                />
                <ReferenceArea
                  y1={40}
                  y2={45}
                  strokeOpacity={0.3}
                  fill="green"
                />
                <ReferenceArea
                  y1={35}
                  y2={40}
                  strokeOpacity={0.3}
                  fill="green"
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{ p: 2, borderRadius: 2, bgcolor: "#1F2A40", height: "100%" }}
          >
            <Typography variant="h5" sx={{ color: "white" }} gutterBottom>
              Humidity Monitoring
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GaugeValueRangeNoSnap
                width={250} // Increased width
                height={250} // Increased height
                startAngle={-110}
                endAngle={110}
                value={30}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "#1F2A40",
              color: "white",
              height: "100%",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Temperature Control
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LineChart
                width={600}
                height={250}
                data={temperatureData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
                <XAxis dataKey="time" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={true}
                />
              </LineChart>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrackingPage;
