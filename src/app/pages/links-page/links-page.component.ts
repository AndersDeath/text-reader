import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-links-page',
  templateUrl: './links-page.component.html',
  styleUrls: ['./links-page.component.scss']
})
export class LinksPageComponent implements OnInit {
  public userData: any;
  messages: any[] = [];

  constructor(private authService: AuthService) { }

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
      this.authService.getTexts(this.userData)
      .pipe(untilDestroyed(this)).subscribe((w) => {
        w.forEach((e) => {
          this.messages.push(e.data());
        });
      });
    } catch(e) {
      console.log(e);
    }
  }

  logout() {
    this.authService.signOut();
  }

}
