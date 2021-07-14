import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../models/user.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  postUser(data: User): Observable<User>{
    return this.http.post<User>('http://localhost:3000/posts', data)
      .pipe(map((res: User) => {
        return res;
      }));
  }
  getUsers(): Observable<Array<User>>{
    return this.http.get<User[]>('http://localhost:3000/posts')
      .pipe(map((res: Array<User>) => {
        return res;
      }));
  }
  updateUser(data: User, id: number): Observable<Array<User>>{
    return this.http.put<User[]>('http://localhost:3000/posts/' + id, data)
      .pipe(map((res: Array<User> ) => {
        return res;
      })); }
  deleteUser(id: number): Observable<Array<User>>{
    return this.http.delete<User[]>('http://localhost:3000/posts/' + id)
      .pipe(map((res: Array<User>) => {
        return res;
      })); }

}
