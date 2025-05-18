import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../service/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TeamService } from '../../../service/team.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProjectService } from '../../../service/project.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-list',
  standalone: false,
  providers: [
    DatePipe,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  checked = false;
  indeterminate = false;

  setOfCheckedId = new Set<number>();
  projectId: any;
  projectData: any;
  teamData: any;
  TaskData: any;
  TaskId: any;
  users: any[] = [];
  isTeamMember = false;
  priorityMap: { [key: number]: string } = {
    1: 'Lowest',
    2: 'Low',
    3: 'Medium',
    4: 'High',
    5: 'Highest'
  };
  dateFormat = 'yyyy-MM-dd';
  teammenber = {
    teamID: '',
    userID: '',
    joinDate: ''
  };

  searchTask: string = '';
  filteredTasks: any[] = [];
  tasks: any[] = [];
  filterApplied: boolean = false;
  isDelete = false;

  constructor(
    private taskServices: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private projectService: ProjectService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });
    this.getTaskProjectData();
    this.fetchProjectTeamData();
  }
  fetchProjectTeamData(): void {
    this.route.params.subscribe((params) => {
      const teamID = +params['id'];
      this.projectService.getProjectTeamID(teamID).subscribe(
        (data) => {
          this.teamData = data.projectTeam;
        },
        (error) => {
          console.error('Error fetching project team data:', error);
        }
      );
    });
  }
  getTaskProjectData() {
    if (this.projectId) {
      this.taskServices.getTaskProjectById(this.projectId).subscribe(
        (data) => {
          this.projectData = data;
          this.tasks = data;
          this.filteredTasks = data;
        },
        (error) => {
          console.error('Lỗi khi lấy dự án theo ID:', error);
        }
      );
    } else {
      console.error('projectId không được định nghĩa. Không thể lấy dự án theo ID.');
    }
  }
  onSearchChange(): void {
    const searchTermLower = this.searchTask.toLowerCase();
    this.filteredTasks = this.tasks.filter(task =>
      task.taskType?.toLowerCase().includes(searchTermLower) ||
      task.id?.toString().includes(searchTermLower) ||
      task.summary?.toLowerCase().includes(searchTermLower) ||
      task.status?.toLowerCase().includes(searchTermLower) ||
      task.taskDescription?.toLowerCase().includes(searchTermLower)
    );
  }
  filterTasks(criterion: string): void {
    switch (criterion) {
      case 'alphabetical-asc':
        this.filteredTasks = [...this.tasks].sort((a, b) => a.taskType?.localeCompare(b.taskType));
        break;
      case 'alphabetical-desc':
        this.filteredTasks = [...this.tasks].sort((a, b) => b.taskType?.localeCompare(a.taskType));
        break;
      case 'updated-latest':
        this.filteredTasks = [...this.tasks].sort((a, b) => new Date(b.createdDate)?.getTime() - new Date(a.createdDate).getTime());
        break;
      case 'updated-oldest':
        this.filteredTasks = [...this.tasks].sort((a, b) => new Date(a.createdDate)?.getTime() - new Date(b.createdDate).getTime());
        break;
    }
  }
  filterByStatus(priority: any): void {
    this.filteredTasks = this.tasks.filter(task => {
      return task.priority === priority;
    });
    this.filterApplied = true;
  }
  resetFilters(): void {
    this.filteredTasks = this.tasks;
    this.filterApplied = false;
  }
  showDelete(id: any): void {
    this.TaskId = id;
    this.isDelete = true;
  }
  OkDelete() {
    this.taskServices.DeleteTask(this.TaskId).subscribe(
      (data: any) => {
        this.notification.success(
          'Xóa công việc thành công',
          'Danh sách công việc đã được cập nhật.'
        );
        this.getTaskProjectData();
        this.isDelete = false;
      },
      (error) => {
        console.error(error);
        this.notification.error(
          'Xóa công việc thất bại',
          'Có lỗi xảy ra, vui lòng thử lại.'
        );
        this.isDelete = false;
        this.getTaskProjectData();
      }
    );
  }
  downloadExcel(): void {
    this.taskServices.downloadExcel().subscribe((data: Blob) => {
      saveAs(data, 'Dữ liệu công việc.xlsx');
    });
  }
  copyUrlToClipboard() {
    const url = window.location.href;
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    this.notification.success(
      'Sao chép liên kết thành công',
      ''+ url
    );
  }

}
