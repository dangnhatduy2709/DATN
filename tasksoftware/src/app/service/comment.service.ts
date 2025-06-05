import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/comment';

//   getBacklog(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}`);
//   }
  getCommentByTaskID(taskID: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getCommentByTaskID/` + taskID);
  }

//   getBacklogsByProjectId(projectId: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/project/${projectId}/backlogs`);
//   }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, data);
  }

}
