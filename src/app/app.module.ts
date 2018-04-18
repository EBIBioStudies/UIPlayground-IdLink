import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {IdLinkModule} from './id-link/id-link.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IdLinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
