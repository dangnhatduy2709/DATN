import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../service/team.service';
import { UserService } from '../../../service/user.service';
import { ProjectService } from '../../../service/project.service';
import { formatDate, DatePipe } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
@Component({
  selector: 'app-project-add',
  standalone: false,
  templateUrl: './project-add.component.html',
  styleUrl: './project-add.component.scss',
  providers: [DatePipe],
})
export class ProjectAddComponent implements OnInit {
  projects: any[] = [];
  teams: any[] = [];
  users: any[] = [];
  dateFormat = 'dd-MM-yyyy';
  project = {
    projectName: '',
    projectKey: '',
    progress: 10,
    createdDate: '',
    endDate: '',
    projectDescription: '',
    clientContactName: '',
    clientContactEmail: '',
    clientContactPhone: '',
    teamID: '',
    userID: '',
  };

  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private projectService: ProjectService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchTeams();
    this.fetchUser();
  }

  fetchTeams() {
    this.teamService.getTeams().subscribe(
      (response) => {
        this.teams = response;
      },
      (error) => {
        console.error('Thông tin dữ liệu team bị lỗi:', error);
      }
    );
  }

  fetchUser() {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Thông tin dữ liệu người dùng bị lỗi:', error);
      }
    );
  }

  addProject() {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!this.project.clientContactEmail || !emailRegex.test(this.project.clientContactEmail)) {
      this.notification.error('Lỗi', 'Email không hợp lệ.');
      return;
    }

    if (!this.project.clientContactPhone || !phoneRegex.test(this.project.clientContactPhone)) {
      this.notification.error('Lỗi', 'Số điện thoại phải gồm 10 chữ số.');
      return;
    }
    this.project.createdDate = this.project.createdDate
      ? formatDate(this.project.createdDate, 'yyyy-MM-dd HH:mm:ss', 'en-US')
      : formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US');
    this.project.endDate = this.project.endDate
      ? formatDate(this.project.endDate, 'yyyy-MM-dd HH:mm:ss', 'en-US')
      : formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US');

    this.projectService.addProject(this.project).subscribe(
      (response) => {
        this.notification.success(
          'Thêm dự án thành công',
          'Danh sách dự án đã được cập nhật.'
        );
        this.router.navigate(['/project/dashboard']);
      },
      (error) => {
        this.notification.error(
          'Thêm dự án không thành công',
          'Vui lòng kiểm tra lại thông tin dự án.'
        );
      }
    );
  }
}
