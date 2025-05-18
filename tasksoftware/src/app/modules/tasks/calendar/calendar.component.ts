import { Component, OnInit } from '@angular/core';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {

  date = new Date(2012, 11, 21);
  mode: NzCalendarMode = 'month';

  constructor(
    private notification: NzNotificationService,
  ){

  }

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
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
