import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-notification',
  standalone: false,
  templateUrl: './project-user.component.html',
  styleUrl: './project-user.component.scss'
})
export class ProjectUserComponent implements OnInit {
  users: any[] = [];
  isDelete = false;
  userID: any;

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userID = params['id'];
    });
    this.fetchUser();
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
        this.fetchUser();
      },
      (error) => {
        this.notification.success(
          'Xóa người dùng thành công',
          'Danh sách người dùng đã được cập nhật.'
        );
        this.fetchUser();
        console.error(error);
      }
    );
    this.isDelete = false;
  }
}
