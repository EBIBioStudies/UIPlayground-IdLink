import {AsyncValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IdLinkService} from './id-link.service';

const VALUE_REGEXP = /^([\w-.]+):([\w-.]+)$/;
const URL_REGEXP = /^(http|https|ftp):\/\/.+$/;

export function idLinkValidator(service: IdLinkService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

    const value = (control.value || '').trim();

    if (URL_REGEXP.test(value)) {
      return Observable.of(null);
    }

    const m = value.match(VALUE_REGEXP);
    if (m && m.length === 3) {
      return service.validate(m[1], m[2]).map(res => {
        return res['message'] ? {idLinkValue: true} : null;
      });
    }
    return Observable.of({idLinkValue: true});
  };
}
