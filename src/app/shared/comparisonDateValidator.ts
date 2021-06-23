import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

export function  comparisonDateValidator (controlNameStart: string, controlNameEnd: string, controlNameBitrh: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    let dateofControlStart = formGroup.get(controlNameStart)?.value;
    let dateofControlEnd = formGroup.get(controlNameEnd)?.value;
    let dateofControlBirth = formGroup.get(controlNameBitrh)?.value;

    if ((dateofControlBirth > dateofControlStart || dateofControlBirth > dateofControlEnd) ||
      (dateofControlStart > dateofControlEnd || dateofControlStart < dateofControlBirth) ||
      (dateofControlEnd < dateofControlBirth || dateofControlEnd < dateofControlStart)) {
      return {comparisonDate: true};
    } else {
      return null;
    }
  };
}

