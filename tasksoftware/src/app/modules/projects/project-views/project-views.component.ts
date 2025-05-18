import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../service/project.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-project-views',
  standalone: false,
  templateUrl: './project-views.component.html',
  styleUrl: './project-views.component.scss',
  providers: [
    DatePipe,
  ],
})
export class ProjectViewsComponent implements OnInit {
  projects: any[] = [];
  isDelete = false;
  isUpdate = false;
  dateFormat = 'dd-MM-yyyy';
  editedProject: any = {};
  selectedProject: any;


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
  projectID: any;

  constructor(
    private projectService: ProjectService,
    private notification: NzNotificationService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectID = params['id'];
    });
    this.getProejct();
  }

  public isLibraryHidden: boolean = false;

  public toggleLibrary() {
    this.isLibraryHidden = !this.isLibraryHidden;
  }

  showDelete(data: any): void {
    this.projectID = data.projectID;
    this.isDelete = true;
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

  showUpdate(selectedProject: any): void {
    this.selectedProject = selectedProject;
    this.editedProject = { ...selectedProject };
    this.isUpdate = true;
  }

  OkUpdate() {
    if (this.selectedProject) {
      const projectID = this.selectedProject.projectID;
      this.editedProject.createdDate = this.datePipe.transform(this.editedProject.createdDate, 'yyyy-MM-dd');
      this.editedProject.endDate = this.datePipe.transform(this.editedProject.endDate, 'yyyy-MM-dd');
      this.projectService.updateProject(projectID, this.editedProject).subscribe(
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

  getProejct(): void {
    this.projectService.getProejct().subscribe(
      (response) => {
        this.projects = response;
      },
      (error) => {
        console.error('Thông tin dữ liệu dự án lỗi:', error);
      }
    );
  }
}
