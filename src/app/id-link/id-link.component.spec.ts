import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdLinkComponent } from './id-link.component';

describe('IdLinkComponent', () => {
  let component: IdLinkComponent;
  let fixture: ComponentFixture<IdLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdLinkComponent ]
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
  });
});
