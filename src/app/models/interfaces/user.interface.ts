
export class User {
  id?: number;
  name: string;
  gender: SingleSelect;
  birthdate: string | Date;
  direction: SingleSelect;
  startdate: string | Date;
  enddate: string | Date;
}
export interface UserForm {
  id?: number;
  name: string;
  gender: string;
  birthdate: string | Date;
  direction: string;
  startdate: string | Date;
  enddate: string | Date;
}
export interface SingleSelect {
  text: string;
  value: string;
}




