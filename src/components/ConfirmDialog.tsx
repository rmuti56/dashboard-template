import store, { RootState } from "@/store";
import {
  ConfirmationState,
  closeConfirmationDelay,
} from "@/store/slices/confirmation.slice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useSelector } from "react-redux";

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

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    store.dispatch(closeConfirmationDelay());
  };

  const handleClose = () => {
    store.dispatch(closeConfirmationDelay());
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
