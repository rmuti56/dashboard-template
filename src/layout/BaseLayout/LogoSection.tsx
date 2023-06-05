import { homePagePath } from "@/pages/home";
import { RootState } from "@/store";
import { MenuState, menuOpen } from "@/store/slices/menu-slice";
import { Avatar, ButtonBase, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LogoSection = () => {
  const { defaultId } = useSelector<RootState, MenuState>(
    (state) => state.menu
  );
  const dispatch = useDispatch();

  return (
    <ButtonBase
      disableRipple
      onClick={() => dispatch(menuOpen(defaultId))}
      component={Link}
      to={homePagePath}
    >
      <Avatar src="/vite.svg" />
      <Typography variant="h6" sx={{ ml: 1 }}>
        TGC
      </Typography>
    </ButtonBase>
  );
};

export default LogoSection;
