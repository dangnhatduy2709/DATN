import { TaskService } from '../../../service/task.service';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { UserService } from '../../../service/user.service';
import { TeamService } from '../../../service/team.service';
import { ProjectService } from '../../../service/project.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ChangeDetectorRef } from '@angular/core';
import { formatDistance } from 'date-fns';


@Component({
  selector: 'app-board',
  standalone: false,
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class AvatarComponent implements OnInit {
  isTeamMember = false;
  teamID: any;
  teamData: any;
  TaskData: any;
  projectID: number = 0;
  isVisible = false;
  users: any[] = [];
  teams: any[] = [];
  roles: any[] = [];
  dateFormat = 'yyyy-MM-dd';
  teammenber = {
    teamID: '',
    userID: '',
    joinDate: ''
  };
  priorityMap: { [key: number]: string } = {
    1: 'Lowest',
    2: 'Low',
    3: 'Medium',
    4: 'High',
    5: 'Highest'
  };
  isShowInfor = false;
  likes = 0;
  dislikes = 0;
  time = formatDistance(new Date(), new Date());
  editedProject: any = {};
  selectedProject: any;
  currentItem: any;
  tasks: any[] = [];

  searchProject: string = '';
  filteredProject: any[] = [];
  projects: any[] = [];
  boardFilter: string | null = null;
  statusFilter: any | null = null;


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private teamService: TeamService,
    private projectService: ProjectService,
    private notification: NzNotificationService,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectID = params['id'];
      this.taskService.getTaskProjectById(this.projectID).subscribe(
        (data) => {
          this.tasks = data;
        },
        (error) => {
          console.error('Có lỗi khi gọi API:', error);
        }
      );
    });
    this.fetchUser();
    this.fetchTeams();
    this.getProjectData();
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

  getProjectData() {
    if (this.projectID) {
      this.projectService.getProjectById(this.projectID).subscribe(
        (data) => {
          this.TaskData = data;
          this.projects = data;
          this.applyFilters();
        },
        (error) => {
          console.error('Lỗi khi lấy dự án theo ID:', error);
        }
      );
    } else {
      console.error('projectId không được định nghĩa. Không thể lấy dự án theo ID.');
    }
  }

  showsTeamMember(): void {
    this.isTeamMember = true;
  }

  OksTeamMember(): void {
    const formattedCreatedDate = formatDate(this.teammenber.joinDate, 'yyyy-MM-dd HH:mm:ss', 'en-US');
    this.teammenber.joinDate = formattedCreatedDate;
    this.teamService.addTeammenber(this.teammenber).subscribe(
      (response) => {
        this.notification.success(

          'Thêm thành viên thành công',
          'Danh sách thành viên đã được cập nhật.'
        );
        this.teamData = response.projectTeam;
        this.fetchProjectTeamData();
      },
      (error) => {
        console.log('teammenber.teamID:', this.teammenber.teamID);
        this.notification.error(
          'Thêm thành viên không thành công',
          'Xem lại thông tin thêm mới thành viên.'
        );
      }
    );
    this.isTeamMember = false;
  }

  getRoleName(roleID: any): string {
    const role = this.roles.find(r => r.roleID === roleID);
    return role ? role.roleName : '';
  }

  fetchTeams() {
    this.teamService.getTeams().subscribe(
      (response) => {
        this.teams = response;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  fetchUser() {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  onSearchChange() {
    this.applyFilters();
  }

  filterByBoard(board: string | null) {
    this.boardFilter = board;
    this.applyFilters();
  }

  filterByStatus(priority: any | null) {
    this.statusFilter = priority;;
    this.applyFilters();
  }

  applyFilters() {
    const searchTermLower = this.searchProject.toLowerCase();
    this.filteredProject = this.tasks.filter(task =>
      (!this.boardFilter || task.status === this.boardFilter) &&
      (!this.statusFilter || task.priority === this.statusFilter) &&
      (task.taskType?.toLowerCase().includes(searchTermLower) ||
      task.taskID?.toString().includes(searchTermLower) ||
      task.summary?.toLowerCase().includes(searchTermLower) ||
      task.status?.toLowerCase().includes(searchTermLower))
    );
  }

  resetFilters() {
    this.boardFilter = null;
    this.statusFilter = null;
    this.searchProject = '';
    this.applyFilters();
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

  // Bảng

  filterTickets(status: string) {
    return this.filteredProject.filter(task => task.status === status);
  }

  onDragStart(item: any) {
    this.currentItem = item;
    console.log('Current Item:', this.currentItem);
  }

  onDrop(event: any, status: string) {
    event.preventDefault();
    if (!this.currentItem || !this.currentItem.taskID) {
      console.error('Không có công việc hoặc taskId không hợp lệ.');
      return;
    }
    const taskId = this.currentItem.taskID;
    this.taskService.updateTask(taskId, { status }).subscribe(
      (data) => {
        console.log('API Response:', data);
        const updatedTaskIndex = this.tasks.findIndex((task) => task.taskID === taskId);
        if (updatedTaskIndex !== -1) {
          this.tasks[updatedTaskIndex].status = status;
          console.log('Cập nhật trạng thái công việc thành công:', data);
          this.cdr.detectChanges();
        }
      },
      (error) => {
        console.error('Có lỗi khi cập nhật trạng thái công việc:', error);
      }
    );

    this.currentItem = null;
  }

  onDrapOver(event: any) {
    event.preventDefault();
  }

  cancelTaskInfor() {
    this.isShowInfor = false;
  }

  showTaskInfor(selectedProject: any): void {
    this.selectedProject = selectedProject;
    if (this.selectedProject) {
      setTimeout(() => {
        this.editedProject = { ...selectedProject };
        this.isShowInfor = true;
      }, 0);
    }
    this.isShowInfor = true;
  }

}
