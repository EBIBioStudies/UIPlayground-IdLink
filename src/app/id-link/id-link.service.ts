import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class IdLinkService {
  constructor(private http: HttpClient) {
  }

  suggest(prefix: string): Observable<string[]> {
    if (!prefix) {
      return Observable.of([]);
    }
    return this.http.get(`https://identifiers.org/rest/collections/name/${prefix}`)
      .map((data: Array<any>) => {
        return data.map(d => d.prefix);
      })
      .catch((err) => {
        if (err.status === 404) {
          return Observable.of([]);
        }
        return Observable.throw(err);
      });
  }

  validate(prefix: string, id: string): Observable<boolean> {
    return this.http.get(`https://identifiers.org/rest/identifiers/validate/${prefix}:${id}`)
      .catch((err) => {
        if (err.status === 404) {
          return Observable.of(err);
        }
        return Observable.throw(err);
      });
  }
}
