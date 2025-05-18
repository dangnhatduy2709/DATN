import { Component, OnInit } from '@angular/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { UserService } from '../../../service/user.service';
import { ProjectService } from '../../../service/project.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.scss'
})
export class ProjectDashboardComponent implements OnInit {

  userData: any;
  projects: any[] = [];
  constructor(
    private i18n: NzI18nService,
    private userService: UserService,
    private projectService: ProjectService,

  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getProejct();
  }

  getUserInfo(): void {
    const userID = localStorage.getItem('userID');
    this.userService.getUserInfo(userID).subscribe(
      (data) => {
        this.userData = data.userLogin;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  getProejct(): void {
    this.projectService.getProejct().subscribe(
      (response: any[]) => {
        this.projects = response;
      },
      (error) => {
        console.error('Thông tin dữ liệu dự án lỗi:', error);
      }
    );
  }

}
