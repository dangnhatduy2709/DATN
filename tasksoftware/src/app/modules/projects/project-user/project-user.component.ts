import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute } from '@angular/router';
import { RolesService } from '../../../service/roles.service';
import { Role } from '../../../models/interface/roles';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-project-notification',
  standalone: false,
  templateUrl: './project-user.component.html',
  styleUrl: './project-user.component.scss'
})
export class ProjectUserComponent implements OnInit {
  users: any[] = [];
  isDelete = false;
  isCreate = false;
  userID: any;
  dataSubmitUser: any = {};
  passwordVisible = false;
  roles: Role[] = [];
  searchControl = new FormControl('');
  
  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private route: ActivatedRoute,
    private roleService: RolesService
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userID = params['id'];
    });
    this.fetchUser();
    this.fetchRoles();

    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.onSearch(value ?? '');
      });
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
  showModalCreate(): void {
    this.isCreate = true;
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

  OnSubmit() {
    this.userService.registerUser(this.dataSubmitUser).subscribe(
      (response) => {
        this.notification.success(
          'Bạn đã thêm người dùng thành công!',
          'Chúc mừng bạn đã thêm người dùng thành công!'
        );
        this.fetchUser();
        this.isCreate = false;
      },
      (error) => {
        this.notification.error(
          'Đăng ký thất bại',
          'Vui lòng kiểm tra lại thông tin đăng ký.'
        );
      }
    );
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

  onSearch(keyword: string | null) {
    const lower = (keyword ?? '').toLowerCase().trim();    
    if (lower == '') this.fetchUser();
    this.users = this.users.filter(item =>
      Object.values(item).some(value =>
        value?.toString().toLowerCase().includes(lower)
      )
    );
  }
}
