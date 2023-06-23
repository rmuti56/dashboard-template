import { createIntl, createIntlCache } from "react-intl";
import store, { RootState } from "@/store";
import { Locale } from "@/enums/locale.enum";
import enMessages from "@/locales/en.json";
import thMessages from "@/locales/th.json";

const messages = {
  [Locale.EN]: enMessages,
  [Locale.TH]: thMessages,
};

const cache = createIntlCache();
const state: RootState = store.getState();

export const intl = createIntl(
  {
    locale: state.localization.locale,
    messages: messages[state.localization.locale],
  },
  cache
);
