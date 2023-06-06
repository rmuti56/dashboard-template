import { configureStore } from "@reduxjs/toolkit";
import menuReducer, { MenuState } from "./slices/menu.slice";
import confirmationReducer, {
  ConfirmationState,
} from "./slices/confirmation.slice";

export type RootState = {
  menu: MenuState;
  confirmation: ConfirmationState;
};

// Configure Redux store
const store = configureStore({
  reducer: {
    menu: menuReducer,
    confirmation: confirmationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export default store;
