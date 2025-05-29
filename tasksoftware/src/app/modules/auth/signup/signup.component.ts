import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/interface/roles';
import { RolesService } from '../../../service/roles.service';
import { UserService } from '../../../service/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  user = {
    picture: '/assets/icon/auth/ee2660df9335718b1a80.svg',
    fullName: '',
    password: '',
    emailAddress: '',
    phoneNumber: '',
    roleID: '',
  };
  showPassword = false;
  selectedValue: any;
  passwordVisible = false;
  roles: Role[] = [];

  constructor(
    private roleService: RolesService,
    private userService: UserService,
    private notification: NzNotificationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.fetchRoles();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  fetchRoles() {
    this.roleService.getRole().subscribe(
      (response) => {
        this.roles = response;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }
  registerUser() {
    this.userService.registerUser(this.user).subscribe(
      (response) => {
        this.notification.success(
          'Đăng ký thành công!',
          'Chúc mừng bạn đã đăng ký thành công tài khoản của hệ thống!'
        );
        this.router.navigate(['/auth/login']);
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
