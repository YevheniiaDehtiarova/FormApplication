import {Component, OnInit} from '@angular/core';
import {Form} from '../../models/form.model';
import {Validators, FormGroup, FormControl} from '@angular/forms';
import {FormService} from '../../services/form.service';
import {comparisonDateValidator} from '../../shared/comparisonDateValidator';

@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.css']
})
export class FormLayoutComponent implements OnInit {
  public isModalDialogVisible = false;
  showAdd!: boolean;
  showUpdate !: boolean;
  formModelObj: Form = new Form();
  userData!: any;
  public userForm: FormGroup;

  constructor(private formService: FormService) {
  }

  public genders: Array<{ text: string; value: string }> = [
    {text: 'Male', value: 'Male'},
    {text: 'Female', value: 'Female'}
  ];
  public gender: { text: string; value: string };


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
      // startdate: new FormControl('',{validators: dateLessThan('startdate','enddate')}),
      startdate: new FormControl(''),
      enddate: new FormControl(''),
    }, {validators: comparisonDateValidator('startdate', 'enddate', 'birthdate')});
    console.log(this.userForm);
    this.getAllUsers();
  }

  public onDirectionChange(): void {
      let directionSelected = this.userForm.get('direction').value;
      let DateControl = this.userForm.get('enddate');
      if (directionSelected === 'design' || directionSelected === 'projectManagement' || directionSelected === 'qualityAssurance' || directionSelected === 'businessAnalytic') {
        DateControl.setValidators([Validators.required])
        DateControl.updateValueAndValidity();
      } else {
        DateControl.clearValidators();
        DateControl.updateValueAndValidity();
      }
    }

  clickAddUsers(): void {
    this.userForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postUsersDetails(): void {
    this.formModelObj = this.userForm.value;

    this.formService.postUsers(this.formModelObj)
      .subscribe(res => {
          console.log(res);
          const ref = document.getElementById('cancel');
          ref?.click();
          this.userForm.reset();
          this.getAllUsers();
        },
        err => {
          alert('smth get wrong');
        });
  }

  getAllUsers(): void {
    this.formService.getUsers()
      .subscribe(res => {
        console.log(res);
        this.userData = res;
      });
  }


  deleteUsers(userData: any): void {
    this.formService.deleteUsers(userData.dataItem.id)
      .subscribe(res => {
        this.getAllUsers();
      });
  }

  onEdit(userData: any): void {
    this.showAdd = false;
    this.showUpdate = true;
    this.formModelObj.id = userData.dataItem.id;
    this.userForm.controls.name.setValue(userData.dataItem.name);
    this.userForm.controls.gender.setValue(userData.dataItem.gender);
    this.userForm.controls.birthdate.setValue(userData.dataItem.birthdate);
    this.userForm.controls.direction.setValue(userData.dataItem.direction);
    this.userForm.controls.startdate.setValue(userData.dataItem.startdate);
    this.userForm.controls.enddate.setValue(userData.dataItem.enddate);
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
        const ref = document.getElementById('cancel');
        ref?.click();
        this.userForm.reset();
        this.getAllUsers();
      }));
  }

}
