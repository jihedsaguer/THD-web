import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements AfterViewInit {

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const mainWrapper = this.elementRef.nativeElement.querySelector('#main-wrapper');
    const menuIcon = this.elementRef.nativeElement.querySelector('.menu-icon');
    const item3 = this.elementRef.nativeElement.querySelector('.item3');

    this.renderer.listen(menuIcon, 'click', () => {
      menuIcon.classList.toggle('active');
      mainWrapper.classList.toggle('active');
    });
    this.renderer.listen(item3, 'click', () => {
      menuIcon.classList.toggle('active');
      mainWrapper.classList.toggle('active');
    });

  }

  navVisible = false;

  toggleNav(): void {
    this.navVisible = !this.navVisible;
  }

}
