import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  user = {
    emailAddress: '',
    password: ''
  };
  passwordVisible = false;
  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  login() {
    this.userService.login(this.user).subscribe(
      (response) => {
        setTimeout(() => {
          this.router.navigate(['/project']);
          this.notification.success(
            'Đăng nhập thành công',
            'Chúc mừng bạn đã đăng nhập thành công vào hệ thống!'
          );
        }, 1000);
      },
      (error) => {
        this.notification.error(
          'Đăng nhập thất bại',
          'Vui lòng kiểm tra lại thông tin đăng nhập.'
        );
      }
    );
  }
  showPassword = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
