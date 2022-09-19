import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  @Input() set formData(data: any) {
    let email = data.email || '';
    this.loginForm.setValue({
      email: email
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
        email: [null, [Validators.required, Validators.email]]
      })
  }

  sendFormData(form: UntypedFormGroup) {
    this.authService.forgotPassword(form.value.email);
  }

}
