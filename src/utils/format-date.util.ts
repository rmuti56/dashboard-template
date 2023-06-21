import { format } from "date-fns";

export const formatDate = (
  date = new Date(),
  formatString = "dd/MM/yyyy"
): string => {
  return format(date, formatString);
};

export const formatDateTime = (
  date = new Date(),
  formatString = "dd/MM/yyyy HH:mm"
): string => {
  return format(date, formatString);
};
