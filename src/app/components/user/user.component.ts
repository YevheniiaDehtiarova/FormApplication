import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../models/user.interface';
import {Gender} from '../../models/enums/gender.enum';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {comparisonDateValidator} from '../../shared/comparisonDateValidator';
import {SingleSelect} from '../../models/singleselect.interface';
import {Directions} from '../../models/enums/direction.enum';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  public isModalDialogVisible = false;
  public isAddingState: boolean;
  public formModelObj: User = new User();
  public userData: Array<User> = [];
  public userForm: FormGroup;
  private subscription: Subscription;

  constructor(private userService: UserService) {
  }

  public genders: Array<SingleSelect> = [
    {text: 'Male', value: Gender.Male},
    {text: 'Female', value: Gender.Female}
  ];
  public directions: Array<SingleSelect> = [
    {text: 'Backend', value: Directions.Backend},
    {text: 'Frontend', value: Directions.Frontend},
    {text: 'Design', value: Directions.Design},
    {text: 'Project Management', value: Directions.ProjectManagment},
    {text: 'Quality Assurance', value: Directions.QualityAssurance},
    {text: 'Business Analytic', value: Directions.BusinessAnalysis},
  ];

  public openModal(): void {
    this.isModalDialogVisible = true;
  }

  public closeModal(): void {
    this.userForm.reset();
    this.isModalDialogVisible = false;
  }

  public ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      gender: new FormControl('', Validators.required),
      birthdate: new FormControl(''),
      direction: new FormControl('', Validators.required),
      startdate: new FormControl(''),
      enddate: new FormControl(''),
    }, {validators: comparisonDateValidator('startdate', 'enddate', 'birthdate')});
    this.getAllUsers();
  }

  public submit(): void {
    if (this.userForm.valid) {
      this.userForm.reset();
    }
  }

  public onDirectionChange(): void {
    const DateControl = this.userForm.get('enddate');
    this.subscription = this.userForm.get('direction').valueChanges
      .subscribe((dir) => {
        if (dir.value === Directions.Backend || dir.value === Directions.Frontend) {
          DateControl.clearValidators();
        } else {
          DateControl.setValidators([Validators.required]);
        }
        DateControl.updateValueAndValidity();
      });
  }

  public clickAddUser(): void {
    this.userForm.reset();
    this.isAddingState = true;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public postUsersDetails(): void {
    this.formModelObj = this.userForm.value;
    this.userService.postUser(this.formModelObj)
      .subscribe(() => {
          this.userForm.reset();
          this.getAllUsers();
          this.closeModal();
        },
        err => {
          alert('something get wrong');
        });
  }

  public getAllUsers(): void {
    this.userService.getUsers()
      .subscribe(res => {
        this.userData = res;
      });
  }

  public deleteUser(dataItem: User): void {
    this.userService.deleteUser(dataItem.id)
      .subscribe(res => {
        this.getAllUsers();
      });
  }

  public onEdit(dataItem: User): void {
    this.isAddingState = false;
    this.formModelObj.id = dataItem.id;
    this.userForm.setValue({
      name: dataItem.name,
      gender: dataItem.gender,
      birthdate: dataItem.birthdate,
      direction: dataItem.direction,
      startdate: dataItem.startdate,
      enddate: dataItem.enddate
    });
  }

  public updateUser(): void {
    this.formModelObj = {
      id: this.formModelObj.id,
      name: this.userForm.value.name,
      gender: this.userForm.value.gender,
      birthdate: this.userForm.value.birthdate,
      direction: this.userForm.value.direction,
      startdate: this.userForm.value.startdate,
      enddate: this.userForm.value.enddate
    };

    this.userService.updateUser(this.formModelObj, this.formModelObj.id)
      .subscribe(() => {
        this.userForm.reset();
        this.getAllUsers();
        this.closeModal();
      });
  }
}
