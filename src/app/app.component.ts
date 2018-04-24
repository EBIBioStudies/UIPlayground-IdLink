import {Component} from '@angular/core';
import {IdLinkValue} from './id-link/id-link.value';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  value: IdLinkValue = new IdLinkValue({prefix: ''});

  onModelChange(val) {
    this.value = val;
  }
}
