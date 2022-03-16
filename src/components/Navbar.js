import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";


const pages = ["Dashboard", "Messenger"];
const settings = ["Profile", "Logout"];
const menuItems = [
  { label: "Home", path: "/home" },
  { label: "Accounts", path: "/accounts" },
  { label: "Organizations", path: "/organizations" },
];

const ResponsiveAppBar = ({setLoggedIn}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout =(e) =>{
    localStorage.removeItem("token");
    // setToken("");
    // setUserData({
    //   email:"",
    //   id:0,
    //   Blogs:[]
    // })
    setLoggedIn(false);
    window.location.href = '/login'
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key="Dashboard" onClick={() => window.location.href = "/dashboard"}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              <MenuItem key="Messenger" onClick={() => window.location.href = "/messenger"}>
                <Typography textAlign="center">Messenger</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box className="Navbar" sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Button
                key="About"
                onClick={() => window.location.href = "/about"}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                About
              </Button>
            <Button
                key="Dashboard"
                onClick={() => window.location.href = "/dashboard"}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Dashboard
              </Button>
              <Button
                key="Messenger"
                onClick={() => window.location.href = "/messenger"}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Messenger
              </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Button onClick={handleOpenUserMenu}
                key="Profile"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Profile
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
              {/* {menuItems.map((item) => {
                <MenuItem key="hello" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Hello</Typography>
                </MenuItem>
              })} */}
              <MenuItem key="hello" onClick={() => window.location.href = "/profile"}>
                  <Typography textAlign="center">View</Typography>
                </MenuItem>
                <MenuItem key="Logout" onClick={logout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
