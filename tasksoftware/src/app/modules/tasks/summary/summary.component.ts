import { UserService } from './../../../service/user.service';
import { TaskService } from './../../../service/task.service';
import { ProjectService } from './../../../service/project.service';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { formatDate } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  statusView: any = 1;
  projectID: number = 0;
  projects: any[] = [];
  projectData: any[] = [];
  users: any[] = [];
  tasks: any[] = [];
  isTask = false;
  projectId: any;
  TaskData: any;
  teamData: any;
  teamID: any;
  uploadedFileName: any;

  task = {
    projectID: '',
    taskType: '',
    summary: '',
    userID: '',
    status: 'To Do',
    createdDate: '',
    endDate: '',
    priority: '',
    description: '',
    taskDescription: 'Create marketing materials for campaign',
    actualHoursSpent: '',
    taskManagerID: ''
  };

  constructor(
    private elementRef: ElementRef,
    private msg: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private taskService: TaskService,
    private userService: UserService,
    private notification: NzNotificationService,
    private http: HttpClient
  ) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });
    const storedStatusView = localStorage.getItem('statusView');
    if (storedStatusView) {
      this.statusView = parseInt(storedStatusView);
    }
    this.fetchProject();
    this.fetchTask();
    this.fetchUser();
    this.getProjectData();
    this.getProjectTeamInfo();
  }
  updateStatusView(viewIndex: number): void {
    this.statusView = viewIndex;
    localStorage.setItem('statusView', this.statusView.toString());
  }
  showAddTask() {
    this.isTask = true
  }
  OkAddTask() {
    if (this.task.taskType == null || this.task.taskType == '') {
      this.notification.error('Lỗi', 'Vui lòng nhập tên công việc.');
      return;
    }

    if (this.task.description == null || this.task.description == '') {
      this.notification.error('Lỗi', 'Vui lòng mô tả chi tiết.');
      return;
    }

    this.task.createdDate = this.task.createdDate ? 
      formatDate(this.task.createdDate, 'yyyy-MM-dd HH:mm:ss', 'en-US') : formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US');
    this.task.endDate = this.task.endDate ? 
      formatDate(this.task.endDate, 'yyyy-MM-dd HH:mm:ss', 'en-US') : formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US');
      this.task.projectID = this.projectId;
    this.taskService.addTask(this.task).subscribe(
      (response) => {
        this.notification.success(
          'Thêm công việc mới thành công',
          'Danh sách công việc đã được cập nhật.'
        );
        this.statusView === 2;
      },
      (error) => {
        {
          this.notification.error(
            'Thêm công việc không thành công',
            'Vui lòng kiểm tra lại thông tin công việc.'
          );
        }
        console.log(error);
      }
    );
    this.isTask = false;
  }
  fetchProject() {
    this.projectService.getProejct().subscribe(
      (response) => {
        this.projects = response;
      },
      (error) => {
        console.error('Lỗi dữ liệu thông tin dự án', error);
      }
    );
  }
  fetchUser() {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Lỗi dữ liệu thông tin người dùng', error);
      }
    );
  }
  fetchTask() {
    this.taskService.getTask().subscribe(
      (res) => {
        this.tasks = res;
      },
      (error) => {
        console.error('Lỗi dữ liệu thông tin công việc', error);
      }
    )
  }
  getProjectData() {
    if (this.projectId) {
      this.projectService.getProjectById(this.projectId).subscribe(
        (data) => {
          this.projectData = data;
          this.TaskData = data;
        },
        (error) => {
          console.error('Lỗi khi lấy dự án theo ID:', error);
        }
      );
    } else {
      console.error('projectId không được định nghĩa. Không thể lấy dự án theo ID.');
    }
  }
  getProjectTeamInfo(): void {
    this.route.params.subscribe((params) => {
      this.teamID = +params['id'];
      this.projectService.getProjectTeamID(this.teamID).subscribe(
        (data) => {
          this.teamData = data.projectTeam;
        },
        (error) => {
          console.error('Error fetching project team data:', error);
        }
      );
    });
  }

  drawChart() {
    const ctx = this.elementRef.nativeElement.querySelector('#myChart');
    console.log('Canvas element for myChart:', ctx);
    Chart.getChart(ctx)?.destroy();
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug5', 'Sep', 'Oct', 'Nơv', 'Dec', 'Jan', 'Feb', 'Mar'],
        datasets: [{
          label: 'Dữ liệu 1',
          data: [3, 1, 3, 5, 2, 8, 1, 5, 10, 12, 12, 7],
          backgroundColor: '#5CB1FF',
          barThickness: 50
        },
        {
          label: 'Dữ liệu 2',
          data: [11, 9, 12, 8, 3, 11, 6, 9, 15, 17, 13, 8],
          backgroundColor: '#3366FF',
          barThickness: 50
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            stacked: true
          }
        },
      }
    });
  }

  drowChart() {
    const ctx = this.elementRef.nativeElement.querySelector('#trangthai');
    console.log('Canvas element for trangthai:', ctx);
    Chart.getChart(ctx)?.destroy();
    const trangthai = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Highest', 'High', 'Medium', 'Low'],
        datasets: [{
          label: 'Dữ liệu 1',
          data: [3, 1, 3, 5],
          backgroundColor: '#5CB1FF',
          barThickness: 20
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          },
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  customUpload = (item: NzUploadXHRArgs): Subscription => {
    const formData = new FormData();
    formData.append('file', item.file as any);

    const req = new HttpRequest('POST', 'http://localhost:3000/upload', formData, {
      reportProgress: true,
    });

    const sub = this.http.request(req).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          // Khi upload hoàn thành, event.body chứa response JSON từ server
          const res = event.body as any;          
          this.uploadedFileName = res.file.filename; // lấy filename server trả về
          item.onSuccess?.(res, item.file, null as any);
        }
      },
      error: (err) => {
        item.onError?.(err, item.file);
      }
    });

    return sub; // ✅ Quan trọng: return Subscription
  };
}
