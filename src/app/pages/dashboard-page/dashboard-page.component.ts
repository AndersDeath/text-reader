import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from '../../shared/services/auth.service';
import * as uuidv4 from 'uuid';

@UntilDestroy()
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  public userData: any;
  messages: any[] = [];
  public form: UntypedFormGroup;
  public tgKey: string = '';
  public tgName: string = '';
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
    try {
      this.authService.getTexts(this.userData)
      .pipe(untilDestroyed(this)).subscribe((w) => {
        w.forEach((e) => {
          this.messages.push(e.data());
        });
      });
    } catch(e) {
      console.log(e);
    }

    try {
      this.authService.getUser(this.userData).subscribe((text) => {
        const data = text.data();
        console.log(data);
        this.userData = {...this.userData, ...data};
      })
    } catch(e) {
      console.log(e);
    }

  }

  generateTgKey() {
    console.log(this.tgName)
    this.tgKey = btoa(JSON.stringify({
      code: uuidv4.v4(),
      name: this.tgName.trim()
    }));
    console.log(atob(this.tgKey));
    this.authService.setUserData({...this.userData, ...{tgKey: this.tgKey, tgName: this.tgName.trim()}}).then((e) => {
      console.log(e)
    })
  }

  sendFormData(form: any) {
    this.authService.writeMessage(this.userData, form.value.message);
    // this.form.setValue({message: ''})
  }

  logout() {
    this.authService.signOut();
  }

}
