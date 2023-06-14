import { ValidationMessage } from "@/enums/validation-message.enum";
import { IsNotEmpty } from "class-validator";

export class ProductDto {
  id?: string;

  @IsNotEmpty({
    message: ValidationMessage.REQUIRED,
  })
  name: string;

  @IsNotEmpty({
    message: ValidationMessage.REQUIRED,
  })
  description: string;

  @IsNotEmpty({
    message: ValidationMessage.REQUIRED,
  })
  price: number;
}
