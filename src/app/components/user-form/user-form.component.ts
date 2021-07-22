import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {User, SingleSelect, UserForm} from '../../models/interfaces/user.interface';
import {Gender} from '../../models/enums/gender.enum';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {comparisonDateValidator} from '../../shared/comparisonDateValidator';
import {Directions} from '../../models/enums/direction.enum';
import {Subscription} from 'rxjs';
import {ModalService} from '../../services/modal.service';
import {UserFormStateService} from '../../services/user-form-state.service';
import {FormatSettings} from '@progress/kendo-angular-dateinputs';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy, OnChanges {
  public isModalDialogVisible: boolean;
  public isAddingState: boolean;
  public formModelObj: User = new User();
  public users: User[];
  public userForm: FormGroup;
  private subscription: Subscription;
  public userFormObj: Array<User> = [];
  public userMember: User;
  public data: Array<User> = [];
  public isFirst = true;
  public directions: SingleSelect[] = Directions;
  public genders: SingleSelect[] = Gender;
  public isFormForEdit: boolean;
  private initialFormState: UserForm;
  public format: FormatSettings = {
    displayFormat: 'dd/MM/yyyy',
    inputFormat: 'dd/MM/yyyy'
  };

  @Input() user: User;
  @Output() notify: EventEmitter<User> = new EventEmitter<User>();

  constructor(private userService: UserService,
              private modalService: ModalService,
              private userFormStateService: UserFormStateService) {
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
    this.getModalStatus();
    this.getFormStatus();
    this.getInitialFormState();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.getAllUsers();
    if (this.isFirst) {
      this.isFirst = false;
      return;
    } else {
      this.userMember = this.user;
      this.userForm.setValue({
        name: this.userMember.name,
        gender: this.userMember.gender,
        birthdate: this.userMember.birthdate,
        direction: this.userMember.direction,
        startdate: this.userMember.startdate,
        enddate: this.userMember.enddate
      });
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getModalStatus(): void {
    this.modalService.getModalStatus().subscribe(isModalDialogVisible => {
      this.isModalDialogVisible = isModalDialogVisible;
    });
  }

  private getFormStatus(): void {
    this.userFormStateService.getFormStatus().subscribe(isFormForEdit => {
      this.isFormForEdit = isFormForEdit;
    });
  }

  private getInitialFormState(): void {
    this.userFormStateService.getInitialFormState().subscribe(initState => {
      this.initialFormState = initState;
    });
  }

  public submit(): void {
    if (this.userForm.valid) {
      if (this.isFormForEdit === false) {
        this.userService.postUser(this.userForm.value);
      }
      this.clickAddUser();
      this.modalService.modalClose();
      this.userForm.reset();
      this.getAllUsers();
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  public updateSubmit(): void {
    if (this.isFormForEdit === true) {
      this.userService.editUser(this.userForm.value, this.initialFormState.id);
    }
    this.modalService.modalClose();
  }

  public openModal(): void {
    this.isModalDialogVisible = true;
    this.modalService.modalOpen();
  }

  public closeModal(): void {
    this.userForm.reset();
    this.modalService.modalClose();
  }

  public clickAddUser(): void {
    this.userForm.reset();
    this.isAddingState = true;
    this.userFormStateService.changeFormStatus(false);
    this.userFormStateService.setDefaultInitialFormState();
  }

  public onDirectionChange(): void {
    const DateControl = this.userForm.get('enddate');
    this.subscription = this.userForm.get('direction').valueChanges
      .subscribe((dir) => {
        if (dir === null) {
          return;
        } else if (dir.value === Directions.map(value => value.value) || dir.value === Directions.map(value => value.value)) {
          DateControl.clearValidators();
        } else {
          DateControl.setValidators([Validators.required]);
        }
        DateControl.updateValueAndValidity();
      });
  }

  private getAllUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
