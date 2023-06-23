import { validationMessages } from "@/intl/validation-message.intl";
import { intl } from "@/libs/intl";

export const VALIDATION_MESSAGES = Object.freeze({
  REQUIRED: intl.$t(validationMessages.required),
});
