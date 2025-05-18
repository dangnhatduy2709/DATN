import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/team';

  getTeams(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getTeamsAndMembers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/team-menber`);
  }

  addTeammenber(teammenber: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add_team_member`, teammenber);
  }

  addTeammenbers(teamData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add_team`, teamData);
  }

  addTeam(teamName: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add_team`, { teamName });
  }

  deleteTeam(teamId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete_team/${teamId}`);
  }

  updateTeam(teamID: number, teamData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${teamID}`, teamData);
  }
 // Phương thức gọi API xóa thành viên khỏi nhóm
  deleteTeamMember(teamMemberID: number) {
    return this.http.delete(`${this.apiUrl}/team-member/${teamMemberID}`);
  }

  getBacklog(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/backlog`);
  }

}
