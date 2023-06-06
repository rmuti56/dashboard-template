import { RootState } from "@/store";
import {
  ConfirmationState,
  closeConfirmation,
} from "@/store/slices/confirmation.slice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const ConfirmationDialog = () => {
  const {
    isOpen,
    message,
    onConfirm,
    cancelButtonProps,
    confirmButtonProps,
    cancelText,
    confirmText,
    title,
  } = useSelector<RootState, ConfirmationState>((state) => state.confirmation);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    dispatch(closeConfirmation());
  };

  const handleClose = () => {
    dispatch(closeConfirmation());
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="xs"
      PaperProps={{
        sx: {
          minWidth: 350,
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        {cancelText && (
          <Button
            color="primary"
            autoFocus
            onClick={handleClose}
            {...cancelButtonProps}
          >
            {cancelText}
          </Button>
        )}
        <Button
          color="primary"
          variant="contained"
          onClick={handleConfirm}
          {...confirmButtonProps}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
