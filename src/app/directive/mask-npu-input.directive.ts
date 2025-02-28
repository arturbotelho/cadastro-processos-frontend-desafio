import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMaskNpuInput]'
})
export class MaskNpuInputDirective {

  constructor(private el: ElementRef) { }

  // Listen to the input event on the element (e.g., input field)
  @HostListener('input', ['$event'])
  onInput(event: any): void {
    let inputValue = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters

    // Apply the mask pattern: 1111111-11.1111.1.11.1111
    if (inputValue.length > 7) {
      inputValue = inputValue.replace(/(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})/, '$1-$2.$3.$4.$5.$6');
    }
    
    // Update the value of the input field with the formatted value
    this.el.nativeElement.value = inputValue;
  }
}
