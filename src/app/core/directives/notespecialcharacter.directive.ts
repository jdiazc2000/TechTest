import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[notespecialcharacters]',
  standalone: true
})
export class NotespecialcharacterDirective {

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = event.target.value;
    const sanitizedInput = input.replace(/[^a-zA-Z0-9\s]/g, '');

    if (input !== sanitizedInput) {
      this.ngControl.control?.setValue(sanitizedInput);
    }
  }

}
