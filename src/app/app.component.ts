import {Component, ViewChild} from '@angular/core';
import {IdLinkComponent} from "./id-link/id-link.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  value: string =  'cheb';

  @ViewChild(IdLinkComponent) linkField;

  get modelValue() {
    return this.linkField.value.value;
  }
}
