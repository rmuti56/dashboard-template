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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Unreachable code error
        message: "ดำเนินการสำเร็จ",
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Unreachable code error
        message: "ดำเนินการไม่สำเร็จกรุณาลองใหม่อีกครั้ง",
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
