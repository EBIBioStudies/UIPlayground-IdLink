import {Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {IdLinkModel} from './id-link.model';
import {IdLinkService} from './id-link.service';
import {IdLinkValue} from './id-link.value';

@Component({
  selector: 'id-link',
  templateUrl: './id-link.component.html',
  styleUrls: ['./id-link.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdLinkComponent),
      multi: true
    }
  ]
})
export class IdLinkComponent implements ControlValueAccessor {

  @Input('placeholder') placeholder = 'prefix:identifier or URL';
  @Input('disabled') disabled = false;
  @Input() required?: boolean = false;
  @Input() readonly?: boolean = false;
  @Input() suggestLength: number = 30;        //max number of suggested values to be displayed at once
  @Input() suggestThreshold: number = 0;      //number of typed characters before suggestions are displayed.
  @ViewChild('inputBox', {read: ElementRef}) inputEl: ElementRef;

  items: String[] = [];
  selectedIndex = 0;
  listOpen = false;

  private inputModel: IdLinkModel = new IdLinkModel();
  private inputChanged: Subject<string> = new Subject<string>();

  private onChange = [];
  private onTouched = [];

  constructor(private service: IdLinkService) {
    this.inputChanged
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(value => {
        this.listOpen = true;
        this.update(value);
      });
  }

  set value(value: IdLinkValue) {
    if (this.inputModel.asValue().asString() !== value.asString()) {
      this.update(value.asString());
    }
  }

  get value(): IdLinkValue {
    return this.inputModel.asValue();
  }

  get inputText(): String {
    return this.inputModel.asString();
  }

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange.push(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched.push(fn);
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  onInputChanged(inputText) {
    this.inputChanged.next(inputText);
  }

  onKeydown(ev) {
    switch (ev.key) {
      case 'ArrowUp':
        this.selectedIndex = this.selectedIndex > 0 ?
          this.selectedIndex - 1 : 0;
        break;
      case 'ArrowDown':
        const maxIndex = this.items.length === 0 ? 0 : this.items.length - 1;
        this.selectedIndex = (this.selectedIndex < maxIndex) ?
          this.selectedIndex + 1 : maxIndex;
        this.listOpen = true;
        break;
      case 'Enter':
        ev.preventDefault();
        this.onSelectItem(this.items[this.selectedIndex]);
        break;
    }
  }

  onSelectItem(item) {
    this.listOpen = false;
    this.update(item, true);
    Observable.interval(100).subscribe(() => {
      this.inputEl.nativeElement.focus();
    });
  }

  onMouseOverItem(itemIndex) {
    this.selectedIndex = itemIndex;
  }

  private update(value: string, prefixOnly = false) {
    const prefixBefore = this.inputModel.prefix;
    this.inputModel.update(value, prefixOnly);

    const updates = this.inputModel.asValue();
    this.onChange.forEach(f => f(updates));

    if (prefixBefore !== this.inputModel.prefix) {
      this.updateItems(this.inputModel.prefix || '');
    }
  }

  private updateItems(prefix) {
    this.service.suggest(prefix).subscribe(data => {
      this.items = data;
      this.selectedIndex = 0;
    });
  }
}
