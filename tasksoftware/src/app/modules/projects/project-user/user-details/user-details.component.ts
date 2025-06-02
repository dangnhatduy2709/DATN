import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../service/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Role } from '../../../../models/interface/roles';
import { RolesService } from '../../../../service/roles.service';
import { TeamService } from '../../../../service/team.service';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  userDetails: any = {};
  tasks: any[] = [];
  userID: any;
  isDelete = false;
  isUpdate = false;
  tasksToDo: any;
  roles: Role[] = [];
  dataUpdate: any = {};
  userJoinProject: any;
  tasksNoAssign: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    private roleService: RolesService,
    private teamService: TeamService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userID = params['id'];
    });
    this.getUserDetails();
    this.getTasks();
    this.calculateTasksToDo();
    this.fetchRoles();
    this.getUserProject();
    this.calculateTasksNoAssign();
  }

  fetchRoles() {
    this.teamService.getUserByProject(this.userID).subscribe(
      (response) => {
        this.userJoinProject = response[0].teamCount;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  getUserProject() {
    this.roleService.getRole().subscribe(
      (response) => {
        this.roles = response;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  getUserDetails() {
    this.route.params.subscribe((params) => {
      this.userID = +params['id'];
      this.userService.getUserDetails(this.userID).subscribe(
        (data: any) => {
          this.userDetails = data;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    });
  }
  getTasks(): void {
    this.userService.getUserTasks(this.userID).subscribe(
      (data) => {
        this.tasks = data;
        this.calculateTasksToDo();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  calculateTasksToDo(): void {
    this.tasksToDo = this.tasks.filter((task) => task.status === 'Done').length;
  }
  showDelete(data: any): void {
    this.userID = data.userID;
    this.isDelete = true;
  }
  OkDelete() {
    this.userService.deleteUser(this.userID).subscribe(
      (data: any) => {
        this.notification.success(
          'Xóa người dùng thành công',
          'Danh sách người dùng đã được cập nhật.'
        );
        this.getUserDetails();
      },
      (error) => {
        this.notification.success(
          'Xóa người dùng thành công',
          'Danh sách người dùng đã được cập nhật.'
        );
        this.getUserDetails();
        console.error(error);
      }
    );
    this.isDelete = false;
  }

  showUpdate(data: any): void {
    this.dataUpdate = JSON.parse(JSON.stringify(data));
    this.isUpdate = true;
  }

  calculateTasksNoAssign() : void {
    this.tasksNoAssign = this.tasks.filter(task => task.status === 'No Assign').length;
  }

  OnUpdate() {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!this.dataUpdate.emailAddress || !emailRegex.test(this.dataUpdate.emailAddress)) {
      this.notification.error('Lỗi', 'Email không hợp lệ.');
      return;
    }

    if (!this.dataUpdate.phoneNumber || !phoneRegex.test(this.dataUpdate.phoneNumber)) {
      this.notification.error('Lỗi', 'Số điện thoại phải gồm 10 chữ số.');
      return;
    }
    this.userService.updateUser(this.dataUpdate).subscribe(
      (response) => {
        this.notification.success(
          'Bạn đã thêm người dùng thành công!',
          'Chúc mừng bạn đã thêm người dùng thành công!'
        );
        this.getUserDetails();
        this.getTasks();
        this.calculateTasksToDo();
        this.fetchRoles();
        this.isUpdate = false;
      },
      (error) => {
        this.notification.error(
          'Đăng ký thất bại',
          'Vui lòng kiểm tra lại thông tin đăng ký.'
        );
      }
    );
  }
}
