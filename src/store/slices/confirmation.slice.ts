/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ButtonProps } from "@mui/material";
import { ReactNode } from "react";
import { firstIfDefined } from "@/utils/assign.util";

export type ConfirmationState = {
  isOpen: boolean;
  message: ReactNode;
  onConfirm?: () => void;
  cancelButtonProps?: ButtonProps;
  confirmButtonProps?: ButtonProps;
  title?: string;
  cancelText?: string;
  confirmText?: string;
};

export type OpenConfirmPayload = Partial<ConfirmationState>;

const initialState: ConfirmationState = {
  isOpen: false,
  message: "Confirm the operation",
  onConfirm: undefined,
  cancelText: "Cancel",
  confirmText: "Confirm",
  cancelButtonProps: {},
  confirmButtonProps: {},
  title: "Confirm",
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
      state.cancelButtonProps = firstIfDefined<any>(
        cancelButtonProps,
        initialState.cancelButtonProps
      );
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
