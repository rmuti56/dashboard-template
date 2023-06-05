import { configureStore } from "@reduxjs/toolkit";
import menuReducer, { MenuState } from "./slices/menu.slice";

export type RootState = {
  menu: MenuState;
};

// Configure Redux store
const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
  devTools: true,
});

export default store;
