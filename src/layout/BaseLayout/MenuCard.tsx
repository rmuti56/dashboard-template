import {
  Avatar,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 30,
  [`&.MuiLinearProgress-colorPrimary`]: {
    backgroundColor: theme.palette.common.white,
  },
  [`& .MuiLinearProgress-bar`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
  },
}));

const CardStyle = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.light,
  marginBottom: "22px",
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: "157px",
    height: "157px",
    background: theme.palette.primary.light,
    borderRadius: "50%",
    top: "-105px",
    right: "-96px",
  },
}));

interface LinearProgressWithLabelProps {
  value: number;
}

const LinearProgressWithLabel = ({ value }: LinearProgressWithLabelProps) => {
  const theme = useTheme();

  return (
    <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
      <Grid item>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h6" sx={{ color: theme.palette.primary.dark }}>
              Progress
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="inherit">{`${Math.round(
              value
            )}%`}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <BorderLinearProgress variant="determinate" value={value} />
      </Grid>
    </Grid>
  );
};

// ==============================|| SIDEBAR MENU Card ||============================== //

const MenuCard = () => {
  const theme = useTheme();

  return (
    <CardStyle>
      <CardContent sx={{ p: 2 }}>
        <List sx={{ p: 0, m: 0 }}>
          <ListItem alignItems="flex-start" disableGutters sx={{ p: 0 }}>
            <ListItemAvatar sx={{ mt: 0 }}>
              <Avatar
                variant="rounded"
                sx={{
                  //   ...theme.typography.commonAvatar,
                  //   ...theme.typography.largeAvatar,
                  color: theme.palette.primary.main,
                  border: "none",
                  borderColor: theme.palette.primary.main,
                  background: "#fff",
                  marginRight: "12px",
                }}
              >
                <TableChartOutlinedIcon fontSize="inherit" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ mt: 0 }}
              primary={
                <Typography
                  variant="subtitle1"
                  sx={{ color: theme.palette.primary.dark }}
                >
                  Get Extra Space
                </Typography>
              }
              secondary={<Typography variant="caption"> 28/23 GB</Typography>}
            />
          </ListItem>
        </List>
        <LinearProgressWithLabel value={80} />
      </CardContent>
    </CardStyle>
  );
};

export default MenuCard;
