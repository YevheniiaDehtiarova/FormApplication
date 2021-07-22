import {User, UserForm} from './interfaces/user.interface';

export class Utils {
  public static createUserId(users: User[]): number {
    let nweUserId: number;
    for (let i = 0; ; i++) {
      nweUserId = i;
      if (!users.find((user) => user.id === i)) {
        break;
      }
    }
    return nweUserId;
  }


public static setInitialFormStateFromUserData(userData: User): UserForm {
  return {
    id: userData.id,
    name: userData.name,
    gender: userData.gender.value,
    birthdate: new Date(userData.birthdate),
    direction: userData.direction.value,
    startdate: new Date(userData.startdate),
    enddate: new Date(userData.enddate),
  };
}
}
