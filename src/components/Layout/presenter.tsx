import {
  GitHub as GitHubIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Menu as MenuIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiLink from "@mui/material/Link";
import { ComponentProps, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from ".";

const drawerWidth = 190;

type Props = ComponentProps<typeof Layout> & {
  window?: () => Window;
};

export const LayoutPresenter = ({ children, window }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const SidenaviItem = ({
    to,
    label,
    icon,
  }: {
    to: string;
    label: string;
    icon: ReactNode;
  }) => {
    return (
      <List>
        <ListItem component={Link} to={to} disablePadding>
          <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        </ListItem>
      </List>
    );
  };

  const drawer = (
    <Box>
      <Toolbar />
      <Divider />
      <SidenaviItem to="/" label="Home" icon={<HomeIcon />} />
      <Divider />
      <SidenaviItem to="/environment" label="Environment" icon={<InfoIcon />} />
      <Divider />
      <SidenaviItem to="/settings" label="Settings" icon={<SettingsIcon />} />
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        component="nav"
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            waifu2x-gui
          </Typography>

          <Box>
            <MuiLink
              href="https://github.com/treetips/waifu2x-gui"
              target="_blank"
              rel="noopener"
              color="inherit"
            >
              <IconButton size="large">
                <GitHubIcon fontSize="inherit" />
              </IconButton>
            </MuiLink>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};
