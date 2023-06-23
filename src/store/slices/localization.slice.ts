import { Locale } from "@/enums/locale.enum";
import { StorageKey } from "@/enums/storage-key.enum";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type LocalizationState = {
  locale: Locale;
};

const initialState: LocalizationState = {
  locale: localStorage.getItem(StorageKey.LOCALE) as Locale || Locale.EN, // Default locale
};

const localizationSlice = createSlice({
  name: "localization",
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = localizationSlice.actions;

export default localizationSlice.reducer;
