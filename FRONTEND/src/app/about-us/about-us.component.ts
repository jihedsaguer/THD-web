import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  navVisible = false;
  currentImageIndex = 0;
  testimonials = [
    "The most Creative Agency I've ever worked with. It was a privilege seeing them at work.",
    "Their dedication and passion for what they do is exemplified by their unrivaled customer support.",
    "A highly skilled team with a flair for creativity and a commitment to quality.",
    "Innovative solutions and stellar execution every single time.",
    "Their expertise and ability to think outside the box set them apart.",
    "Working with them was a breeze, and the results were outstanding.",
    "Their approach to problem-solving is both practical and creative.",
    "They truly understand the needs of their clients and deliver beyond expectations.",
    "Their meticulous attention to detail ensures nothing is left to chance.",
    "A team of professionals who always put the client first.",
    "The level of professionalism and creativity they bring to the table is unmatched."
  ];

  toggleNav() {
    this.navVisible = !this.navVisible;
  }

  removeGrayscale() {
    const cells = document.querySelectorAll('.characters table td');
    const testimonialParagraph = document.querySelector('.characterofthd p');

    if (this.currentImageIndex < cells.length) {
      cells[this.currentImageIndex].classList.add('remove-grayscale');

      if (this.currentImageIndex > 0) {
        cells[this.currentImageIndex - 1].classList.remove('remove-grayscale');
      }

      if (testimonialParagraph) {
        testimonialParagraph.textContent = this.testimonials[this.currentImageIndex];
      }

      this.currentImageIndex++;
    }

    if (this.currentImageIndex === cells.length) {
      this.currentImageIndex = 0;
    }
  }
}
