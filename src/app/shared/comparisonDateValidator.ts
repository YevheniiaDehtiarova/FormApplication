import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

export function  comparisonDateValidator (controlNameStart: string, controlNameEnd: string, controlNameBitrh: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const dateControlStart = formGroup.get(controlNameStart)?.value;
    const dateControlEnd = formGroup.get(controlNameEnd)?.value;
    const dateControlBirth = formGroup.get(controlNameBitrh)?.value;

    if ((dateControlBirth > dateControlStart || dateControlBirth > dateControlEnd) ||
      (dateControlStart > dateControlEnd || dateControlStart < dateControlBirth) ||
      (dateControlEnd < dateControlBirth || dateControlEnd < dateControlStart)) {
      return {comparisonDate: true};
    } else {
      return null;
    }
  };
}

