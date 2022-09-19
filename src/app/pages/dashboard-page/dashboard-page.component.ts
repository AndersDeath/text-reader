import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from '../../shared/services/auth.service';

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
    console.log('s')
    try {
      this.authService.getTexts(this.userData)
      // .forEach((e) => {
      //   console.log(e)
      // //  let q =  e.get;
      // //  console.log(q);
      // })
      .pipe(untilDestroyed(this)).subscribe((w) => {
        // console.log(w.forEach())
        // console.log(w.data());
        // let i = w
        // console.log(i.ref.get().then((c) => {
        //   console.log(c.data())
        // }));
        w.forEach((e) => {
          this.messages.push(e.data());
          console.log(this.messages)
        });
      });
    } catch(e) {
      console.log(e);
    }

  }

  sendFormData(form: any) {
    this.authService.writeMessage(this.userData, form.value.message);
    // this.form.setValue({message: ''})
  }

  logout() {
    this.authService.signOut();
  }

}
