import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User, UserForm} from '../models/interfaces/user.interface';
import {Utils} from '../models/utils';
import {DEFAULT_USER} from '../models/default.user.';

@Injectable({
  providedIn: 'root'
})
export class UserFormStateService {
  private initialFormState: BehaviorSubject<UserForm> = new BehaviorSubject<UserForm>(DEFAULT_USER);
  private isFormForEdit: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public getFormStatus(): Observable<boolean> {
    return this.isFormForEdit.asObservable();
  }

  public getInitialFormState(): Observable<UserForm> {
    return this.initialFormState.asObservable();
  }

  public setInitialFormState(initState: User): void {
    this.initialFormState.next(Utils.setInitialFormStateFromUserData(initState));
  }

  public setDefaultInitialFormState(): void {
    this.initialFormState.next(DEFAULT_USER);
  }

  public changeFormStatus(status: boolean): void {
    this.isFormForEdit.next(status);
  }
}
