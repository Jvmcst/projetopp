import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchDirective,
      multi: true,
    },
  ],
})
export class PasswordMatchDirective implements Validator {
  @Input('appPasswordMatch') matchField: string = '';

  validate(control: AbstractControl): ValidationErrors | null {
    const controlToMatch = control.parent?.get(this.matchField);

    if (controlToMatch && controlToMatch.value !== control.value) {
      return { passwordMatch: true };
    }

    return null;
  }
}
