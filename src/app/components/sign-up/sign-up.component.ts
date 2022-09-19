import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  @Input() set formData(data: any) {
    let email = data.email || '';
    let remember = data.rememeber || false;
    if(localStorage.getItem('saved_email') && email === '') {
      email = localStorage.getItem('saved_email');
      remember = true;
    }
    this.loginForm.setValue({
      email: email,
      password: data.password,
      remember: remember
    })
  }
  @Output() formDataEmitter = new EventEmitter<any>();

  public loginForm: UntypedFormGroup;
  constructor(
    public fb: UntypedFormBuilder,
    private router: Router,
    public authService: AuthService
    ) {
      this.loginForm = this.fb.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required]],
        remember: [false, []],
      });
  }

  sendFormData(form: UntypedFormGroup) {
    this.authService.signUp(form.value.email, form.value.password);
  }

  loginByGoogle(event: any) {
    this.authService.googleAuth();
  }
}
