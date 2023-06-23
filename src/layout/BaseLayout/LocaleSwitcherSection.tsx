import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { RootState } from "@/store";
import {
  LocalizationState,
} from "@/store/slices/localization.slice";
import { Locale } from "@/enums/locale.enum";
import { localeNames } from "@/libs/intl";
import {  useNavigate } from "react-router-dom";
import { StorageKey } from "@/enums/storage-key.enum";

const LocaleSwitcherSection: React.FC = () => {
  const { locale } = useSelector<RootState, LocalizationState>(
    (state) => state.localization
  );
  const navigate = useNavigate()

  const handleLocaleChange = (event: SelectChangeEvent<{ value: Locale }>) => {
    const selectedLocale = event.target.value as Locale;
    localStorage.setItem(StorageKey.LOCALE, selectedLocale);
    navigate(0)
  };

  return (
    <div>
      <FormControl>
        <Select value={locale as any} onChange={handleLocaleChange} size="small">
          <MenuItem value={Locale.EN}>{localeNames[Locale.EN]}</MenuItem>
          <MenuItem value={Locale.TH}>{localeNames[Locale.TH]}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default LocaleSwitcherSection;
