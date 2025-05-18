import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {

  isCollapsed = false;
  dot = true;
  isVisible = false;
  showContent: boolean = true;
  userData: any;

  logoImage = "/assets/logo/logo-auth.png";
  arrowImage = "/assets/icon/header/arrow-left.svg";

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private router: Router
  ) { }
  ngOnInit(): void {
    const userID = localStorage.getItem('userID');
    this.userService.getUserInfo(userID).subscribe(
      (response) => {
        this.userData = response.userLogin;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.logoImage = "/assets/logo/5.png";
      this.arrowImage = "/assets/icon/header/arrow-right.svg";
    } else {
      this.logoImage = "/assets/logo/logo-auth.png";
      this.arrowImage = "/assets/icon/header/arrow-left.svg";
    }
  }
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  hideContent() {
    this.showContent = false;
  }
  showModal(): void {
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  logout() {
    setTimeout(() => {
      this.userService.logout();
      this.router.navigate(['/auth']);
      this.notification.success(
        'Đăng xuất',
        'Bạn đã đăng xuất tài khoản ra khỏi hệ thống!'
      );
    }, 1000);
  }
}
