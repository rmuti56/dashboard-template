/* eslint-disable react-refresh/only-export-components */
import { ReactNode } from "react";
import { IntlProvider, ReactIntlErrorCode } from "react-intl";
import { Locale } from "@/enums/locale.enum";
import { createIntl, createIntlCache } from "react-intl";
import store, { RootState } from "@/store";
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

export const localeNames: Record<Locale, string> = {
  [Locale.EN]: "English",
  [Locale.TH]: "ภาษาไทย",
};

export const defaultLocale = Locale.EN;

type LocaleProviderProps = {
  children: ReactNode;
};

const LocaleProvider = ({ children }: LocaleProviderProps) => {
  return (
    <IntlProvider
      defaultLocale={defaultLocale}
      locale={intl.locale}
      messages={intl.messages}
      onError={(err) => {
        if (!(err.code === ReactIntlErrorCode.MISSING_TRANSLATION)) {
          console.error(err);
        }
      }}
      key={intl.locale}
    >
      {children}
    </IntlProvider>
  );
};

export default LocaleProvider;
