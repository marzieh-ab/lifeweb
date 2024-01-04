import { useNavigate } from "react-router-dom";
import background from "../assets/images/background.jpg";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

export default function Home() {
  const submit = () => {
    console.log("ok");
    navigate("/login");
  };

  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${background}) `,
        backgroundSize: "cover",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MonetizationOnIcon sx={{ width: "40px", height: "40px" }} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Finance Dashboard
            </Typography>
            <Button color="inherit" onClick={submit}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}
