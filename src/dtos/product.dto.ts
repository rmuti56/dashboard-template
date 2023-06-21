import { ValidationMessage } from "@/enums/validation-message.enum";
import "reflect-metadata";
import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";

export class ProductDto {
  id?: string;

  @IsNotEmpty({
    message: ValidationMessage.REQUIRED,
  })
  name: string;

  @IsNotEmpty({
    message: ValidationMessage.REQUIRED,
  })
  @MaxLength(250)
  description: string;

  @IsNotEmpty({
    message: ValidationMessage.REQUIRED,
  })
  price: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOptionDto)
  options?: ProductOptionDto[];
}

export class ProductOptionDto {
  @IsNotEmpty({
    message: ValidationMessage.REQUIRED,
  })
  @MinLength(3)
  label: string;

  @IsNotEmpty({
    message: ValidationMessage.REQUIRED,
  })
  value: string;
}
