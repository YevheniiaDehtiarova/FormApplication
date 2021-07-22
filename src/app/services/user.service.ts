import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User, UserForm} from '../models/interfaces/user.interface';
import {Observable, of} from 'rxjs';
import {DatePipe} from '@angular/common';
import {Utils} from '../models/utils';
import {Gender} from '../models/enums/gender.enum';
import {Directions} from '../models/enums/direction.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      id: 26,
      name: 'Yevhenia',
      gender: {
        text: 'Female',
        value: 'female'
      },
      birthdate: '2021-06-27',
      direction: {
        text: 'Frontend',
        value: 'frontend'
      },
      startdate: '2021-07-24',
      enddate: '2021-07-31'
    },
    {
      id: 27,
      name: 'Dmytriy',
      gender: {
        text: 'Male',
        value: 'male'
      },
      birthdate: '2021-06-27',
      direction: {
        text: 'Project Management',
        value: 'projectManagement'
      },
      startdate: '2021-07-04',
      enddate: '2021-07-24'
    }
  ];

  public getUsers(): Observable<Array<User>> {
    return of<User[]>(this.users);
  }

  public postUser(data: UserForm): void {
    const newUser: User = {
      id: Utils.createUserId(this.users),
      name: data.name,
      gender: {
        text: Gender.find(value => value.text).text,
        value: data.gender
      },
      birthdate: data.birthdate,
      direction: {
        text: Directions.find(value =>  value.text).text,
        value: data.direction
      },
      startdate: data.startdate,
      enddate: data.enddate,
    };
    this.users.push(newUser);
  }

  public editUser(data: UserForm, userId: number): void {
    const users = this.users;
    const userIndex = users.findIndex(user => user.id === userId);
    users[userIndex].name = data.name;
    users[userIndex].gender = {
      text: Gender.find(value => value.text).text,
      value: data.gender,
    };
    users[userIndex].birthdate = data.birthdate;
    users[userIndex].direction = {
      text: Directions.find(value => value.text).text,
      value: data.direction,
    };
    users[userIndex].startdate = data.startdate;
    users[userIndex].enddate = data.enddate;
    this.users = users;
  }

  public deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
  }
}



