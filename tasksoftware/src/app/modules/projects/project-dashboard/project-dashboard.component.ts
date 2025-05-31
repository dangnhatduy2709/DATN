import { Component, OnInit } from '@angular/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { UserService } from '../../../service/user.service';
import { ProjectService } from '../../../service/project.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.scss',
  providers: [DatePipe],
})
export class ProjectDashboardComponent implements OnInit {
  userData: any;
  projects: any[] = [];
  isDelete = false;
  isUpdate = false;
  editedProject: any = {};
  selectedProject: any;
  projectID: any;
  dateFormat = 'dd-MM-yyyy';
  constructor(
    private i18n: NzI18nService,
    private userService: UserService,
    private projectService: ProjectService,
    private notification: NzNotificationService,
    private datePipe: DatePipe
  ) {}

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
  showDelete(data: any): void {
    this.projectID = data.projectMainID;
    this.isDelete = true;
  }

  showUpdate(selectedProject: any): void {
    this.selectedProject = selectedProject;
    this.editedProject = { ...selectedProject };
    this.isUpdate = true;
  }

  OkDelete() {
    this.projectService.DeleteProject(this.projectID).subscribe(
      (data: any) => {
        this.notification.success(
          'Xóa dự án thành công',
          'Danh sách dự án đã được cập nhật.'
        );
        this.getProejct();
        this.isDelete = false;
      },
      (error) => {
        console.error(error);
        this.notification.success(
          'Xóa dự án thành công',
          'Danh sách dự án đã được cập nhật.'
        );
      }
    );
  }

  OkUpdate() {
    if (this.selectedProject) {
      const projectID = this.selectedProject.projectID;
      this.editedProject.createdDate = this.datePipe.transform(
        this.editedProject.createdDate,
        'yyyy-MM-dd'
      );
      this.editedProject.endDate = this.datePipe.transform(
        this.editedProject.endDate,
        'yyyy-MM-dd'
      );
      this.projectService
        .updateProject(projectID, this.editedProject)
        .subscribe(
          (data: any) => {
            this.notification.success(
              'Sửa hợp đồng thành công',
              'Danh sách hợp đồng đã được cập nhật.'
            );
            this.isUpdate = false;
            this.getProejct();
          },
          (error) => {
            this.notification.success(
              'Sửa hợp đồng không thành công',
              'Vui lòng kiểm tra lại thông tin hợp đồng'
            );
            console.error(error);
          }
        );
    }
  }
}
