import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class UserService {

  constructor(private http: HttpClient) { }

  private userUrl = 'http://localhost:3000/user'

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.userUrl}/register/`, user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.userUrl}/${user.userID}`, user);
  }
  login(user: { emailAddress: string; password: string }) {
    return this.http.post<any>(`${this.userUrl}/login`, user).pipe(
      tap((response) => {
        if (response.success && response.token && response.userID) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userID', response.userID);
        }
      })
    );
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.userUrl}`);
  }

  getUserDetails(userID: number) {
    const url = `${this.userUrl}/${userID}`;
    return this.http.get(url);
  }

  getUserInfo(userID:any): Observable<any> {
    return this.http.get<any>(`${this.userUrl}/userLogin/${userID}`);
  }

  deleteUser(userID: number): Observable<any> {
    return this.http.delete<any>(`${this.userUrl}/delete_user/${userID}`);
  }

  getUserTasks(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.userUrl}/user/${userId}/tasks`);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
  }

}
