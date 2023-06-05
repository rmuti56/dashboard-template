import { styled } from "@mui/material";
import MUIDataTable, { MUIDataTableProps } from "mui-datatables";

const StyledMUIDataTable = styled(MUIDataTable)(({ theme }) => {
  return {
    "&.MuiPaper-root": {
      boxShadow: "unset",
    },
    "& .MuiToolbar-root, & .tss-1cdcmys-MUIDataTable-responsiveBase": {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  };
});

const MUIDataTableExtended = (props: MUIDataTableProps) => {
  return <StyledMUIDataTable {...props} />;
};

export default MUIDataTableExtended;
