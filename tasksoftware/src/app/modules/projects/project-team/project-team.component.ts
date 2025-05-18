import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../service/team.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-team',
  standalone: false,
  templateUrl: './project-team.component.html',
  styleUrl: './project-team.component.scss',
  providers: [
    DatePipe,
  ],
})
export class ProjectTeamComponent implements OnInit {

  expandSet = new Set<number>();
  dateFormat = 'dd-MM-yyyy'
  teams: any[] = [];
  teamID: number = 0;
  isDelete = false;
  isUpdate = false;
  editedTeam: any = {};
  selectedTeam: any;
  isAddTeam = false;
  teamName: string = '';
  UpdateTeam: any = {};
  searchTerm: string = '';
  filteredTeams: any[] = [];
  isDeleteMenber = false;
  memberToDelete: any = null;

  constructor(
    private teamService: TeamService,
    private notification: NzNotificationService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamID = params['id'];
    });
    this.loadTeamsAndMembers();
    this.fetchTeams();
  }
  fetchTeams() {
    this.teamService.getTeams().subscribe(
      (response) => {
        this.teams = response;
      },
      (error) => {
        console.error('Thông tin dữ liệu team bị lỗi:', error);
      }
    );
  }
  loadTeamsAndMembers() {
    this.teamService.getTeams().subscribe(
      (data) => {
        this.teams = data;
        this.filteredTeams = data;
      },
      (error) => {
        console.error('Error fetching teams and members:', error);
      }
    );
  }
  // Thêm nhóm
  showAddTeam() {
    this.isAddTeam = true;
  }
  okAddTeam() {
    this.teamService.addTeam(this.teamName).subscribe(
      (response) => {
        this.fetchTeams();
        this.notification.success(
          'Thêm nhóm thành công',
          'Danh sách nhóm đã được cập nhật.'
        );
      },
      (error) => {
        this.fetchTeams();
        this.notification.success(
          'Thêm nhóm thành công',
          'Danh sách nhóm đã được cập nhật.'
        );
      }
    );
    this.isAddTeam = false;
  }
  // Xóa nhóm
  showDelete(data: any): void {
    this.teamID = data.teamID;
    this.isDelete = true;
  }
  okDelete() {
    this.teamService.deleteTeam(this.teamID).subscribe(
      (data: any) => {
        this.fetchTeams();
        this.notification.success(
          'Xóa nhóm thành công',
          'Danh sách nhóm đã được cập nhật.'
        );
      },
      (error) => {
        this.fetchTeams();
        this.notification.success(
          'Xóa nhóm thành công',
          'Danh sách nhóm đã được cập nhật.'
        );
      }

    );
    this.isDelete = false;
  }
  // Xóa thành viên trong nhóm
  showDeleteMember(team: any, member: any): void {
    this.memberToDelete = { team, member };
    this.isDeleteMenber = true;
  }

  okDeleteMember(): void {
    if (this.memberToDelete) {
      this.teamService.deleteTeamMember(this.memberToDelete.member.teamMemberID).subscribe(
        (data: any) => {
          this.loadTeamsAndMembers();
          this.notification.error(
            'Lỗi xóa thành viên',
            'Có lỗi xảy ra khi xóa thành viên.'
          );
        },
        (error) => {
          this.loadTeamsAndMembers();
          this.notification.success(
            'Xóa thành viên thành công',
            'Danh sách thành viên đã được cập nhật.'
          );
        }
      );
      this.isDeleteMenber = false;
      this.memberToDelete = null;
    }
  }
  cancelDeleteMember(): void {
    this.isDeleteMenber = false;
    this.memberToDelete = null;
  }
  //  Sửa nhóm
  showUpdate(selectedTeam: any) {
    this.selectedTeam = selectedTeam;
    this.editedTeam = { ...selectedTeam };
    this.isUpdate = true;
  }

  OkUpdate() {
    if (this.selectedTeam) {
      const teamID = this.selectedTeam.teamID;
      this.editedTeam.createdDate = this.datePipe.transform(this.editedTeam.createdDate, 'yyyy-MM-dd');
      this.teamService.updateTeam(teamID, this.editedTeam).subscribe(
        (data: any) => {
          this.notification.success(
            'Chỉnh sửa nhóm thành công',
            'Danh sách nhóm đã được cập nhật.'
          );
          this.isUpdate = false;
          this.fetchTeams();
        },
        (error) => {
          this.notification.error(
            'Chỉnh sửa nhóm không thành công',
            'Vui lòng kiểm tra lại thông tin nhóm.'
          );
          console.error(error);
        }
      );
    }
  }

  getMemberCount(team: any): number {
    return team.members.length;
  }

  onSearchChange(): void {
    this.filteredTeams = this.teams.filter(team =>
      team.teamName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      team.members.some((member: any) => member.fullName?.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

}
