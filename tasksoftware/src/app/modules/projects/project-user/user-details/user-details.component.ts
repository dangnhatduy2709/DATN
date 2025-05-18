import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../service/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  userDetails: any = {};
  tasks: any[] = [];
  userID : any;
  isDelete = false;
  tasksToDo: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
  ){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userID = params['id'];
    });
    this.getUserDetails();
    this.getTasks();
    this.calculateTasksToDo();
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
    this.userService.getUserTasks(this.userID)
      .subscribe(
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
    this.tasksToDo = this.tasks.filter(task => task.status === 'To Do').length;
    console.log('Tasks:', this.tasks);
    console.log('Tasks To Do:', this.tasksToDo);
  }
  showDelete(data: any):void {
    this.userID = data.userID;
    this.isDelete = true;
  }
  OkDelete(){
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
}
