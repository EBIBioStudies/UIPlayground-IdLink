import {Component, ElementRef, forwardRef, Input, OnChanges, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {IdLinkModel} from './id-link.model';
import {IdLinkService} from './id-link.service';

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
export class IdLinkComponent implements ControlValueAccessor, OnChanges {

  @Input('placeholder') placeholder = 'prefix:identifier or URL';
  @Input('disabled') disabled = false;

  @ViewChild('inputBox', {read: ElementRef}) inputEl: ElementRef;

  items: String[] = [];
  selectedIndex = 0;
  listOpen = false;

  private inputModel: IdLinkModel = new IdLinkModel();
  private inputChanged: Subject<string> = new Subject<string>();

  private onChange = (_: any) => {
  };

  private onTouched = (_: any) => {
  };

  constructor(private service: IdLinkService) {
    this.inputChanged
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(value => {
        this.listOpen = true;
        this.update(value);
      });
  }

  ngOnChanges(changes): void {
    if (changes.inputText) {
      this.updateItems(this.inputText);
    }
  }

  @Input('value')
  set inputText(value: string) {
    this.inputModel.update(value);
  }

  get inputText(): string {
    return this.inputModel.toString();
  }

  writeValue(obj: any): void {
    if (obj) {
      this.inputText = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  onInputChanged(value) {
    this.inputChanged.next(value);
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

  get prefix(): string {
    return this.inputModel.prefix;
  }

  get id(): string {
    return this.inputModel.id;
  }

  get url(): string {
    return this.inputModel.url;
  }

  private update(value, prefixOnly = false) {
    const prefixBefore = this.inputModel.prefix;
    this.inputModel.update(value, prefixOnly);
    this.onChange(this.inputModel.toString());
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
