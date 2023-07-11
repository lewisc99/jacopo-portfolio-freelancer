import { FormControl, ValidationErrors } from "@angular/forms";

export class LewisModulesValidators {

    static notOnlyWhiteSpace(control:FormControl): ValidationErrors
    {
        if((control.value != null) && (control.value.trim().length === 0 ))
        {
            return {'notOnlyWhitespace': true};
        }
        else
        {
            return null!;
        }
    }

    static maxLengthOfWord(control:FormControl): ValidationErrors
    {


        if((control.value != null) && (control.value.trim().length > 15))
        {
            return {'maxLengthOfWord': true}
        }
        else
        {
            return null!;
        }
    }
}