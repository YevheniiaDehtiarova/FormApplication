import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../shared/user.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private http: HttpClient) {}

  postUsers(data: User): Observable<User>{
    return this.http.post<any>('http://localhost:3000/posts', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  getUsers(): Observable<User>{
    return this.http.get<any>('http://localhost:3000/posts')
      .pipe(map((res: any) => {
        return res;
      })); }
  updateUsers(data: User, id: number): Observable<User>{
    return this.http.put<any>('http://localhost:3000/posts/' + id, data)
      .pipe(map((res: any) => {
        return res;
      })); }
  deleteUsers(id: number): Observable<User>{
    return this.http.delete<any>('http://localhost:3000/posts/' + id)
      .pipe(map((res: any) => {
        return res;
      })); }

}
