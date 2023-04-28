import {
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  min,
  minLength,
} from "class-validator";

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  userName: string;

  // @min(6)
  // @Max(6)
  @IsString()
  @MinLength(6, {
    message: "rahsvebi shecema 6 minimum",
  })
  @MaxLength(30)
  password: string;
}
