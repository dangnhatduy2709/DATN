import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../service/task.service';
import { ProjectService } from '../../../service/project.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-project-statistical',
  standalone: true,
  imports: [],
  templateUrl: './project-statistical.component.html',
  styleUrl: './project-statistical.component.scss'
})
export class ProjectStatisticalComponent implements OnInit {
  tasks: any[] = [];
  projects: any;
  users: any;
  todo: any;
  inprogress: any;
  done: any;
  test: any;
  constructor(
    private taskService: TaskService,
    private projectService : ProjectService,
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.getTasks();
    this.getProejct();
    this.fetchUser();
  }

  fetchUser() {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response.length;
      },
      (error) => {
        console.error('Thông tin dữ liệu người dùng bị lỗi:', error);
      }
    );
  }

  getTasks(): void {
    this.taskService.getAllTask().subscribe(
      (data) => {
        this.tasks = data;
        this.calculateTasks();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getProejct(): void {
    this.projectService.getProejct().subscribe(
      (response) => {
        this.projects = response.length;
      },
      (error) => {
        console.error('Thông tin dữ liệu dự án lỗi:', error);
      }
    );
  }

  calculateTasks(): void {
    this.todo = this.tasks.filter((task: any) => task.status === 'To Do').length;
    this.done = this.tasks.filter((task: any) => task.status === 'Done').length;
    this.inprogress = this.tasks.filter((task: any) => task.status === 'In Progress').length;
    this.test = this.tasks.filter((task: any) => task.status === 'Test').length;
  }
}
