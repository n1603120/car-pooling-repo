import {Validators} from '@angular/forms';

export function createRequiredRegexValidator(thePattern: RegExp) {
  return Validators.compose([
    Validators.required,
    Validators.pattern(thePattern)]
  );
}
