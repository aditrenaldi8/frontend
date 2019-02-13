import {FormControl} from "@angular/forms";

export function NumberValidator(form: FormControl) {
    let REGEXP = /^\d+$/i;
    return REGEXP.test(form.value) ? null : {
        number: {
            valid: false
        }
    };
}