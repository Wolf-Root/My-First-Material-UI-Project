"use client";

// React
import { ElementType, ReactNode, useCallback, useState } from "react";

// Material Styles
import { styled, Theme, CSSObject, useColorScheme } from "@mui/material/styles";

// Material Components;
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Tooltip,
  Container,
} from "@mui/material";

import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

// Material Icons
import {
  Menu,
  DarkModeOutlined,
  LightModeOutlined,
  Home,
  Create,
  Person,
  Settings,
  Logout,
  Close,
  MenuOpen,
} from "@mui/icons-material";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Drawer Width
const drawerWidth = 240;

// Open Mini Variant Drawer Style
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create(["width", "opacity"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

// Close Mini Variant Drawer Style
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create(["width", "opacity"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Drawer Header Style
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// AppBar Style
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    width: "100%",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Desktop Drawer style
const DesktopDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// Links
const LINKS: { text: string; href: string; icon: ElementType }[] = [
  {
    text: "Home",
    href: "/",
    icon: Home,
  },
  {
    text: "Create",
    href: "/create",
    icon: Create,
  },
  {
    text: "Profile",
    href: "/profile",
    icon: Person,
  },
  {
    text: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Header({ children }: { children: ReactNode }) {
  // Drawer Open/Close State
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Theme Mode
  const { mode, systemMode, setMode } = useColorScheme();
  const pathname = usePathname();

  // toggle Dark Theme
  const toggleDarkTheme = useCallback(() => {
    const baseMode = mode ?? systemMode;
    if (baseMode) {
      const currMode = baseMode === "dark" ? "light" : "dark";
      setMode(currMode);
    }
  }, [mode, systemMode, setMode]);

  return (
    <>
      <CssBaseline />
      {/* Header */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {/* Open/Close Mobile temporary drawer */}
          <Tooltip title={`${mobileOpen ? "Close" : "Open"} Drawer`}>
            <IconButton
              color="inherit"
              aria-label={`${mobileOpen ? "Close" : "Open"} Mobile Drawer`}
              edge="start"
              onClick={() => setMobileOpen((prev) => !prev)}
              sx={{ display: { md: "none" }, mr: 2 }}
            >
              {mobileOpen ? <Close /> : <Menu />}
            </IconButton>
          </Tooltip>

          {/* Open/Close Desktop mini variant drawer   */}
          <Tooltip title={`${open ? "Close" : "Open"} Drawer`}>
            <IconButton
              color="inherit"
              aria-label={`${open ? "Close" : "Open"} Drawer`}
              aria-expanded={open}
              edge="start"
              onClick={() => setOpen(!open)}
              sx={{ display: { xs: "none", md: "inline-flex" }, mr: 2 }}
            >
              {open ? <MenuOpen /> : <Menu />}
            </IconButton>
          </Tooltip>

          {/* Logo */}
          <Typography variant="h6" noWrap component="h1" sx={{ flexGrow: 1 }}>
            My Expenses
          </Typography>

          {/* Avatar & Theme Toggle */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Tooltip
              title="Profile"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <Avatar alt="Youssef">
                <Person sx={{ width: 30, height: 30 }} />
              </Avatar>
            </Tooltip>

            <Tooltip title={`${mode} Theme`}>
              <IconButton
                size="large"
                color="inherit"
                onClick={() => toggleDarkTheme()}
                aria-label={`${mode} Theme`}
                vocab=""
              >
                {mode === "dark" ? (
                  <DarkModeOutlined fontSize="medium" />
                ) : (
                  <LightModeOutlined fontSize="medium" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Temporary Drawer */}
      <MuiDrawer
        component="nav"
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: { xs: "block", md: "none" },
          width: 200,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 200,
            boxSizing: "border-box",
          },
        }}
        slotProps={{ root: { keepMounted: true } }}
      >
        <DrawerHeader />
        <Divider />

        <List disablePadding>
          {LINKS.map(({ text, href, icon: Icon }, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => setMobileOpen(false)}
            >
              <Link href={href}>
                <ListItemButton
                  selected={pathname === href}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    justifyContent: "initial",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                      mr: 3,
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
                justifyContent: "initial",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                  mr: 3,
                }}
              >
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </MuiDrawer>

      {/* Desktop Mini Variant Drawer */}
      <DesktopDrawer
        component="nav"
        variant="permanent"
        open={open}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <DrawerHeader />
        <Divider />

        <List disablePadding>
          {LINKS.map(({ text, href, icon: Icon }, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <Link href={href} onClick={() => setOpen(false)}>
                <ListItemButton
                  selected={pathname === href}
                  sx={[
                    {
                      minHeight: 48,
                      px: 2.5,
                    },
                    open
                      ? {
                          justifyContent: "initial",
                        }
                      : {
                          justifyContent: "center",
                        },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: "center",
                      },
                      open
                        ? {
                            mr: 3,
                          }
                        : {
                            mr: "auto",
                          },
                    ]}
                  >
                    <Icon />
                  </ListItemIcon>

                  <ListItemText
                    primary={text}
                    sx={[
                      open
                        ? {
                            opacity: 1,
                          }
                        : {
                            opacity: 0,
                          },
                    ]}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}

          <ListItem disablePadding>
            <ListItemButton
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                      justifyContent: "initial",
                    }
                  : {
                      justifyContent: "center",
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: "auto",
                      },
                ]}
              >
                <Logout />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </DesktopDrawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container>{children}</Container>
      </Box>
    </>
  );
}
