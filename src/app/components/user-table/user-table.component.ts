import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/interfaces/user.interface';
import {ModalService} from '../../services/modal.service';
import {UserFormStateService} from '../../services/user-form-state.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit, OnChanges {
  @Output() onAdd: EventEmitter<User> = new EventEmitter<User>();

  public users: Array<User> = [];
  public formModelObj: User = new User();
  public user: User;

  constructor(private userService: UserService,
              private modalService: ModalService,
              private userFormStateService: UserFormStateService) {
  }

  public ngOnInit(): void {
    this.getAllUsers();
  }

  public ngOnChanges(): void {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.userService.getUsers()
      .subscribe(res => {
        this.users = res;
      });
  }

  public deleteUser(dataItem: User): void {
    this.userService.deleteUser(dataItem.id);
    this.getAllUsers();
  }

  public onEdit(dataItem: User): void {
    this.user = dataItem;
    this.modalService.modalOpen();
    this.onAdd.emit(this.user);
    this.userFormStateService.changeFormStatus(true);
    this.userFormStateService.setInitialFormState(dataItem);

  }

  public openModal(): void {
    this.modalService.modalOpen();
  }

  public editModal(): void {
    this.modalService.modalOpen();
    this.userFormStateService.changeFormStatus(false);
    this.userFormStateService.setDefaultInitialFormState();
  }

}
