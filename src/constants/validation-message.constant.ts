import { validationMessages } from "@/intl/validation-message.intl";
import { intl } from "@/utils/intl.util";

export const VALIDATION_MESSAGES = Object.freeze({
  REQUIRED: intl.$t(validationMessages.required),
});
