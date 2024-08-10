import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import RefreshIcon from "@mui/icons-material/Refresh";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const Container = styled(Box)({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#141B2D",
  color: "#fff",
});

const Content = styled(Box)({
  flex: 1,
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Header = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#1F2A40",
  borderRadius: "10px",
  marginBottom: "20px",
});

const ChatBox = styled(Paper)({
  width: "100%",
  backgroundColor: "#1F2A40",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
});

const Footer = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "100%",
});

const ChatGPTInterface = () => {
  return (
    <Container>
      <Content>
        <Header>
          <Typography variant="h6" textAlign="right">
            What are the most common causes of equipment downtime, and how can
            they be minimized?
          </Typography>
          <IconButton color="inherit"></IconButton>
        </Header>
        <ChatBox elevation={3}>
          <Typography variant="h5" gutterBottom>
            Equipment downtime{" "}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Equipment downtime is a critical issue that can significantly impact
            productivity and efficiency in industrial settings. The most common
            causes of downtime include mechanical failures due to wear and tear,
            inadequate maintenance, or manufacturing defects. These can be
            minimized by implementing a preventive maintenance schedule, using
            quality parts, and conducting regular inspections. Electrical
            failures, such as power surges and faulty wiring, are another common
            cause and can be mitigated by ensuring proper electrical grounding,
            performing regular checks, and using surge protectors. Operator
            errors, often resulting from a lack of training or miscommunication,
            can be reduced by providing comprehensive training, establishing
            clear operating procedures, and conducting regular refresher
            courses. Software issues, including bugs and outdated systems, can
            be minimized by keeping software updated, thoroughly testing new
            software before implementation, and maintaining a robust IT support
            team. Additionally, supply chain delays, which cause late delivery
            of parts or materials needed for maintenance, can be managed by
            building relationships with reliable suppliers, maintaining an
            inventory of critical spare parts, and establishing backup
            suppliers.
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Box>
              <IconButton color="inherit">
                <ThumbUpIcon />
              </IconButton>
              <IconButton color="inherit">
                <ThumbDownIcon />
              </IconButton>
            </Box>
            <IconButton color="inherit">
              <RefreshIcon />
            </IconButton>
          </Box>
        </ChatBox>{" "}
        <Header>
          <Typography variant="h6" textAlign="right">
            How can equipment performance be optimized to increase efficiency?{" "}
          </Typography>
          <IconButton color="inherit"></IconButton>
        </Header>
        <ChatBox elevation={3}>
          <Typography variant="h5" gutterBottom>
            equipment performance{" "}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Optimizing equipment performance to increase efficiency involves
            several strategic approaches that focus on improving productivity,
            reducing downtime, and enhancing overall operational effectiveness.
            One key strategy is implementing a preventive maintenance schedule,
            which ensures that equipment is regularly inspected, serviced, and
            repaired before issues arise, thus minimizing unexpected breakdowns
            and extending the lifespan of machinery. Additionally, integrating
            advanced technologies such as the Internet of Things (IoT) and
            predictive analytics can provide real-time monitoring and data
            analysis, enabling operators to identify performance patterns and
            potential problems early. Training personnel to operate equipment
            effectively and safely is also crucial, as skilled operators can
            maximize equipment output while minimizing errors and wear.
            Furthermore, optimizing equipment settings and configurations to
            match specific production requirements can significantly enhance
            efficiency. Regularly reviewing and upgrading equipment to the
            latest standards and technologies can also contribute to better
            performance and energy efficiency. Overall, a combination of
            proactive maintenance, technological integration, skilled operation,
            and strategic upgrades can significantly optimize equipment
            performance and increase efficiency.
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Box>
              <IconButton color="inherit">
                <ThumbUpIcon />
              </IconButton>
              <IconButton color="inherit">
                <ThumbDownIcon />
              </IconButton>
            </Box>
            <IconButton color="inherit">
              <RefreshIcon />
            </IconButton>
          </Box>
        </ChatBox>
        <Footer>
          <TextField
            variant="outlined"
            placeholder="Type your message..."
            fullWidth
            InputProps={{
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#1F2A40",
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              marginLeft: "10px",
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#1F2A40",
            }}
          >
            Send
          </Button>
        </Footer>
      </Content>
    </Container>
  );
};

export default ChatGPTInterface;
