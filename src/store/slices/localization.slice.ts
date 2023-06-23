import { Locale } from "@/enums/locale.enum";
import { StorageKey } from "@/enums/storage-key.enum";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Messages = undefined | Record<string, string>;

export type LocalizationState = {
  locale: Locale;
  messages: Messages;
};

const initialState: LocalizationState = {
  locale: localStorage.getItem(StorageKey.LOCALE) as Locale || Locale.EN, // Default locale
  messages: undefined,
};

const localizationSlice = createSlice({
  name: "localization",
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
    setMessages: (state, action: PayloadAction<Messages>) => {
      state.messages = action.payload;
    },
  },
});

export const { setLocale, setMessages } = localizationSlice.actions;

export default localizationSlice.reducer;
