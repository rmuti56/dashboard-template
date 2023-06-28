import "reflect-metadata";
import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { VALIDATION_MESSAGES } from "@/constants/validation-message.constant";
import { Match } from "@/decorators/match.decorator";

export class ProductDto {
  id?: string;

  @IsNotEmpty({
    message: VALIDATION_MESSAGES.REQUIRED,
  })
  name: string;

  @IsNotEmpty({
    message: VALIDATION_MESSAGES.REQUIRED,
  })
  @MaxLength(250)
  description: string;

  @IsNotEmpty({
    message: VALIDATION_MESSAGES.REQUIRED,
  })
  price: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOptionDto)
  options?: ProductOptionDto[];
}

export class ProductOptionDto {
  @IsNotEmpty({
    message: VALIDATION_MESSAGES.REQUIRED,
  })
  @MinLength(3)
  label: string;

  @IsNotEmpty({
    message: VALIDATION_MESSAGES.REQUIRED,
  })
  value: string;

  @Match("value", {
    message: "Must match with value",
  })
  @IsNotEmpty({
    message: VALIDATION_MESSAGES.REQUIRED,
  })
  confirmValue: string;
}
