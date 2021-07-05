import {Component, OnInit} from '@angular/core';
import {Direction, Gender, User} from '../../shared/user.interface';
import {selectedDirections, selectedGender} from '../../shared/user.enum';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../../services/form.service';
import {comparisonDateValidator} from '../../shared/comparisonDateValidator';

@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.css']
})
export class FormLayoutComponent implements OnInit {
  public isModalDialogVisible = false;
  public isAddingState: boolean;
  formModelObj: User = new User();
  userData: any = [];
  public userForm: FormGroup;

  constructor(private formService: FormService) {}

  public genders: Array<Gender> = [
    {text: 'Male', value: selectedGender.M},
    {text: 'Female', value: selectedGender.F}
  ];
  public directions: Array<Direction> = [
    {text: 'Backend', value: selectedDirections.BE},
    {text: 'Frontend', value: selectedDirections.FE},
    {text: 'Design', value: selectedDirections.Design},
    {text: 'Project Management', value: selectedDirections.PM},
    {text: 'Quality Assurance', value: selectedDirections.QA},
    {text: 'Business Analytic', value: selectedDirections.BA},
  ];

  public openModal(): void {
    this.isModalDialogVisible = true;
  }
  public closeModal(): void {
    this.isModalDialogVisible = false;
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      gender: new FormControl('', Validators.required),
      birthdate: new FormControl(''),
      direction: new FormControl('', Validators.required),
      startdate: new FormControl(''),
      enddate: new FormControl(''),
    }, {validators: comparisonDateValidator('startdate', 'enddate', 'birthdate')}, this.onDirectionChange);
    this.getAllUsers();
  }

  submit() {
    if (this.userForm.valid) {
      console.log('Form: ', this.userForm);
      this.userForm.reset();
    }
  }

  public onDirectionChange(): any {
    const directionSelectedValue = this.userForm.get('direction').value.value;
    const DateControl = this.userForm.get('enddate');
    if (directionSelectedValue === selectedDirections.Design
      || directionSelectedValue === selectedDirections.PM
      || directionSelectedValue === selectedDirections.QA
      || directionSelectedValue === selectedDirections.BA) {
      DateControl.setValidators([Validators.required]);
    } else {
      DateControl.clearValidators();
    }
    DateControl.updateValueAndValidity();
  }

  clickAddUsers(): void {
    this.userForm.reset();
    this.isAddingState = true;
  }

  postUsersDetails(): void {
    this.formModelObj = this.userForm.value;

    this.formService.postUsers(this.formModelObj)
      .subscribe(res => {
          this.userForm.reset();
          this.getAllUsers();
          this.closeModal();
        },
        err => {
          alert('something get wrong');
        });
  }

  getAllUsers(): void {
    this.formService.getUsers()
      .subscribe(res => {
        this.userData = res;
      });
  }

  deleteUsers(dataItem: any): void {
    this.formService.deleteUsers(dataItem.id)
      .subscribe(res => {
        this.getAllUsers();
      });
  }

  onEdit(dataItem: any): void {
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

  updateUsers(): void {
    this.formModelObj.name = this.userForm.value.name;
    this.formModelObj.gender = this.userForm.value.gender;
    this.formModelObj.birthdate = this.userForm.value.birthdate;
    this.formModelObj.direction = this.userForm.value.direction;
    this.formModelObj.startdate = this.userForm.value.startdate;
    this.formModelObj.enddate = this.userForm.value.enddate;

    this.formService.updateUsers(this.formModelObj, this.formModelObj.id)
      .subscribe((res => {
        this.userForm.reset();
        this.getAllUsers();
        this.closeModal();
      }));
  }

}
