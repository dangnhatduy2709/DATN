import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  private taskUrl = 'http://localhost:3000/task';

  getTask(): Observable<any> {
    return this.http.get<any>(`${this.taskUrl}`);
  }

  getAllTask(): Observable<any> {
    return this.http.get<any>(`${this.taskUrl}/thongke`);
  }

  getTaskProjectById(projectID: any): Observable<any> {
    return this.http.get<any>(`${this.taskUrl}/tasks/` + projectID);
  }

  DeleteTask(taskID: any): Observable<any> {
    return this.http.delete<any>(`${this.taskUrl}/deletetask/` + taskID);
  }

  addTask(taskData: any): Observable<any> {
    return this.http.post<any>(`${this.taskUrl}/addtask`, taskData);
  }

  getTaskById(taskId: any): Observable<any> {
    return this.http.get<any>(`${this.taskUrl}/get-task-by-id/${taskId}`);
  }

  updateTask(taskId: string, taskData: any): Observable<any> {
    return this.http.put<any>(`${this.taskUrl}/updatetask/${taskId}`, taskData);
  }

  downloadExcel(): Observable<Blob> {
    return this.http.get(`${this.taskUrl}/api/downloadExcel`,{ responseType: 'blob' });
  }

  updateTaskData(taskId: string, taskData: any): Observable<any> {
    return this.http.put<any>(`${this.taskUrl}/updatetaskdata/${taskId}`, taskData);
  }

}
