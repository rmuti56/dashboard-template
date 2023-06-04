import { homePagePath } from "@/pages/home";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MenuState {
  isOpen: string[];
  defaultId: string;
  opened: boolean;
}

const initialState: MenuState = {
  isOpen: [],
  defaultId: homePagePath,
  opened: true,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    menuOpen: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.isOpen = [id];
    },
    setMenu: (state, action: PayloadAction<boolean>) => {
      state.opened = action.payload;
    },
  },
});

export const { menuOpen, setMenu } = menuSlice.actions;
export default menuSlice.reducer;
