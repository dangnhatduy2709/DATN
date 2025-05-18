import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-timline',
  standalone: false,
  templateUrl: './timline.component.html',
  styleUrl: './timline.component.scss'
})
export class TimlineComponent implements OnInit {

  constructor(
    private notification: NzNotificationService,
  ){

  }
  ngOnInit(): void {

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
}
