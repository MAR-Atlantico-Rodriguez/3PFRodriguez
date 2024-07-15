import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFontTitulo]'
})
export class FontTituloDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.fontSize = '20px';
  }

}
