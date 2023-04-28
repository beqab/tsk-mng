import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskMode, TaskStatus } from "./task.mode";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetTaskDto } from "./dto/get-task.dto";

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  async getTasks(query: GetTaskDto) {
    const { status, title, description } = query;
    const tasks = this.repo.createQueryBuilder("task");
    console.log(status, "status");

    if (!tasks) {
      throw new NotFoundException("task not found by id");
    }
    if (status) {
      tasks.where("status = :status", { status: status });
    }

    if (title) {
      tasks.andWhere("LOWER(title) LIKE :title", {
        title: `%${title.toLowerCase()}%`,
      });
    }
    if (description) {
      tasks.andWhere("description LIKE :description", {
        description: `%${description.toLowerCase()}%`,
      });
    }

    return await tasks.getMany();
  }

  async getTaskById(id: number) {
    const selectedTask = await this.repo.findOneBy({ id });
    console.log(selectedTask, "selectedTaskselectedTask");
    if (!selectedTask || !id) {
      throw new NotFoundException("task not found by id" + id);
    }
    return selectedTask;
  }

  async createTask({ description, title }: CreateTaskDto) {
    const createdTask = await this.repo.create({
      description,
      title,
      status: TaskStatus.OPEN,
    });

    return this.repo.save(createdTask);
  }

  async deleteTask(id: number) {
    const selectedItem = await this.getTaskById(id);

    return this.repo.remove(selectedItem);
  }

  async updateTask(id: number, status: TaskStatus) {
    const selectedItem = await this.getTaskById(id);
    selectedItem.status = status;
    return this.repo.save(selectedItem);
  }
}
