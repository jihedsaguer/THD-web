import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent {
  emailForm: FormGroup;
  navVisible = false; // Initialize navVisible property

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  toggleNav() {
    this.navVisible = !this.navVisible;
  }

  sendEmail() {
    if (this.emailForm.valid) {
      const formValues = this.emailForm.value;
      const name = encodeURIComponent(formValues.name);
      const email = encodeURIComponent(formValues.email);
      const subject = encodeURIComponent(formValues.subject);
      const message = encodeURIComponent(formValues.message);
      const mailtoLink = `mailto:alibelhrak@gmail.com?subject=${subject}&body=Name:%20${name}%0AEmail:%20${email}%0A%0A${message}`;
      window.location.href = mailtoLink;
    } else {
      console.log('Form is invalid');
    }
  }
}
