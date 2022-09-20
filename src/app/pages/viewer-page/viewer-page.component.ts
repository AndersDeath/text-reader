import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewer-page',
  templateUrl: './viewer-page.component.html',
  styleUrls: ['./viewer-page.component.scss']
})
export class ViewerPageComponent implements OnInit {
  pageId: any;
  public userData: any;
  data: any;
  public fontSize = 100;
  public step = 10;
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData;
    this.activatedRoute.params.subscribe((e: any) => {
      this.pageId = e.id;
      this.authService.getText(this.userData, e.id).subscribe((text) => {
        this.data = text.data();
      });
    })
    let fontSize = localStorage.getItem('fontSize');
    if(fontSize !== null) {
      this.fontSize = +fontSize;
    }
  }

  increase() {
    this.fontSize = this.fontSize + this.step;
    localStorage.setItem('fontSize', this.fontSize.toString());
  }

  decrease() {
    this.fontSize = this.fontSize - this.step;
    localStorage.setItem('fontSize', this.fontSize.toString());
  }

  reset() {
    this.fontSize = 100;
    localStorage.setItem('fontSize', this.fontSize.toString());

  }

  logout() {
    this.authService.signOut();
  }
}
