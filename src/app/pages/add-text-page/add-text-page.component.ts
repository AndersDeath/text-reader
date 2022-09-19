import { environment } from './../../../environments/environment';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-text-page',
  templateUrl: './add-text-page.component.html',
  styleUrls: ['./add-text-page.component.scss']
})
export class AddTextPageComponent implements OnInit {
  public form: UntypedFormGroup;
  public userData: any;
  tinyApi = environment.tinyApiKey
  constructor(
    private authService: AuthService,
    public fb: UntypedFormBuilder
  ) {
    this.form = this.fb.group({
      message: [null, []],
    });
  }

  ngOnInit(): void {
    this.userData = this.authService.userData;
  }

  logout() {
    this.authService.signOut();
  }

  sendFormData(form: any) {
    this.authService.writeMessage(this.userData, form.value.message);
    this.form.setValue({message: ''})
  }

}
