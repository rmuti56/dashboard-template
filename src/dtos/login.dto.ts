import { ValidationMessage } from "@/enums/validation-message.enum";
import { IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsNotEmpty({
    message: ValidationMessage.REQUIRED,
  })
  username: string;

  @IsNotEmpty({
    message: ValidationMessage.REQUIRED,
  })
  password: string;
}
