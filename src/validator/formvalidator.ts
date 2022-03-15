import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export function SpecialCharValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const notallowed = /[!#%^&*()_+\-=\[\]{};'\\|,.<>\/?]+/;
    const Valid = notallowed.test(control.value);
    return Valid ? { isCharValid: { value: control.value } } : null;
  };
}
export function MacAddressValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const macFormat = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/;
    const macValid = macFormat.test(control.value);
    return !macValid ? { isMacValid: { value: control.value } } : null;
  };
}

export function MachineSpecialCharValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const notallowed = /[!#%^&*()+\-=\[\]{};'\\|,.<>?]+/;
    const Valid = notallowed.test(control.value);
    return Valid ? { isCharValid: { value: control.value } } : null;
  };
}

export function SwitchbotCharValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const notallowed = /[!#%^&*()+\-=\[\]{};'\\|,.<>?]+/;
    const Valid = notallowed.test(control.value);
    return Valid ? { isCharValid: { value: control.value } } : null;
  };
}
export function UrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const notallowed = /[!#%^&*()_+\-=\[\]{};'|,<>?]+/;
    const Valid = notallowed.test(control.value);
    return Valid ? { isCharValid: { value: control.value } } : null;
  };
}

export function noWhitespaceValidator(control: FormControl) {
  if (control.value !== '') {
    const notallowed = /\s/;
    const isValid = !notallowed.test(control.value);
    return isValid ? null : { 'whitespace': true };
  } else {
    return null;
  }
}
