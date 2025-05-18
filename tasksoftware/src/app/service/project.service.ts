import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  private projectUrl = 'http://localhost:3000/project';

  getProejct(): Observable<any> {
    return this.http.get<any>(`${this.projectUrl}`);
  }

  getProjectById(projectID: any): Observable<any> {
    return this.http.get<any>(`${this.projectUrl}/get-project/` + projectID);
  }

  DeleteProject(projectID: any): Observable<any> {
    return this.http.delete<any>(`${this.projectUrl}/remove/` + projectID);
  }

  updateProject(projectID: string, projectData: any): Observable<any> {
    return this.http.put<any>(
      `${this.projectUrl}/projects/${projectID}`,
      projectData
    );
  }

  addProject(work: any): Observable<any> {
    return this.http.post<any>(`${this.projectUrl}/add`, work);
  }

  getProjectTeamID(projectID: any): Observable<any> {
    return this.http.get(`${this.projectUrl}/projectteam/${projectID}`);
  }
}
