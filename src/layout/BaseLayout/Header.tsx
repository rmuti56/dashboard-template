import { Menu } from "@mui/icons-material";
import { Avatar, Box, ButtonBase } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LogoSection from "./LogoSection";
import ProfileSection from "./ProfileSection";

type HeaderProps = {
  handleLeftDrawerToggle?: () => void;
};

const Header = ({ handleLeftDrawerToggle }: HeaderProps): JSX.Element => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: theme.palette.primary.light,
              color: theme.palette.primary.dark,
              "&:hover": {
                background: theme.palette.primary.dark,
                color: theme.palette.primary.light,
              },
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <Menu />
          </Avatar>
        </ButtonBase>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />
      <ProfileSection />
    </>
  );
};

export default Header;
