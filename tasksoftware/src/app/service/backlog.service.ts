import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackLogService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/backlog';

  getBacklog(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  getBacklogById(backlogID: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/` + backlogID);
  }

  getBacklogsByProjectId(projectId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/project/${projectId}/backlogs`);
  }

  createBacklog(backlogData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, backlogData);
  }

}
