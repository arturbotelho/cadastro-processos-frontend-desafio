import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMaskDateInput]'
})
export class MaskDateInputDirective {

  constructor(private el: ElementRef) { }

  // Format the input on key press
  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement;
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters

    if (value.length >= 3 && value.length <= 4) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    } else if (value.length >= 5) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4);
    }

    input.value = value;
  }
}
