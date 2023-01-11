import { Directive, Input, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[mouse-over-color]',
})
export class MouseOverColorDirective implements OnInit {
  @Input('mouse-over-color')
  color: string = 'red';
  oldColor: string = '';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.oldColor = this.elementRef.nativeElement.style.background;
  }

  @HostListener('mouseover')
  mouseOver() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background', this.color);
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background', this.oldColor);
  }
}
