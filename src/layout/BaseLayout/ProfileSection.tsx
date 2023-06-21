import Transitions from "@/components/Transitions";
import {
  AccountCircle,
  Logout,
  Settings,
  VerifiedUser,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  Chip,
  ClickAwayListener,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const handleLogout = async () => {
    console.log("Logout");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleListItemClick = (event: any, index: number, route = "") => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== "") {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: 48,
          alignItems: "center",
          borderRadius: 24,
          transition: "all .2s ease-in-out",
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            "& svg": {
              stroke: theme.palette.primary.light,
            },
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            sx={{
              ...theme.typography.mediumAvatar,
              margin: "8px 0 8px 8px !important",
              cursor: "pointer",
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </Avatar>
        }
        label={<Settings color="primary" />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Card elevation={16} component="div">
                  <Box sx={{ p: 2 }}>
                    <List
                      component="nav"
                      sx={{
                        width: "100%",
                        maxWidth: 350,
                        minWidth: 300,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: "10px",
                        [theme.breakpoints.down("md")]: {
                          minWidth: "100%",
                        },
                        "& .MuiListItemButton-root": {
                          mt: 0.5,
                        },
                      }}
                    >
                      <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0, "#")}
                      >
                        <ListItemIcon>
                          <Settings />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">
                              ตั้งค่าบัญชี
                            </Typography>
                          }
                        />
                      </ListItemButton>
                      <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1, "#")}
                      >
                        <ListItemIcon>
                          <VerifiedUser />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Grid
                              container
                              spacing={1}
                              justifyContent="space-between"
                            >
                              <Grid item>
                                <Typography variant="body2">ทั่วไป</Typography>
                              </Grid>
                              <Grid item>
                                <Chip
                                  label="02"
                                  size="small"
                                  sx={{
                                    bgcolor: theme.palette.warning.dark,
                                    color: theme.palette.background.default,
                                  }}
                                />
                              </Grid>
                            </Grid>
                          }
                        />
                      </ListItemButton>
                      <ListItemButton
                        selected={selectedIndex === 4}
                        onClick={handleLogout}
                      >
                        <ListItemIcon>
                          <Logout />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">ออกจากระบบ</Typography>
                          }
                        />
                      </ListItemButton>
                    </List>
                  </Box>
                </Card>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
