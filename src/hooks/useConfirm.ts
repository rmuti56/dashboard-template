import {
  OpenConfirmPayload,
  openConfirmation,
} from "@/store/slices/confirmation.slice";
import { useDispatch } from "react-redux";

const useConfirm = () => {
  const dispatch = useDispatch();

  const confirm = (payload: OpenConfirmPayload) => {
    dispatch(openConfirmation(payload));
  };

  const confirmSuccess = (payload: OpenConfirmPayload) => {
    dispatch(
      openConfirmation({
        confirmButtonProps: {
          color: "success",
        },
        cancelText: "",
        message: "Successfully executed",
        ...payload,
      })
    );
  };

  const confirmError = (payload: OpenConfirmPayload) => {
    dispatch(
      openConfirmation({
        confirmButtonProps: {
          color: "error",
        },
        cancelText: "",
        message: "The operation failed, please try again.",
        ...payload,
      })
    );
  };

  return {
    confirm,
    confirmSuccess,
    confirmError,
  };
};

export default useConfirm;
