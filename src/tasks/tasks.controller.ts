import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./task.mode";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskDto } from "./dto/get-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTask(@Query() query: GetTaskDto) {
    console.log(query, "query");
    return this.taskService.getTasks(query);
  }

  @Post()
  createTask(@Body() body: CreateTaskDto) {
    console.log(body, "bbbb");
    return this.taskService.createTask(body);
  }
  @Get("/:id")
  getById(@Param("id") id: string) {
    console.log(id, "iddd");
    return this.taskService.getTaskById(Number(id));
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string) {
    return this.taskService.deleteTask(Number(id));
  }

  @Patch("/:id")
  updateTask(@Param("id") id: string, @Body("status") status: TaskStatus) {
    return this.taskService.updateTask(Number(id), status);
  }
}
