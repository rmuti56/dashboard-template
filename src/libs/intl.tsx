/* eslint-disable react-refresh/only-export-components */

import { ReactNode, useEffect } from "react";
import { IntlProvider, ReactIntlErrorCode } from "react-intl";
import { StorageKey } from "@/enums/storage-key.enum";
import { Locale } from "@/enums/locale.enum";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "@/store/slices/localization.slice";
import useLocalStorage from "@/hooks/useLocalStorage";

export const localeNames: Record<Locale, string> = {
  [Locale.EN]: "English",
  [Locale.TH]: "ภาษาไทย",
};

export const getMatchingLocale = (): Locale => {
  const localeEntries = Object.entries(Locale);
  const localLocale = localStorage.getItem(StorageKey.LOCALE);

  for (const localeEntry of localeEntries) {
    if (localeEntry[1].toLowerCase() === localLocale?.toLowerCase()) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return Locale[localeEntry[0]];
    }
  }

  return defaultLocale;
};

export const supportedLocaleChoices = [
  { label: "TH", value: Locale.TH },
  { label: "EN", value: Locale.EN },
];

export const defaultLocale = Locale.EN;

type LocaleProviderProps = {
  children: ReactNode;
};

const LocaleProvider = ({ children }: LocaleProviderProps) => {
  const [locale] = useLocalStorage(StorageKey.LOCALE, getMatchingLocale());
  const messages = useSelector(
    (state: RootState) => state.localization.messages
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function changeLocale() {
      const mod = await import(`@/locales/${locale}.json`);
      dispatch(setMessages(mod.default));
    }

    changeLocale();
  }, [locale, dispatch]);

  return (
    <IntlProvider
      defaultLocale={defaultLocale}
      locale={locale}
      messages={messages}
      onError={(err) => {
        if (!(err.code === ReactIntlErrorCode.MISSING_TRANSLATION)) {
          console.error(err);
        }
      }}
      key={locale}
    >
      {children}
    </IntlProvider>
  );
};

export default LocaleProvider;
