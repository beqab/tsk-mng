import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task.mode";

export class GetTaskDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  status: TaskStatus;
}
