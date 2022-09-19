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
  }

  logout() {
    this.authService.signOut();
  }
}
