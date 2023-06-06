import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ButtonProps } from "@mui/material";
import { ReactNode } from "react";
import { firstIfDefined } from "@/utils/assign.util";

export interface ConfirmationState {
  isOpen: boolean;
  message: ReactNode;
  onConfirm?: () => void;
  cancelButtonProps?: ButtonProps;
  confirmButtonProps?: ButtonProps;
  title?: string;
  cancelText?: string;
  confirmText?: string;
}

export type OpenConfirmPayload = Partial<ConfirmationState>;

const initialState: ConfirmationState = {
  isOpen: false,
  message: "ยืนยันการดำเนินการ",
  onConfirm: undefined,
  cancelText: "ยกเลิก",
  confirmText: "ยืนยัน",
  cancelButtonProps: {},
  confirmButtonProps: {},
  title: "ยืนยัน",
};

const confirmationSlice = createSlice({
  name: "confirmation",
  initialState,
  reducers: {
    openConfirmation: (state, action: PayloadAction<OpenConfirmPayload>) => {
      const {
        message,
        onConfirm,
        cancelText,
        confirmText,
        cancelButtonProps,
        confirmButtonProps,
        title,
      } = action.payload;
      state.isOpen = true;
      state.message = message;
      state.onConfirm = onConfirm;

      // optional values
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.cancelButtonProps = firstIfDefined<any>(
        cancelButtonProps,
        initialState.cancelButtonProps
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.confirmButtonProps = firstIfDefined<any>(
        confirmButtonProps,
        initialState.confirmButtonProps
      );
      state.cancelText = firstIfDefined(cancelText, initialState.cancelText);
      state.confirmText = firstIfDefined(confirmText, initialState.confirmText);
      state.title = firstIfDefined(title, initialState.title);
    },
    closeConfirmation: (state) => {
      state.isOpen = false;
      setTimeout(() => {
        Object.assign(state, initialState);
      }, 300);
    },
  },
});

export const { openConfirmation, closeConfirmation } =
  confirmationSlice.actions;

export default confirmationSlice.reducer;