import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SellIcon from "@mui/icons-material/Sell";

import LogoutIcon from "@mui/icons-material/Logout";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Sidebar = () => {
  const navigate = useNavigate();

  const logOut = () => {
    cookies.remove("ut", { path: "/" });
    // window.location.assign("/");
    navigate("/");
  };

  // display: { xs: "flex", md: "none" }

  return (
    <Box>
      <Box sx={{ height: { md: "100vh" }, width: { sm: "100%", md: "200px" } }}>
        <Box sx={{ height: "100%", width: "100%" }}>
          <nav
            aria-label="main mailbox folders"
            height="100%"
            width="100%"
            sx={{ width: "100%" }}
          >
            <List
              sx={{
                color: "#000",
                border: "1px solid #ccc",
                borderBottom: 0,
                height: "100%",
                width: "100%",
                padding: 0,
              }}
            >
              <Link to="/user">
                <ListItem
                  disablePadding
                  sx={{ color: "#000", height: "100px" }}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="User" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to="/expense">
                <ListItem
                  disablePadding
                  sx={{ color: "#000", height: "100px" }}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Expense" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to="/tag">
                <ListItem
                  disablePadding
                  sx={{ color: "#000", height: "100px" }}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <SellIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tag" />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link to="/chart">
                <ListItem
                  disablePadding
                  sx={{ color: "#000", height: "100px" }}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <SignalCellularAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Chart" />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link to="/">
                <ListItem
                  disablePadding
                  sx={{ color: "#000", height: "100px" }}
                  onClick={logOut}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Exit" />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </nav>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
