import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Form} from '../shared/form.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private http: HttpClient) {}

  postUsers(data: Form): Observable<Form>{
    return this.http.post<any>('http://localhost:3000/posts', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  getUsers(): Observable<Form>{
    return this.http.get<any>('http://localhost:3000/posts')
      .pipe(map((res: any) => {
        return res;
      })); }
  updateUsers(data: Form, id: number): Observable<Form>{
    return this.http.put<any>('http://localhost:3000/posts/' + id, data)
      .pipe(map((res: any) => {
        return res;
      })); }
  deleteUsers(id: number): Observable<Form>{
    return this.http.delete<any>('http://localhost:3000/posts/' + id)
      .pipe(map((res: any) => {
        return res;
      })); }

}
