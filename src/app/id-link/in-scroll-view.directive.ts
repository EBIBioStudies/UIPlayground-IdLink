import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[inScrollView]'
})

export class InScrollViewDirective {
  constructor(private elementRef: ElementRef) {
  }

  @Input()
  set inScrollView(value: boolean) {
    if (value) {
      // this.elementRef.nativeElement.scrollIntoViewIfNeeded(); doesn't work in IE or Edge
      this.scrollIntoViewIfNeeded();
    }
  }

  private scrollIntoViewIfNeeded(): void {
    const el = this.elementRef.nativeElement;
    const parent = el.parentNode;
    const overTop = el.offsetTop - parent.offsetTop < parent.scrollTop;
    const overBottom = el.offsetTop - parent.offsetTop + el.clientHeight > (parent.scrollTop + parent.clientHeight);
    if (overTop || overBottom) {
      this.elementRef.nativeElement.scrollIntoView(overTop);
    }
  }
}
