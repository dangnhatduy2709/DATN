import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';


@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

  isCollapsed = false;
  dot = true;
  isVisible = false;
  showContent: boolean = true;
  userData: any;

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private router: Router
  ){}
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
