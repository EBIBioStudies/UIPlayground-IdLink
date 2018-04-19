import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IdLinkComponent} from './id-link.component';
import {IdLinkValue} from './id-link.value';
import {FormsModule} from '@angular/forms';
import {InScrollViewDirective} from './in-scroll-view.directive';
import {IdLinkService} from './id-link.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

class IdLinkServiceMock {
  suggest(prefix: string): Observable<string[]> {
    return prefix === 'cheb' ? Observable.of(['chebi']) : Observable.of([]);
  }
}

describe('IdLinkComponent', () => {
  let component: IdLinkComponent;
  let fixture: ComponentFixture<IdLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [{provide: IdLinkService, useValue: new IdLinkServiceMock()}],
      declarations: [
        IdLinkComponent,
        InScrollViewDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.value).toBeDefined();
    expect(component.value.asString()).toBe(':');
  });

  it('updates items list when new prefix value set', () => {
    expect(component.items.length).toEqual(0);

    component.value = new IdLinkValue({prefix: 'cheb'});
    expect(component.items.length).toEqual(1);
  });
});
