import { VALIDATION_MESSAGES } from "@/constants/validation-message.constant";
import { IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsNotEmpty({
    message: VALIDATION_MESSAGES.REQUIRED,
  })
  username: string;

  @IsNotEmpty({
    message: VALIDATION_MESSAGES.REQUIRED,
  })
  password: string;
}
