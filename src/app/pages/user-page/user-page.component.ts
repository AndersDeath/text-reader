import { untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import * as uuidv4 from 'uuid';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  public userData: any;
  public tgKey: string = '';
  public tgName: string = '';
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData;
    try {
      this.authService.authState().subscribe((state) => {
        this.userData = state?.toJSON()

      })
    } catch(e) {
      console.log(e);
    }

    try {
      this.authService.getShareBot(this.userData).subscribe((text) => {
        const data = text.data();
        this.userData = {...this.userData, ...data};
        this.tgKey = this.userData.tgKey;
        this.tgName = this.userData.tgName;
      })
    } catch(e) {
      console.log(e);
    }
  }

  generateTgKey() {
    // console.log(this.tgName)
    this.tgKey = btoa(JSON.stringify({
      code: uuidv4.v4(),
      name: this.tgName.trim()
    }));
    // console.log(atob(this.tgKey));
    this.authService.setShareBot({...this.userData, ...{tgKey: this.tgKey, tgName: this.tgName.trim()}}).then((e) => {
      console.log(e)
    })
  }

  copy() {
    console.log(this.tgKey)
  }

  logout() {
    this.authService.signOut();
  }
}
