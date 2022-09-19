import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.scss']
})
export class EntryPageComponent implements OnInit {
  messages: any[] = [];
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn) {
      this.router.navigate(['/dashboard'])
    }
    this.authService.authState().pipe(untilDestroyed(this)).subscribe((e: any) => {
      if(e) {
        this.router.navigate(['/dashboard'])
      }
    });
    this.authService.getAllMessages().pipe(untilDestroyed(this)).subscribe((w) => {
      w.forEach((e) => {
        this.messages.push(e.data());
      });
    });
  }

}
