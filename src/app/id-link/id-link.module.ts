import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {IdLinkComponent} from './id-link.component';
import {IdLinkValueValidatorDirective} from './id-link.validator.directive';
import {IdLinkService} from './id-link.service';
import {InScrollViewDirective} from './in-scroll-view.directive';

import {
  TypeaheadModule
} from 'ngx-bootstrap';

@NgModule({
  declarations: [
    IdLinkComponent,
    IdLinkValueValidatorDirective,
    InScrollViewDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TypeaheadModule.forRoot(),
  ],
  providers: [
    IdLinkService
  ],
  exports: [
    IdLinkComponent
  ]
})
export class IdLinkModule {
}
