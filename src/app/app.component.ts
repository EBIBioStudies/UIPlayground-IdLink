import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {IdLinkComponent} from "./id-link/id-link.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  value: string =  'icd:1234';

  @ViewChild(IdLinkComponent) linkField;

  get modelValue() {
    return this.linkField.value.value;
  }
}
