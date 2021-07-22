import {Component} from '@angular/core';
import {User} from './models/interfaces/user.interface';
import {SingleSelect} from './models/interfaces/singleselect.interface';
import {ModalService} from './services/modal.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'good-app';
  public user: User;
  public users: Array<User>;
  public userGender: any;
  public text: string;
  public value: string;
  public genderText: string;
  public userGenderArray: any;
  public userDirectionArr: any;
  public directionText: string;

  public updateRow(eventData: User): void {
    this.user = eventData;

    this.userGender = eventData.gender;
    this.userGenderArray = Array.from(this.userGender);
    this.userGenderArray.push(this.userGender);
    this.userGenderArray.map(item =>
      this.genderText = item.text);
  }
}


