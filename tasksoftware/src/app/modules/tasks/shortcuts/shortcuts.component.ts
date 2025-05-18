import { BackLogService } from './../../../service/backlog.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TeamService } from './../../../service/team.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../service/project.service';

@Component({
  selector: 'app-shortcuts',
  standalone: false,
  templateUrl: './shortcuts.component.html',
  styleUrl: './shortcuts.component.scss'
})
export class ShortcutsComponent implements OnInit {
  backlog: any[] = [];
  backlogs: any[] = [];
  teamData: any;
  projectId: any;
  constructor(
    private teamService: TeamService,
    private backlogService: BackLogService,
    private projectService: ProjectService,
    private notification: NzNotificationService,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });
    this.fetchProjectTeamData();
    this.fetchBacklog();
    this.getBacklogs();
  }
  fetchBacklog() {
    this.backlogService.getBacklog().subscribe(
      (res: any) => {
        this.backlog = res;
      },
      (error) => {
        console.log(error);

      }
    )
  }
  getBacklogs(): void {
    this.backlogService.getBacklogsByProjectId(this.projectId).subscribe(
      (data) => {
        this.backlogs = data;
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }
  fetchProjectTeamData(): void {
    this.route.params.subscribe((params) => {
      const teamID = + params['id'];
      this.projectService.getProjectTeamID(teamID).subscribe(
        (data) => {
          this.teamData = data.projectTeam;
        },
        (error) => {
          console.error('Error fetching project team data:', error);
        }
      );
    });
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
