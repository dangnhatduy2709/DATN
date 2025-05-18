import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  private rolesUrl = 'https://taskmasternodejs.vercel.app/roles';

  getRoles(): Observable<any> {
    return this.http.get<any>(`${this.rolesUrl}`);
  }

}
